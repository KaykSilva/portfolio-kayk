import styles from "../home.module.css";

const LINKS = [
  ["Manifesto", "#manifesto"],
  ["Projetos", "#projects"],
  ["Contato", "mailto:contato@kayk.dev"],
] as const;

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#home" aria-label="Kayk — início">
        <span className={styles.brandMark} aria-hidden="true"><i /></span>
        <span>KAYK DEV</span>
      </a>
      <nav aria-label="Navegação principal">
        {LINKS.map(([label, href], index) => (
          <a key={href} href={href}>
            <span>0{index + 1}</span>{label}
          </a>
        ))}
      </nav>
    </header>
  );
}
