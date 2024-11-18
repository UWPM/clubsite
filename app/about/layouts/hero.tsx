"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const paddingProgress = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["0px", "96px"],
  );
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 64]);

  return (
    <header ref={targetRef}>
      <div className="flex items-center justify-between px-24 py-24">
        <h2>About us</h2>
        <p className="text-2xl font-semibold">
          Fostering the creative product management <br /> community @UWaterloo.
        </p>
      </div>
      <motion.div
        style={{
          paddingInline: paddingProgress,
        }}
        className="relative h-[900px] w-full"
      >
        <motion.div
          className="relative h-full w-full overflow-hidden"
          style={{
            borderRadius: borderRadius,
          }}
        >
          <Image
            alt="UWPM Students"
            src="/images/about-us/club-members.jpg"
            fill
            className="object-cover brightness-[25%]"
          />
        </motion.div>
      </motion.div>
    </header>
  );
}
