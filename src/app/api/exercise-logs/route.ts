import { db } from "@/db";
import { exerciseLogs } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  const logs = await db.select().from(exerciseLogs).orderBy(desc(exerciseLogs.loggedAt)).limit(20);
  return NextResponse.json(logs);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { exerciseName, sets, reps, sessionType } = body;
  await db.insert(exerciseLogs).values({ exerciseName, sets, reps, sessionType });
  return NextResponse.json({ success: true });
}
