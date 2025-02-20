import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${params.id}`;
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        'x-cg-demo-api-key': process.env.CRYPTO_API_KEY ?? "",
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return NextResponse.json(
      { error: "Failed to fetch coin data" },
      { status: 500 }
    );
  }
}
