import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=7`; // or other period, like '30' for 30 days
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        'x-cg-demo-api-key': process.env.CRYPTO_API_KEY ?? "",
      },
    });

    const prices = data.prices.map((price: [number, number]) => price); // [timestamp, price]

    return NextResponse.json({ prices });
  } catch (error) {
    console.error("Error fetching coin chart data:", error);
    return NextResponse.json(
      { error: "Failed to fetch coin chart data" },
      { status: 500 }
    );
  }
}
