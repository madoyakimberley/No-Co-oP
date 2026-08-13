import { db } from "@/db";
import { skillPractice } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(skillPractice).orderBy(desc(skillPractice.loggedAt)).limit(20);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { skillType, topic, stage, passed, notes } = body;
  await db.insert(skillPractice).values({ skillType, topic, stage, passed, notes });
  return NextResponse.json({ success: true });
}
