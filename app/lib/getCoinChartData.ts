export async function getCoinChartData(coinId: string) {
    try {
      const response = await fetch(`/api/coins/${coinId}/chart`);
      if (!response.ok) {
        throw new Error('Failed to fetch chart data');
      }
      const data = await response.json();
      return data.prices;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  