import Image from "next/image";
import type { Project } from "../data/projects";
import styles from "../projects.module.css";

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <article className={styles.details} aria-labelledby={`${project.id}-title`}>
      <header className={styles.detailsHeader}>
        <div className={styles.detailsTopline}>
          <div className={styles.projectMeta}>
            <span>{project.category}</span>
            <span>{project.year}</span>
            <span>{project.status}</span>
          </div>
          {(project.github || project.demo) && (
            <div className={styles.headerLinks} aria-label="Links do projeto">
              {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
              {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Ver projeto ↗</a>}
            </div>
          )}
        </div>
        <p>{project.subtitle}</p>
        <h2 id={`${project.id}-title`}>{project.title}</h2>
        <p className={styles.description}>{project.description}</p>
      </header>

      <div className={styles.narrativeGrid}>
        <section>
          <span className={styles.recordLabel}>01 / Problema</span>
          <p>{project.challenge}</p>
        </section>
        <section>
          <span className={styles.recordLabel}>02 / Resposta</span>
          <p>{project.solution}</p>
        </section>
      </div>

      <section className={styles.architecture}>
        <span className={styles.recordLabel}>03 / Arquitetura</span>
        <p>{project.architecture}</p>
      </section>

      <div className={styles.technicalGrid}>
        <section>
          <span className={styles.recordLabel}>Tecnologias</span>
          <ul className={styles.tagList}>
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </section>
        <section>
          <span className={styles.recordLabel}>Meu papel</span>
          <p>{project.role}</p>
        </section>
      </div>

      <section className={styles.learnings}>
        <span className={styles.recordLabel}>04 / Aprendizados</span>
        <p>{project.learnings}</p>
      </section>

      <section className={styles.visualRecords} aria-labelledby={`${project.id}-visuals`}>
        <div>
          <span className={styles.recordLabel}>05 / Registros visuais</span>
          <h3 id={`${project.id}-visuals`}>Screenshots</h3>
        </div>
        {project.images.length > 0 ? (
          <div className={styles.imageGrid}>
            {project.images.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 760px) 90vw, 36vw"
              />
            ))}
          </div>
        ) : (
          <div className={styles.noVisuals}>
            <span aria-hidden="true" />
            Registro visual em processamento
          </div>
        )}
      </section>

      <footer className={styles.projectFooter}>
        <span>{project.stack.join(" · ")}</span>
      </footer>
    </article>
  );
}
