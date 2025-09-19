import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/config/apiConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {


    try {
        const backendRes = await apiClient.get(API_ENDPOINTS.coins.stats);

        console.log("Fetching from backend URL:", API_ENDPOINTS.coins.stats);
        console.log("Coin stats data", backendRes.data);

        if (!backendRes?.data?.data) {
            return NextResponse.json(backendRes.data);
        }

        return NextResponse.json(backendRes.data, {
            status: backendRes.data.statusCode,
        });
    } catch (error) {
        console.log("Coin stats List Get API Route Error:", error);
        return NextResponse.json(
            { error: "Coin stats list fetching failed." },
            { status: 500 }
        );
    }
}
