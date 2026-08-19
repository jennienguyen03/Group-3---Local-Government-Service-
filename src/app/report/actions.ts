"use server";

import { db } from "~/server/db";
import { auth } from "~/server/auth/config";
import { revalidatePath } from "next/cache";

export type ReportIssueInput = {
  title: string;
  type: string;
  description: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  photos: { fileName: string; dataUrl: string }[];
};

export async function createReport(input: ReportIssueInput) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "You must be logged in to report an issue." };
  }

  if (!input.title.trim()) {
    return { success: false, error: "Please enter a title." };
  }
  if (!input.type) {
    return { success: false, error: "Please select a category." };
  }
  if (!input.address.trim() && (input.latitude === null || input.longitude === null)) {
    return { success: false, error: "Please enter an address or use your location." };
  }

  const issue = await db.issue.create({
    data: {
      title: input.title.trim(),
      description: input.description.trim(),
      type: input.type as
        | "POTHOLE"
        | "GRAFFITI"
        | "ILLEGAL_DUMPING"
        | "DAMAGED_PLAYGROUND_EQUIPMENT"
        | "BROKEN_STREETLIGHT"
        | "OVERGROWN_VEGETATION"
        | "WATER_LEAK"
        | "FOOTPATH_DAMAGE"
        | "OTHER",
      address: input.address.trim() || null,
      latitude: input.latitude ?? 0,
      longitude: input.longitude ?? 0,
      reportedById: session.user.id,
    },
  });

  if (input.photos.length > 0) {
    await db.attachment.createMany({
      data: input.photos.map((p) => ({
        issueId: issue.id,
        fileName: p.fileName,
        url: p.dataUrl,
      })),
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}