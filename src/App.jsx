import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import PrivateLayout from './layouts/PrivateLayout'
import HomePage from './pages/HomePage'
import AllNewsPage from './pages/News/AllNewsPage'
import NewDetailsPage from './pages/News/NewDetailsPage'
import AuthorNewsPage from './pages/News/AuthorNewsPage'
import AllMartyrsPage from './pages/Martyrs/AllMartyrsPage'
import MartyrDetailsPage from './pages/Martyrs/MartyrDetailsPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage/>} />
          <Route path="news" element={<AllNewsPage />} />
          <Route path="news/:slug" element={<NewDetailsPage />} />
          <Route path="author/:authorName" element={<AuthorNewsPage />} />
          <Route path="martyrs" element={<AllMartyrsPage />} />
          <Route path="martyrs/:slug" element={<MartyrDetailsPage />} />
        </Route>

        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<div className="py-6">Yönetim Paneli</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
