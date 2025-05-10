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
    const path = window.location.pathname.split("/").filter(Boolean).pop();
    const hideNavbarPaths = ["dashboard", "hidden-login", "apply"];
    setShowNavbar(!hideNavbarPaths.includes(path || ""));
  }, []);

  return (
    <>
      <NoiseSVG />
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
