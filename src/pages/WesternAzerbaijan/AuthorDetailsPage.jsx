import React, { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Feather, MapPin, Calendar, Book, Tag, Images } from 'lucide-react'
import allAuthors from '../../mockDatas/allAuthors.json'

const AuthorDetailsPage = () => {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const author = useMemo(() => {
    return Array.isArray(allAuthors) ? allAuthors.find(a => a.slug === slug) : null
  }, [slug])

  if (!author) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız müəllif haqqında məlumat mövcud deyil.</p>
        <Link to="/western-azerbaijan/authors" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Siyahıya Qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/western-azerbaijan/authors"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} className="text-gray-700 group-hover:text-blue-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Geri Qayıt</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative h-80 md:h-[420px] w-full">
            <img
              src={author.image}
              alt={author.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
              <div className="container mx-auto px-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest bg-purple-600 text-white px-3 py-1 rounded-full">
                    Yazar/Şair
                  </span>
                  <span className="text-gray-200 text-xs bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    Qərbi Azərbaycan
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {author.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed text-base">
                  {author.description}
                </p>
              </div>

              {Array.isArray(author.genres) && author.genres.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Feather size={18} className="text-purple-600" />
                    <div className="text-lg font-bold">Janrlar</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {author.genres.map((g, i) => (
                      <span key={i} className="text-xs text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {Array.isArray(author.works) && author.works.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Book size={18} className="text-indigo-600" />
                    <div className="text-lg font-bold">Əsərlər</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {author.works.map((w, i) => (
                      <div key={i} className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Book size={16} className="text-indigo-600" />
                          <div className="text-sm font-semibold">{w}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {Array.isArray(author.tags) && author.tags.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={18} className="text-green-600" />
                    <div className="text-lg font-bold">Etiketlər</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {author.tags.map((t, i) => (
                      <span key={i} className="text-xs text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
                <div className="text-lg font-bold text-gray-900 mb-4">Qısa Məlumat</div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-purple-600" />
                    <span>Doğum yeri: {author.birthplace}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-purple-600" />
                    <span>Tarix: {author.born}{author.died ? ` — ${author.died}` : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Book size={16} className="text-purple-600" />
                    <span>Əsər sayı: {author.stats?.worksCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorDetailsPage
