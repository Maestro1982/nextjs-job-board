import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="my-10 flex h-full items-center justify-center">
      <SignUp />
    </div>
  );
}
