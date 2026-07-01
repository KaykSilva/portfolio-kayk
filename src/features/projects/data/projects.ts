export type ProjectScenePreset = {
  accent: string;
  cameraX: number;
  cameraY: number;
  formation: "archive" | "column" | "orbit" | "scatter";
  particleCount: number;
};

export type ProjectImage = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

export type Project = {
  architecture: string;
  category: string;
  challenge: string;
  demo: string | null;
  description: string;
  featured: boolean;
  github: string | null;
  id: string;
  images: readonly ProjectImage[];
  learnings: string;
  role: string;
  scenePreset: ProjectScenePreset;
  slug: string;
  solution: string;
  stack: readonly string[];
  status: "Em evolução" | "Entregue" | "Experimental";
  subtitle: string;
  technologies: readonly string[];
  themeColor: string;
  title: string;
  year: string;
};

export const projects = [
  {
    id: "project-001",
    slug: "dashmed",
    title: "DashMed",
    subtitle: "Inteligência operacional para saúde",
    description: "Uma experiência de gestão que transforma sinais complexos em decisões claras, rápidas e rastreáveis.",
    challenge: "Organizar grande volume de informação clínica e operacional sem aumentar a carga cognitiva de quem decide.",
    solution: "Uma interface orientada por hierarquia, contexto e estados críticos, desenhada para revelar primeiro o que exige ação.",
    technologies: ["React", "Vite", "Ant Design", "CSS", "TypeScript", "Node.js", "Express", "MySQL", "Prisma"],
    stack: ["Frontend", "REST APIs", "Data Visualization"],
    architecture: "Frontend React integrado a serviços Node e Express, com persistência em MySQL através do Prisma.",
    role: "Frontend Developer",
    year: "2025",
    images: [
      {
        src: "/images/dashmed/01.jpg",
        alt: "Dashboard principal do DashMed com indicadores operacionais",
        width: 1884,
        height: 946,
      },
      {
        src: "/images/dashmed/02..jpg",
        alt: "Visualização analítica de dados na plataforma DashMed",
        width: 1910,
        height: 956,
      },
      {
        src: "/images/dashmed/03.jpg",
        alt: "Interface de acompanhamento e gestão do DashMed",
        width: 1879,
        height: 944,
      },
      {
        src: "/images/dashmed/04.jpg",
        alt: "Detalhes de registros operacionais no DashMed",
        width: 1880,
        height: 947,
      },
    ],
    github: null,
    demo: "https://dashmed.ia.br/",
    status: "Em evolução",
    category: "Healthtech",
    featured: true,
    themeColor: "#d8d2b0",
    learnings: "Equilibrar densidade de dados, acessibilidade e velocidade de leitura em fluxos de alta responsabilidade.",
    scenePreset: { accent: "#d8d2b0", cameraX: 0.35, cameraY: 0.12, formation: "column", particleCount: 620 },
  },
  {
    id: "project-002",
    slug: "masilentes",
    title: "Masi Lentes",
    subtitle: "Comércio digital com foco em clareza",
    description: "Um e-commerce atualmente em desenvolvimento, construído para reduzir fricção entre descoberta e decisão.",
    challenge: "Apresentar variações técnicas de produto sem transformar a compra em uma ficha técnica intimidante.",
    solution: "Conteúdo progressivo, comparação contextual e uma arquitetura visual que preserva confiança em cada etapa.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Testes automatizados"],
    stack: ["E-commerce", "Full Stack", "Automated Testing"],
    architecture: "Aplicação Next.js com dados modelados no Prisma, persistência PostgreSQL e testes protegendo os fluxos centrais.",
    role: "Desenvolvedor Full Stack",
    year: "2025",
    images: [],
    github: null,
    demo: null,
    status: "Em evolução",
    category: "E-commerce",
    featured: true,
    themeColor: "#b8c2ba",
    learnings: "Como conduzir escolhas complexas com microcopy, ritmo visual e feedback sem sobrecarregar a interface.",
    scenePreset: { accent: "#b8c2ba", cameraX: -0.3, cameraY: 0.2, formation: "orbit", particleCount: 540 },
  },
  {
    id: "project-003",
    slug: "integra-digital",
    title: "Integra Digital",
    subtitle: "Primeiro estágio, primeiro SaaS",
    description: "Minha primeira experiência profissional em um SaaS multitenant construído com Laravel e PHP.",
    challenge: "Compreender uma aplicação existente e preservar o isolamento de dados entre diferentes clientes.",
    solution: "Leitura do fluxo completo, uso do Eloquent e testes automatizados para validar mudanças com segurança.",
    technologies: ["Laravel", "PHP", "Eloquent", "MariaDB", "Multi-tenancy"],
    stack: ["SaaS", "Backend", "Automated Testing"],
    architecture: "Aplicação Laravel multitenant, persistida em MariaDB e acessada através do ORM Eloquent.",
    role: "Estagiário de Desenvolvimento",
    year: "2024",
    images: [],
    github: null,
    demo: null,
    status: "Entregue",
    category: "SaaS",
    featured: true,
    themeColor: "#c4b9aa",
    learnings: "Testes, leitura de código e isolamento de dados como fundamentos para manter um SaaS com segurança.",
    scenePreset: { accent: "#c4b9aa", cameraX: 0.1, cameraY: -0.1, formation: "archive", particleCount: 700 },
  },
  {
    id: "project-004",
    slug: "portfolio",
    title: "Portfolio",
    subtitle: "Um mundo digital como narrativa profissional",
    description: "Este espaço: uma investigação sobre identidade, engenharia frontend e narrativa através de WebGL.",
    challenge: "Criar uma experiência memorável sem comprometer leitura, performance ou a verdade do conteúdo.",
    solution: "Server Components para conteúdo, ilhas interativas pequenas e cenas 3D usadas como linguagem, não decoração.",
    technologies: ["Next.js", "React Three Fiber", "Three.js"],
    stack: ["React 19", "WebGL", "Tailwind CSS"],
    architecture: "Features por domínio, rotas finas e cenas carregadas dinamicamente em fronteiras client isoladas.",
    role: "Creative Direction · Engineering",
    year: "2026",
    images: [],
    github: null,
    demo: null,
    status: "Em evolução",
    category: "Experimental",
    featured: true,
    themeColor: "#e8e3cf",
    learnings: "Coreografar DOM e WebGL como partes do mesmo sistema, preservando acessibilidade e tempo de carregamento.",
    scenePreset: { accent: "#e8e3cf", cameraX: -0.15, cameraY: 0.05, formation: "scatter", particleCount: 760 },
  },
  {
    id: "project-005",
    slug: "laboratorios",
    title: "Laboratórios",
    subtitle: "Ensaios de interação e matéria digital",
    description: "Coleção viva de shaders, protótipos, inteligência artificial e pequenas ferramentas experimentais.",
    challenge: "Experimentar rápido sem transformar cada estudo em dívida ou abandonar documentação e intenção.",
    solution: "Experimentos isolados por escopo, com hipóteses claras, limites explícitos e registros de aprendizado.",
    technologies: ["Three.js", "GLSL", "AI"],
    stack: ["Shaders", "Prototyping", "Creative Coding"],
    architecture: "Experimentos autocontidos compartilhando apenas primitivas visuais e infraestrutura essencial.",
    role: "Research · Creative Development",
    year: "2026",
    images: [],
    github: null,
    demo: null,
    status: "Experimental",
    category: "R&D",
    featured: false,
    themeColor: "#aeb9bd",
    learnings: "Tratar prototipação como método de pesquisa, não como uma versão apressada de produto.",
    scenePreset: { accent: "#aeb9bd", cameraX: 0.5, cameraY: -0.2, formation: "orbit", particleCount: 820 },
  },
  {
    id: "project-006",
    slug: "open-source",
    title: "Open Source",
    subtitle: "Conhecimento construído em público",
    description: "Ferramentas, componentes e pequenas contribuições criadas para devolver valor ao ecossistema.",
    challenge: "Produzir código legível fora do contexto original e reduzir o custo de adoção para outras pessoas.",
    solution: "APIs pequenas, documentação próxima ao código e decisões técnicas registradas com honestidade.",
    technologies: ["TypeScript", "React", "Node.js"],
    stack: ["Libraries", "Documentation", "Tooling"],
    architecture: "Pacotes pequenos, contratos públicos estáveis e testes concentrados nos comportamentos observáveis.",
    role: "Maintainer · Contributor",
    year: "2024—26",
    images: [],
    github: null,
    demo: null,
    status: "Em evolução",
    category: "Community",
    featured: false,
    themeColor: "#c5c1ad",
    learnings: "Escrever para manutenção por pessoas que não compartilham o contexto de quem iniciou o projeto.",
    scenePreset: { accent: "#c5c1ad", cameraX: -0.45, cameraY: 0.16, formation: "column", particleCount: 580 },
  },
] as const satisfies readonly Project[];
