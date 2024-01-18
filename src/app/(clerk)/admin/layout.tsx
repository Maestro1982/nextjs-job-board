import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <div className="flex h-full items-center justify-center">{children}</div>
    </ClerkProvider>
  );
}
