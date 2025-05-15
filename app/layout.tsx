import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NoiseSVG from "@/components/noise-svg";

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
        {children}
        {/* <Footer /> */}
        {/* <DynamicScrollToTop /> */}
      </body>
    </html>
  );
}
