import FormSubmitButton from "@/components/form-submit-button";
import { Job } from "@prisma/client";

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.isApproved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
    </aside>
  );
}

interface AdminButtonProps {
  jobId: number;
}

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
  return (
    <form>
      <input hidden id="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>
    </form>
  );
}
