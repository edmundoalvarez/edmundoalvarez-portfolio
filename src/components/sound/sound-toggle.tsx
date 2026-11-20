"use client";

import { useSound } from "./sound-provider";

export function SoundToggle({ labelOn, labelOff }: { labelOn: string; labelOff: string }) {
  const { enabled, toggle, playClick } = useSound();
  const label = enabled ? labelOn : labelOff;

  return (
    <button
      type="button"
      onClick={() => {
        toggle();
        if (!enabled) setTimeout(playClick, 0);
      }}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/70 hover:text-ink"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
        {enabled ? (
          <>
            <path d="M15.5 9a4 4 0 0 1 0 6" />
            <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
          </>
        ) : (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        )}
      </svg>
    </button>
  );
}
