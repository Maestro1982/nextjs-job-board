import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/logo.png";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="IT-Jobs logo" width={75} height={75} />
          <span className="text-2xl font-bold tracking-tight text-green-500">
            IT-Jobs
          </span>
        </Link>
        <Button asChild variant="custom">
          <Link href="/jobs/new">Post a job</Link>
        </Button>
      </nav>
    </header>
  );
}
