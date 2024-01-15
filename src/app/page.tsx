import prisma from "@/lib/prisma";

import JobListItem from "@/components/job-list-item";
import JobFilterSidebar from "@/components/job-filter-sidebar";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer jobs
        </h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar />
        <div className="grow space-y-4">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}
