import { NextRequest, NextResponse } from "next/server";

export function checkAuth(req: NextRequest) {
  const key = req.headers.get("x-api-key");
  if (key !== process.env.APP_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
