import React, { useMemo, useState } from 'react'
import { Search, Calendar, MapPin, Award, Briefcase, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import allIntellectuals from '../../mockDatas/allIntellectuals.json'

const AllIntellectualsPage = () => {
  const intellectuals = useMemo(() => {
    return Array.isArray(allIntellectuals) ? allIntellectuals : []
  }, [])

  const [query, setQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Extract unique regions for filter
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(intellectuals.map(i => i.region).filter(Boolean))]
    return uniqueRegions.sort()
  }, [intellectuals])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return intellectuals.filter(item => {
      // Search logic
      const inName = item.name.toLowerCase().includes(q)
      const inDesc = item.description?.toLowerCase().includes(q)
      const inPlace = item.birthplace?.toLowerCase().includes(q)
      const inProf = item.profession?.toLowerCase().includes(q)
      const inRegion = item.region?.toLowerCase().includes(q)
      
      const matchesSearch = !q || inName || inDesc || inPlace || inProf || inRegion
      
      // Filter logic
      const matchesRegion = !selectedRegion || item.region === selectedRegion

      return matchesSearch && matchesRegion
    })
  }, [query, selectedRegion, intellectuals])

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
            Qərbi Azərbaycan Ziyalıları
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Tarix boyu Qərbi Azərbaycan torpaqlarında yetişmiş, elm, mədəniyyət, incəsənət və ictimai-siyasi həyatda silinməz izlər qoymuş görkəmli şəxsiyyətlər.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Ziyalı axtar (ad, peşə, yer)..."
              className="w-full pl-3 pr-9 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative min-w-[200px]">
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Bütün Regionlar</option>
              {regions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <span className="flex items-center justify-center text-sm text-gray-500 bg-gray-50 px-4 py-2.5 rounded-md border border-gray-200 whitespace-nowrap">
            Cəmi: {filtered.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((item) => (
            <Link to={`/western-azerbaijan/intellectuals/${item.slug}`} key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              {/* Image Container */}
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.name}</h3>
                  {item.profession && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                      <Briefcase size={12} className="mr-1" />
                      {item.profession.split(',')[0]}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{item.birthplace} {item.region && `(${item.region})`}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={14} className="text-gray-400" />
                    <span>{item.born} — {item.died}</span>
                  </div>
                </div>

                {/* Achievements Preview */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="pt-4 border-t border-gray-50">
                     <div className="flex items-start gap-2">
                        <Award size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {item.achievements.join(', ')}
                        </p>
                     </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Heç bir nəticə tapılmadı.</p>
          </div>
        )}

        {filtered.length > itemsPerPage && (
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Geri
              </button>
              
              {/* Simple pagination logic for now - show all pages if small count, or window if large (simplified here to show all for < 10 pages) */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1
                // Show first, last, current, and neighbors
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                   const active = page === currentPage
                   return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md border transition-colors ${
                        active 
                          ? 'border-blue-600 bg-blue-600 text-white' 
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                } else if (
                  (page === currentPage - 2 && page > 1) ||
                  (page === currentPage + 2 && page < totalPages)
                ) {
                  return <span key={page} className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                }
                return null
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                İrəli
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllIntellectualsPage
