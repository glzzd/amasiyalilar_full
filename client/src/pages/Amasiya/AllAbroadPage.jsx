import React, { useMemo, useState } from 'react'
import { Search, Globe2, MapPin, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'
import allAbroads from '../../mockDatas/AllAbroads.json'

const AllAbroadPage = () => {
  const people = useMemo(() => {
    return Array.isArray(allAbroads) ? allAbroads : []
  }, [])

  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return people.filter((item) => {
      const inName = item.name.toLowerCase().includes(q)
      const inDesc = item.description?.toLowerCase().includes(q)
      const inBirth = item.birthplace?.toLowerCase().includes(q)
      const inCountry = item.country?.toLowerCase().includes(q)
      const inCity = item.city?.toLowerCase().includes(q)
      const inProfession = item.profession?.toLowerCase().includes(q)
      const inOrg = item.organization?.toLowerCase().includes(q)

      return (
        !q ||
        inName ||
        inDesc ||
        inBirth ||
        inCountry ||
        inCity ||
        inProfession ||
        inOrg
      )
    })
  }, [query, people])

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
        <div className="max-w-3xl mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 tracking-tight leading-[0.95]">
            Xaricdə Yaşayan Amasiyalılar
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Dünyanın müxtəlif ölkələrində yaşayan, təhsil alan və çalışan Amasiya mənşəli şəxslər.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch md:items-center">
          <div className="relative flex-grow max-w-xl">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Axtar (ad, ölkə, şəhər, sahə, təşkilat)..."
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
            {currentItems.map((item) => (
              <Link
                to={`/amasiyalilar/abroad/${item.slug}`}
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                      <Globe2 size={14} />
                      {item.country}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white leading-tight mb-1">{item.name}</h3>
                    <p className="text-white/80 text-sm font-medium line-clamp-1">
                      {item.profession}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-blue-500" />
                      <span>
                        {item.city}, {item.country}
                      </span>
                    </div>
                    {item.organization && (
                      <div className="flex items-center gap-1.5">
                        <Briefcase size={16} className="text-blue-500" />
                        <span className="line-clamp-1">{item.organization}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
              <Globe2 size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Heç nə tapılmadı</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Axtarış sorğunuza uyğun xaricdə yaşayan Amasiyalı tapılmadı. Zəhmət olmasa başqa açar sözlərlə
              yoxlayın.
            </p>
          </div>
        )}

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
                    className={`px-3 py-1.5 rounded-md border ${
                      active
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
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

export default AllAbroadPage
