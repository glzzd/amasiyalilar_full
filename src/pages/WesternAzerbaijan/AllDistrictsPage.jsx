import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Map, Ruler, Mountain, Landmark, Users, CalendarDays } from 'lucide-react'
import allDistricts from '../../mockDatas/allDistricts.json'

const AllDistrictsPage = () => {
  const rayonlar = useMemo(() => {
    return Array.isArray(allDistricts) ? allDistricts : []
  }, [allDistricts])
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rayonlar
    return rayonlar.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q)
    )
  }, [query, rayonlar])

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  }, [filtered, currentPage])

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24">

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 tracking-tight leading-[0.95]">
            Rayonlar
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Qərbi Azərbaycanın rayonları. Tarixi yaşam, mədəni irs və folklor izləri ilə yadda qalan bölgələr.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="relative max-w-xl w-full">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Rayon adı və ya məlumat axtar..."
              className="w-full pl-3 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Map size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            Cəmi: {filtered.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((item) => (
            <Link key={item.id} to={`/western-azerbaijan/city-and-districts/districts/${item.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Map size={16} className="text-blue-600" />
                  <h3 className="text-lg font-bold">{item.name}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1"><Ruler size={14} /> {item.stats?.area || item.area}</span>
                  <span className="inline-flex items-center gap-1"><Users size={14} /> {item.stats?.population || item.population}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                  <span className="inline-flex items-center gap-1"><Mountain size={14} /> {item.stats?.elevation}</span>
                  <span className="inline-flex items-center gap-1"><Landmark size={14} /> {item.stats?.villagesCount} kənd</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                  <span className="inline-flex items-center gap-1"><Map size={14} /> {item.center}</span>
                  <span className="inline-flex items-center gap-1"><CalendarDays size={14} /> {item.founded}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Əvvəlki</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-lg text-sm ${page === currentPage ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Sonrakı</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllDistrictsPage
