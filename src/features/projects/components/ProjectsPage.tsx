import { SiteHeader } from "@/shared/components/SiteHeader";
import { projects } from "../data/projects";
import { ProjectArchive } from "./ProjectArchive";
import styles from "../projects.module.css";

export function ProjectsPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#project-archive">Ir para o arquivo</a>
      <SiteHeader
        activeLabel="Projetos"
        links={[
          { href: "/#manifesto", label: "Manifesto" },
          { href: "/projects", label: "Projetos" },
          { href: "/contact", label: "Contato" },
        ]}
      />
      <ProjectArchive projects={projects} />
      <div className={styles.grain} aria-hidden="true" />
    </main>
  );
}
