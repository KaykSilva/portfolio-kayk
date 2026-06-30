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
