import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const issue = await db.issue.create({
      data: {
  title: body.title,
    type: body.type,
    description: body.description,
    address: body.address,
    latitude: body.latitude,
    longitude: body.longitude,
    reportedBy: body.reportedBy,
    date: new Date(body.date),
      },
    });

    return NextResponse.json({ success: true, issue });
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
