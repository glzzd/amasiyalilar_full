import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  return (
    <div className="min-h-dvh bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 h-12 flex items-center">
          <span className="text-sm font-semibold">Admin Panel</span>
        </div>
      </header>
      <main className="container mx-auto px-4 py-4">
        <Outlet />
      </main>
    </div>
  )
}

export default PrivateLayout
