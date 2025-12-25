import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import PrivateLayout from './layouts/PrivateLayout'
import HomePage from './pages/HomePage'
import AllNewsPage from './pages/News/AllNewsPage'
import NewDetailsPage from './pages/News/NewDetailsPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage/>} />
          <Route path="news" element={<AllNewsPage />} />
          <Route path="news/:slug" element={<NewDetailsPage />} />
        </Route>

        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<div className="py-6">Yönetim Paneli</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
