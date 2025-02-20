'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { Line } from "react-chartjs-2";
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
import { getCoinsData } from "../lib/getCoinsData";
import { getCoinData } from "../lib/getCoinData";
import { getCoinChartData } from "../lib/getCoinChartData";

// Note to self: This is a client component, so we need to register the ChartJS components
// and use the useEffect hook to fetch the data.
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

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: { current_price: { usd: number } };
  description: { en: string };
};

export default function CoinList() {
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [coin, setCoin] = useState<Coin | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData | null>(null); 
  const [activeCoin, setActiveCoin] = useState<string | null>(null);

  useEffect(() => {
    fetchCoins();
  }, []);

  async function fetchCoins() {
    try {
      const data = await getCoinsData();
      setCoinData(data);
    } catch {
      setError("Failed to fetch coins.");
    }
  }
// here im fetching the coin details and the chart data
  async function fetchCoinDetails(coinId: string) {
    try {
      const data = await getCoinData(coinId);
      setCoin(data);
      fetchMarketChart(coinId);
      setActiveCoin(coinId);
    } catch {
      setError("Failed to fetch coin details.");
    }
  }
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

  const filteredCoins = coinData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full min-h-screen items-center bg-gray-100 p-6 border-x-8 border-green-300">
      <header className="w-full max-w-3xl bg-white shadow-md p-6 rounded-lg mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Crypto Tracker</h1>
      </header>

      <input
        type="text"
        placeholder="Search by Coin Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-400 mb-6"
      />

      {coin && (
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col items-center">
            <Image
              src={coin.image.large}
              alt="Coin Image"
              width={150}
              height={150}
            />
            <h2 className="text-xl font-semibold mt-2">{coin.name}</h2>
            <p className="text-gray-600">
              ${coin.market_data.current_price.usd}
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-md max-h-48 overflow-auto">
            <p className="text-md text-gray-700 border-4 p-3">
              {coin.description.en || "No description available."}
            </p>
          </div>
          {chartData && (
            <div className="mt-6 p-4 bg-white shadow rounded-md">
              <h3 className="text-lg font-semibold mb-2">
                Price Trend (7 Days)
              </h3>
              <Line data={chartData} />
            </div>
          )}
        </div>
      )}

      <div className="w-full max-w-3xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => fetchCoinDetails(coin.id)}
            className={`p-4 bg-white shadow-md rounded-md text-center hover:bg-gray-200 transition cursor-pointer ${
              activeCoin === coin.id ? "bg-gray-200" : ""}`}
          >
            {coin.name}
          </div>
        ))}
      </div>
    </div>
  );
}
