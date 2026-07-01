import { AmbientAudio } from "@/shared/components/AmbientAudio";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { memories } from "../data/memories";
import { JourneyExperience } from "./JourneyExperience";
import styles from "../journey.module.css";

export function JourneyPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#memory-panel">
        Ir para a memória selecionada
      </a>
      <SiteHeader
        activeLabel="Jornada"
        links={[
          { href: "/#manifesto", label: "Manifesto" },
          { href: "/journey", label: "Jornada" },
          { href: "/projects", label: "Projetos" },
        ]}
      />
      <JourneyExperience memories={memories} />
      <AmbientAudio />
      <div className={styles.grain} aria-hidden="true" />
    </main>
  );
}
