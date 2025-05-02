# CryptoScout

## Overview

CryptoScout is a modern cryptocurrency tracker built with Next.js, TypeScript, and Tailwind CSS. It allows users to search, view, and track cryptocurrency prices, along with detailed coin information and interactive candlestick price charts. The app fetches real-time data from the CoinGecko API.

## Features

- **Searchable Coin List:** Search and filter cryptocurrencies by name.
- **Detailed Coin View:** View current price, description, and a candlestick chart for each coin.
- **Interactive Chart:** Candlestick chart (last 30 days) powered by ApexCharts.
- **Dynamic API Endpoints:** Fetch coin details and chart data using dynamic routes.
- **Responsive UI:** Modern, mobile-friendly design with glassmorphism and dark mode.

## Project Structure

```
app/
  ├── components/
  │     ├── Nav.tsx                # Top navigation/search bar
  │     └── coins/
  │           ├── CoinList.tsx     # Displays selected coin details
  │           └── CoinChart.tsx    # Renders candlestick chart for a coin
  ├── lib/
  │     ├── getCoinsData.ts        # Fetches list of coins from CoinGecko
  │     ├── getCoinData.ts         # Fetches details for a specific coin
  │     └── getCoinChartData.ts    # Fetches chart data for a specific coin
  ├── api/
  │     └── coins/
  │           └── [id]/
  │                 ├── route.ts   # API route for coin details
  │                 └── chart/
  │                       └── route.ts # API route for coin chart data
  ├── globals.css                  # Global styles (Tailwind + custom)
  ├── layout.tsx                   # Root layout and font setup
  └── page.tsx                     # Main app page (search, coin view)
types/
  └── coin.ts                      # TypeScript type for Coin object
```

## Main Components

- **Nav.tsx**: Search bar and app branding. Handles search input and displays filtered results.
- **CoinList.tsx**: Shows selected coin's image, price, description, and chart.
- **CoinChart.tsx**: Renders a candlestick chart for the selected coin using ApexCharts.

## Data Flow

1. On load, the app fetches a list of coins from CoinGecko (`getCoinsData`).
2. User searches for a coin by name using the search bar (Nav).
3. Selecting a coin fetches its details (`getCoinData`) and displays them (CoinList).
4. CoinList renders CoinChart, which fetches and displays the last 30 days of OHLC data for the coin.

## API Endpoints (Internal)

- **GET `/api/coins/[id]`**: Returns detailed data for a specific coin (proxy to CoinGecko).
- **GET `/api/coins/[id]/chart`**: Returns OHLC chart data for a specific coin (proxy to CoinGecko).

## Tools & Technologies

- **Next.js** (App Router, API routes)
- **TypeScript**
- **Tailwind CSS** (with custom glassmorphism)
- **ApexCharts** (`react-apexcharts`) for candlestick charts
- **Axios** for API requests
- **CoinGecko API** for crypto data
- **React Icons** for UI icons

## Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env.local` file and add your CoinGecko API key:
     ```
     CRYPTO_API_KEY=your_coingecko_api_key
     ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Notes

- The app uses a free CoinGecko API key 
- Candlestick charts are rendered with ApexCharts.
- The UI is styled with Tailwind CSS and custom utility classes for glass/card effects.
