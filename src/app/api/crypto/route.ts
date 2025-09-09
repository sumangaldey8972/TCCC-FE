import { NextResponse } from "next/server";

export type CryptoData = {
    bitcoin: {
        usd: number;
        change: number;
    };
    ethereum: {
        usd: number;
        change: number;
    };
    lastUpdated: number;
    error?: string;
};

let cachedData: CryptoData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 1000; // 30 seconds

export async function GET() {
    const now = Date.now();

    // ✅ Serve from cache if still fresh
    if (cachedData && now - lastFetchTime < CACHE_DURATION) {
        return NextResponse.json(cachedData);
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const [btcRes, ethRes] = await Promise.all([
            fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT", {
                signal: controller.signal,
                cache: "no-store",
            }),
            fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT", {
                signal: controller.signal,
                cache: "no-store",
            }),
        ]);

        clearTimeout(timeout);

        if (!btcRes.ok || !ethRes.ok) {
            console.error("Binance API returned non-OK response", {
                btcStatus: btcRes.status,
                ethStatus: ethRes.status,
            });

            return NextResponse.json(
                {
                    bitcoin: { usd: 0, change: 0 },
                    ethereum: { usd: 0, change: 0 },
                    lastUpdated: now,
                    error: "Binance API returned non-OK status",
                },
                { status: 200 }
            );
        }

        const [btc, eth] = await Promise.all([btcRes.json(), ethRes.json()]);

        if (!btc?.lastPrice || !eth?.lastPrice) {
            console.error("Unexpected Binance API response", { btc, eth });

            return NextResponse.json(
                {
                    bitcoin: { usd: 0, change: 0 },
                    ethereum: { usd: 0, change: 0 },
                    lastUpdated: now,
                    error: "Unexpected Binance API response",
                },
                { status: 200 }
            );
        }

        cachedData = {
            bitcoin: {
                usd: parseFloat(btc.lastPrice),
                change: parseFloat(btc.priceChangePercent),
            },
            ethereum: {
                usd: parseFloat(eth.lastPrice),
                change: parseFloat(eth.priceChangePercent),
            },
            lastUpdated: now,
        };

        lastFetchTime = now;

        return NextResponse.json(cachedData);
    } catch (error: unknown) {
        // ✅ Type-safe error logging
        if (error instanceof Error) {
            console.error("Error fetching crypto prices:", error.message);
        } else {
            console.error("Unknown error fetching crypto prices:", error);
        }

        if (cachedData) {
            return NextResponse.json({
                ...cachedData,
                error: "Using cached data due to fetch error",
            });
        }

        return NextResponse.json(
            {
                bitcoin: { usd: 0, change: 0 },
                ethereum: { usd: 0, change: 0 },
                lastUpdated: now,
                error: "Failed to fetch crypto prices",
            },
            { status: 200 }
        );
    }
}
