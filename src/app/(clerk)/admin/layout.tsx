import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

import AdminNavbar from "@/app/(clerk)/admin/admin-navbar";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <AdminNavbar />
      {children}
    </ClerkProvider>
  );
}
