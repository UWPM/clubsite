"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import NoiseSVG from "@/components/noise-svg";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const host = window.location.host;
    const subdomain = host.split(".")[0];
    setShowNavbar(subdomain !== "applications");
  }, []);

  return (
    <>
      <NoiseSVG />
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
