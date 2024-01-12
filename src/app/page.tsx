import prisma from "@/lib/prisma";

import JobListItem from "@/components/job-list-item";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main>
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </main>
  );
}
