"use client";

import Link from "next/link";
import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

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
            onClick={() => setMenuOpen(false)}
          >
            <span>0{index + 1}</span>{label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className={styles.menuButton}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span />
      </button>
      <nav
        id="mobile-navigation"
        className={`${styles.mobileNavigation} ${menuOpen ? styles.mobileNavigationOpen : ""}`}
        aria-label="Navegação mobile"
      >
        {links.map(({ label, href }, index) => (
          <Link
            key={href}
            href={href}
            aria-current={activeLabel === label ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <span>0{index + 1}</span>
            <strong>{label}</strong>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
      </nav>
    </header>
  );
}
