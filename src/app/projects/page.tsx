import type { Metadata } from "next";
import { ProjectsPage } from "@/features/projects";

export const metadata: Metadata = {
  title: "Project Archive — Kayk Dev",
  description: "Projetos selecionados, decisões de arquitetura e registros de desenvolvimento.",
};

export default function ProjectsRoute() {
  return <ProjectsPage />;
}
