import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobResults from "@/components/job-results";

import H1 from "@/components/ui/h1";

import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { query, type, location, remote },
}: PageProps) {
  const filterValues: JobFilterValues = {
    query,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
