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
  if(coinData.length >0){
    fetchCoinDetails(coinData[0].id);
    setActiveCoin(coinData[0].id);
  }
},[coinData]);
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
    <div className=" flex justify-evenly w-full h-screen p-6 bg-blueprint" >
      <div className="w-1/2 text-black p-6 rounded-lg shadow-md bg-white flex justify-evenly">
        {coin && (
          <div className="flex flex-col items-center gap-4">
            <Image
              src={coin.image.large}
              alt="Coin Image"
              width={200}
              height={200}
            />
            <h2 className="text-3xl font-semibold mt-2">{coin.name}</h2>
            <p className="text-primary text-3xl font-bold">
              ${coin.market_data.current_price.usd}
            </p>
            <div className="mt-4 p-4 bg-background rounded-md overflow-auto">
              <p className="text-lg border-4 border-background p-3">
                {coin.description.en || "No description available."}
              </p>
            </div>
            <div className="w-full h-[400px]">
              <CoinChart coinId={coin.id} />
            </div>
          </div>
        )}
      </div>

      <div className="w-1/2  bg-white p-6 rounded-lg shadow-md ml-6  text-text">
        <div className="pb-6">
          <input
            type="text"
            placeholder="Search by Coin Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-4 rounded-md border-2 border- focus:outline-none focus:ring-2 focus:ring-secondary text-background text-black"
          />
        </div>

        <div className="h-[80%] overflow-auto no-scrollbars mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => fetchCoinDetails(coin.id)}
              className={` bg-accent w-full h-[80px] p-4 shadow-md rounded-md text-center items-center flex justify-center hover:bg-secondary transition cursor-pointer ${
                activeCoin === coin.id
                  ? "bg-primary text-black"
                  : "bg-background text-white" 
              }`}
            >
              {coin.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
