// src/app/api/check-unlock/route.ts
import { NextResponse } from "next/server";

// July 1 2026 00:00:00 WIB (UTC+7) = June 30 2026 17:00:00 UTC
const UNLOCK_DATE = new Date("2026-06-01T17:00:00.000Z");
export async function GET() {
  const now = new Date();
  const unlocked = now >= UNLOCK_DATE;
  const msLeft = Math.max(0, UNLOCK_DATE.getTime() - now.getTime());

  return NextResponse.json({
    unlocked,
    msLeft,
    unlocksAt: UNLOCK_DATE.toISOString(),
    serverTime: now.toISOString(),
  });
}
