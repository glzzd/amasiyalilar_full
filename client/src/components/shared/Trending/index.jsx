import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import allNews from '../../../mockDatas/allNews.json'

const TrendingNews = () => {
  const sortedByViews = useMemo(() => {
    const arr = Array.isArray(allNews) ? allNews.filter(n => typeof n.views === 'number') : []
    return arr.sort((a, b) => (b.views || 0) - (a.views || 0))
  }, [])

  const pageSize = 4
  const pages = useMemo(() => {
    const out = []
    for (let i = 0; i < sortedByViews.length; i += pageSize) {
      out.push(sortedByViews.slice(i, i + pageSize))
    }
    return out
  }, [sortedByViews])

  const [page, setPage] = useState(0)
  const canPrev = page > 0
  const canNext = page < Math.max(0, pages.length - 1)

  const goPrev = () => setPage(p => Math.max(0, p - 1))
  const goNext = () => setPage(p => Math.min(pages.length - 1, p + 1))

  React.useEffect(() => {
    setPage(p => Math.min(Math.max(0, pages.length - 1), p))
  }, [pages.length])

  if (pages.length === 0) return null

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Trenddə olan xəbərlər</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className={`inline-flex items-center justify-center size-9 rounded-md border border-slate-200 dark:border-slate-800 ${canPrev ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500 cursor-not-allowed'}`}
            aria-label="Öncəki"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            className={`inline-flex items-center justify-center size-9 rounded-md border border-slate-200 dark:border-slate-800 ${canNext ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500 cursor-not-allowed'}`}
            aria-label="Sonrakı"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((group, gi) => (
            <div key={`page-${gi}`} className="min-w-full shrink-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 min-w-0 w-full">
                {group.map(item => (
                  <Link
                    key={item._id}
                    to={item.slug ? `/news/${item.slug}` : '#'}
                    className="group relative block overflow-hidden rounded-md min-w-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[96px] sm:h-[110px] md:h-[128px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
                    <div className="absolute left-0 right-0 bottom-0 p-2 sm:p-3">
                      <div className="text-white font-semibold text-[11px] sm:text-xs line-clamp-1 group-hover:text-red-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-white/80 text-[10px] sm:text-[11px] mt-1 truncate">
                        {(item.author && item.author.name) ? item.author.name : ''}{item.author && item.author.name ? ' · ' : ''}{Number(item.views || 0).toLocaleString('tr-TR')} oxunma
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingNews
