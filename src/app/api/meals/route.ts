import { db } from "@/db";
import { meals } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(meals).orderBy(desc(meals.loggedAt)).limit(20);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { mealType, description, suggestedByAi } = body;
  await db.insert(meals).values({ mealType, description, suggestedByAi });
  return NextResponse.json({ success: true });
}
