"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { del } from "@vercel/blob";

import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";

type FormState = { error?: string } | undefined;

export async function approveSubmission(
  formData: FormData,
): Promise<FormState> {
  try {
    const jobId = parseInt(formData.get("jobId") as string);
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }

    await prisma.job.update({
      where: { id: jobId },
      data: {
        isApproved: true,
      },
    });

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";

    if (error instanceof Error) {
      message = error.message;
    }

    return { error: message };
  }
}

export async function deleteJob(formData: FormData) {
  try {
    const jobId = parseInt(formData.get("jobId") as string);
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (job?.companyLogoUrl) {
      await del(job.companyLogoUrl);
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";

    if (error instanceof Error) {
      message = error.message;
    }

    return { error: message };
  }

  redirect("/admin");
}
