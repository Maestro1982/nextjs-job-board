import * as z from "zod";

import { jobTypes, locationTypes } from "@/lib/job-types";

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: z.string().refine((value) => locationTypes.includes(value), {
      message: "Invalid location type",
    }),
    location: z
      .string()
      .max(100, { message: "Location has a maximum of 100 characters" })
      .optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    { message: "Location is required for On-site jobs", path: ["location"] },
  );

export const createJobSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title must be at least 1 character" })
      .max(100, { message: "Title has a maximum of 100 characters" }),
    type: z.string().refine((value) => jobTypes.includes(value), {
      message: "Invalid job type!",
    }),
    companyName: z
      .string()
      .min(1, { message: "Company name must be at least 1 character" })
      .max(100, { message: "Companyy name has a maximum of 100 characters" }),
    companyLogo: z
      .custom<File | undefined>()
      .refine(
        (file) =>
          !file || (file instanceof File && file.type.startsWith("image/")),
        { message: "This has to be an image file" },
      )
      .refine(
        (file) => {
          return !file || file.size < 1024 * 1024 * 2;
        },
        { message: "File must be less than 2MB" },
      ),
    description: z
      .string()
      .max(5000, { message: "Description has a maximum of 5000 characters" })
      .optional(),
    salary: z
      .string()
      .min(1, { message: "Salary must be at least 1 character" })
      .regex(/^\d+$/, { message: "Salary must be a number" })
      .max(9, { message: "Salary has a maximum of 9 digits" }),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
