import { db } from "@/db";
import { subjects } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await db.select().from(subjects);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, currentGrade } = body;
  await db.insert(subjects).values({ name, currentGrade });
  return NextResponse.json({ success: true });
}
