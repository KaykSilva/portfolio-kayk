import { SceneClient } from "@/components/three/SceneClient";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0a] text-[#e9e3c7]">
      <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 lg:p-20">
          <p className="mb-4 text-sm tracking-[0.4em] text-[#9b967f]">
            WEB DEVELOPER // SYSTEM ONLINE
          </p>

          <h1 className="text-5xl font-bold uppercase leading-tight">
            Portfólio interativo
            <br />
            com experiências reais
          </h1>

          <p className="mt-6 max-w-xl text-[#c9c1a0]">
            Projetos, carreira e trajetória pessoal apresentados como uma
            interface de sistema inspirada em jogos sci-fi minimalistas.
          </p>

          <div className="mt-8 flex gap-4">
            <a className="border border-[#d8d2b0] px-6 py-3" href="/projects">
              Ver projetos
            </a>
            <a className="border border-[#5d5848] px-6 py-3" href="/career">
              Minha jornada
            </a>
          </div>
        </div>

        <div className="h-[500px] lg:h-screen">
          <SceneClient />
        </div>
      </section>
    </main>
  );
}
