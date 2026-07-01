# Arquitetura

O código da aplicação vive em `src`, separado dos arquivos de configuração e dos assets públicos.

```text
src/
├── app/                 # Rotas, layouts, metadata e estilos globais
├── features/            # Funcionalidades organizadas por domínio
│   ├── home/
│       ├── components/  # Seções e componentes exclusivos da home
│       ├── home.module.css
│       └── index.ts     # API pública da feature
│   └── projects/
│       ├── components/  # Arquivo interativo, detalhes e cena 3D
│       ├── data/        # Fonte tipada dos projetos e presets de cena
│       ├── projects.module.css
│       └── index.ts
│   └── journey/
│       ├── components/  # Documento acessível, navegação e cena de memórias
│       ├── data/        # Narrativa tipada e presets ambientais
│       ├── journey.module.css
│       └── index.ts
│   └── contact/
│       ├── components/  # Página e lista semântica de canais
│       ├── data/        # Fonte tipada dos meios de contato
│       ├── contact.module.css
│       └── index.ts
├── shared/              # Componentes e utilitários usados por várias features
└── lib/                 # Integrações e código independente de interface
```

## Convenções

- Arquivos de `src/app` devem ser pequenos e apenas compor features.
- Uma feature só expõe para o restante da aplicação o que estiver em seu `index.ts`.
- Componentes exclusivos permanecem dentro da feature; mova-os para `shared` somente quando houver reutilização real.
- Código interativo deve manter `"use client"` na menor fronteira possível.
- Estilos específicos usam CSS Modules; tokens e resets permanecem em `globals.css`.
- Assets estáticos permanecem em `public`.

## Projects

- `app/projects/page.tsx` permanece um Server Component e apenas compõe a feature.
- A coleção em `features/projects/data/projects.ts` é a única fonte de conteúdo do arquivo.
- O estado de seleção fica restrito a `ProjectArchive`; índice e detalhes recebem dados por props.
- A cena WebGL recebe somente `scenePreset` e é carregada dinamicamente no cliente.
- `SiteHeader` e `AmbientAudio` vivem em `shared` porque são usados por mais de uma rota.
- `AmbientAudio` é montado uma única vez no root layout para persistir entre navegações sem sobrepor players.

## Journey

- `features/journey/data/memories.ts` é a fonte única de conteúdo e presets ambientais.
- O painel e a navegação permanecem no DOM; a cena 3D é uma camada progressiva e opcional.
- Os monólitos compartilham geometria e material por meio de `InstancedMesh`.
- Seleção, câmera, iluminação e densidade de partículas derivam do mesmo índice ativo.

## Contact

- `features/contact/data/channels.ts` centraliza endereços e metadados dos canais.
- A página permanece um Server Component e não adiciona JavaScript além dos componentes compartilhados.
- O ambiente de transmissão é construído em CSS para preservar baixo custo de renderização.
