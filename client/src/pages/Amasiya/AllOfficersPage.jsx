import React, { useEffect, useMemo, useState } from 'react'
import { Search, Calendar, MapPin, Award, Briefcase, ChevronDown, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchOfficials } from '../WesternAzerbaijan/services'

const AllOfficersPage = () => {
  const [officers, setOfficers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        const list = await fetchOfficials({ limit: 1000 })
        if (!isMounted) return
        setOfficers(Array.isArray(list) ? list : [])
      } catch (err) {
        if (isMounted) setError(err.message || 'Rəsmi şəxslər yüklənərkən xəta baş verdi')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return officers.filter(item => {
      const inName = item.name.toLowerCase().includes(q)
      const inDesc = item.description?.toLowerCase().includes(q)
      const inPlace = item.birthplace?.toLowerCase().includes(q)
      const inProf = item.profession?.toLowerCase().includes(q)
      
      return !q || inName || inDesc || inPlace || inProf
    })
  }, [query, officers])

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
      <div className="container mx-auto px-6 pt-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-900">Xəta baş verdi</h3>
            <p className="text-gray-500 mt-2">{error}</p>
          </div>
        ) : null}
        <div className="max-w-3xl mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 tracking-tight leading-[0.95]">
            Amasiya Vəzifəli Şəxsləri
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Amasiya rayonunun ictimai-siyasi həyatında rol oynamış, rayonun inkişafı üçün çalışmış rəhbər vəzifəli şəxslər və dövlət xadimləri.
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
              placeholder="Axtar (ad, vəzifə, yer)..."
              className="w-full pl-3 pr-9 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <span className="flex items-center justify-center text-sm text-gray-500 bg-gray-50 px-4 py-2.5 rounded-md border border-gray-200 whitespace-nowrap">
            Cəmi: {filtered.length}
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map(item => (
              <Link to={`/officers/${item.slug}`} key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white leading-tight mb-1">{item.name}</h3>
                    <p className="text-white/80 text-sm font-medium">{item.profession}</p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-blue-500" />
                      <span>{item.birthplace}</span>
                    </div>
                    {(item.born || item.died) && (
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-blue-500" />
                        <span>{item.born} — {item.died}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {item.description}
                  </p>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">
                      Ətraflı oxu
                    </span>
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                       <Briefcase size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Heç nə tapılmadı</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Axtarış sorğunuza uyğun nəticə tapılmadı. Zəhmət olmasa başqa açar sözlərlə yoxlayın.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Əvvəlki
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-md border ${
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Sonrakı
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllOfficersPage
