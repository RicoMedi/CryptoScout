"use client";

import { useState } from "react";
import { getCoinsData } from "../lib/getCoinsData";
import { getCoinData } from "../lib/getCoinData";

type Coin = {
  id: string;
  name: string;
  symbol: string;
};

export default function CoinList() {
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [coin, setCoin]= useState()

  async function fetchCoins() {
    try {
      const data = await getCoinsData();
      setCoinData(data);
    } catch {
      setError("Failed to fetch coins.");
    }
  }

  async function fetchCoinDetails(coinId: string) {
    try {
      const data= await getCoinData(coinId);
      setCoin(data);
      console.log(data);
    } catch {
      setError("Failed to fetch coin details.");
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center border-2 border-red-500">
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={fetchCoins}
        className="mt-4 px-4 py-2 transition cursor-pointer active:scale-90 bg-blue-500 border-blue-400 text-white rounded-md"
      >
        Get Coins
      </button>
      <div className="overflow-scroll max-h-96 no-scrollbars w-1/2 mt-4">
        {coinData.map((coin) => (
          <div
            onClick={() => fetchCoinDetails(coin.id)}
            key={coin.id}
            className="p-4 font-semibold text-black hover:bg-gray-300 transition cursor-pointer rounded-md active:scale-90"
          >
            {coin.name}
          </div>
        ))}
      </div>
    </div>
  );
}
