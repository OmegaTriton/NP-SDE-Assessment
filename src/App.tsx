import { supabase } from './lib/utils/supabase.ts'
import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { LoginForm } from './components/login-form.tsx'
import { SignUpForm } from './components/sign-up-form.tsx'
import { ForgotPasswordForm } from './components/forgot-password-form.tsx'
import { UpdatePasswordForm } from './components/update-password-form.tsx'
import { Button } from './components/ui/button.tsx'
import { LogoutButton } from './components/logout-button.tsx'

function App() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(Boolean(data.session))
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session))
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center">Loading...</main>
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={authenticated ? '/protected' : '/auth/login'} replace />}
        />
        <Route
          path="/auth/login"
          element={authenticated ? <Navigate to="/protected" replace /> : <LoginForm />}
        />
        <Route
          path="/auth/sign-up"
          element={authenticated ? <Navigate to="/protected" replace /> : <SignUpForm />}
        />
        <Route
          path="/auth/forgot-password"
          element={<ForgotPasswordForm />}
        />
        <Route
          path="/auth/update-password"
          element={<UpdatePasswordForm />}
        />
        <Route
          path="/auth/sign-up-success"
          element={
            <section className="max-w-md text-center">
              <h1>Check your email</h1>
              <p>Confirm the verification link, then sign in to your account.</p>
              <Link className="mt-4 inline-block underline" to="/auth/login">
                Return to sign in
              </Link>
            </section>
          }
        />
        <Route
          path="/protected"
          element={
            authenticated ? (
              <section className="text-center">
                <h1>Welcome</h1>
                <p>You are signed in.</p>
                <LogoutButton className="mt-4"/>
              </section>
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App
