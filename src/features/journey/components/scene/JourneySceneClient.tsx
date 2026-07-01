"use client";

import dynamic from "next/dynamic";
import type { JourneyMemory } from "../../data/memories";

const JourneyScene = dynamic(
  () => import("./JourneyScene").then((module) => module.JourneyScene),
  { ssr: false },
);

type JourneySceneClientProps = {
  activeIndex: number;
  memories: readonly JourneyMemory[];
  onSelect: (index: number) => void;
};

export function JourneySceneClient(props: JourneySceneClientProps) {
  return <JourneyScene {...props} />;
}
