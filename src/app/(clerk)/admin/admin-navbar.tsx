"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminNavbar() {
  const { user, signOut } = useClerk();
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <div className="px-3">
      <div className="m-auto flex h-10 max-w-5xl items-center justify-between gap-2">
        <Link href="/admin" className="font-semibold underline">
          Admin Dashboard
        </Link>
        <div className="space-x-2">
          <span className="font-semibold">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
          <button
            className="underline"
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
