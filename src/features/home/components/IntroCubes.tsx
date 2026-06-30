"use client";

import { useEffect, useRef } from "react";
import styles from "../home.module.css";

export function IntroCubes() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame = 0;

    const updateProgress = () => {
      animationFrame = 0;
      if (!root.current) return;

      const viewportHeight = Math.max(window.innerHeight, 1);
      const progress = Math.min(
        Math.max(window.scrollY / (viewportHeight * 0.9), 0),
        1
      );

      root.current.style.setProperty("--cube-progress", String(progress));
      root.current.style.setProperty(
        "--cube-travel",
        `${progress * viewportHeight * 0.82}px`
      );
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className={styles.introCubeTrails}>
      {[0, 1, 2].map((cube) => (
        <div key={cube} className={styles.introCubePath}>
          <span className={styles.introCubeLine} />
          <span className={styles.introScrollCube} />
        </div>
      ))}
    </div>
  );
}
