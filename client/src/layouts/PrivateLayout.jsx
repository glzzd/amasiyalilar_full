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
      <div className="min-h-dvh bg-gray-50 text-gray-900 flex items-center justify-center">
        <div className="text-sm text-gray-500">Yüklənir...</div>
      </div>
    )
  }

  if (!isAuthenticated && !isLoginRoute) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Admin Panel</span>
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              {user?.email && (
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              )}
              <button
                type="button"
                onClick={logout}
                className="text-sm px-4 py-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-red-600 transition-all shadow-sm hover:shadow"
              >
                Çıxış
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {isAuthenticated && !isLoginRoute ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-64 flex-shrink-0">
               <AdminSidebar />
            </aside>
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
