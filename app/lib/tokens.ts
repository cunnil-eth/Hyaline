export interface Token {
  name: string;
  image: string;
  apr: {
      "1d": string;
      "7d": string;
      "30d": string;
  };
  tvl: string;
}

export const tokens: Token[] = [
    {
      name: "AI16Z",
      image: "https://image.coinpedia.org/app_uploads/markets/cryptocurrencies/1735621358682snjvinssgh.webp",
      apr: { "1d": "N/A", "7d": "N/A", "30d": "N/A" },
      tvl: "$0M"
    },
    {
      name: "ZEREBRO",
      image: "https://assets.coingecko.com/coins/images/51289/large/zerebro_2.png?1730588883",
      apr: { "1d": "N/A", "7d": "N/A", "30d": "N/A" },
      tvl: "$0M"
    },
    {
      name: "AIXBT",
      image: "https://assets.coingecko.com/coins/images/51784/standard/3.png?1731981138",
      apr: { "1d": "N/A", "7d": "N/A", "30d": "N/A" },
      tvl: "$0M"
    }
];