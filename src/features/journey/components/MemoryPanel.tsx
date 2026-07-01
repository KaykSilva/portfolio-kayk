import Link from "next/link";
import type { JourneyMemory } from "../data/memories";
import styles from "../journey.module.css";

export function MemoryPanel({ memory }: { memory: JourneyMemory }) {
  return (
    <article
      id="memory-panel"
      className={styles.memoryPanel}
      style={{ "--memory-accent": memory.scenePreset.accent } as React.CSSProperties}
    >
      <header className={styles.memoryHeader}>
        <div>
          <span>{memory.category}</span>
          <span>{memory.year}</span>
        </div>
        <p>{memory.company ?? "Registro pessoal"}</p>
        <h2>{memory.title}</h2>
        <p className={styles.memorySubtitle}>{memory.subtitle}</p>
        <p className={styles.memoryDescription}>{memory.description}</p>
      </header>

      <div className={styles.memoryDocument}>
        <section>
          <span>01 / Contexto</span>
          <p>{memory.context}</p>
        </section>
        <section>
          <span>02 / Desafio</span>
          <p>{memory.challenge}</p>
        </section>
        <section>
          <span>03 / Resposta</span>
          <p>{memory.solution}</p>
        </section>
        <section>
          <span>04 / Aprendizado</span>
          <p>{memory.learning}</p>
        </section>
        <section className={styles.memoryImpact}>
          <span>Impacto</span>
          <p>{memory.impact}</p>
        </section>
      </div>

      <footer className={styles.memoryFooter}>
        <ul aria-label="Tecnologias e temas">
          {memory.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        {memory.links.length > 0 && (
          <div className={styles.memoryLinks}>
            {memory.links.map((link) => <Link key={link.href} href={link.href}>{link.label} ↗</Link>)}
          </div>
        )}
        <p><span>Próximo registro</span>{memory.next}</p>
      </footer>
    </article>
  );
}
