"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SOURCE = "/audio/ambient.mp3";
const AMBIENT_VOLUME = 0.28;

export function AmbientAudio() {
  const audio = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const player = audio.current;
    if (!player) return;

    player.volume = AMBIENT_VOLUME;

    const play = () => {
      void player.play().catch(() => {
        // Autoplay com som pode ser bloqueado até a primeira interação.
      });
    };

    play();
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("keydown", play, { once: true });

    return () => {
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
    };
  }, []);

  const toggleMute = () => {
    const player = audio.current;
    if (!player) return;

    const nextMuted = !muted;
    player.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted) {
      void player.play().catch(() => {
        // O navegador ainda pode exigir uma interação válida para reproduzir.
      });
    }
  };

  return (
    <div className="fixed right-5 top-5 z-50">
      <audio ref={audio} loop preload="auto" src={AUDIO_SOURCE} />
      <button
        type="button"
        aria-label={muted ? "Ativar trilha ambiente" : "Silenciar trilha ambiente"}
        aria-pressed={muted}
        className="grid size-10 place-items-center border border-[#5d5848] bg-[#0b0b0a]/80 text-[#d8d2b0] backdrop-blur-sm transition-colors hover:border-[#d8d2b0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8d2b0]"
        onClick={toggleMute}
      >
        <span aria-hidden="true" className="text-sm">
          {muted ? "×" : "♪"}
        </span>
      </button>
    </div>
  );
}
