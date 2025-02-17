"use client";
import axios from "axios";
import { useState } from "react";

type Coin = {
  id: string;
  name: string;
  symbol: string;
};

export default function CoinList() {
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [coin, setCoin] = useState();

  async function getCoinData() {
    const url = "https://api.coingecko.com/api/v3/coins/markets";
    const options = {
      method: "GET",
      params: { vs_currency: "usd" },
      headers: { accept: "application/json" },
    };

    try {
      const response = await axios(url, options);
      setCoinData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios Error:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center border-2 border-red-500">
      <button
        onClick={getCoinData}
        className="mt-4 px-4 py-2 rounder-md transition cursor-pointer active:scale-90 bg-blue-500/60 border-blue-400 text-white rounded"
      >
        Get Coins
      </button>
      <div className="overflow-scroll max-h-96 no-scrollbars w-1/2">
        {coinData.map((coin) => (
          <div
            key={coin.id}
            className="bg-gray-100/20 p-4 hover:bg-gray-100/10 transition-pointer"
          >
            {coin.id}
          </div>
        ))}
      </div>
    </div>
  );
}
