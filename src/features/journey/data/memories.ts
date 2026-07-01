export type MemoryScenePreset = {
  accent: string;
  lightIntensity: number;
  particleCount: number;
  structureDensity: number;
};

export type MemoryLink = {
  href: string;
  label: string;
};

export type JourneyMemory = {
  category: string;
  challenge: string;
  company: string | null;
  context: string;
  description: string;
  featured: boolean;
  id: string;
  images: readonly string[];
  impact: string;
  learning: string;
  links: readonly MemoryLink[];
  next: string;
  order: number;
  scenePreset: MemoryScenePreset;
  slug: string;
  solution: string;
  subtitle: string;
  technologies: readonly string[];
  title: string;
  year: string;
};

export const memories = [
  {
    id: "memory-001",
    slug: "primeiro-computador",
    year: "Origem",
    title: "Primeiro computador",
    subtitle: "A curiosidade antes do código",
    category: "Descoberta",
    company: null,
    description: "Antes de construir sistemas, veio a vontade de entender a máquina — desmontar mentalmente cada tela, pasta e possibilidade.",
    context: "Eu ainda não enxergava tecnologia como carreira. O computador era um território aberto, acessado pela curiosidade e pela experimentação.",
    challenge: "Transformar fascínio em entendimento, sem um mapa claro e sem saber ainda quais perguntas fazer.",
    solution: "Aprender explorando: testar, errar, pesquisar e reconhecer padrões até que a interface deixasse de parecer uma caixa fechada.",
    learning: "Curiosidade sustentada é uma forma de método. Ela continua sendo o início de todo problema que vale resolver.",
    technologies: ["Exploração", "Hardware", "Internet"],
    impact: "Nasceu a relação de proximidade com tecnologia que mais tarde daria sentido à programação.",
    images: [],
    links: [],
    featured: true,
    next: "A vontade de entender o que existia abriu espaço para a vontade de criar.",
    scenePreset: { accent: "#8f8b7b", lightIntensity: 0.45, particleCount: 120, structureDensity: 0.2 },
    order: 1,
  },
  {
    id: "memory-002",
    slug: "primeiro-codigo",
    year: "Descoberta",
    title: "Primeiro código",
    subtitle: "Quando a máquina respondeu",
    category: "Programação",
    company: null,
    description: "O primeiro programa funcional mudou a relação com o computador: de observador para alguém capaz de dar forma a uma ideia.",
    context: "Tutoriais, documentação e pequenos experimentos formavam um caminho ainda fragmentado, mas cada resultado tornava o próximo passo possível.",
    challenge: "Compreender lógica e sintaxe ao mesmo tempo, atravessando erros que inicialmente pareciam indecifráveis.",
    solution: "Reduzir problemas, testar hipóteses pequenas e tratar cada erro como uma pista em vez de uma interrupção.",
    learning: "Programar não é memorizar respostas; é construir modelos mentais que tornam o desconhecido investigável.",
    technologies: ["Lógica", "Algoritmos", "Web"],
    impact: "A tecnologia deixou de ser somente interesse e começou a se tornar linguagem profissional.",
    images: [],
    links: [],
    featured: true,
    next: "Aprender isoladamente já não bastava. Era hora de transformar conhecimento em algo utilizável.",
    scenePreset: { accent: "#a6a18d", lightIntensity: 0.58, particleCount: 220, structureDensity: 0.3 },
    order: 2,
  },
  {
    id: "memory-003",
    slug: "primeiro-projeto",
    year: "Construção",
    title: "Primeiro projeto",
    subtitle: "Da aula para o mundo",
    category: "Projeto pessoal",
    company: null,
    description: "Uma ideia pequena exigiu decisões reais: escopo, estrutura, interface, persistência e a disciplina de terminar.",
    context: "O conhecimento existia em partes. Um projeto completo revelou as conexões — e também tudo o que ainda faltava aprender.",
    challenge: "Sair do conforto de exercícios isolados e sustentar uma aplicação do início ao fim.",
    solution: "Organizar o trabalho em entregas menores, pesquisar sob demanda e aceitar uma primeira versão imperfeita, mas completa.",
    learning: "Projetos ensinam nas fronteiras entre assuntos. É nelas que arquitetura, produto e experiência passam a conversar.",
    technologies: ["Frontend", "Git", "APIs"],
    impact: "Surgiu confiança para assumir problemas menos definidos e mostrar trabalho além do código de estudo.",
    images: [],
    links: [],
    featured: false,
    next: "O próximo passo foi construir não apenas para mim, mas para necessidades de outras pessoas.",
    scenePreset: { accent: "#bbb49c", lightIntensity: 0.7, particleCount: 340, structureDensity: 0.42 },
    order: 3,
  },
  {
    id: "memory-004",
    slug: "omep",
    year: "Pesquisa",
    title: "OMEP",
    subtitle: "O primeiro site publicado",
    category: "Projeto de pesquisa",
    company: "IFMA · Campus Araioses",
    description: "Meu primeiro site nasceu dentro de um projeto de pesquisa: transformar conhecimento acadêmico sobre emprego e produção no Maranhão em uma presença digital pública.",
    context: "O Observatório Maranhense do Emprego e Produção é um grupo interdisciplinar vinculado ao Laboratório de Inovações e Pesquisas em Informática do IFMA Campus Araioses.",
    challenge: "Apresentar de forma clara uma pesquisa dedicada ao campo econômico e social, aos Arranjos Produtivos Locais e aos setores produtivos do Maranhão.",
    solution: "Construí uma interface institucional capaz de organizar a identidade, o propósito e as frentes de estudo do observatório em uma experiência acessível na web.",
    learning: "Publicar para uma instituição mostrou que um site não termina no código: ele representa pessoas, pesquisa e informação que precisam ser encontradas.",
    technologies: ["Frontend", "Web", "Netlify"],
    impact: "Foi a primeira vez que um projeto meu ganhou endereço público, contexto real e responsabilidade sobre a comunicação de uma iniciativa coletiva.",
    images: [],
    links: [{ label: "Visitar OMEP", href: "https://ifmaomep.netlify.app/" }],
    featured: true,
    next: "Depois de publicar meu primeiro site, o próximo passo foi entrar em uma equipe e construir meu primeiro produto SaaS.",
    scenePreset: { accent: "#b7b09b", lightIntensity: 0.82, particleCount: 460, structureDensity: 0.54 },
    order: 4,
  },
  {
    id: "memory-005",
    slug: "integra-digital",
    year: "2024",
    title: "Integra Digital",
    subtitle: "Primeiro estágio, primeiro SaaS",
    category: "Estágio",
    company: "Integra Digital",
    description: "Meu primeiro estágio também foi o primeiro contato com a construção de um SaaS real, com múltiplos clientes compartilhando a mesma aplicação sem compartilhar seus dados.",
    context: "Entrei em uma base Laravel e PHP que utilizava Eloquent, MariaDB e arquitetura multitenant para atender diferentes organizações.",
    challenge: "Compreender uma aplicação existente, suas regras de isolamento entre tenants e a responsabilidade de alterar um sistema usado por clientes reais.",
    solution: "Aprendi a percorrer o fluxo completo da aplicação, trabalhar com o ORM Eloquent e validar mudanças por meio dos primeiros testes automatizados da minha trajetória.",
    learning: "Software profissional exige confiança nas mudanças. Testes, leitura de código e isolamento de dados passaram a fazer parte da minha definição de qualidade.",
    technologies: ["Laravel", "PHP", "Eloquent", "MariaDB", "Multi-tenancy", "Testes automatizados"],
    impact: "Transformou estudo em experiência profissional e estabeleceu minha primeira visão concreta sobre produto, backend e manutenção de um SaaS.",
    images: [],
    links: [],
    featured: true,
    next: "A base full stack construída no estágio abriu caminho para uma experiência de comércio eletrônico mais completa.",
    scenePreset: { accent: "#c4b9aa", lightIntensity: 0.92, particleCount: 560, structureDensity: 0.66 },
    order: 5,
  },
  {
    id: "memory-006",
    slug: "masi-lentes",
    year: "Atual",
    title: "Masi Lentes",
    subtitle: "E-commerce como sistema completo",
    category: "Trabalho atual",
    company: "Masi Lentes",
    description: "Atualmente também trabalho na construção da Masi Lentes, um e-commerce que reúne catálogo, experiência de compra, persistência de dados e confiança nas entregas.",
    context: "Em evolução contínua, a plataforma utiliza Next.js, Prisma e PostgreSQL para sustentar produtos, variações e os fluxos centrais de comércio eletrônico.",
    challenge: "Conectar uma jornada de compra clara a uma camada de dados consistente, mantendo evolução segura conforme novas regras surgiam.",
    solution: "Modelei os dados com Prisma, organizei a aplicação em Next.js e usei testes automatizados para proteger os comportamentos mais importantes.",
    learning: "E-commerce evidencia que interface e backend são partes da mesma promessa: cada ação visível precisa corresponder a um estado confiável do sistema.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Testes automatizados"],
    impact: "Continua aprofundando minha prática full stack e minha capacidade de pensar experiência, dados e qualidade como uma única entrega.",
    images: [],
    links: [],
    featured: true,
    next: "Em paralelo ao comércio eletrônico, a DashMed amplia essa jornada no contexto de dados e operações em saúde.",
    scenePreset: { accent: "#b8c2ba", lightIntensity: 1.04, particleCount: 660, structureDensity: 0.78 },
    order: 6,
  },
  {
    id: "memory-007",
    slug: "dashmed",
    year: "Atual",
    title: "DashMed",
    subtitle: "Frontend em uma startup de saúde",
    category: "Trabalho atual",
    company: "DashMed",
    description: "Hoje trabalho com foco em frontend na startup DashMed, construindo interfaces para transformar dados de saúde em fluxos claros e utilizáveis.",
    context: "O frontend utiliza React com Vite, Ant Design, CSS e TypeScript; o backend é construído com Node.js, Express, MySQL e Prisma.",
    challenge: "Organizar informação operacional densa sem aumentar a carga cognitiva, enquanto frontend e APIs evoluem no ritmo de uma startup.",
    solution: "Desenvolvo componentes e fluxos tipados em React, integrados aos serviços Node e Express, com atenção à consistência visual e aos estados reais da aplicação.",
    learning: "Trabalhar em uma startup exige equilibrar velocidade e estrutura, entendendo o sistema completo mesmo quando minha atuação está concentrada no frontend.",
    technologies: ["React", "Vite", "Ant Design", "CSS", "TypeScript", "Node.js", "Express", "MySQL", "Prisma"],
    impact: "É a etapa em que consolido minha especialização em frontend sem perder a visão full stack necessária para tomar decisões melhores de produto.",
    images: [],
    links: [{ label: "Ver projeto", href: "/projects" }],
    featured: true,
    next: "O presente não encerra o arquivo. Ele aponta para o espaço ainda não construído.",
    scenePreset: { accent: "#e8e3cf", lightIntensity: 1.2, particleCount: 840, structureDensity: 0.94 },
    order: 7,
  },
  {
    id: "memory-008",
    slug: "futuro",
    year: "Adiante",
    title: "Próximo horizonte",
    subtitle: "O arquivo permanece aberto",
    category: "Futuro",
    company: null,
    description: "Construir experiências digitais mais humanas, sistemas mais legíveis e ferramentas que ampliem o que pessoas conseguem imaginar e realizar.",
    context: "O futuro é menos uma posição final e mais uma direção: aprofundar fundamentos enquanto exploro novas formas de interação.",
    challenge: "Criar novidade com propósito, sem perder acessibilidade, desempenho ou responsabilidade.",
    solution: "Continuar unindo pesquisa, produto e engenharia — aprendendo em ciclos e transformando descoberta em trabalho compartilhável.",
    learning: "Toda tecnologia envelhece. A capacidade de aprender, cuidar e fazer boas perguntas permanece.",
    technologies: ["Creative Coding", "WebGL", "IA", "Open Source"],
    impact: "Uma carreira orientada não apenas pelo que posso construir, mas pelo tipo de futuro que vale ajudar a construir.",
    images: [],
    links: [{ label: "Iniciar uma conversa", href: "mailto:contato@kayk.dev" }],
    featured: true,
    next: "Fim do registro disponível. Continuação em processo.",
    scenePreset: { accent: "#f0ead4", lightIntensity: 1.32, particleCount: 920, structureDensity: 1 },
    order: 8,
  },
] as const satisfies readonly JourneyMemory[];
