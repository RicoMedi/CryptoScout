import CoinList from "./components/CoinList";

export default function Home() {


  return (
    <div className="flex flex-col w-full min-h-screen border-2 border-red-500">
      <CoinList />
    </div>
  );
}
