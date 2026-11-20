"use client";

import Link from "next/link";
import { m } from "motion/react";
import type { ComponentProps } from "react";
import { useSound } from "./sound-provider";

const MotionLink = m.create(Link);

type Props = ComponentProps<"a"> & { href: string; internal?: boolean };

/** Enlace o CTA con sonido en hover/click y una leve compresión al presionar. */
export function SoundLink({ href, internal = false, onClick, onPointerEnter, children, ...rest }: Props) {
  const { playHover, playClick } = useSound();
  const external = /^https?:\/\//.test(href);
  const shared = {
    whileTap: { scale: 0.97 },
    onPointerEnter: (e: React.PointerEvent<HTMLAnchorElement>) => {
      playHover();
      onPointerEnter?.(e);
    },
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      playClick();
      onClick?.(e);
    },
  };

  if (internal) {
    return (
      <MotionLink href={href} {...shared} {...(rest as object)}>
        {children}
      </MotionLink>
    );
  }
  return (
    <m.a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...shared}
      {...(rest as object)}
    >
      {children}
    </m.a>
  );
}
