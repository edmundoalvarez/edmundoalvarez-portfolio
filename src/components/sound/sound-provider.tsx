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

type ToneOptions = {
  type?: OscillatorType;
  from: number;
  to?: number;
  duration: number;
  gain: number;
  delay?: number;
  lowpass?: number;
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

  /** Tono corto: oscilador → envolvente → (filtro) → salida. */
  const tone = useCallback(
    ({ type = "sine", from, to = from, duration, gain, delay = 0, lowpass }: ToneOptions) => {
      const ctx = ctxRef.current;
      if (!enabled || !unlockedRef.current || !ctx || ctx.state !== "running" || document.hidden) return;
      const t = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(from, t);
      if (to !== from) osc.frequency.exponentialRampToValueAtTime(to, t + duration);
      amp.gain.setValueAtTime(0.0001, t);
      amp.gain.exponentialRampToValueAtTime(gain, t + 0.003);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + duration);
      let node: AudioNode = osc.connect(amp);
      if (lowpass) {
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = lowpass;
        node = amp.connect(filter);
      }
      node.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + duration + 0.02);
    },
    [enabled],
  );

  // Hover: tick casi imperceptible, estilo sistema operativo.
  const playHover = useCallback(() => {
    if (!canHoverRef.current) return;
    const now = performance.now();
    if (now - lastHoverRef.current < 90) return;
    lastHoverRef.current = now;
    tone({ type: "square", from: 3800, duration: 0.008, gain: 0.01, lowpass: 6000 });
  }, [tone]);

  // Click: doble tick (bajar y soltar), como un trackpad.
  const playClick = useCallback(() => {
    tone({ type: "square", from: 2400, duration: 0.01, gain: 0.02, lowpass: 4000 });
    tone({ type: "square", from: 1800, duration: 0.01, gain: 0.015, delay: 0.045, lowpass: 4000 });
  }, [tone]);

  const toggle = useCallback(() => writeStored(!readStored()), []);

  const api = useMemo(() => ({ enabled, toggle, playHover, playClick }), [enabled, toggle, playHover, playClick]);
  return <SoundContext.Provider value={api}>{children}</SoundContext.Provider>;
}

const noop = () => {};
export function useSound(): SoundApi {
  return useContext(SoundContext) ?? { enabled: false, toggle: noop, playHover: noop, playClick: noop };
}
