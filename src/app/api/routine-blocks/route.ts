import { db } from "@/db";
import { routineBlocks } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await db.select().from(routineBlocks);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { label, dayOfWeek, startTime, endTime, category, activeDuringSchool } = body;
  await db.insert(routineBlocks).values({ label, dayOfWeek, startTime, endTime, category, activeDuringSchool });
  return NextResponse.json({ success: true });
}
