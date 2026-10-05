# Project Context

## Technologijos

- React
- Vite
- JavaScript
- CSS
- UI biblioteka nenaudojama

---

# Projekto struktūra

```text
src/
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components/
│   ├── TestTable.jsx
│   └── TestTable.css
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

# Funkcionalumas

Programa turi du ekranus.

## Pradinis ekranas

Rodomas kai:

```js
showStartTable === true
```

Rodoma:

- tekstas "Pradedam cia"
- TestTable komponentas
- mygtukas "click"

Paspaudus:

```js
setShowStartTable(false)
```

pereinama į pagrindinį ekraną.

---

## Pagrindinis ekranas

Rodoma:

- Vite demonstracinis ekranas
- Counter mygtukas
- Atgal mygtukas

Counter:

```js
setCount((count) => count + 1)
```

Atgal:

```js
setShowStartTable(true)
```

grąžina į pirmą ekraną.

---

# src/App.jsx

```jsx
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import TestTable from './components/TestTable'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [showStartTable, setShowStartTable] = useState(true)

  if (showStartTable) {
    return (
      <section id="center">
        <table className="start-table">
          <tbody>
            <tr>
              <td>
                <p>Pradedam cia</p>

                <TestTable />

                <button
                  type="button"
                  className="counter"
                  onClick={() => setShowStartTable(false)}
                >
                  click
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img
            src={heroImg}
            className="base"
            width="170"
            height="179"
            alt=""
          />
          <img
            src={reactLogo}
            className="framework"
            alt="React logo"
          />
          <img
            src={viteLogo}
            className="vite"
            alt="Vite logo"
          />
        </div>

        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>

        <div className="button-group">
          <button
            type="button"
            className="counter"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>

          <button
            type="button"
            className="counter"
            onClick={() => setShowStartTable(true)}
          >
            Atgal
          </button>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>

          <h2>Documentation</h2>
          <p>Your questions, answered</p>

          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>

            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>

        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>

          <h2>Connect with us</h2>
          <p>Join the Vite community</p>

          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="spacer"></section>
    </>
  )
}

export default App
```

---

# src/components/TestTable.jsx

```jsx
import { useState } from 'react'
import './TestTable.css'

const data = [
  {
    id: 1,
    name: 'Jonas',
    city: 'Vilnius',
    status: 'Aktyvus',
  },
  {
    id: 2,
    name: 'Petras',
    city: 'Kaunas',
    status: 'Neaktyvus',
  },
  {
    id: 3,
    name: 'Ona',
    city: 'Klaipėda',
    status: 'Aktyvus',
  },
  {
    id: 4,
    name: 'Tomas',
    city: 'Šiauliai',
    status: 'Laukiantis',
  },
]

function TestTable() {
  const [filter, setFilter] = useState('')

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="test-table-container">
      <h2>Testinė lentelė</h2>

      <input
        type="text"
        placeholder="Filtruoti pagal vardą..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="table-filter"
      />

      <table className="test-table">
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Miestas</th>
            <th>Statusas</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.city}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TestTable
```

---

# src/components/TestTable.css

```css
.test-table-container {
  width: 700px;
  max-width: 100%;
  padding: 24px;
  background: var(--accent-bg);
  border: 1px solid var(--border);
  box-sizing: border-box;
}

.test-table-container h2 {
  margin-bottom: 20px;
}

.table-filter {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text-h);
  box-sizing: border-box;
}

.table-filter:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.test-table {
  width: 100%;
  border-collapse: collapse;
}

.test-table th {
  text-align: left;
  padding: 12px;
  background: rgba(170, 59, 255, 0.12);
  border-bottom: 1px solid var(--border);
}

.test-table td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
}

.test-table tbody tr:hover {
  background: rgba(170, 59, 255, 0.06);
}
```

---

# src/App.css

```css
.start-table {
  border-collapse: collapse;
  min-width: 280px;
  background: var(--accent-bg);
  border: 1px solid var(--border);
}

.start-table td {
  padding: 32px 40px;
  text-align: center;
}

.start-table p {
  margin: 0 0 16px;
  font-size: 1.25rem;
}

.start-table .counter {
  margin-bottom: 0;
}

.button-group {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
}
```

Likusi App.css dalis yra originalus Vite sugeneruotas stilius (hero, next-steps, ticks, spacer ir kt.) ir turi būti išlaikyta tokia, kokia buvo pradiniame projekte.