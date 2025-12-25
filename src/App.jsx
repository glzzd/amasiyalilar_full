import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import PrivateLayout from './layouts/PrivateLayout'
import HomePage from './pages/HomePage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage/>} />
        </Route>

        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<div className="py-6">Yönetim Paneli</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
