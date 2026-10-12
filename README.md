# React + Vite Task Manager

React 19 ir Vite aplikacija su Supabase Auth prisijungimu, užduočių valdymu, pradine testine lentele ir Vilniaus orų prognoze.

## Paleidimas

1. Įdiekite priklausomybes:

   ```bash
   npm install
   ```

2. Nukopijuokite `.env.example` į `.env.local` ir įrašykite savo Supabase projekto duomenis:

   ```dotenv
   VITE_SUPABASE_URL=https://jusu-projekto-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=jusu-publishable-raktas
   ```

   Naudokite tik Supabase publishable / anon raktą. `service_role` ar secret rakto į naršyklės aplikaciją nedėkite. `.env.local` ignoruojamas per Git.

3. Paleiskite kūrimo serverį:

   ```bash
   npm run dev
   ```

Kitos komandos: `npm run lint`, `npm run build`, `npm run preview`.

## Supabase integracija

Duomenų bazės schema, RLS politikos, `handle_new_user()` profilį kuriantis trigeris ir `set_tasks_updated_at` trigeris jau turi būti sukurti Supabase projekte. Ši aplikacija jų nekurs ir nekeis.

- Registracija naudoja Supabase Auth el. paštą, slaptažodį ir `options.data.name`. Profilį sukuria duomenų bazės trigeris.
- Prisijungimas ir atsijungimas vyksta per Supabase Auth. Supabase klientas atkuria sesiją ir stebi jos pasikeitimus.
- Užduotys skaitomos iš `public.tasks`, rūšiuojamos pagal `created_at` mažėjančia tvarka. RLS apriboja matomumą savininkui.
- Naujos užduotys sukuriamos su prisijungusio vartotojo `user_id` ir `Todo` būsena. Būsenos: `Todo`, `In Progress`, `Done`.
- `id`, `created_at` ir `updated_at` sukuria / atnaujina duomenų bazė.

Supabase klientas ir aplinkos kintamųjų patikra yra `src/lib/supabase.js`. Auth funkcijos yra `src/api/usersApi.js`, užduočių funkcijos – `src/api/tasksApi.js`.

## Ekranai

- `/` rodo prisijungimą, jei nėra aktyvios sesijos. Prisijungus rodoma dabartinė pradžios lentelė, orai ir demonstracinis Vite/React ekranas.
- Nuoroda „Open Task Manager“ atveria `/tasks`. Task Manager leidžia kurti užduotis, filtruoti pagal būseną, ją keisti ir ištrinti.
- Orų prognozė naudoja viešą Open-Meteo API.

## Saugumas

RLS ir Supabase Auth yra prieigos kontrolės pagrindas. Slaptažodžiai nėra saugomi `public` lentelėse ar rankiniu būdu naršyklės saugykloje. Kliento pusėje naudokite tik publishable raktą; jokiu būdu neįtraukite `service_role` rakto.
