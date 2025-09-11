import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/config/apiConfig";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    console.log("<<<<<<===== hit ======>>>>")

    try {

        const payload = await req.json();

        console.log("wallet add payload", payload);

        const backendRes = await apiClient.post(API_ENDPOINTS.wallets.add, payload)

        console.log("Fetching from backend URL", API_ENDPOINTS.wallets.add)
        console.log("Wallet Create Response ===> Backen", backendRes?.data)


        if (!backendRes?.data) {
            return NextResponse.json(backendRes.data)
        }

        return NextResponse.json(backendRes.data, {
            status: backendRes.data.statusCode
        })

    } catch (error) {
        console.log("Wallet add API Route Error", error);
        return NextResponse.json(
            { error: "POC creation failed" },
            { status: 500 }
        )
    }
}