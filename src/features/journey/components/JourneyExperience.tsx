"use client";

import { useCallback, useState } from "react";
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
  const activeMemory = memories[activeIndex];

  const selectMemory = useCallback(
    (index: number) => {
      setActiveIndex(Math.min(Math.max(index, 0), memories.length - 1));
    },
    [memories.length],
  );

  return (
    <section
      aria-label="Arquivo de memórias"
      className={styles.experience}
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
