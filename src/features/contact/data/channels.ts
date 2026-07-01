export type ContactChannel = {
  external: boolean;
  href: string;
  id: string;
  label: string;
  primary: boolean;
  value: string;
};

export const contactChannels = [
  {
    id: "email",
    label: "E-mail",
    value: "kayksilva489@gmail.com",
    href: "mailto:kayksilva489@gmail.com",
    external: false,
    primary: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+55 (98) 98189-5794",
    href: "https://wa.me/5598981895794",
    external: true,
    primary: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@kayk.blr",
    href: "https://instagram.com/kayk.blr",
    external: true,
    primary: false,
  },
  {
    id: "github",
    label: "GitHub",
    value: "KaykSilva",
    href: "https://github.com/KaykSilva",
    external: true,
    primary: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "KaykSilva",
    href: "https://linkedin.com/in/kayksilva",
    external: true,
    primary: false,
  },
] as const satisfies readonly ContactChannel[];
