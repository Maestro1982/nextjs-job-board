import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="my-16 flex h-full items-center justify-center">
      <SignIn />
    </div>
  );
}
