"use strict";

const CONFIG = {
  google: {
    clientId:
      "16088368406-0t6sun68gv5sf9p5rl790br4l7sfb948.apps.googleusercontent.com",
    redirectUri: `${window.location.origin}/dashboard.html`,
    scope: "email profile",
  },

  api: {
    polygonScanApi: "https://api.polygonscan.com/api",
    coinGeckoApi: "https://api.coingecko.com/api/v3",
    cryptoCompareApi: "https://min-api.cryptocompare.com/data",
  },

  blockchain: {
    rpc: "https://rpc-amoy.polygon.technology",
    chainId: "0x13882",
    chainName: "Polygon Amoy Testnet",
    explorerUrl: "https://amoy.polygonscan.com",
    currency: {
      name: "Polygon",
      symbol: "POL",
      decimals: 18,
    },
  },

  app: {
    name: "FlowPay",
    version: "1.0.0",
    defaultCurrency: "POL",
    sessionTimeout: 604800,
    url:
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "localhost"
        ? `http://${window.location.host}`
        : "https://teamflowpay.vercel.app",
    paymentPath: "/send.html",
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
