import axios from "axios";

export async function getCoinData(coinId: string) {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
  try {
    const response = await axios.get(url, { headers: { accept: "application/json" } });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin data:", axios.isAxiosError(error) ? error.message : error);
    throw error; // Let the component handle errors
  }
}
