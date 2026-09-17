import { NextResponse } from "next/server";
import { getCodeforces } from "@/lib/stats";

export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(await getCodeforces());
}
