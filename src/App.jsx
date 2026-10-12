import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import "./pages/SignPage.css";
import TestTable from "./TestTable";
import TasksPage from "./pages/TasksPage";
import { onAuthStateChange, signIn, signOut, signUp, getSession } from "./api/usersApi";
import { supabaseConfigError } from "./lib/supabase";

function getAuthErrorMessage(error, isRegistering) {
  if (error.message?.includes("Supabase nustatymai neužpildyti")) {
    return error.message;
  }
  const message = error.message?.toLowerCase() ?? "";
  const code = error.code?.toLowerCase() ?? "";

  if (code === "email_not_confirmed" || message.includes("email not confirmed")) {
    return "Patvirtinkite el. paštą pagal jums išsiųstą nuorodą ir bandykite prisijungti.";
  }
  if (
    ["user_already_exists", "email_exists"].includes(code) ||
    message.includes("already registered") ||
    message.includes("already exists")
  ) {
    return "Šis el. pašto adresas jau užregistruotas.";
  }
  if (
    code === "weak_password" ||
    message.includes("password should be at least") ||
    message.includes("password is too short")
  ) {
    const minimumLength = message.match(/at least (\d+) characters?/);
    return minimumLength
      ? `Slaptažodį turi sudaryti bent ${minimumLength[1]} simboliai.`
      : "Pasirinkite ilgesnį slaptažodį.";
  }
  if (
    message.includes("invalid email") ||
    message.includes("email address is invalid")
  ) {
    return "Įveskite galiojantį el. pašto adresą.";
  }
  if (
    ["signup_disabled", "email_provider_disabled"].includes(code) ||
    message.includes("signups not allowed") ||
    message.includes("signups are disabled")
  ) {
    return "Registracija šiuo metu išjungta. Įjunkite el. pašto registraciją Supabase Auth nustatymuose.";
  }
  if (code === "validation_failed") {
    return "Patikrinkite įvestą vardą, el. paštą ir slaptažodį.";
  }
  if (message.includes("rate limit") || code.includes("rate_limit")) {
    return "Per daug bandymų per trumpą laiką. Palaukite ir bandykite dar kartą.";
  }
  if (message.includes("database error saving new user")) {
    return "Registracijos šiuo metu užbaigti nepavyko. Pabandykite vėliau arba kreipkitės į administratorių.";
  }
  if (
    !isRegistering &&
    ["invalid_credentials", "invalid_login_credentials"].includes(code) ||
    (!isRegistering && message.includes("invalid login credentials"))
  ) {
    return "Neteisingas el. pašto adresas arba slaptažodis.";
  }
  if (isRegistering && error.status === 422) {
    return "Registracija atmesta. Patikrinkite el. pašto adresą, slaptažodžio reikalavimus ir ar šis el. paštas jau nėra užregistruotas.";
  }
  return isRegistering
    ? "Nepavyko užregistruoti paskyros. Patikrinkite duomenis ir bandykite dar kartą."
    : "Nepavyko prisijungti. Patikrinkite duomenis arba interneto ryšį.";
}

