import React, { useEffect, useState } from 'react'
import { Map, Ruler, Mountain, Landmark, Users, CalendarDays, Images, BookOpen, Tag, ExternalLink, Loader2 } from 'lucide-react'
import { getWesternAbout } from './services/westernAboutService'

const AboutPage = () => {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    const fetchData = async () => {
      try {
        const response = await getWesternAbout()
        if (response.about) {
          setAbout(response.about)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600">
        <p>Xəta baş verdi: {error}</p>
      </div>
    )
  }

  if (!about) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-600">
        <p>Məlumat tapılmadı</p>
      </div>
    )
  }

  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-10">
          <div className="relative overflow-hidden rounded-xl aspect-video md:aspect-auto md:h-full">
            {about.photos && about.photos.length > 0 ? (
              <img
                src={about.photos[0]}
                alt={about.title}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
                <Images className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">{about.title}</h1>
            <div className="text-xl text-gray-600 mb-6 font-medium">{about.subtitle}</div>
            {Array.isArray(about.overview) && (
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                {about.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 mb-20">
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline */}
            <div className="rounded-2xl border border-gray-100 p-8 bg-gray-50 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <CalendarDays className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Tarixi Xronologiya</h2>
              </div>
              {Array.isArray(about.timeline) && about.timeline.length > 0 ? (
                <div className="relative border-l-2 border-blue-100 ml-3 space-y-8 pl-8 py-2">
                  {about.timeline.map((t, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full border-4 border-white bg-blue-600 shadow-sm"></div>
                      <div>
                        <div className="text-lg font-bold text-blue-900 mb-1">{t.year}</div>
                        <div className="text-gray-700 leading-relaxed">{t.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic">Məlumat yoxdur.</div>
              )}
            </div>

            {/* Culture */}
            <div className="rounded-2xl border border-gray-100 p-8 bg-white shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Mədəni İrs</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-purple-700 font-semibold bg-purple-50 p-2 rounded-lg w-fit">
                    <BookOpen size={18} />
                    <span>Ədəbiyyat</span>
                  </div>
                  <ul className="space-y-3">
                    {about.culture?.literature?.map((item, i) => (
                      <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4 text-green-700 font-semibold bg-green-50 p-2 rounded-lg w-fit">
                    <Tag size={18} />
                    <span>Musiqi</span>
                  </div>
                  <ul className="space-y-3">
                    {about.culture?.music?.map((item, i) => (
                      <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4 text-orange-700 font-semibold bg-orange-50 p-2 rounded-lg w-fit">
                    <Landmark size={18} />
                    <span>Memarlıq</span>
                  </div>
                  <ul className="space-y-3">
                    {about.culture?.architecture?.map((item, i) => (
                      <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Stats */}
            <div className="rounded-2xl border border-orange-100 p-6 bg-orange-50/50">
              <div className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Ruler className="text-orange-600" size={20} />
                Qısa Statistikalar
              </div>
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tarixi Ərazi</div>
                  <div className="font-bold text-gray-900">{about.stats?.historicalArea || '-'}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bölgə Sayı</div>
                  <div className="font-bold text-gray-900">{about.stats?.regionsCount || '-'}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mədəni Abidələr</div>
                  <div className="font-bold text-gray-900">{about.stats?.culturalSites || '-'}</div>
                </div>
                
                {about.stats?.keyRegions && about.stats.keyRegions.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Əsas Bölgələr</div>
                    <div className="flex flex-wrap gap-2">
                      {about.stats.keyRegions.map((region, i) => (
                        <span key={i} className="px-2 py-1 bg-white border border-orange-200 rounded-md text-xs font-medium text-orange-800">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Preview */}
            <div className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Images className="text-blue-600" size={20} />
                  Qalereya
                </div>
              </div>
              {Array.isArray(about.photos) && about.photos.length > 1 ? (
                <div className="grid grid-cols-2 gap-2">
                  {about.photos.slice(1, 5).map((p, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
                      <img 
                        src={p} 
                        alt={`Gallery ${i + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg">
                  Əlavə şəkil yoxdur
                </div>
              )}
            </div>

            {/* References */}
            <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
              <div className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ExternalLink className="text-gray-600" size={20} />
                İstinadlar
              </div>
              {Array.isArray(about.references) && about.references.length > 0 ? (
                <div className="space-y-3">
                  {about.references.map((ref, i) => (
                    <a 
                      key={i} 
                      href={ref.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ExternalLink size={14} />
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">{ref.label}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">İstinad yoxdur.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
