import React, { useMemo, useState } from 'react'
import { Search, Landmark, MapPin, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import allMonuments from '../../mockDatas/allMonuments.json'

const AllMonumentsPage = () => {
  const base = useMemo(() => Array.isArray(allMonuments) ? allMonuments : [], [])
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return base
    return base.filter(m => {
      const inName = m.name.toLowerCase().includes(q)
      const inDesc = m.description?.toLowerCase().includes(q)
      const inRegion = m.region?.toLowerCase().includes(q)
      const inType = m.type?.toLowerCase().includes(q)
      const inPeriod = m.period?.toLowerCase().includes(q)
      const inLocation = m.location?.toLowerCase().includes(q)
      return inName || inDesc || inRegion || inType || inPeriod || inLocation
    })
  }, [query, base])

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
            Abidələr
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Qərbi Azərbaycanın qalaları, karvansaraları, məscidləri və tarixi memarlıq nümunələri.
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
              placeholder="Abidə adı, bölgə, dövr, tip və ya məkan axtar..."
              className="w-full pl-3 pr-9 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            Cəmi: {filtered.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((m) => (
            <Link key={m.id} to={`/western-azerbaijan/monuments/${m.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Landmark size={16} className="text-indigo-600" />
                  <h3 className="text-lg font-bold">{m.name}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{m.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1"><MapPin size={14} /> {m.region} • {m.location}</span>
                  <span className="inline-flex items-center gap-1"><Calendar size={14} /> {m.period}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-700 mt-3">
                  <span className="px-3 py-1 rounded-full border border-gray-200 bg-gray-50">{m.type}</span>
                  {m.stats?.built ? (
                    <span className="px-3 py-1 rounded-full border border-gray-200 bg-gray-50">{m.stats.built}</span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length > itemsPerPage ? (
          <div className="mt-10 flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1.5 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                Geri
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1
                const active = page === currentPage
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1.5 rounded-md border ${active ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {page}
                  </button>
                )
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1.5 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                İrəli
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AllMonumentsPage
