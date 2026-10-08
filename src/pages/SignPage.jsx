import { useState } from 'react'
import { createUser, getUsers } from '../api/usersApi'
import './SignPage.css'

const AUTH_STORAGE_KEY = 'task-manager-authenticated-user'

function SignPage({ onLogin }) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoginError('')
    if (isSubmitting) return

    const name = userName.trim()
    if (!name || !password) {
      setLoginError('Įveskite vartotojo vardą ir slaptažodį.')
      return
    }

    setIsSubmitting(true)
    try {
      if (isRegistering) {
        await createUser({ name, password })
        setIsRegistering(false)
        setPassword('')
        setLoginError('Registracija sėkminga. Dabar galite prisijungti.')
        return
      }

      const result = await getUsers()
      const users = Array.isArray(result) ? result : result?.data
      if (!Array.isArray(users)) throw new Error('API response is not a user list')

      const matchingUser = users.find((user) => user.name === name)
      if (!matchingUser || matchingUser.password !== password) {
        setLoginError('Neteisingas vartotojo vardas arba slaptažodis.')
        return
      }

      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(matchingUser))
      onLogin(matchingUser)
    } catch {
      setLoginError(
        isRegistering
          ? 'Nepavyko užregistruoti vartotojo. Patikrinkite API nustatymus.'
          : 'Nepavyko patikrinti prisijungimo duomenų. Patikrinkite API nustatymus.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>{isRegistering ? 'Registracija' : 'Prisijungimas'}</h1>
        <label htmlFor="login-name">Vartotojo vardas</label>
        <input
          id="login-name"
          autoComplete="username"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <label htmlFor="login-password">Slaptažodis</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {loginError && <p className="login-form__error" role="alert">{loginError}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Palaukite…' : isRegistering ? 'Log up' : 'Prisijungti'}
        </button>
        <button
          className="login-form__mode"
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            setIsRegistering((registering) => !registering)
            setLoginError('')
          }}
        >
          {isRegistering ? 'Jau turite paskyrą? Prisijungti' : 'Registruotis'}
        </button>
      </form>
    </main>
  )
}

export default SignPage
