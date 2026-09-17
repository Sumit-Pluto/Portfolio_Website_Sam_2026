import { NextResponse } from "next/server";
import { getGithub } from "@/lib/stats";

export const revalidate = 1800;

export async function GET() {
  return NextResponse.json(await getGithub());
}
