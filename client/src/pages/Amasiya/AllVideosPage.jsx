import React, { useMemo, useState } from 'react'
import { Search, Clock, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import allVideos from '../../mockDatas/allVideos.json'

const AllVideosPage = () => {
  const videos = useMemo(() => {
    if (!Array.isArray(allVideos)) return []
    return allVideos.filter((v) => v.region === 'Amasiya')
  }, [])

  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return videos.filter((video) => {
      const inTitle = video.title.toLowerCase().includes(q)
      const inDuration = video.duration?.toLowerCase().includes(q)

      return !q || inTitle || inDuration
    })
  }, [query, videos])

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
            Amasiya Videoları
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Amasiya ilə bağlı tədbir, sənədli, festival və digər video materiallar.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch md:items-center">
          <div className="relative flex-grow">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Axtar (başlıq, müddət)..."
              className="w-full pl-3 pr-9 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <span className="flex items-center justify-center text-sm text-gray-500 bg-gray-50 px-4 py-2.5 rounded-md border border-gray-200 whitespace-nowrap">
            Cəmi: {filtered.length}
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentItems.map((video) => (
              <Link
                key={video.id}
                to={`/amasiyalilar/videos/${video.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-white leading-snug line-clamp-2">
                        {video.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      <Clock size={14} />
                      {video.duration}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between text-xs text-gray-500">
                  <div className="inline-flex items-center gap-1.5">
                    <Calendar size={14} className="text-blue-500" />
                    <span>
                      {new Date(video.publishedAt).toLocaleDateString('az-Latn-AZ', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                      })}
                    </span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wide bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100">
                    Amasiya
                  </span>
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
              Axtarış sorğunuza uyğun video tapılmadı. Zəhmət olmasa başqa açar sözlərlə sınayın.
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

export default AllVideosPage
