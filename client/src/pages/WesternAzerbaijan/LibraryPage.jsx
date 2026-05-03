import React, { useEffect, useMemo, useState } from 'react'
import { Search, Book, Calendar, Tag, ExternalLink, Feather, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchLibrary } from './services'

const LibraryPage = () => {
  const [base, setBase] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Hamısı')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        const list = await fetchLibrary({ limit: 1000 })
        if (!isMounted) return
        setBase(Array.isArray(list) ? list : [])
      } catch (err) {
        if (isMounted) setError(err.message || 'Kitablar yüklənərkən xəta baş verdi')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [])

  const genres = useMemo(() => {
    const set = new Set()
    base.forEach(b => Array.isArray(b.genres) && b.genres.forEach(g => set.add(g)))
    return ['Hamısı', ...Array.from(set)]
  }, [base])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const byQuery = q
      ? base.filter(b => {
          const inTitle = b.title.toLowerCase().includes(q)
          const inAuthor = b.authorName.toLowerCase().includes(q)
          const inYear = b.year?.toString().toLowerCase().includes(q)
          const inGenres = Array.isArray(b.genres) && b.genres.some(g => g.toLowerCase().includes(q))
          const inTags = Array.isArray(b.tags) && b.tags.some(t => t.toLowerCase().includes(q))
          return inTitle || inAuthor || inYear || inGenres || inTags
        })
      : base
    if (genre === 'Hamısı') return byQuery
    return byQuery.filter(b => Array.isArray(b.genres) && b.genres.includes(genre))
  }, [query, genre, base])

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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-green-600" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-900">Xəta baş verdi</h3>
            <p className="text-gray-500 mt-2">{error}</p>
          </div>
        ) : null}
        <div className="max-w-3xl mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 tracking-tight leading-[0.95]">
            Kitabxana
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Qərbi Azərbaycan müəlliflərinin kitabları, toplusu və nəşrləri.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
          <div className="relative max-w-xl w-full">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Kitab adı, müəllif, janr, il və ya etiket axtar..."
              className="w-full pl-3 pr-9 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
              Cəmi: {filtered.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((b) => (
            <Link to={`/western-azerbaijan/library/${b.slug}`} key={b.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={b.cover} alt={b.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Book size={16} className="text-indigo-600" />
                  <h3 className="text-lg font-bold">{b.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Feather size={14} className="text-purple-600" />
                  <span>{b.authorName}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="inline-flex items-center gap-1"><Calendar size={14} /> {b.year}</span>
                  {Array.isArray(b.genres) && b.genres.length > 0 ? (
                    <span className="inline-flex items-center gap-1"><Tag size={14} /> {b.genres.join(', ')}</span>
                  ) : null}
                </div>
                {Array.isArray(b.tags) && b.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {b.tags.map((t, i) => (
                      <span key={i} className="text-xs text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
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

export default LibraryPage
