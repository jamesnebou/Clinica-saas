# Clinica SaaS

SaaS para gestao de clinicas de estetica, construido com Next.js, Tailwind CSS, Supabase e Vercel.

## Stack inicial

- Next.js App Router
- Tailwind CSS
- Supabase Auth/Database
- Vercel deploy via GitHub

## Variaveis de ambiente

Copie `.env.example` para `.env.local` no ambiente local e configure tambem na Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` deve ser usada apenas em codigo server-side.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
