"use client";

import dynamic from "next/dynamic";
import type { ProjectScenePreset } from "../../data/projects";

const ProjectScene = dynamic(
  () => import("./ProjectScene").then((module) => module.ProjectScene),
  { ssr: false },
);

export function ProjectSceneClient({ preset }: { preset: ProjectScenePreset }) {
  return <ProjectScene preset={preset} />;
}
