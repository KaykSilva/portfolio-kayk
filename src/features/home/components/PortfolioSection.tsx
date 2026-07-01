import styles from "../home.module.css";

const CHAPTERS = [
  {
    number: "01",
    title: "Projetos",
    text: "Produtos digitais tratados como artefatos: contexto, decisões, arquitetura e resultado.",
    href: "/projects",
    status: "Arquivo em construção",
  },
  {
    number: "02",
    title: "Jornada",
    text: "Os sistemas, encontros e aprendizados que formaram minha maneira de construir.",
    href: "/journey",
    status: "Arquivo disponível",
  },
  {
    number: "03",
    title: "Laboratório",
    text: "Experimentos com WebGL, interfaces, inteligência artificial e novas formas de interação.",
    href: "#lab",
    status: "Sinal em construção",
  },
] as const;

export function PortfolioSection() {
  return (
    <>
      <section id="manifesto" className={styles.manifesto} aria-labelledby="manifesto-title">
        <div className={styles.sectionLabel}>
          <span>002</span>
          <span>Manifesto</span>
        </div>
        <div className={styles.manifestoBody}>
          <p className={styles.eyebrow}>Entre lógica e atmosfera</p>
          <h2 id="manifesto-title">
            Código preciso.
            <br />
            Experiências <em>humanas.</em>
          </h2>
          <div className={styles.manifestoCopy}>
            <p>
              Acredito em tecnologia que não pede atenção — ela a conquista.
              Crio interfaces onde performance, clareza e expressão visual
              trabalham como um único sistema.
            </p>
            <p>
              Cada projeto é uma investigação: entender o problema, remover o
              ruído e encontrar a forma mais honesta de dar vida à ideia.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className={styles.chapters} aria-labelledby="chapters-title">
        <div className={styles.sectionLabel}>
          <span>003</span>
          <span>Índice</span>
        </div>
        <div className={styles.chapterContent}>
          <p className={styles.eyebrow}>Registros disponíveis</p>
          <h2 id="chapters-title" className={styles.visuallyHidden}>Seções do portfólio</h2>
          <div className={styles.chapterList}>
            {CHAPTERS.map((chapter) => (
              <a key={chapter.number} href={chapter.href} className={styles.chapter}>
                <span className={styles.chapterNumber}>{chapter.number}</span>
                <span className={styles.chapterMain}>
                  <strong>{chapter.title}</strong>
                  <span>{chapter.text}</span>
                </span>
                <span className={styles.chapterStatus}>{chapter.status}</span>
                <span className={styles.chapterArrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Kayk — Creative Developer</p>
        <p>Araioses · Brasil · 2026</p>
        <a href="mailto:contato@kayk.dev">Iniciar conversa ↗</a>
      </footer>
    </>
  );
}
