"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import styles from "../home.module.css";

const MINIMUM_DISPLAY_TIME = 1200;
const EXIT_DURATION = 600;
const MAXIMUM_WAIT_TIME = 8000;

export function HomeLoader() {
  const { active, progress, total } = useProgress();
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minimumTimer = window.setTimeout(
      () => setMinimumTimeElapsed(true),
      MINIMUM_DISPLAY_TIME,
    );
    const safetyTimer = window.setTimeout(() => setLeaving(true), MAXIMUM_WAIT_TIME);

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(() => {
    const assetsReady = !active && (total === 0 || progress >= 100);
    if (!minimumTimeElapsed || !assetsReady) return;

    const readyTimer = window.setTimeout(() => setLeaving(true), 0);
    return () => window.clearTimeout(readyTimer);
  }, [active, minimumTimeElapsed, progress, total]);

  useEffect(() => {
    if (!leaving) return;

    const exitTimer = window.setTimeout(() => setVisible(false), EXIT_DURATION);
    return () => window.clearTimeout(exitTimer);
  }, [leaving]);

  if (!visible) return null;

  const displayedProgress = leaving ? 100 : total > 0 ? Math.round(progress) : 0;

  return (
    <div
      aria-busy={!leaving}
      aria-live="polite"
      className={`${styles.loader} ${leaving ? styles.loaderLeaving : ""}`}
    >
      <div className={styles.loaderGrid} aria-hidden="true" />
      <div className={styles.loaderContent}>
        <span className={styles.loaderBrand}>KAYK.DEV</span>
        <p className={styles.loaderStatus}>
          {leaving ? "Sistema inicializado" : "Inicializando ambiente"}
        </p>
        <div className={styles.loaderTrack} aria-hidden="true">
          <span style={{ transform: `scaleX(${displayedProgress / 100})` }} />
        </div>
        <span className={styles.loaderProgress}>{displayedProgress.toString().padStart(3, "0")}%</span>
      </div>
    </div>
  );
}
