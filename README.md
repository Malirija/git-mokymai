# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

AI generated:
# React + Vite Demo Project

Paprastas React + Vite projektas, išplėstas papildomu pradiniu ekranu, navigacija tarp ekranų ir filtruojama lentele.

---

# Naudojamos technologijos

- React
- Vite
- JavaScript (ES6+)
- CSS
- React Hooks (`useState`)

---

# Projekto funkcionalumas

## 1. Pradinis ekranas

Paleidus aplikaciją vartotojas mato:

- tekstą **„Pradedam cia“**
- testinę lentelę
- filtravimo lauką
- mygtuką **click**

### Veiksmas

Paspaudus:

```text
click
```

vartotojas pereina į pagrindinį ekraną.

---

## 2. Lentelė

Lentelė turi:

### Stulpelius

| Vardas | Miestas | Statusas |
|---------|---------|---------|
| Jonas | Vilnius | Aktyvus |
| Petras | Kaunas | Neaktyvus |
| Ona | Klaipėda | Aktyvus |
| Tomas | Šiauliai | Laukiantis |

### Filtravimas

Filtravimas vykdomas pagal pirmą stulpelį:

```text
Vardas
```

Pavyzdžiai:

```text
jo
```

rezultatas:

```text
Jonas
```

---

## 3. Pagrindinis ekranas

Pereinus iš pirmojo ekrano rodoma:

- Vite demonstracinė informacija
- Hero paveikslėliai
- Counter mygtukas
- Atgal mygtukas

---

## 4. Counter

Mygtukas:

```text
Count is X
```

kiekvienu paspaudimu didina skaitiklį:

```js
setCount((count) => count + 1)
```

---

## 5. Grįžimas atgal

Mygtukas:

```text
Atgal
```

grąžina į pirmą ekraną:

```js
setShowStartTable(true)
```

---

# Projekto struktūra

```text
src/
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/
│   ├── TestTable.jsx
│   └── TestTable.css
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

# Komponentai

## App

Pagrindinis aplikacijos komponentas.

Atsakingas už:

- navigaciją tarp ekranų
- counter būseną
- pradinio ekrano rodymą

Naudojamos būsenos:

```js
const [count, setCount] = useState(0)

const [showStartTable, setShowStartTable] = useState(true)
```

---

## TestTable

Atsakingas už:

- testinių duomenų atvaizdavimą
- filtravimą pagal vardą

Failai:

```text
src/components/TestTable.jsx
src/components/TestTable.css
```

---

# Dizaino sistema

Projektas naudoja CSS kintamuosius.

Pagrindiniai:

```css
--accent
--accent-bg
--accent-border
--border
--text
--text-h
--bg
```

### Spalvinė schema

- Violetinis akcentas
- Šviesi tema
- Automatinis Dark Mode palaikymas

---

# Paleidimas

## Priklausomybių įrašymas

```bash
npm install
```

## Development režimas

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

---

# Kodo stiliaus taisyklės

## Komponentai

Naujus komponentus kurti:

```text
src/components
```

Kiekvienam komponentui:

```text
ComponentName.jsx
ComponentName.css
```

Pavyzdys:

```text
UserList.jsx
UserList.css
```

---

## CSS

Rekomenduojama:

- naudoti esamus CSS kintamuosius
- vengti hardcodintų spalvų
- išlaikyti esamą violetinę stilistiką

---

## React

Naudoti:

- Functional Components
- Hooks (`useState`, `useEffect`)

Vengti:

- Class Components

---

# Tolimesnės plėtros idėjos

Galimi ateities patobulinimai:

- React Router
- CRUD formos
- API integracija
- Lentelės rūšiavimas
- Puslapiavimas (Pagination)
- Duomenų saugojimas backend'e
- React Context arba Zustand
- Unit testai (Vitest)
- E2E testai (Playwright)

---

# Projekto būsena

Statusas:

```text
MVP / Development
```

Įgyvendinta:

- Pradinis ekranas
- Navigacija tarp ekranų
- Counter
- Atgal mygtukas
- Filtruojama lentelė
- Responsive stiliai
- Dark Mode palaikymas

Neįgyvendinta:

- API
- Autentifikacija
- Duomenų bazė
- Routing
- Testai