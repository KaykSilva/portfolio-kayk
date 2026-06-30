"use client";

import dynamic from "next/dynamic";

const WorldScene = dynamic(
  () => import("./WorldScene").then((module) => module.WorldScene),
  { ssr: false },
);

export function WorldSceneClient() {
  return <WorldScene />;
}
