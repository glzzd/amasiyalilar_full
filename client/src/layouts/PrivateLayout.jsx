import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

const AuthContext = React.createContext(null)

const useAuth = () => React.useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const stored = window.localStorage.getItem('admin_auth')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed && parsed.email) {
          setUser(parsed)
        }
      } catch {
        window.localStorage.removeItem('admin_auth')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const trimmedEmail = email.trim().toLowerCase()
    const validEmail = 'admin@amasiyalilar.az'
    const validPassword = 'admin123'

    if (trimmedEmail === validEmail && password === validPassword) {
      const nextUser = { email: validEmail }
      setUser(nextUser)
      window.localStorage.setItem('admin_auth', JSON.stringify(nextUser))
      return { success: true }
    }

    throw new Error('Yanlış e-poçt və ya şifrə')
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('admin_auth')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const PrivateShell = () => {
  const auth = useAuth()
  const { isAuthenticated, loading } = auth
  const location = useLocation()

  const isLoginRoute = location.pathname === '/admin/login'

  if (loading) {
    return (
      <div className="min-h-dvh bg-slate-950 text-white flex items-center justify-center">
        <div className="text-sm text-slate-300">Yüklənir...</div>
      </div>
    )
  }

  if (!isAuthenticated && !isLoginRoute) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-dvh bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 h-12 flex items-center">
          <span className="text-sm font-semibold">Admin Panel</span>
        </div>
      </header>
      <main className="container mx-auto px-4 py-4">
        <Outlet context={auth} />
      </main>
    </div>
  )
}

const PrivateLayout = () => {
  return (
    <AuthProvider>
      <PrivateShell />
    </AuthProvider>
  )
}

export default PrivateLayout
