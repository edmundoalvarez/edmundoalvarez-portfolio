"use client";

import { m, useReducedMotion } from "motion/react";
import { useCallback, type ElementType, type ReactNode } from "react";
import { useSound } from "@/components/sound/sound-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

const tags = { div: m.div, article: m.article, section: m.section, aside: m.aside } as const;

type Props = {
  as?: keyof typeof tags;
  index?: number;
  /** Aparece al cargar (hero) en vez de al entrar en pantalla. */
  immediate?: boolean;
  /** Tarjeta interactiva: elevación + brillo que sigue al puntero + sonido. */
  interactive?: boolean;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

/** Tarjeta del bento: entra con fade + subida + desenfoque y, si es interactiva, reacciona al puntero. */
export function Card({ as = "div", index = 0, immediate = false, interactive = false, className = "", children, ...rest }: Props) {
  const reduce = useReducedMotion();
  const { playHover } = useSound();
  const Tag = tags[as] as ElementType;

  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" };
  const shown = reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" };
  const transition = { duration: 0.6, ease: EASE, delay: Math.min(index * 0.06, 0.4) };

  return (
    <Tag
      initial={hidden}
      {...(immediate ? { animate: shown } : { whileInView: shown, viewport: { once: true, amount: 0.15 } })}
      transition={transition}
      className={`${interactive ? "lift" : ""} ${className}`}
      {...(interactive ? { onPointerMove: onMove, onPointerEnter: playHover } : {})}
      {...rest}
    >
      {children}
    </Tag>
  );
}
