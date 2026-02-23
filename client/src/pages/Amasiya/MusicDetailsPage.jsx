import React, { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Music2, Clock, Calendar, Tag } from 'lucide-react'
import allMusics from '../../mockDatas/allMusics.json'

const MusicDetailsPage = () => {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const music = useMemo(() => {
    return Array.isArray(allMusics) ? allMusics.find((m) => m.slug === slug) : null
  }, [slug])

  if (!music) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız musiqi tapılmadı və ya mövcud deyil.</p>
        <Link
          to="/amasiyalilar/musics"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Musiqi siyahısına qayıt
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(music.releasedAt).toLocaleDateString('az-Latn-AZ', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 pt-6 pb-10">
          <Link
            to="/amasiyalilar/musics"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Geri qayıt</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-square bg-gray-800">
                <img
                  src={music.cover}
                  alt={music.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  <Music2 size={14} />
                  <span>{music.genre}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                {music.title}
              </h1>
              <p className="text-lg text-white/80 mb-4">{music.artist}</p>

              <div className="flex flex-wrap gap-4 text-sm text-white/80 mb-6">
                <div className="inline-flex items-center gap-2">
                  <Clock size={18} className="text-blue-300" />
                  <span>{music.duration}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Calendar size={18} className="text-blue-300" />
                  <span>{formattedDate}</span>
                </div>
                <span className="text-[11px] uppercase tracking-wide bg-blue-700/80 text-white px-2.5 py-1 rounded-full border border-blue-400/60">
                  Amasiya
                </span>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <audio controls className="w-full">
                  <source src={music.audioUrl} type="audio/mpeg" />
                  Sizin brauzer audio oxutmanı dəstəkləmir.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Musiqi haqqında</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {music.description}
            </p>
          </div>
          <div className="lg:col-span-4">
            {Array.isArray(music.tags) && music.tags.length > 0 ? (
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">Açar sözlər</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {music.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicDetailsPage
