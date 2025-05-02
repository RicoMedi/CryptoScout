"use client";
import Image from "next/image";
import CoinChart from "./CoinChart";
import { Coin } from "../../../types/coin";

type CoinListProps = {
  coin: Coin | null;
};

export default function CoinList({ coin }: CoinListProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto min-h-[60vh] card p-4 sm:p-6 md:p-10 gap-6 sm:gap-8 transition-all shadow-xl border border-gray-100 text-black">
      {coin && (
        <div className="w-full flex flex-col items-center gap-6 sm:gap-8">
          <div className="transition-transform duration-300 hover:scale-105">
            <Image
              src={coin.image.large}
              alt="Coin Image"
              width={120}
              height={120}
              className="rounded-full shadow-lg bg-background border-4 border-white sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] object-cover"
            />
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary drop-shadow-sm text-center">
            ${coin.market_data.current_price.usd}
          </p>
          <div className="p-4 sm:p-6 rounded-2xl glass w-full border border-gray-200 shadow-md max-h-[180px] sm:max-h-[200px] overflow-auto text-black">
            <p className="text-base sm:text-lg leading-relaxed text-center">
              {coin.description.en || "No description available."}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center items-center mt-4 sm:mt-6 text-black">
        {coin && <CoinChart coinId={coin.id} />}
      </div>
    </div>
  );
}
