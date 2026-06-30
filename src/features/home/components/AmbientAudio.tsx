"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SOURCE = "/audio/ambient.mp3";
const AMBIENT_VOLUME = 0.28;

export function AmbientAudio() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    let shouldResume = false;

    player.volume = AMBIENT_VOLUME;
    const startPlayback = () => {
      void player
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    startPlayback();
    window.addEventListener("pointerdown", startPlayback, { once: true });
    window.addEventListener("keydown", startPlayback, { once: true });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        shouldResume = !player.paused;
        player.pause();
        setPlaying(false);
        return;
      }

      if (shouldResume) {
        startPlayback();
        shouldResume = false;
      }
    };

    const stopPlayback = () => {
      player.pause();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", stopPlayback);

    return () => {
      window.removeEventListener("pointerdown", startPlayback);
      window.removeEventListener("keydown", startPlayback);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", stopPlayback);
      stopPlayback();
    };
  }, []);

  const togglePlayback = () => {
    const player = audio.current;
    if (!player) return;

    if (playing) {
      player.pause();
      setPlaying(false);
    } else {
      void player.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audio} autoPlay loop preload="auto" src={AUDIO_SOURCE} />
      <button
        type="button"
        aria-label={playing ? "Pausar paisagem sonora" : "Ativar paisagem sonora"}
        aria-pressed={playing}
        className="flex h-9 items-center gap-3 border border-white/15 bg-[#0d0d0b]/80 px-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#d8d2b0] backdrop-blur-sm transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8d2b0]"
        onClick={togglePlayback}
      >
        <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
        <span>{playing ? "Som ativo" : "Ambiente"}</span>
      </button>
    </div>
  );
}
