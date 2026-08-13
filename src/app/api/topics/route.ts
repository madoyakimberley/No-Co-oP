import { db } from "@/db";
import { topics } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;
  const rows = await db.select().from(topics);
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;
  const { subjectId, name } = await req.json();
  await db.insert(topics).values({ subjectId, name });
  return NextResponse.json({ success: true });
}
