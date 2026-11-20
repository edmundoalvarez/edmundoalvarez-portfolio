# edmundoalvarez.com.ar

Portfolio personal. Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, bilingüe (`/es`, `/en`) y generado de forma estática.

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Perfil, experiencia, skills, educación, textos de UI | `src/content/site.ts` |
| Proyectos (Valoo, clientes, archivo) | `src/content/projects.ts` |
| Email, LinkedIn, GitHub | `src/content/contact.ts` |
| Imágenes de proyectos | `public/projects/` |
| CVs en PDF | `public/cv/` |
| Colores (tokens claro/oscuro) | `src/app/globals.css` |

Todo el texto usa el tipo `L` (`{ es, en }`), así que TypeScript avisa si falta una traducción.

## Rutas

- `/` → redirige a `/es` o `/en` según el idioma del navegador (`src/proxy.ts`).
- `/[lang]` → home.
- `/[lang]/projects/valoo` → caso de estudio.
- `/[lang]/opengraph-image`, `/sitemap.xml`, `/robots.txt` → generados.

## Deploy

Pensado para Vercel: importar el repo, sin configuración extra. Después apuntar el dominio `edmundoalvarez.com.ar` a Vercel; los subdominios que sigan en Hostinger (por ejemplo `keepmoving`) se mantienen con su propio registro DNS.
