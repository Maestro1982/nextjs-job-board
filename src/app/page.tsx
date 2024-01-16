import { Metadata } from "next";

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

function getTitle({ query, type, location, remote }: JobFilterValues) {
  const titlePrefix = query
    ? `${query} jobs`
    : type
      ? `${type} jobs`
      : remote
        ? "Remote jobs"
        : "All jobs";
  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

/* Generate dynamic metadata */
export function generateMetadata({
  searchParams: { query, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      query,
      type,
      location,
      remote: remote === "true",
    })} | IT-Jobs`,
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
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
