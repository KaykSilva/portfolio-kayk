"use client";

import { useCallback, useDeferredValue, useMemo, useRef, useState, type CSSProperties } from "react";
import type { Project } from "../data/projects";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectIndex } from "./ProjectIndex";
import { ProjectSceneClient } from "./scene/ProjectSceneClient";
import styles from "../projects.module.css";

type ProjectArchiveProps = {
  projects: readonly Project[];
};

export function ProjectArchive({ projects }: ProjectArchiveProps) {
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? "");
  const detailsViewport = useRef<HTMLDivElement>(null);
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? projects[0],
    [projects, selectedId],
  );
  const sceneProject = useDeferredValue(selectedProject);
  const selectProject = useCallback((id: string) => {
    setSelectedId(id);
    window.requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 760px)").matches) {
        detailsViewport.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        detailsViewport.current?.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }, []);

  if (!selectedProject || !sceneProject) return null;

  return (
    <section
      id="project-archive"
      className={styles.archive}
      style={{ "--project-accent": selectedProject.themeColor } as CSSProperties}
      aria-label="Arquivo de projetos"
    >
      <ProjectIndex
        projects={projects}
        selectedId={selectedProject.id}
        onSelect={selectProject}
      />

      <div ref={detailsViewport} className={styles.detailsViewport} aria-live="polite" aria-atomic="true">
        <ProjectDetails key={selectedProject.id} project={selectedProject} />
      </div>

      <aside className={styles.scenePanel} aria-label="Visualização atmosférica do projeto">
        <ProjectSceneClient preset={sceneProject.scenePreset} />
        <div className={styles.sceneHud} aria-hidden="true">
          <span>SCENE / {sceneProject.scenePreset.formation.toUpperCase()}</span>
          <span>{String(sceneProject.scenePreset.particleCount).padStart(4, "0")} SIGNALS</span>
        </div>
      </aside>
    </section>
  );
}
