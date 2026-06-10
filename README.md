# Propia Digital — Landing page

Landing page de alto impacto para **Propia Digital**: sitios web profesionales para
dueños de propiedades de alquiler turístico en Punta del Este, Uruguay.

## Tecnología

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4**
- **next-intl** — 3 idiomas: Español (default), Inglés, Portugués
- **Supabase** — guarda los contactos del formulario
- **react-icons (Tabler)** — iconografía
- **Google Fonts** — Playfair Display (títulos) + Inter (texto)

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). Redirige a `/es` por defecto.
Idiomas disponibles: `/es`, `/en`, `/pt`.

## Variables de entorno

Copiá `.env.local.example` a `.env.local` y completá las credenciales de Supabase.
Sin credenciales, el formulario igual funciona: los contactos se registran en la
consola del servidor (útil para desarrollo).

## Supabase — tabla de contactos

Ejecutá este SQL en tu proyecto de Supabase:

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  whatsapp text,
  message text,
  locale text default 'es'
);
```

## Estructura

- `app/[locale]/` — layout, página principal y 404 por idioma
- `app/actions/contact.ts` — guarda los contactos (server action)
- `components/` — secciones: Navbar, Hero, Problem, Solution, Calculator, Pricing,
  Testimonials, Contact, Footer, WhatsAppFloat
- `messages/{es,en,pt}.json` — todos los textos
- `i18n/` — configuración de idiomas
- `lib/` — constantes (WhatsApp, email) y cliente de Supabase

## Personalización rápida

- **WhatsApp / email:** `lib/constants.ts`
- **Textos:** `messages/*.json`
- **Colores / fuentes:** `app/globals.css` (`@theme`)
- **Imagen del hero:** `components/Hero.tsx`
- **Testimonios reales:** reemplazá los datos en `messages/*.json` y las fotos en
  `components/Testimonials.tsx`

## Deploy

Pensado para **Vercel**. Importá el repo, cargá las variables de entorno y listo.
