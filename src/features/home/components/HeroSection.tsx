import { GlitchText } from "./GlitchText";
import styles from "../home.module.css";

export function HeroSection() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroCoordinates} aria-hidden="true">
        <span>03°43&apos;S</span>
        <span>38°32&apos;W</span>
      </div>

      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true" />
          Creative developer · Araioses, BR
        </p>
        <h1 id="hero-title" className={styles.heroTitle}>
          <span>Construo</span>
          <span className={styles.heroTitleAccent}>
            <GlitchText text="experiências" />
          </span>
          <span>digitais.</span>
        </h1>
        <p className={styles.heroSummary}>
          Engenharia frontend, direção visual e ambientes interativos para
          transformar ideias em produtos que deixam memória.
        </p>
      </div>

      <div className={styles.heroIndex} aria-hidden="true">
        <span>001</span>
        <span className={styles.indexLine} />
        <span>PORTFOLIO / 2026</span>
      </div>

      <a className={styles.scrollCue} href="#manifesto">
        <span>Explorar sinal</span>
        <span className={styles.scrollTrack} aria-hidden="true">
          <span />
        </span>
      </a>
    </section>
  );
}
