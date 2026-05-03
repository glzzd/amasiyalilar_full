import React, { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, PlayCircle } from 'lucide-react'
import allVideos from '../../mockDatas/allVideos.json'

const VideoDetailsPage = () => {
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  const video = useMemo(() => {
    return Array.isArray(allVideos) ? allVideos.find((item) => item.id === id) : null
  }, [id])

  if (!video || video.region !== 'Amasiya') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız video Amasiya bölməsində mövcud deyil.</p>
        <Link
          to="/amasiyalilar/videos"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Videolara Qayıt
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(video.publishedAt).toLocaleDateString('az-Latn-AZ', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })

  const toEmbeddableUrl = (input) => {
    if (!input || typeof input !== 'string') return ''
    const raw = input.trim()
    if (!raw) return ''

    if (raw.includes('youtube.com/embed/') || raw.includes('youtube-nocookie.com/embed/')) {
      return raw
    }

    try {
      const url = new URL(raw)
      const host = url.hostname.replace(/^www\./, '')

      if (host === 'youtu.be') {
        const id = url.pathname.split('/').filter(Boolean)[0]
        return id ? `https://www.youtube.com/embed/${id}` : ''
      }

      if (host.endsWith('youtube.com')) {
        if (url.pathname === '/watch') {
          const id = url.searchParams.get('v')
          return id ? `https://www.youtube.com/embed/${id}` : ''
        }
        if (url.pathname.startsWith('/shorts/')) {
          const id = url.pathname.split('/').filter(Boolean)[1]
          return id ? `https://www.youtube.com/embed/${id}` : ''
        }
        if (url.pathname.startsWith('/live/')) {
          const id = url.pathname.split('/').filter(Boolean)[1]
          return id ? `https://www.youtube.com/embed/${id}` : ''
        }
        if (url.pathname.startsWith('/embed/')) {
          const id = url.pathname.split('/').filter(Boolean)[1]
          return id ? `https://www.youtube.com/embed/${id}` : ''
        }
      }

      return raw
    } catch {
      return raw
    }
  }

  const iframeSrc = useMemo(() => {
    return toEmbeddableUrl(video.videoUrl)
  }, [video.videoUrl])

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 pt-6 pb-8">
          <Link
            to="/amasiyalilar/videos"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Geri Qayıt</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                {video.title}
              </h1>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3 text-sm text-gray-200">
              <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Clock size={16} className="text-blue-300" />
                <span className="font-medium">{video.duration}</span>
              </div>
              <div className="inline-flex items-center gap-2 text-gray-300">
                <Calendar size={18} className="text-blue-300" />
                <span>{formattedDate}</span>
              </div>
              <span className="text-[11px] uppercase tracking-wide bg-blue-700/80 text-white px-2.5 py-1 rounded-full border border-blue-400/60">
                Amasiya
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-10">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            {iframeSrc ? (
              <iframe
                src={iframeSrc}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                  <PlayCircle size={72} className="text-white/80 mb-3" />
                  <p className="text-sm text-white/80">
                    Video keçidi əlavə edilməyib, hazırda yalnız ön baxış mövcuddur.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDetailsPage
