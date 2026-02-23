import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'

const useAdminAuth = () => useOutletContext()

const AdminLoginPage = () => {
  const { login, isAuthenticated } = useAdminAuth()
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Giriş zamanı xəta baş verdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Lock size={18} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Admin Girişi</h1>
            <p className="text-xs text-slate-400">
              Amasiyalılar layihəsinin idarəetmə panelinə giriş
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-200">E-poçt</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin@amasiyalilar.az"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-200">Şifrə</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Şifrənizi daxil edin"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-700/70 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Giriş edilir...' : 'Daxil ol'}
          </button>

          <p className="text-[11px] text-slate-500 mt-2">
            Test üçün nümunə giriş: <span className="font-mono">admin@amasiyalilar.az</span> /
            <span className="font-mono ml-1">admin123</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
