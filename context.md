# Projekto kontekstas kitam AI

Šis dokumentas aprašo dabartinį kodą. Prieš pakeitimus patikrink šaltinio failus; DB schema ir RLS jau sukurti Supabase projekte.

## Technologijos ir taisyklės

- React 19, Vite 8, JavaScript (ES6+), Vanilla CSS; TypeScript ir UI bibliotekų nenaudoti.
- Supabase JS klientas: `@supabase/supabase-js`, bendra instancija `src/lib/supabase.js`.
- Sąsajos tekstai turėtų būti lietuviški; Task Manager šiuo metu dar turi angliškų užrašų.
- Esami CSS kintamieji aprašyti `src/index.css`.

## Konfigūracija

Nukopijuoti `.env.example` į ignoruojamą `.env.local` ir nustatyti:

```dotenv
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Neįrašyti tikrų raktų į repozitoriją. Naršyklėje naudoti tik publishable / anon raktą, niekada nenaudoti `service_role` ar secret rakto. Jei kintamųjų nėra, `src/lib/supabase.js` pateikia aiškų konfigūracijos pranešimą, bet leidžia projektui susibuildinti.

## Duomenų bazė ir Auth

Supabase SQL jau įvykdytas. Nekurti ar nekeisti lentelių, funkcijų, trigerių ar RLS politikų, nebent aptikta konkreti schema neatitiktis ir ji aptarta.

- `auth.users` valdo Supabase Auth; slaptažodžiai neprieinami ir nesaugomi `public` lentelėse.
- `public.profiles`: `id` (FK į `auth.users.id`), `name`, `created_at`. `handle_new_user()` trigeris sukuria profilį. Registracijoje vardas siunčiamas per `options.data.name`; iš kliento profilio atskirai nekurti.
- `public.tasks`: `id`, `user_id`, `title`, `status`, `created_at`, `updated_at`. `user_id` nurodo savininką, statusai: `Todo`, `In Progress`, `Done`.
- RLS leidžia vartotojui pasiekti tik savo profilį ir užduotis. `set_tasks_updated_at` trigeris tvarko `updated_at`.

## Prisijungimo srautas (`src/App.jsx`)

- Aktyvus prisijungimo komponentas yra `App.jsx` vidinis `LoginPage`. `src/pages/SignPage.jsx` yra neintegruotas senas komponentas ir nėra naudojamas.
- Prisijungimo formoje naudojami el. paštas ir slaptažodis; registracijoje papildomai vardas.
- `src/api/usersApi.js`: `signUp({ name, email, password })`, `signIn({ email, password })`, `signOut()`, `getSession()`, `onAuthStateChange(callback)`.
- Registracija naudoja `supabase.auth.signUp()` su `options.data.name`. Jei `data.session` nėra, UI nurodo patvirtinti el. paštą.
- Prisijungimas naudoja `signInWithPassword`, atsijungimas `signOut`.
- `App.jsx` pradžioje kviečia `getSession()` ir prenumeruoja `onAuthStateChange()`. Prenumerata atšaukiama unmount metu, o auth įvykio žyma saugo nuo to, kad vėluojantis `getSession` perrašytų naujesnę būseną.
- Sesijos saugojimą valdo Supabase klientas. Nebenaudoti seno `sessionStorage` rakto `task-manager-authenticated-user`.
- Kelias `/tasks` atvaizduoja Task Manager; prisijungęs vartotojas grįžta į esamą pagrindinį ekraną. Tai paprastas `window.location.pathname` maršrutizavimas, jo nekeisti be poreikio.

## Task Manager (`src/pages/TasksPage.jsx`)

- Užduotys kraunamos, kuriamos, keičiamos ir trinamos per `src/api/tasksApi.js`.
- `getTasks()` skaito `public.tasks`, rikiuoja `created_at` mažėjančia tvarka; RLS atlieka vartotojo filtravimą, UI neturi parsisiųsti visų įrašų ir filtruoti pagal savininką.
- `createTask(title)` patikrina ne tuščią pavadinimą, `user_id` paima iš aktyvios Supabase sesijos ir įterpia `{ title, user_id, status: 'Todo' }`. DB generuoja kitus laukus.
- `updateTaskStatus(id, status)` leidžia tik tris DB statusus, atnaujina tik `status`; RLS saugo įrašo nuosavybę.
- `deleteTask(id)` šalina pagal ID; API praneša, jei įrašas nerastas arba neprieinamas.
- API grąžina `user_id` lauką, tačiau UI šiuo metu jo nenaudoja.
- UI turi `All` filtrą (tai nėra DB statusas), užkrovimo būseną ir atskirus klaidų pranešimus.

## Kiti ekranai ir API

- Pagrindinė pradžios lentelė `src/TestTable.jsx` yra vietinė demo funkcija; jos nekeisti atliekant Auth/Task Manager darbus.
- Vilniaus dienos orai `src/App.jsx` įkeliami iš viešo Open-Meteo API; užklausa atšaukiama unmount metu.
- Vite/React demo skiltis, counter ir atgal mygtukas valdomi `showStartTable` bei `count` būsenomis.
- `src/pages/SignPage.css` importuojamas tiesiogiai `App.jsx`, nes aktyvus `LoginPage` yra apibrėžtas ten.

## Failų žemėlapis

```text
src/
├── api/usersApi.js       # Supabase Auth funkcijos
├── api/tasksApi.js       # Supabase tasks CRUD
├── lib/supabase.js       # Vienas bendras Supabase klientas ir env patikra
├── pages/TasksPage.jsx   # Task Manager UI
├── pages/TasksPage.css
├── pages/SignPage.jsx    # Neintegruotas senas komponentas; aktyviai nenaudojamas
├── pages/SignPage.css    # Prisijungimo stiliai, aktyviai importuojami App.jsx
├── App.jsx               # Auth, maršrutizavimas, demo pradžios ekranas ir orai
├── App.css
├── index.css
├── TestTable.jsx         # Vietinė pradžios lentelė
└── StatusSummary.jsx     # Lentelės statusų suvestinė
```

## Komandos

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Darbo gairės

- Išlaikyti esamus ekranus, navigaciją, dizainą, lentelę, orų prognozę, užkrovimo ir klaidų būsenas.
- API klaidas apdoroti suprantamai, nerodant raktų ar techninių DB detalių naudotojui.
- Nenaudoti slaptažodžių lentelės, `service_role`, anon RLS prieigos ar iš kliento sukuriamo profilio.
- Prieš API pakeitimą sutikrinti funkcijų parašus ir visus iškvietimus, ypač `user_id` lauką.
