"use client";
import axios from "axios";
import { useState } from "react";

type Coin = {
  id: string;
  name: string;
  symbol: string;
};

export default function Home() {
  const [coinData, setCoinData] = useState<Coin[]>([]);

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
    <div className="flex flex-col w-full min-h-screen justify-center items-center">
      
      {coinData.map((coin) => (
        <div
          key={coin.id}
          className="flex flex-col w-full justify-center items-center"
        >
          {coin.id}
        </div>
      ))}
      <button onClick={() => getCoinData()}> Get Coins</button>
    </div>
  );
}
