"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

/**
 * Single app-wide LazyMotion (code-split animation features for `m.` components)
 * plus MotionConfig so all framer-motion animations respect prefers-reduced-motion.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
