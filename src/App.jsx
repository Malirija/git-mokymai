import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import TestTable from "./TestTable";

function App() {
  const [count, setCount] = useState(0);
  const [showStartTable, setShowStartTable] = useState(true);

  if (showStartTable) {
    return (
      <section id="center">
        <table className="start-table">
          <tbody>
            <tr>
              <td>
                <p>Pradedam cia</p>

                <button
                  type="button"
                  className="counter"
                  onClick={() => setShowStartTable(false)}
                >
                  click
                </button>
                <TestTable />
                <section className="weather-card" aria-labelledby="weather-title">
                  <div className="weather-card__visual" aria-hidden="true">
                    <svg viewBox="0 0 240 160" role="presentation">
                      <circle cx="168" cy="55" r="24" className="weather-sun" />
                      <path className="weather-cloud" d="M56 105h115a20 20 0 0 0 0-40 31 31 0 0 0-59-8 25 25 0 0 0-40 20 14 14 0 0 0-16 14 14 14 0 0 0 14 14Z" />
                      <path className="weather-rain" d="m83 119-7 15m37-15-7 15m37-15-7 15" />
                      <path className="weather-swoosh" d="M29 48c17-9 31-9 45 0M26 60c10-5 19-5 28-1" />
                    </svg>
                  </div>
                  <div className="weather-card__content">
                    <p className="weather-card__eyebrow">Šiandien • Vilnius</p>
                    <h2 id="weather-title">Orų prognozė</h2>
                    <p className="weather-card__summary">Mažai debesuota</p>
                    <div className="weather-card__details">
                      <div><span>Temperatūra</span><strong>10–19 °C</strong></div>
                      <div><span>Vėjo kryptis</span><strong>Rytų (R)</strong></div>
                      <div><span>Krituliai</span><strong>0 mm</strong></div>
                    </div>
                    <p className="weather-card__source">Duomenys: Lietuvos hidrometeorologijos tarnyba</p>
                  </div>
                </section>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
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
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
