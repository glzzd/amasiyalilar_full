import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import AdminSidebar from '../pages/(admin)/components/AdminSidebar'
import { AdminAuthProvider } from '../pages/(admin)/contexts/AdminAuthContext'
import { useAdminAuth } from '../pages/(admin)/contexts/useAdminAuth'

const PrivateShell = () => {
  const { isAuthenticated, loading, user, logout } = useAdminAuth()
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
        <div className="container mx-auto px-4 h-12 flex items-center gap-4">
          <span className="text-sm font-semibold">Admin Panel</span>
          {isAuthenticated && (
            <div className="ml-auto flex items-center gap-3">
              {user?.email && (
                <span className="text-xs text-slate-300">{user.email}</span>
              )}
              <button
                type="button"
                onClick={logout}
                className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 transition-colors"
              >
                Çıxış
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-4">
        {isAuthenticated && !isLoginRoute ? (
          <div className="flex gap-4">
            <AdminSidebar />
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}

const PrivateLayout = () => {
  return (
    <AdminAuthProvider>
      <PrivateShell />
    </AdminAuthProvider>
  )
}

export default PrivateLayout
