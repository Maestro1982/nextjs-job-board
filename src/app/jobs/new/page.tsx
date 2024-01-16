import { Metadata } from "next";

import NewJobForm from "./new-job-form";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default function Page() {
  return <NewJobForm />;
}
