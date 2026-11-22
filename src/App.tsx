import { supabase } from './lib/utils/supabase.ts'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Navigate, Route, Routes } from 'react-router-dom'
import { LoginForm } from './components/login-form.tsx'
import { SignUpForm } from './components/sign-up-form.tsx'
import { ForgotPasswordForm } from './components/forgot-password-form.tsx'
import { UpdatePasswordForm } from './components/update-password-form.tsx'
import { Button } from './components/ui/button.tsx'
import { LogoutButton } from './components/logout-button.tsx'
import { Dashboard } from './pages/dashboard.tsx'
import { CreateTaskModal } from './components/create-task-modal.tsx'

function App() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [modalIsOpen, setModalOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session
      const isAuthenticated = Boolean(session)
      const isAnonymous = session?.user.is_anonymous === true

      setAuthenticated(isAuthenticated)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const isAuthenticated = Boolean(session)
      const isAnonymous = session?.user.is_anonymous === true

      setAuthenticated(isAuthenticated)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center">Loading...</main>
  }

  return (
    <Router>
      <header className="w-full bg-slate-900 text-white">
        <div className="mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Kanban-Style Board
          </Link>

          <div className="flex items-center gap-3">
            {authenticated && (
              <Button
                className="inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-white/10 focus:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/50"
                onClick={() => setModalOpen(true)}
              >
                Create Project
              </Button>
            )}
            {authenticated && (
              <LogoutButton className="inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-white/10 focus:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/50"/>
            )}
          </div>
        </div>
      </header>
      <main className="flex w-full items-center justify-center p-6">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={authenticated ? '/dashboard' : '/auth/login'} replace />}
          />
          <Route
            path="/auth/login"
            element={authenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />}
          />
          <Route
            path="/auth/sign-up"
            element={authenticated ? <Navigate to="/dashboard" replace /> : <SignUpForm />}
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
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CreateTaskModal isOpen={modalIsOpen} onClose={() => setModalOpen(false)}/>
      </main>
    </Router>
  )
}

export default App
