import React, { useEffect, useMemo, useState } from 'react'
import { Play } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { fetchDocumentaries } from '@/pages/Documentaries/documentariesService'

const LatestVideos = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        const list = await fetchDocumentaries({ limit: 20 })
        if (!isMounted) return
        const mapped = Array.isArray(list)
          ? list
              .filter((d) => d && (d._id || d.id || d.slug) && d.thumbnail)
              .map((d) => ({
                id: d._id || d.id || d.slug,
                title: d.title,
                thumbnail: d.thumbnail,
                duration: d.duration,
                publishedAt: d.publishedAt || d.publishDate || d.createdAt,
                videoUrl: d.videoUrl,
                slug: d.slug
              }))
          : []
        setVideos(mapped)
      } catch {
        if (isMounted) setVideos([])
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [])

  const sortedVideos = useMemo(() => {
    return [...videos].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  }, [videos])

  const [activeId, setActiveId] = useState(null)
  const list = useMemo(() => sortedVideos.slice(0, 5), [sortedVideos])
  useEffect(() => {
    if (!activeId && list.length > 0) {
      setActiveId(list[0].id)
    }
  }, [activeId, list])
  useEffect(() => {
    if (list.length === 0) return
    const id = setInterval(() => {
      const idx = list.findIndex(v => v.id === activeId)
      const nextIdx = idx >= 0 ? (idx + 1) % list.length : 0
      setActiveId(list[nextIdx].id)
    }, 3000)
    return () => clearInterval(id)
  }, [activeId, list])

  const active = useMemo(() => sortedVideos.find(v => v.id === activeId) || null, [sortedVideos, activeId])

  if (sortedVideos.length === 0) return null

  return (
    <section className="rounded-md bg-[#0e172c] text-white p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg md:text-xl font-bold">Son Videolar</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] items-start">
        <div className="flex flex-col gap-[12px]">
          {list.map(v => {
            const isActive = v.id === activeId
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveId(v.id)}
                className="relative flex items-center gap-3 w-full text-left rounded-md overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
              >
                {isActive ? <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#ff0000]" /> : null}
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-[120px] h-[70px] md:w-[140px] md:h-[80px] object-cover rounded-l-md"
                />
                <div className="py-2 pr-3">
                  <div className="text-sm md:text-base font-semibold text-white line-clamp-2">{v.title}</div>
                  <div className="text-xs text-white/70 mt-1">{v.duration}</div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="rounded-md overflow-hidden bg-white/5">
          {active ? (
            <div>
              <div className="relative">
                <div className="w-full aspect-video bg-black/30">
                  <img
                    src={active.thumbnail}
                    alt={active.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-600/90 text-white shadow-lg">
                    <Play size={20} />
                  </div>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <div className="text-lg md:text-xl font-bold">{active.title}</div>
                <div className="text-xs md:text-sm text-white/70 mt-1">
                  {active.duration} • {formatDate(active.publishedAt)}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default LatestVideos
