import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

import JobDetailsPage from "@/components/job-details-page";

import AdminSidebar from "./admin-sidebar";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetailsPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}
