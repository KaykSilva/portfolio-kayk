import type { Metadata } from "next";
import { JourneyPage } from "@/features/journey";

export const metadata: Metadata = {
  title: "Minha jornada | Kayk Dev",
  description: "Um arquivo de memórias sobre a evolução de Kayk como desenvolvedor.",
};

export default function Journey() {
  return <JourneyPage />;
}
