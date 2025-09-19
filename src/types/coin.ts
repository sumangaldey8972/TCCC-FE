// types/coin.ts
export interface Coin {
    _id: number;
    name: string;
    symbol: string;
    logo: string;
    launchDate: string; // ISO string
    description: string;
    status: "upcoming" | "launched";
    ath?: string; // only for launched
    currentPrice?: string; // only for launched
    holders?: number; // only for launched
}


export interface CoinStats {
    upcoming: number,
    launched: number,
    total: number
}
