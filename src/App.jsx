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
import AllVeteransPage from './pages/Veterans/AllVeteransPage'
import VeteranDetailsPage from './pages/Veterans/VeteranDetailsPage'
import AllHeroesPage from './pages/Heroes/AllHeroesPage'
import HeroDetailsPage from './pages/Heroes/HeroDetailsPage'
import AllDocumentariesPage from './pages/Documentaries/AllDocumentariesPage'
import DocumentaryDetailsPage from './pages/Documentaries/DocumentaryDetailsPage'
import LocusDetailsPage from './pages/Locus/LocusDetailsPage'
import AllLocusPage from './pages/Locus/AllLocusPage'
import AboutPage from './pages/About'
import AllVillagesPage from './pages/Locus/Villages/AllVillagesPage'
import VillageDetailsPage from './pages/Locus/Villages/VillageDetailsPage'
import AllDistrictsPage from './pages/WesternAzerbaijan/AllDistrictsPage'
import DistrictDetailsPage from './pages/WesternAzerbaijan/DistrictDetailsPage'
import AllCountiesPage from './pages/WesternAzerbaijan/AllCountiesPage'
import CountyDetailsPage from './pages/WesternAzerbaijan/CountyDetailsPage'
import CityDetailsPage from './pages/WesternAzerbaijan/CityDetailsPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage/>} />
          <Route path="about" element={<AboutPage />} />
          <Route path="news" element={<AllNewsPage />} />
          <Route path="news/:slug" element={<NewDetailsPage />} />
          <Route path="author/:authorName" element={<AuthorNewsPage />} />
          <Route path="martyrs" element={<AllMartyrsPage />} />
          <Route path="martyrs/:slug" element={<MartyrDetailsPage />} />
          <Route path="veterans" element={<AllVeteransPage />} />
          <Route path="veterans/:slug" element={<VeteranDetailsPage />} />
          <Route path="heroes" element={<AllHeroesPage />} />
          <Route path="heroes/:slug" element={<HeroDetailsPage />} />
          <Route path="documentaries" element={<AllDocumentariesPage />} />
          <Route path="documentaries/:slug" element={<DocumentaryDetailsPage />} />
          <Route path="locus" element={<AllLocusPage />} />
          <Route path="locus/:slug" element={<LocusDetailsPage />} />
          <Route path="locus/villages" element={<AllVillagesPage />} />
          <Route path="locus/villages/:slug" element={<VillageDetailsPage />} />
          <Route path="western-azerbaijan/city-and-districts/districts" element={<AllDistrictsPage />} />
          <Route path="western-azerbaijan/city-and-districts/districts/:slug" element={<DistrictDetailsPage />} />
          <Route path="western-azerbaijan/city-and-districts/counties" element={<AllCountiesPage />} />
          <Route path="western-azerbaijan/city-and-districts/counties/:slug" element={<CountyDetailsPage />} />
          <Route path="western-azerbaijan/city" element={<CityDetailsPage />} />
        </Route>

        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<div className="py-6">Yönetim Paneli</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
