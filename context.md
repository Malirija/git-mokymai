# Projekto kontekstas

## Technologijos

- React su funkciniais komponentais ir kabliukais
- Vite
- JavaScript (ES6+), be TypeScript
- Grynas CSS ir bendri CSS kintamieji iš `src/index.css`
- UI biblioteka nenaudojama
- Sąsajos tekstai daugiausia lietuvių kalba; demonstracinė Vite/React skiltis išlaiko originalius angliškus tekstus

## Projekto struktūra

```text
src/
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── App.jsx
├── App.css
├── index.css
├── main.jsx
├── TestTable.jsx
├── TestTable.css
├── StatusSummary.jsx
└── StatusSummary.css
```

## Funkcionalumas

### Ekranų perjungimas (`src/App.jsx`)

- `showStartTable` būsena valdo pradžios ir demonstracinio ekrano atvaizdavimą.
- Pradžios ekrane pateikiami tekstas „Pradedam cia“, mygtukas „click“, lentelė su statusų suvestine ir Vilniaus orų kortelė.
- Paspaudus „click“, atidaromas Vite/React demonstracinis ekranas.
- Demonstraciniame ekrane skaitiklio mygtukas didina `count`, o „Atgal“ grąžina į pradžios ekraną.
- Orų kortelė vieną kartą gauna dienos prognozę iš Open-Meteo Vilniui. Užklausa atšaukiama komponentui išsivalant; jei užklausa nepavyksta, parodomas klaidos tekstas.

### Lentelė (`src/TestTable.jsx`)

- Pradiniai keturi įrašai saugomi `initialData` masyve; kiekvienas turi `id`, vardą, miestą ir statusą.
- `rows` būsena laiko esamus įrašus. Lentelės statusą galima pakeisti išskleidžiamajame sąraše (`Aktyvus`, `Neaktyvus`, `Laukiantis`).
- Vardo filtras veikia pagal dabartinius `rows` duomenis ir nekeičia jų.
- Kiekviena lentelės eilutė naudoja įrašo `id` kaip React `key`.
- Statuso CSS klasė parenkama pagal esamą statusą.

### Statusų suvestinė (`src/StatusSummary.jsx`)

- Rodoma iškart po lentele.
- Kiekvienam galimam statusui parodo dabartinį įrašų skaičių.
- Skaičiai apskaičiuojami iš viso `rows` masyvo, todėl atsinaujina pakeitus statusą ir nepriklauso nuo aktyvaus vardo filtro.

## Failų paskirtys

- `src/main.jsx` – React aplikacijos įvesties taškas.
- `src/App.jsx` – ekranų perjungimas, demonstracinis skaitiklis, orų užklausa ir pagrindinis turinys.
- `src/App.css` – aplikacijos ir Vite demonstracinės dalies stiliai, įskaitant orų kortelės stilius.
- `src/index.css` – globalūs stiliai, šviesios/tamsios temos CSS kintamieji ir baziniai elementų stiliai.
- `src/TestTable.jsx` – duomenys, vardo filtras, lentelės atvaizdavimas, statuso keitimas ir suvestinės įterpimas.
- `src/TestTable.css` – lentelės, filtro ir statuso pasirinkimo stiliai.
- `src/StatusSummary.jsx` – statusų pavadinimų ir įrašų skaičių suvestinė.
- `src/StatusSummary.css` – suvestinės išdėstymas ir stiliai, naudojant projekto CSS kintamuosius.
- `src/assets/` – Vite/React demonstraciniai paveikslėliai ir logotipai.

## Darbo taisyklės

- Naują funkcionalumą įgyvendinti nepašalinant esamo ekranų perjungimo, lentelės filtravimo ar statusų keitimo, nebent to aiškiai prašoma.
- Nekeisti su užduotimi nesusijusių originalių `App.css` demonstracinių stilių.
- Komponentų stilius laikyti atskiruose CSS failuose ir importuoti juos komponentuose.
- Sąrašų elementams naudoti stabilius ir unikalius `key`.
- Nenaudoti TypeScript ar UI bibliotekų.
