import { NextResponse } from "next/server";
import { getGithubContributions } from "@/lib/stats";

export const revalidate = 3600;

export async function GET(request) {
  const y = Number(new URL(request.url).searchParams.get("y")) || undefined;
  return NextResponse.json(await getGithubContributions(y));
}
