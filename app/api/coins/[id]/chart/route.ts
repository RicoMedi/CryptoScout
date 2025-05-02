import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=30`;
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "x-cg-demo-api-key": process.env.CRYPTO_API_KEY ?? "",
      },
    });
    return NextResponse.json({ ohlc: data });
  } catch (error) {
    console.error("Error fetching coin OHLC data:", error);
    return NextResponse.json(
      { error: "Failed to fetch coin OHLC data" },
      { status: 500 }
    );
  }
}
