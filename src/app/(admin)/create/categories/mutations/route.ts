import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log(req.body)
    return NextResponse.json({ msg: "i m calling ..." })
}

export async function POST(req: NextRequest) {
    console.log(req.body)
    return NextResponse.json({ msg: "data reviced." })
}