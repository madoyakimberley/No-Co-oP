import { db } from "@/db";
import { skillPractice } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { eq, desc, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;
  const rows = await db.select().from(skillPractice)
    .where(eq(skillPractice.skillType, "drawing"))
    .orderBy(desc(skillPractice.loggedAt))
    .limit(30);
  return NextResponse.json(rows);
}
