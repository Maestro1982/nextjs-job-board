import { cache } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import prisma from "@/lib/prisma";

import JobDetailsPage from "@/components/job-details-page";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) return notFound();

  return job;
});

/* When a new job is created the first time someone is viewing it will take some loading time. 
   After that it will be cached for all successive users.*/
export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { isApproved: true },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug);
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.log("Job has no application link or email");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetailsPage job={job} />
      <aside>
        <Button asChild variant="custom">
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply Now
          </a>
        </Button>
      </aside>
    </main>
  );
}
