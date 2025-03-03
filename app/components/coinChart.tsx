'use client';
import { useEffect, useState } from "react";
import { getCoinChartData } from "../lib/getCoinChartData";
import { Line } from "react-chartjs-2";
// Note to self: This is a client component, so we need to register the ChartJS components
// and use the useEffect hook to fetch the data.
import {
  Chart as ChartJS,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    pointRadius: number;
  }[];
}

export default function CoinChart({ coinId }: { coinId: string }) {
    
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    fetchMarketChart(coinId);
  }, [coinId]);

// note to self : this is the function that fetches the chart data
// and sets the chart data state
// and then we can use the chart data state to render the chart
  async function fetchMarketChart(coinId: string) {
    const prices = await getCoinChartData(coinId);
    if (prices && prices.length > 0) {
      setChartData({
        labels: prices.map((price: [number, number]) =>
          new Date(price[0]).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Price (USD)",
            data: prices.map((price: [number, number]) => price[1]),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.3,
            pointRadius: 2,
          },
        ],
      });
    }
  }


  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Line data={chartData}/>
    </div>
  );
}