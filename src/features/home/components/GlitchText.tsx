"use client";

import { useEffect, useState } from "react";
import styles from "../home.module.css";

const GLITCH_CHARACTERS = "01#%/\\[]{}<>_+-";

export function GlitchText({ text }: { text: string }) {
  const [output, setOutput] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionTimer = window.setTimeout(() => {
        setOutput(text);
        setComplete(true);
      }, 0);

      return () => window.clearTimeout(reducedMotionTimer);
    }

    let step = 0;
    const cyclesPerLetter = 4;
    const timer = window.setInterval(() => {
      const revealedLetters = Math.floor(step / cyclesPerLetter);

      if (revealedLetters >= text.length) {
        setOutput(text);
        setComplete(true);
        window.clearInterval(timer);
        return;
      }

      const glitchCharacter =
        GLITCH_CHARACTERS[(step * 7 + revealedLetters * 3) % GLITCH_CHARACTERS.length];

      setOutput(text.slice(0, revealedLetters) + glitchCharacter);
      step += 1;
    }, 65);

    return () => window.clearInterval(timer);
  }, [text]);

  return (
    <span
      aria-hidden="true"
      className={`${styles.glitchWriting} ${complete ? styles.isComplete : ""}`}
      data-text={output}
    >
      {output}
      <span className={styles.glitchCaret} />
    </span>
  );
}
