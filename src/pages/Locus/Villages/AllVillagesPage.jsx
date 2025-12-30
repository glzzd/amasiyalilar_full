import React, { useMemo, useState } from 'react'
import { MapPin, Search, Landmark, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/shared/Breadcrumb'
import allVillages from '../../../mockDatas/allVillages.json'
import { cn } from '@/lib/utils'

const AllVillagesPage = () => {
  const [query, setQuery] = useState('')
  const [mahalFilter, setMahalFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const mahals = useMemo(() => {
    const set = new Set(allVillages.map(v => v.mahal))
    return ['all', ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    return allVillages.filter(v => {
      const matchesText =
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.mahal.toLowerCase().includes(query.toLowerCase()) ||
        (v.description || '').toLowerCase().includes(query.toLowerCase())
      const matchesMahal = mahalFilter === 'all' ? true : v.mahal === mahalFilter
      return matchesText && matchesMahal
    })
  }, [query, mahalFilter])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const currentVillages = useMemo(() => {
    const effectivePage = Math.min(currentPage, Math.max(1, totalPages || 1))
    const startIndex = (effectivePage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, filtered, totalPages])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24">
      

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-10">
        
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 tracking-tight leading-[0.95]">
            Bütün <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">Kəndlər</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Qərbi Azərbaycanın mahallarına aid kəndlər. Tarixi izlər, folklor və yerli ənənələrin davamedici yaddaşı.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
          <div className="relative max-w-xl w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Kənd adı, mahal və ya təsvir axtar..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Mahal:</label>
            <select
              value={mahalFilter}
              onChange={(e) => {
                setMahalFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm"
            >
              {mahals.map((m) => (
                <option key={m} value={m}>{m === 'all' ? 'Hamısı' : m}</option>
              ))}
            </select>
          </div>
        </div>

        {currentVillages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentVillages.map((v) => (
              <div key={v.id} className="group rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow">
                <div className="relative h-44">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute left-3 top-3 px-2 py-1 rounded-md bg-green-600 text-white text-xs font-semibold">
                    {v.mahal}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">{v.name}</h3>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={14} />
                      {v.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{v.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                      {v.populationHistoric}
                    </span>
                    {Array.isArray(v.tags) && v.tags.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  {v.slug ? (
                    <div className="mt-4 pt-3 border-top border-gray-100 flex justify-end">
                      <Link
                        to={`/locus/villages/${v.slug}`}
                        className="text-green-700 text-sm font-medium hover:text-green-800 transition-colors"
                      >
                        Ətraflı →
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Nəticə tapılmadı</h3>
            <p className="text-gray-500 mt-2">Axtarışınıza uyğun kənd tapılmadı.</p>
          </div>
        )}

        {filtered.length > itemsPerPage && (
          <div className="mt-16 flex justify-center">
            <div className="flex gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Əvvəlki</span>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                    currentPage === page 
                      ? "bg-green-600 text-white shadow-sm" 
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">Sonrakı</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllVillagesPage
