# AGENTS.md — AI Agent Guidelines & Context

Šis dokumentas yra instrukcija ir taisyklių rinkinys AI agentams (Cursor, Copilot, ChatGPT ir kt.), dirbantiems su šiuo projektu.

---

## 1. Projekto Apžvalga (Project Overview)

- **Aprašymas:** Nedidelė React (Vite) aplikacija su dviejų ekranų navigacija, testine duomenų lentele ir filtravimu.
- **Pagrindinė architektūra:** Single Page Application (SPA), naudojanti paprastą `useState` būseną ekranų perjungimui.
- **Kalba:** Lietuvių k. (Sąsajos tekstai ir dokumentacija lietuviškai, kodas ir kintamieji — angliškai).

---

## 2. Technologinis Stekas & Taisyklės (Tech Stack & Constraints)

| Technologija | Reikalavimai ir apribojimai |
| :--- | :--- |
| **Framework** | React (18+) |
| **Build Tool** | Vite |
| **Kalba** | **JavaScript (ES6+)**. *NENAUDOTI TypeScript*, nes projektas sukonfigūruotas su JS. |
| **Stiliai** | **Grynas CSS (Vanilla CSS)** su CSS Kintamaisiais (`var(--border)`, `var(--bg)`, ir t.t.). |
| **UI Bibliotekos** | **GRIEŽTAI DRAUDŽIAMA** diegti UI bibliotekas (pvz., Tailwind, MUI, Ant Design, Bootstrap, Lucide ir t.t.). Visi komponentai ir stiliai turi būti rašomi rankiniu būdu. |

---

## 3. Projekto Struktūra ir Failų Organizavimas

```text
src/
├── assets/          # Statiniai resursai (paveikslėliai, SVG)
├── components/      # Daugkartinio naudojimo komponentai ir jų stiliai
│   ├── TestTable.jsx
│   └── TestTable.css
├── App.jsx          # Pagrindinis konteinerinis komponentas (Ekranų valdymas)
├── App.css          # Bendri aplikacijos ir ekranų stiliai
├── index.css        # Globalūs CSS kintamieji ir baziniai stiliai
└── main.jsx         # Aplikacijos įvesties taškas
```

### Failų kūrimo taisyklės:
1. **Komponentas + Stilius:** Kiekvienas naujas komponentas turi gyventi `src/components/` separate papsubalyje arba faile kartu su savo `.css` failu (pvz., `MyComponent.jsx` ir `MyComponent.css`).
2. **Importai:** Komponento CSS importuojamas viršutinėje komponento `.jsx` eilutėje (pvz., `import './MyComponent.css'`).

---

## 4. Kodo Rašymo Standartai (Coding Standards)

### React Best Practices:
- Naudoti tik **Funkcinius Komponentus** (`function ComponentName() {}`).
- Vengti nereikalingo būsenos (state) sudėtingumo. Jei reikšmę galima apskaičiuoti renderinimo metu (pvz., `filteredData`), **negrūsti jos į `useState`**.
- Visiems sąrašų `.map()` ciklams būtina suteikti unikalų `key` prop'ą (naudoti `item.id`, vengti `index`).

### CSS / Stiliai:
- Visada naudoti jau apibrėžtus CSS kintamuosius iš `index.css`:
  - `var(--bg)`
  - `var(--accent-bg)`
  - `var(--border)`
  - `var(--text-h)`
  - `var(--accent)`
- CSS klasių pavadinimams naudoti `kebab-case` (pvz., `.test-table-container`, `.table-filter`).
- Užtikrinti, kad CSS nebūtų pernelyg globalus — naudoti specifinius klasių pavadinimus, kad išvengtumėte stilių konflikto.

### Lietuvių kalba sąsajoje:
- Visi UI tekstai, mygtukų užrašai, pranešimai ir lentelių antrštės turi būti rašomi **lietuvių kalba** (pvz., *"Aktyvus"*, *"Laukiantis"*, *"Atgal"*, *"Filtruoti pagal vardą..."*).

---

## 5. Dabar Esantis Funkcionalumas (Current Logic)

1. **`App.jsx` valdo 2 ekranus su `showStartTable` būsena:**
   - **Pradinis ekranas (`showStartTable === true`):**
     - Rodomas teksto elementas „Pradedam cia“.
     - Įkeltas `TestTable` komponentas.
     - Mygtukas „click“, kuris perjungia `showStartTable` į `false`.
   - **Pagrindinis ekranas (`showStartTable === false`):**
     - Rodomas Vite/React logo ir „Hero“ sekcija.
     - `Count is {count}` skaitiklio mygtukas.
     - Mygtukas „Atgal“, kuris grąžina į pradinį ekraną (`setShowStartTable(true)`).
     - Nuorodos į dokumentaciją.

2. **`TestTable.jsx`:**
   - Atvaizduoja duomenų lentelę su lokalia filtravimo pagal vardą būsena (`filter`).
   - Filtravimas vyksta reRealPath metu be papildomų `useEffect`.

---

## 6. Instrukcijos Agentui (Agent Execution Workflow)

Atlikdamas bet kokias užduotis ar keisdamas kodą, AI agentas privalo laikytis šio proceso:

1. **Nemutuoti esamos logikos be prašymo:** Kai pridedama nauja funkcija, negalima ištrinti esamo ekrano perjungimo ar lentelės filtravimo, nebent vartotojas to aiškiai paprašė.
2. **Išlaikyti `App.css` vientisumą:** Nekeisti originalių Vite `hero`, `next-steps`, `ticks` stilių, jei jie nėra susiję su nauja užduotimi.
3. **Išvalyti nenaudojamus importus:** Jei pašalinamas komponentas ar logotipas, pašalinti ir jo `import` eilutę.
4. **Patikrinti sintaksę:** Įsitikinti, kad visi JSX žymėjimai yra uždaryti, ir nėra likusių TypeScript tipų anotacijų (nes tai `.jsx` / `.js` projektas).