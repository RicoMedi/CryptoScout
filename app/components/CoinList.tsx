"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import { getCoinsData } from "../lib/getCoinsData";
import { getCoinData } from "../lib/getCoinData";

import CoinChart from "./coinChart";

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
  const [activeCoin, setActiveCoin] = useState<string | null>(null);

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    if (coinData.length > 0) {
      fetchCoinDetails(coinData[0].id);
      setActiveCoin(coinData[0].id);
    }
  }, [coinData]);
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
      setActiveCoin(coinId);
    } catch {
      setError("Failed to fetch coin details.");
    }
  }

  const filteredCoins = coinData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-screen p-6 bg-blueprint">
      <div className="flex justify-end mb-6 relative">
        <input
          type="text"
          placeholder="Search by Coin Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-black w-[300px] shadow-sm"
        />
        {searchTerm && (
          <div className="absolute top-full right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-[300px] mt-2 p-3">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => {
                    fetchCoinDetails(coin.id);
                    setSearchTerm("");
                  }}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
                >
                  {coin.name}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No results found</p>
            )}
          </div>
        )}
      </div>

      <div className="flex w-full h-full bg-white p-8 rounded-xl shadow-lg gap-6">
        {coin && (
          <div className="w-1/3 flex flex-col items-center gap-6">
           
            <Image
              src={coin.image.large}
              alt="Coin Image"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />

           
            <p className="text-primary text-4xl font-bold">
              ${coin.market_data.current_price.usd}
            </p>

          
            <div className="p-6 bg-background rounded-lg overflow-auto w-full border border-gray-300 shadow-md max-h-[200px]">
              <p className="text-lg text-gray-800">
                {coin.description.en || "No description available."}
              </p>
            </div>
          </div>
        )}

        
        <div className="w-2/3 flex justify-center items-center">
          {coin && (
            <div className="w-full h-[600px] md:h-[300px] bg-gray-50 rounded-lg shadow-lg p-4">
              <CoinChart coinId={coin.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
