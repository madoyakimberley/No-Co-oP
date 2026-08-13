import { db } from "@/db";
import { exerciseLogs } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { checkAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const logs = await db.select().from(exerciseLogs).orderBy(desc(exerciseLogs.loggedAt)).limit(20);
  return NextResponse.json(logs);
}

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const { exerciseName, sets, reps, sessionType } = body;
  if (!exerciseName || !sets || !reps || !sessionType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  await db.insert(exerciseLogs).values({ exerciseName, sets, reps, sessionType });
  return NextResponse.json({ success: true });
}
