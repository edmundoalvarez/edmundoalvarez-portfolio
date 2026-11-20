"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";
import { SoundProvider } from "@/components/sound/sound-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SoundProvider>{children}</SoundProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
