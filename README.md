# README for CryptoScout 


## Overview

The Crypto Tracker project allows users to view and track cryptocurrency prices, along with detailed coin information and price trends. The project uses the CoinGecko API to fetch coin data and price trends.

## Features

- Displays a list of cryptocurrencies that can be searched by name.
- Clicking a coin displays detailed information, including the current price, description, and a price trend chart for the last 7 days.
- Dynamic API endpoints to fetch coin details and price chart data using dynamic IDs.
- Uses Chart.js to visualize the price trends.

## Tools & Technologies

- Next.js for building the application.
- Chart.js for visualizing the price trend charts.
- Axios for making API requests.
- Tailwind CSS for styling the application.
- TypeScript for type safety.

## API Endpoints

- **Coin List API**: Fetches a list of all coins using `getCoinsData`.
- **Coin Detail API**: Fetches detailed data for a specific coin using `getCoinData` (based on dynamic ID).
- **Coin Chart API**: Fetches price trend data for a specific coin using `getCoinChartData` (based on dynamic ID).

## Using CoinGecko

We use the CoinGecko API to retrieve up-to-date information on various cryptocurrencies. CoinGecko provides a comprehensive and free API that allows us to access data such as current prices, historical price trends, market capitalization, and more. By leveraging CoinGecko, we ensure that our users have access to reliable and accurate cryptocurrency data.
