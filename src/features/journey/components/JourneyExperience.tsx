"use client";

import { useCallback, useRef, useState } from "react";
import type { JourneyMemory } from "../data/memories";
import { JourneySceneClient } from "./scene/JourneySceneClient";
import { MemoryNavigation } from "./MemoryNavigation";
import { MemoryPanel } from "./MemoryPanel";
import styles from "../journey.module.css";

type JourneyExperienceProps = {
  memories: readonly JourneyMemory[];
};

export function JourneyExperience({ memories }: JourneyExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef({ x: 0, y: 0 });
  const activeMemory = memories[activeIndex];

  const selectMemory = useCallback(
    (index: number) => {
      setActiveIndex(Math.min(Math.max(index, 0), memories.length - 1));
      if (window.matchMedia("(max-width: 760px)").matches) {
        window.requestAnimationFrame(() => {
          document.getElementById("memory-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    },
    [memories.length],
  );

  return (
    <section
      aria-label="Arquivo de memórias"
      className={styles.experience}
      onTouchStart={(event) => {
        const touch = event.changedTouches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        const touch = event.changedTouches[0];
        const deltaX = touchStart.current.x - touch.clientX;
        const deltaY = touchStart.current.y - touch.clientY;
        if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
          selectMemory(activeIndex + (deltaX > 0 ? 1 : -1));
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          selectMemory(activeIndex + 1);
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          selectMemory(activeIndex - 1);
        }
      }}
    >
      <div className={styles.scene} aria-hidden="true">
        <JourneySceneClient
          activeIndex={activeIndex}
          memories={memories}
          onSelect={selectMemory}
        />
      </div>

      <header className={styles.introduction}>
        <p><span />Arquivo de memória / {String(activeIndex + 1).padStart(2, "0")}</p>
        <h1>Minha<br /><em>jornada</em></h1>
        <p className={styles.introCopy}>
          Não uma linha do tempo. Um corredor de decisões, descobertas e mudanças que ainda permanece aberto.
        </p>
      </header>

      <MemoryPanel key={activeMemory.id} memory={activeMemory} />
      <MemoryNavigation
        activeIndex={activeIndex}
        memories={memories}
        onSelect={selectMemory}
      />

      <div className={styles.sceneReadout} aria-hidden="true">
        <span>MEM/{activeMemory.id.slice(-3)}</span>
        <span>DEPTH {String((activeIndex + 1) * 740).padStart(4, "0")}</span>
      </div>
    </section>
  );
}
