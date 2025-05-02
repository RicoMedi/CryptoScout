import React from "react";
import { FiSearch } from "react-icons/fi";

type NavProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCoins: { id: string; name: string }[];
  fetchCoinDetails: (coinId: string) => void;
};

export function Nav({
  searchTerm,
  setSearchTerm,
  filteredCoins,
  fetchCoinDetails,
}: NavProps) {
  return (
    <header className="sticky top-0 z-30 w-full p-6 mb-6 glass shadow-lg flex justify-between items-center transition-all">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">💰</div>
        <h1 className="text-4xl text-primary font-semibold font-serif tracking-tight">CryptoScout</h1>
      </div>

      <div className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-primary transition">
          <FiSearch className="ml-3 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by Coin Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-lg bg-transparent focus:outline-none text-black w-[260px]"
            autoComplete="off"
          />
        </div>
        {searchTerm && filteredCoins.length > 0 && (
          <div className="absolute top-full text-black left-0 bg-white border border-gray-200 rounded-xl shadow-xl w-[300px] mt-2 p-3 z-50 max-h-60 overflow-y-auto">
            {filteredCoins.map((coin) => (
              <div
                key={coin.id}
                onClick={() => {
                  fetchCoinDetails(coin.id);
                  setSearchTerm("");
                }}
                className="cursor-pointer hover:bg-primary/10 p-2 rounded-md transition-colors"
              >
                {coin.name}
              </div>
            ))}
          </div>
        )}
        {searchTerm && filteredCoins.length === 0 && (
          <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-xl shadow-xl w-[300px] mt-2 p-3 z-50">
            <p className="text-gray-500">No results found</p>
          </div>
        )}
      </div>
    </header>
  );
}
