import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import dynamic from "next/dynamic";
import NoiseSVG from "@/components/noise-svg";
import ClientLayout from "./client-layout";

const spline = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apply - UWaterloo PM",
  description: "Apply to the UWaterloo PM club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spline.className}>
        <NoiseSVG />
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
        {/* <DynamicScrollToTop /> */}
      </body>
    </html>
  );
}