function LoginPage({ onLogin, initialError }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(initialError);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoginError("");
    if (isSubmitting) return;

    const name = userName.trim();
    const normalizedEmail = email.trim();
    if ((isRegistering && !name) || !normalizedEmail || !password) {
      setLoginError("Įveskite el. paštą, slaptažodį ir registruojantis vardą.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isRegistering) {
        const data = await signUp({ name, email: normalizedEmail, password });
        setIsRegistering(false);
        setPassword("");
        setLoginError(
          data.session
            ? "Registracija sėkminga."
            : "Registracija sėkminga. Patvirtinkite el. paštą pagal jums išsiųstą nuorodą prieš prisijungdami.",
        );
        return;
      }

      const data = await signIn({ email: normalizedEmail, password });
      onLogin(data.user);
    } catch (error) {
      setLoginError(getAuthErrorMessage(error, isRegistering));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>{isRegistering ? "Registracija" : "Prisijungimas"}</h1>
        {isRegistering && (
          <>
            <label htmlFor="login-name">Vartotojo vardas</label>
            <input
              id="login-name"
              autoComplete="name"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </>
        )}
        <label htmlFor="login-email">El. paštas</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="login-password">Slaptažodis</label>
        <input
          id="login-password"
          type="password"
          autoComplete={isRegistering ? "new-password" : "current-password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {loginError && (
          <p className="login-form__error" role="alert">
            {loginError}
          </p>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Palaukite…"
            : isRegistering
              ? "Registruotis"
              : "Prisijungti"}
        </button>
        <button
          className="login-form__mode"
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            setIsRegistering((registering) => !registering);
            setLoginError("");
          }}
        >
          {isRegistering ? "Jau turite paskyrą? Prisijungti" : "Registruotis"}
        </button>
      </form>
    </main>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSessionLoading, setIsSessionLoading] = useState(!supabaseConfigError);
  const [authError, setAuthError] = useState(supabaseConfigError);
  const [count, setCount] = useState(0);
  const [showStartTable, setShowStartTable] = useState(true);
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    if (supabaseConfigError) {
      return undefined;
    }

    let isActive = true;
    let authEventReceived = false;
    const subscription = onAuthStateChange((session) => {
      authEventReceived = true;
      if (isActive) {
        setCurrentUser(session?.user ?? null);
        setAuthError("");
        setIsSessionLoading(false);
      }
    });

    getSession()
      .then((session) => {
        if (isActive && !authEventReceived) {
          setCurrentUser(session?.user ?? null);
          setIsSessionLoading(false);
        }
      })
      .catch((error) => {
        if (isActive && !authEventReceived) {
          setAuthError(getAuthErrorMessage(error, false));
          setIsSessionLoading(false);
        }
      });

    return () => {
      isActive = false;
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!currentUser || window.location.pathname === "/tasks") return undefined;
    const controller = new AbortController();

    async function loadWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=54.6872&longitude=25.2797&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_direction_10m_dominant&timezone=Europe%2FVilnius&forecast_days=1",
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Nepavyko gauti orų duomenų");
        const data = await response.json();
        setWeather({
          date: data.daily.time[0],
          code: data.daily.weather_code[0],
          max: data.daily.temperature_2m_max[0],
          min: data.daily.temperature_2m_min[0],
          precipitation: data.daily.precipitation_sum[0],
          wind: data.daily.wind_direction_10m_dominant[0],
        });
      } catch (error) {
        if (error.name !== "AbortError") setWeatherError(true);
      }
    }

    loadWeather();
    return () => controller.abort();
  }, [currentUser]);

  if (isSessionLoading) {
    return <main className="login-page" aria-label="Kraunama sesija" />;
  }

  if (!currentUser) {
    return (
      <LoginPage
        onLogin={setCurrentUser}
        initialError={authError}
      />
    );
  }

  if (window.location.pathname === "/tasks") {
    return (
      <TasksPage
        authError={authError}
        onLogout={async () => {
          try {
            await signOut();
            setAuthError("");
          } catch (error) {
            setAuthError(getAuthErrorMessage(error, false));
          }
        }}
      />
    );
  }

  const weatherDescriptions = {
    0: "Giedra",
    1: "Daugiausia giedra",
    2: "Nepastoviai debesuota",
    3: "Debesuota",
    45: "Rūkas",
    48: "Šerkšną keliantis rūkas",
    51: "Silpna dulksna",
    53: "Dulksna",
    55: "Tanki dulksna",
    56: "Silpna lijundra",
    57: "Stipri lijundra",
    61: "Silpnas lietus",
    63: "Lietus",
    65: "Stiprus lietus",
    66: "Silpnas lijundros lietus",
    67: "Stiprus lijundros lietus",
    71: "Silpnas sniegas",
    73: "Sniegas",
    75: "Stiprus sniegas",
    77: "Sniego kruopos",
    80: "Silpni lietaus šuorai",
    81: "Lietaus šuorai",
    82: "Stiprūs lietaus šuorai",
    85: "Silpni sniego šuorai",
    86: "Stiprūs sniego šuorai",
    95: "Perkūnija",
    96: "Perkūnija su kruša",
    99: "Stipri perkūnija su kruša",
  };
  const windDirections = ["Š", "ŠR", "R", "PR", "P", "PV", "V", "ŠV"];
  const formatDate = (date) =>
    new Intl.DateTimeFormat("lt-LT", { day: "numeric", month: "long" }).format(
      new Date(`${date}T12:00:00`),
    );

  if (showStartTable) {
    return (
      <section id="center">
        <table className="start-table">
          <tbody>
            <tr>
              <td>
                <a className="task-manager-link" href="/tasks">
                  Open Task Manager
                </a>
                <p>Pradedam cia</p>

                <button
                  type="button"
                  className="counter"
                  onClick={() => setShowStartTable(false)}
                >
                  click
                </button>
                <TestTable />
                <section
                  className="weather-card"
                  aria-labelledby="weather-title"
                >
                  <div className="weather-card__visual" aria-hidden="true">
                    <svg viewBox="0 0 240 160" role="presentation">
                      <circle cx="168" cy="55" r="24" className="weather-sun" />
                      <path
                        className="weather-cloud"
                        d="M56 105h115a20 20 0 0 0 0-40 31 31 0 0 0-59-8 25 25 0 0 0-40 20 14 14 0 0 0-16 14 14 14 0 0 0 14 14Z"
                      />
                      <path
                        className="weather-rain"
                        d="m83 119-7 15m37-15-7 15m37-15-7 15"
                      />
                      <path
                        className="weather-swoosh"
                        d="M29 48c17-9 31-9 45 0M26 60c10-5 19-5 28-1"
                      />
                    </svg>
                  </div>
                  <div className="weather-card__content">
                    <p className="weather-card__eyebrow">
                      {weather
                        ? `${formatDate(weather.date)} • Vilnius`
                        : "Šiandien • Vilnius"}
                    </p>
                    <h2 id="weather-title">Orų prognozė</h2>
                    <p className="weather-card__summary">
                      {weather
                        ? (weatherDescriptions[weather.code] ?? "Orai")
                        : weatherError
                          ? "Orų duomenų gauti nepavyko"
                          : "Kraunami šiandienos orai…"}
                    </p>
                    <div className="weather-card__details">
                      <div>
                        <span>Temperatūra</span>
                        <strong>
                          {weather
                            ? `${Math.round(weather.min)}–${Math.round(weather.max)} °C`
                            : "—"}
                        </strong>
                      </div>
                      <div>
                        <span>Vėjo kryptis</span>
                        <strong>
                          {weather
                            ? windDirections[Math.round(weather.wind / 45) % 8]
                            : "—"}
                        </strong>
                      </div>
                      <div>
                        <span>Krituliai</span>
                        <strong>
                          {weather ? `${weather.precipitation} mm` : "—"}
                        </strong>
                      </div>
                    </div>
                    <p className="weather-card__source">Duomenys: Open-Meteo</p>
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
