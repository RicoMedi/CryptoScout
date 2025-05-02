"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface OhlcDatum {
  x: number; // timestamp
  y: [number, number, number, number]; // [open, high, low, close]
}

export default function CoinChart({ coinId }: { coinId: string }) {
  const [ohlc, setOhlc] = useState<OhlcDatum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOhlc(coinId);
  }, [coinId]);

  async function fetchOhlc(coinId: string) {
    setLoading(true);
    try {
      const res = await axios.get(`/api/coins/${coinId}/chart`);
      // API returns { ohlc: [[timestamp, open, high, low, close], ...] }
      const ohlcData: OhlcDatum[] = res.data.ohlc.map((d: number[]) => ({
        x: d[0],
        y: [d[1], d[2], d[3], d[4]],
      }));
      setOhlc(ohlcData);
    } catch {
      setOhlc([]);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[400px] card">
        <span className="animate-spin text-3xl text-primary">⏳</span>
        <span className="ml-3 text-primary">Loading chart...</span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        background: "#fff",
        borderRadius: "1.25rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
        padding: "1.5rem",
      }}
      className="w-full max-w-full"
    >
      <ApexChart
        type="candlestick"
        height={350}
        width="100%"
        series={[{ data: ohlc }]}
        options={{
          chart: {
            type: "candlestick",
            toolbar: { show: false },
            background: "#fff",
          },
          xaxis: {
            type: "datetime",
            labels: { style: { colors: "#232336" } },
            axisBorder: { color: "#232336" },
            axisTicks: { color: "#232336" },
          },
          yaxis: {
            tooltip: { enabled: true },
            labels: { style: { colors: "#232336" } },
            axisBorder: { color: "#232336" },
            axisTicks: { color: "#232336" },
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: "#7f5af0",
                downward: "#ff5470",
              },
            },
          },
          theme: { mode: "light" },
          tooltip: {
            enabled: true,
            style: { fontSize: "14px" },
            custom: function ({ seriesIndex, dataPointIndex, w }) {
              const dataArr = w?.globals?.initialSeries?.[seriesIndex]?.data;
              if (
                !dataArr ||
                !dataArr[dataPointIndex] ||
                !dataArr[dataPointIndex].y
              ) {
                return '<div style="padding:8px; color:#232336;">No data</div>';
              }
              const ohlc = dataArr[dataPointIndex].y;
              return `
                <div style="padding:8px; color:#232336; background:#fff;">
                  <div><strong>Open:</strong> $${ohlc[0]}</div>
                  <div><strong>High:</strong> $${ohlc[1]}</div>
                  <div><strong>Low:</strong> $${ohlc[2]}</div>
                  <div><strong>Close:</strong> $${ohlc[3]}</div>
                </div>
              `;
            },
          },
        }}
      />
    </div>
  );
}
