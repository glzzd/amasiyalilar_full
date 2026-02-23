import React, { useMemo, useState } from 'react'
import { Search, Book, Calendar, MapPin, Feather } from 'lucide-react'
import { Link } from 'react-router-dom'
import allAuthors from '../../mockDatas/allAuthors.json'

const AllAuthorsPage = () => {
  const authors = useMemo(() => {
    return Array.isArray(allAuthors) ? allAuthors : []
  }, [])
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return authors
    return authors.filter(a => {
      const inName = a.name.toLowerCase().includes(q)
      const inDesc = a.description?.toLowerCase().includes(q)
      const inPlace = a.birthplace?.toLowerCase().includes(q)
      const inGenres = Array.isArray(a.genres) && a.genres.some(g => g.toLowerCase().includes(q))
      const inTags = Array.isArray(a.tags) && a.tags.some(t => t.toLowerCase().includes(q))
      return inName || inDesc || inPlace || inGenres || inTags
    })
  }, [query, authors])

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
            Yazıçılar və Şairlər
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Qərbi Azərbaycan ədəbiyyatının önəmli simaları. Şeir, hekayə, roman və publisistika sahələrində iz buraxan müəlliflər.
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
              placeholder="Yazar/şair, janr, məkan və ya etiket axtar..."
              className="w-full pl-3 pr-9 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            Cəmi: {filtered.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((a) => (
            <Link key={a.id} to={`/western-azerbaijan/authors/${a.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Feather size={16} className="text-purple-600" />
                  <h3 className="text-lg font-bold">{a.name}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{a.description}</p>
                {Array.isArray(a.genres) && a.genres.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {a.genres.map((g, i) => (
                      <span key={i} className="text-xs text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                        {g}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1"><MapPin size={14} /> {a.birthplace}</span>
                  <span className="inline-flex items-center gap-1"><Calendar size={14} /> {a.born}{a.died ? ` — ${a.died}` : ''}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                  <span className="inline-flex items-center gap-1"><Book size={14} /> {a.stats?.worksCount} əsər</span>
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

export default AllAuthorsPage
