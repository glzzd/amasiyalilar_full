import React, { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import data from '../../../mockDatas/ourIntellectuals.json'

const OurIntellectuals = () => {
  const items = useMemo(() => (Array.isArray(data) ? data : []), [])
  const [pageSize, setPageSize] = useState(2)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const apply = () => setPageSize(mq.matches ? 4 : 2)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const pages = useMemo(() => {
    const out = []
    for (let i = 0; i < items.length; i += pageSize) {
      out.push(items.slice(i, i + pageSize))
    }
    return out
  }, [items, pageSize])

  const [page, setPage] = useState(0)
  const safePage = Math.min(Math.max(0, pages.length - 1), page)

  const canPrev = safePage > 0
  const canNext = safePage < Math.max(0, pages.length - 1)
  const prev = () => setPage(safePage === 0 ? Math.max(0, pages.length - 1) : safePage - 1)
  const next = () => setPage(safePage === Math.max(0, pages.length - 1) ? 0 : safePage + 1)

  useEffect(() => {
    const id = setInterval(() => {
      setPage(safePage === Math.max(0, pages.length - 1) ? 0 : safePage + 1)
    }, 5000)
    return () => clearInterval(id)
  }, [safePage, pages.length])

  if (items.length === 0) return null

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Ziyalılarımız</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            disabled={!canPrev}
            className={`inline-flex items-center justify-center size-9 rounded-md border border-slate-200 dark:border-slate-800 ${canPrev ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500 cursor-not-allowed'}`}
            aria-label="Öncəki"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
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
          style={{ transform: `translateX(-${safePage * 100}%)` }}
        >
          {pages.map((group, gi) => (
            <div key={`p-${gi}`} className="w-full shrink-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {group.map(item => (
                  <div key={item.id} className="group relative rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="w-full aspect-[3/4] max-h-[160px] md:max-h-[200px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-2 md:p-3">
                      <div className="text-slate-900 dark:text-slate-100 font-semibold text-xs md:text-sm">{item.name}</div>
                      <div className="text-slate-600 dark:text-slate-300 text-[10px] md:text-[11px]">{item.title}</div>
                      <div className="text-slate-700 dark:text-slate-300 text-[11px] md:text-xs mt-2 line-clamp-3">{item.bio}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <img src={item.sharedByImage} alt={item.sharedBy} className="w-4 h-4 md:w-5 md:h-5 rounded-full object-cover" />
                        <div className="text-[10px] md:text-[11px] text-slate-500 dark:text-slate-400">Paylaşan: {item.sharedBy}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurIntellectuals
