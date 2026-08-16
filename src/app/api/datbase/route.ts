import { NextResponse } from "next/server";
import { db } from "~/server/db";

export  function POST(req: Request) {
  try {
    const body = await req.json();

    const issue = await db.issue.create({
      data: {
        title: body.title,
        category: body.category,
        description: body.description,
        address: body.address,
        date: new Date(body.date),
      },
    });

    return NextResponse.json({ success: true, issue });
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
