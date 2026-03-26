"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const isLarge = size === "lg";
  const containerSize = isLarge ? "h-14 w-14" : "h-11 w-11";
  const textSize = isLarge ? "text-3xl" : "text-xl";

  // Brand Lead Spring: Precision and Snappiness
  const snapSpring = { type: "spring", stiffness: 400, damping: 25 } as const;

  return (
    <div className={`flex items-center gap-4 transition-all ${className}`}>
      {/* Bespoke Brand Mark Icon */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={snapSpring}
        className={`relative ${containerSize} flex items-center justify-center rounded-2xl bg-[#DC2626] shadow-[0_12px_24px_-8px_rgba(220,38,38,0.3)] overflow-hidden`}
      >
        {/* Deep Glass Chamber */}
        <div className="absolute inset-[1.5px] rounded-[14px] bg-[#0A0A0B] flex items-center justify-center overflow-hidden">
          {/* Bespoke Abstract Rocket Mark (Custom SVG) */}
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[60%] h-[60%] text-white"
            initial="hidden"
            animate="visible"
          >
            <motion.path
              d="M12 2L14.5 9H9.5L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            />
            <motion.path
              d="M12 9V22M12 22L15 19M12 22L9 19"
              stroke="#DC2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 1, delay: 0.3, ease: "circOut" },
                },
              }}
            />
          </motion.svg>

          {/* Micro-Shimmer (Solid) */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-white/[0.03] skew-x-12"
          />
        </div>
      </motion.div>

      {/* Typographic Identity: Bypass */}
      <div className="flex flex-col">
        <motion.div
          className={`${textSize} font-black tracking-tight text-white uppercase italic leading-none flex items-baseline`}
          initial={false}
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.04, delayChildren: 0.1 },
            },
          }}
        >
          {/* "Bypass" - Ultra Black/Red */}
          <div className="flex">
            {"Bypass".split("").map((c, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 1, x: 5 },
                  visible: { opacity: 1, x: 0 },
                }}
                className={`${i % 2 === 0 ? "text-white" : "text-red-600"} font-extrabold`}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Precision Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="h-[3px] bg-red-600 mt-1 origin-left rounded-full"
        />
      </div>
    </div>
  );
}
