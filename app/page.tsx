import CoinList from "./components/CoinList";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="w-full p-10 mb-6 bg-white shadow-md ">
        <h1 className="text-[3rem] font-semibold text-background">CryptoScout</h1>
      </header>

      <div className="flex items-start justify-center">
        <CoinList />
      </div>
    </div>
  );
}
