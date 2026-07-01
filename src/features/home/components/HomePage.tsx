import { SiteHeader } from "@/shared/components/SiteHeader";
import { HeroSection } from "./HeroSection";
import { HomeLoader } from "./HomeLoader";
import { PortfolioSection } from "./PortfolioSection";
import { WorldSceneClient } from "./scene/WorldSceneClient";
import styles from "../home.module.css";

export function HomePage() {
  return (
    <main className={styles.world}>
      <HomeLoader />
      <a className={styles.skipLink} href="#main-content">
        Ir para o conteúdo
      </a>

      <div className={styles.scene} aria-hidden="true">
        <WorldSceneClient />
      </div>
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <SiteHeader
        brandHref="#home"
        links={[
          { href: "#manifesto", label: "Manifesto" },
          { href: "/projects", label: "Projetos" },
          { href: "/contact", label: "Contato" },
        ]}
      />
      <div id="main-content">
        <HeroSection />
        <PortfolioSection />
      </div>
    </main>
  );
}
