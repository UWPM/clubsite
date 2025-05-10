"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <nav className="border">
      <div className="container flex px-4 md:hidden">
        <Sheet>
          <SheetTrigger className="md:hidden" asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex h-full flex-col items-center justify-center">
            <Link href="/home">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/events">Events</Link>
          </SheetContent>
        </Sheet>
      </div>
      <div className="fixed bottom-12 left-1/2 z-[10] mx-auto -translate-x-1/2 rounded-full bg-secondary/60 shadow-lg backdrop-blur-sm transition duration-300 ease-in-out hover:border-accent-foreground">
        <ul className="flex gap-1 p-1">
          <Link href="/home">
            <li
              className={`rounded-full px-4 py-2 transition duration-200 ease-in-out hover:bg-accent-foreground/60 hover:text-primary-foreground ${currentPath === "/home" ? "bg-accent-foreground text-primary-foreground" : ""}`}
            >
              Home
            </li>
          </Link>
          <Link href="/about">
            <li
              className={`rounded-full px-4 py-2 transition duration-200 ease-in-out hover:bg-accent-foreground/60 hover:text-primary-foreground ${currentPath === "/about" ? "bg-accent-foreground text-primary-foreground" : ""}`}
            >
              About
            </li>
          </Link>
          <Link href="/events">
            <li
              className={`rounded-full px-4 py-2 transition duration-200 ease-in-out hover:bg-accent-foreground/60 hover:text-primary-foreground ${currentPath === "/events" ? "bg-accent-foreground text-primary-foreground" : ""}`}
            >
              Events
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
