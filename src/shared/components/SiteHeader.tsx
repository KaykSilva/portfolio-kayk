import Link from "next/link";
import styles from "./site-header.module.css";

export type SiteNavigationLink = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  activeLabel?: string;
  brandHref?: string;
  links: readonly SiteNavigationLink[];
};

export function SiteHeader({
  activeLabel,
  brandHref = "/",
  links,
}: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href={brandHref} aria-label="Kayk Dev — início">
        <span className={styles.brandMark} aria-hidden="true"><i /></span>
        <span>KAYK DEV</span>
      </Link>
      <nav aria-label="Navegação principal">
        {links.map(({ label, href }, index) => (
          <Link
            key={href}
            href={href}
            aria-current={activeLabel === label ? "page" : undefined}
          >
            <span>0{index + 1}</span>{label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
