"use client";
import { useState, useEffect } from "react";
import CoinList from "./components/coins/CoinList";
import { Nav } from "./components/Nav";
import { getCoinsData } from "./lib/getCoinsData";
import { getCoinData } from "./lib/getCoinData";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: { current_price: { usd: number } };
  description: { en: string };
};

export default function Home() {
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [coin, setCoin] = useState<Coin | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    if (coinData.length > 0) {
      fetchCoinDetails(coinData[0].id);
    }
  }, [coinData]);

  async function fetchCoins() {
    try {
      const data = await getCoinsData();
      setCoinData(data);
    } catch {
      console.error("Failed to fetch coins.");
    }
  }

  async function fetchCoinDetails(coinId: string) {
    try {
      const data = await getCoinData(coinId);
      setCoin(data);
    } catch {
      console.error("Failed to fetch coin details.");
    }
  }

  const filteredCoins = coinData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-[#232336] via-[#18181b] to-[#2d2e3e]">
      <Nav
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredCoins={filteredCoins}
        fetchCoinDetails={fetchCoinDetails}
      />
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-6 py-8">
        <CoinList coin={coin} />
      </main>
    </div>
  );
}
