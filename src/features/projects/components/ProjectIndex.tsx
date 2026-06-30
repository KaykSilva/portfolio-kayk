import type { Project } from "../data/projects";
import styles from "../projects.module.css";

type ProjectIndexProps = {
  onSelect: (id: string) => void;
  projects: readonly Project[];
  selectedId: string;
};

export function ProjectIndex({ onSelect, projects, selectedId }: ProjectIndexProps) {
  return (
    <aside className={styles.indexPanel} aria-labelledby="archive-index-title">
      <div className={styles.panelHeading}>
        <span>INDEX / {String(projects.length).padStart(2, "0")}</span>
        <h1 id="archive-index-title">Project archive</h1>
      </div>
      <ol className={styles.projectList}>
        {projects.map((project, index) => {
          const selected = project.id === selectedId;
          return (
            <li key={project.id}>
              <button
                type="button"
                className={styles.projectTrigger}
                aria-pressed={selected}
                onClick={() => onSelect(project.id)}
              >
                <span className={styles.projectNumber}>{String(index + 1).padStart(3, "0")}</span>
                <span className={styles.projectTitle}>{project.title}</span>
                <span className={styles.projectMarker} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ol>
      <p className={styles.indexNote}>Selecione um registro para acessar suas camadas.</p>
    </aside>
  );
}
