"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";

/**
 * Sonidos de interfaz sintetizados con Web Audio (sin archivos ni dependencias).
 * Encendidos por defecto; la elección del visitante se recuerda en localStorage.
 * El AudioContext se crea recién con el primer gesto del usuario (política de autoplay).
 */

type SoundApi = {
  enabled: boolean;
  toggle: () => void;
  playHover: () => void;
  playClick: () => void;
};

const SoundContext = createContext<SoundApi | null>(null);
const STORAGE_KEY = "ea-sound";

/* Preferencia guardada como mini store externo (localStorage), leída con useSyncExternalStore. */
const listeners = new Set<() => void>();
let memory = true; // respaldo si localStorage no está disponible

function readStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return memory;
  }
}

function writeStored(value: boolean) {
  memory = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(subscribe, readStored, () => true);
  const ctxRef = useRef<AudioContext | null>(null);
  const unlockedRef = useRef(false);
  const lastHoverRef = useRef(0);
  const canHoverRef = useRef(false);

  useEffect(() => {
    canHoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const unlock = () => {
      unlockedRef.current = true;
      if (!ctxRef.current) {
        const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (Ctor) ctxRef.current = new Ctor();
      }
      void ctxRef.current?.resume();
    };
    window.addEventListener("pointerdown", unlock, { once: true, capture: true });
    window.addEventListener("keydown", unlock, { once: true, capture: true });
    return () => {
      window.removeEventListener("pointerdown", unlock, { capture: true });
      window.removeEventListener("keydown", unlock, { capture: true });
    };
  }, []);

  const tone = useCallback(
    (type: OscillatorType, from: number, to: number, duration: number, gain: number) => {
      const ctx = ctxRef.current;
      if (!enabled || !unlockedRef.current || !ctx || ctx.state !== "running" || document.hidden) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(from, now);
      osc.frequency.exponentialRampToValueAtTime(to, now + duration);
      amp.gain.setValueAtTime(0.0001, now);
      amp.gain.exponentialRampToValueAtTime(gain, now + 0.006);
      amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(amp).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    },
    [enabled],
  );

  const playHover = useCallback(() => {
    if (!canHoverRef.current) return;
    const t = performance.now();
    if (t - lastHoverRef.current < 90) return;
    lastHoverRef.current = t;
    tone("sine", 1800, 1200, 0.045, 0.025);
  }, [tone]);

  const playClick = useCallback(() => tone("triangle", 620, 280, 0.08, 0.07), [tone]);

  const toggle = useCallback(() => writeStored(!readStored()), []);

  const api = useMemo(() => ({ enabled, toggle, playHover, playClick }), [enabled, toggle, playHover, playClick]);
  return <SoundContext.Provider value={api}>{children}</SoundContext.Provider>;
}

const noop = () => {};
export function useSound(): SoundApi {
  return useContext(SoundContext) ?? { enabled: false, toggle: noop, playHover: noop, playClick: noop };
}
