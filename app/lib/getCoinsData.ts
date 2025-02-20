export async function getCoinsData(page: number = 1, perPage: number = 100) {
  const url = `https://api.coingecko.com/api/v3/coins/markets`;
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: perPage.toString(),
    page: page.toString(),
    x_cg_demo_api_key: process.env.CRYPTO_API_KEY ?? "",
  });

  try {
    const response = await fetch(`${url}?${params}`);
    if (!response.ok) throw new Error("Failed to fetch coin data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching coin market data:", error);
    throw error;
  }
}
