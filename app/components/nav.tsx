import React from "react";

type NavProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCoins: { id: string; name: string }[];
  fetchCoinDetails: (coinId: string) => void;
};

export default function Nav({
  searchTerm,
  setSearchTerm,
  filteredCoins,
  fetchCoinDetails,
}: NavProps) {
  return (
    <header className="w-full p-6 mb-6 bg-black shadow-md flex justify-between items-center">
      <h1 className="text-4xl text-white font-semibold font-serif bg-background">CryptoScout</h1>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search by Coin Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary text-black w-[300px] shadow-sm"
        />
        
        {searchTerm && (
          <div className="absolute top-full left-0 bg-white border border-gray-300 rounded-lg shadow-lg w-[300px] mt-2 p-3">
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
    </header>
  );
}
