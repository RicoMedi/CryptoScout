import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { params } = await context;

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${params.id}/ohlc?vs_currency=usd&days=30`;
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "x-cg-demo-api-key": process.env.CRYPTO_API_KEY ?? "",
      },
    });

    // data is an array of [timestamp, open, high, low, close]
    return NextResponse.json({ ohlc: data });
  } catch (error) {
    console.error("Error fetching coin OHLC data:", error);
    return NextResponse.json(
      { error: "Failed to fetch coin OHLC data" },
      { status: 500 }
    );
  }
}
