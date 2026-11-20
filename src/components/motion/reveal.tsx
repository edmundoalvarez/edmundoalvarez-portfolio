"use client";

import { m, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { useSound } from "@/components/sound/sound-provider";

const EASE = [0.22, 1, 0.36, 1] as const;

const tags = { div: m.div, article: m.article, section: m.section, aside: m.aside } as const;

type Props = {
  as?: keyof typeof tags;
  index?: number;
  /** Aparece al cargar (hero) en vez de al entrar en pantalla. */
  immediate?: boolean;
  /** Tarjeta interactiva: el contenedor se eleva al hacer hover + sonido. */
  interactive?: boolean;
  /** Fracción visible necesaria para aparecer (0 = apenas asoma, útil en carruseles). */
  amount?: number;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

/** Tarjeta del bento: entra con fade + subida + desenfoque y, si es interactiva, reacciona al puntero. */
export function Card({ as = "div", index = 0, immediate = false, interactive = false, amount = 0.15, className = "", children, ...rest }: Props) {
  const reduce = useReducedMotion();
  const { playHover } = useSound();
  const Tag = tags[as] as ElementType;


  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" };
  const shown = reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" };
  const transition = { duration: 0.6, ease: EASE, delay: Math.min(index * 0.06, 0.4) };

  return (
    <Tag
      initial={hidden}
      {...(immediate ? { animate: shown } : { whileInView: shown, viewport: { once: true, amount } })}
      transition={transition}
      className={`${interactive ? "lift" : ""} ${className}`}
      {...(interactive ? { onPointerEnter: playHover } : {})}
      {...rest}
    >
      {children}
    </Tag>
  );
}
