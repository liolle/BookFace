import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  backend_url: string
}

export async function GET(request: Request) {
  return NextResponse.json({
    starus:200,
    backend_url: process.env.SEVER_URL || "http://localhost:3535"
  });
}