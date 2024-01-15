import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";

import { jobTypes } from "@/lib/job-types";
import { jobFilterSchema } from "@/lib/validation";

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { query, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }), // .trim() removes the white spaces from the input
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/${searchParams.toString()}`);
}

export default async function JobFilterSidebar() {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { isApproved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="query">Search</Label>
            <Input
              id="query"
              name="query"
              placeholder="Title, company, etc..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-green-300"
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button type="submit" className="w-full">
            Filter jobs
          </Button>
        </div>
      </form>
    </aside>
  );
}
