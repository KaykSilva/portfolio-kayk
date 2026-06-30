import { AmbientAudio } from "./AmbientAudio";
import { HeroSection } from "./HeroSection";
import { PortfolioSection } from "./PortfolioSection";
import { SiteHeader } from "./SiteHeader";
import { WorldSceneClient } from "./scene/WorldSceneClient";
import styles from "../home.module.css";

export function HomePage() {
  return (
    <main className={styles.world}>
      <a className={styles.skipLink} href="#main-content">
        Ir para o conteúdo
      </a>

      <div className={styles.scene} aria-hidden="true">
        <WorldSceneClient />
      </div>
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <SiteHeader />
      <AmbientAudio />

      <div id="main-content">
        <HeroSection />
        <PortfolioSection />
      </div>
    </main>
  );
}
