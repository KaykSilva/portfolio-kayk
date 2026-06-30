# Arquitetura

O código da aplicação vive em `src`, separado dos arquivos de configuração e dos assets públicos.

```text
src/
├── app/                 # Rotas, layouts, metadata e estilos globais
├── features/            # Funcionalidades organizadas por domínio
│   └── home/
│       ├── components/  # Seções e componentes exclusivos da home
│       ├── home.module.css
│       └── index.ts     # API pública da feature
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
