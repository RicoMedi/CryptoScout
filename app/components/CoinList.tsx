"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCoinsData } from "../lib/getCoinsData";
import { getCoinData } from "../lib/getCoinData";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
  };
};

export default function CoinList() {
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [coin, setCoin] = useState<Coin | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Added state for search term
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

  async function fetchCoinDetails(coinId: string) {
    try {
      const data = await getCoinData(coinId);
      setCoin(data);
      console.log(data);
    } catch {
      setError("Failed to fetch coin details.");
    }
  }

  // Filter coins based on the search term
  const filteredCoins = coinData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center border-2 border-red-500">
      {error && <p className="text-red-500">{error}</p>}
      {coin && (
        <Image
          src={coin.image.large}
          alt="Coin Image"
          width={200}
          height={200}
          className="p-4"
        />
      )}
      <div className="flex flex-row gap-4">
        <div className="bg-gray500/100 w-[250px] h-[250px] flex justify-center items center">
          {" "}
          Card 1
        </div>
        <div className="bg-gray500/100 w-[250px] h-[250px] flex justify-center items center">
          {" "}
          Card 2
        </div>
        <div className="bg-gray500/100 w-[250px] h-[250px] flex justify-center items center">
          {" "}
          Card 3
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by Coin Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        className="mt-4 px-4 py-2 rounded-md border-2 border-blue-300"
      />
     
      <div className="overflow-scroll max-h-96 no-scrollbars w-1/2 mt-4 border-4 border-s-black border-e-black">
        {filteredCoins.map((coin) => (
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
