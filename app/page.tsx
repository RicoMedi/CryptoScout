'use client';
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {

const [coinData, setCoinData] = useState([]);

  async function getCoinData() {
    const url = "https://api.coingecko.com/api/v3/coins/markets";
    const options = {
      method: "GET",
      params: { vs_currency: "usd" },
      headers: { accept: "application/json" },
    };

    try {
      const response = await axios(url, options);
      console.log(response.data);
      return response.data;
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
      Hello
      <button onClick={()=> getCoinData()} > Get Coins</button>
    </div>
  );
}
