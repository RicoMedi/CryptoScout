export async function getCoinData(coinId: string) {
    try {
      const response = await fetch(`/api/coins/${coinId}`);
      if (!response.ok) throw new Error("Failed to fetch coin data");
      return await response.json();
    } catch (error) {
      console.error("Error fetching coin data:", error);
      throw error;
    }
  }
  