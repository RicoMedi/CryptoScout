import axios from "axios";

export async function getCoinsData() {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: { vs_currency: "usd" },
      headers: { accept: "application/json" },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching coins:", axios.isAxiosError(error) ? error.message : error);
    throw error; 
  }
}
