import { SiteHeader } from "@/shared/components/SiteHeader";
import { contactChannels } from "../data/channels";
import styles from "../contact.module.css";

export function ContactPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#contact-channels">
        Ir para os canais de contato
      </a>
      <SiteHeader
        activeLabel="Contato"
        links={[
          { href: "/journey", label: "Jornada" },
          { href: "/projects", label: "Projetos" },
          { href: "/contact", label: "Contato" },
        ]}
      />

      <div className={styles.signal} aria-hidden="true">
        <span /><span /><span />
        <i />
      </div>
      <div className={styles.grid} aria-hidden="true" />

      <section className={styles.content} aria-labelledby="contact-title">
        <header className={styles.introduction}>
          <p><span />Canal aberto / 2026</p>
          <h1 id="contact-title">Iniciar<br /><em>transmissão</em></h1>
          <p className={styles.summary}>
            Tem um projeto, uma oportunidade ou uma ideia ainda sem forma? Escolha um canal. Eu respondo assim que o sinal chegar.
          </p>
          <div className={styles.availability}>
            <i aria-hidden="true" />
            Disponível para projetos e colaborações
          </div>
        </header>

        <div id="contact-channels" className={styles.channels}>
          <div className={styles.channelHeader} aria-hidden="true">
            <span>Canal</span><span>Identificação</span><span>Status</span>
          </div>
          <ul>
            {contactChannels.map((channel, index) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noreferrer" : undefined}
                  className={channel.primary ? styles.primaryChannel : undefined}
                >
                  <span className={styles.channelIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.channelIdentity}>
                    <strong>{channel.label}</strong>
                    <small>{channel.value}</small>
                  </span>
                  <span className={styles.channelStatus}>{channel.primary ? "Prioritário" : "Online"}</span>
                  <span className={styles.channelArrow} aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <footer className={styles.contactFooter}>
            <span>Araioses · Maranhão · Brasil</span>
            <span>UTC−03:00</span>
          </footer>
        </div>
      </section>

      <div className={styles.grain} aria-hidden="true" />
    </main>
  );
}
