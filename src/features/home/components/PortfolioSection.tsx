import Link from "next/link";
import { SceneClient } from "./scene/SceneClient";
import styles from "../home.module.css";

const NAVIGATION_LINKS = [
  { href: "/projects", label: "Ver projetos", accent: true },
  { href: "/career", label: "Minha jornada", accent: false },
] as const;

export function PortfolioSection() {
  return (
    <section
      data-scroll-section
      className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2"
    >
      <div className="flex flex-col justify-center p-8 lg:p-20">
        <p className="mb-4 text-sm tracking-[0.4em] text-[#9b967f]">
          WEB DEVELOPER // SYSTEM ONLINE
        </p>

        <h2 className="text-5xl font-bold uppercase leading-tight">
          Portfólio interativo
          <br />
          com experiências reais
        </h2>

        <p className="mt-6 max-w-xl text-[#c9c1a0]">
          Projetos, carreira e trajetória pessoal apresentados como uma
          interface de sistema inspirada em jogos sci-fi minimalistas.
        </p>

        <nav aria-label="Navegação do portfólio" className="mt-8 flex gap-4">
          {NAVIGATION_LINKS.map(({ href, label, accent }) => (
            <Link
              key={href}
              className={`border px-6 py-3 ${accent ? "border-[#d8d2b0]" : "border-[#5d5848]"}`}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={`${styles.sceneEdgeFade} h-[500px] lg:h-screen`}>
        <SceneClient />
      </div>
    </section>
  );
}
