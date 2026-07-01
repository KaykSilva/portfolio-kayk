import type { Metadata } from "next";
import { ContactPage } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contato | Kayk Dev",
  description: "Canais para falar com Kayk sobre projetos, oportunidades e colaborações.",
};

export default function Contact() {
  return <ContactPage />;
}
