"use client";
import Image from "next/image";
import CoinChart from "./coinChart";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: { current_price: { usd: number } };
  description: { en: string };
};

type CoinListProps = {
  coin: Coin | null;
};

export default function CoinList({ coin }: CoinListProps) {
  return (
    <div className="flex flex-col items-center w-full h-svh bg-background p-8 rounded-xl shadow-lg gap-6">
      {coin && (
        <div className="w-full flex flex-col items-center gap-6">
          <Image
            src={coin.image.large}
            alt="Coin Image"
            width={400}
            height={400}
            className="rounded-lg shadow-lg bg-background"
          />
          <p className="text-black text-4xl font-bold">
            ${coin.market_data.current_price.usd}
          </p>
          <div className="p-6 rounded-lg overflow-auto w-full border border-gray-300 shadow-md max-h-[200px]">
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
  );
}
