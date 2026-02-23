import React, { useEffect } from 'react'
import { Map, Ruler, Mountain, Landmark, Users, CalendarDays, Images, BookOpen, Tag, ExternalLink } from 'lucide-react'
import about from '../../mockDatas/aboutWesternAzerbaijan.json'

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-10">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={about.photos?.[0]}
              alt={about.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black mb-4">{about.title}</div>
            <div className="text-gray-600 mb-6">{about.subtitle}</div>
            {Array.isArray(about.overview) ? (
              <div className="space-y-3 text-gray-700 leading-relaxed">
                {about.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
              <div className="text-lg font-bold text-gray-900 mb-4">Zaman xətti</div>
              {Array.isArray(about.timeline) && about.timeline.length > 0 ? (
                <div className="space-y-4">
                  {about.timeline.map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CalendarDays size={18} className="text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold">{t.year}</div>
                        <div className="text-sm text-gray-700">{t.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600">Zaman çizgisi məlumatı yoxdur.</div>
              )}
            </div>

            <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
              <div className="text-lg font-bold text-gray-900 mb-4">Mədəniyyət</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3"><BookOpen size={18} className="text-purple-600" /><div className="font-semibold">Ədəbiyyat</div></div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {about.culture?.literature?.map((item, i) => (<li key={i}>{item}</li>))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3"><Tag size={18} className="text-green-600" /><div className="font-semibold">Musiqi</div></div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {about.culture?.music?.map((item, i) => (<li key={i}>{item}</li>))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3"><Landmark size={18} className="text-orange-600" /><div className="font-semibold">Memarlıq</div></div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {about.culture?.architecture?.map((item, i) => (<li key={i}>{item}</li>))}
                  </ul>
                </div>
              </div>
            </div>

         
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
              <div className="text-lg font-bold text-gray-900 mb-4">Qısa Məlumat</div>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2"><Ruler size={16} className="text-orange-600" /><span>Tarixi ərazi: {about.stats?.historicalArea}</span></div>
                <div className="flex items-center gap-2"><Users size={16} className="text-orange-600" /><span>Bölgə sayı: {about.stats?.regionsCount}</span></div>
                <div className="flex items-center gap-2"><Landmark size={16} className="text-orange-600" /><span>Mədəni obyektlər: {about.stats?.culturalSites}</span></div>
                <div className="flex items-center gap-2"><Mountain size={16} className="text-orange-600" /><span>Əsas bölgələr: {Array.isArray(about.stats?.keyRegions) ? about.stats.keyRegions.join(', ') : ''}</span></div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
              <div className="text-lg font-bold text-gray-900 mb-4">İstinadlar</div>
              {Array.isArray(about.references) && about.references.length > 0 ? (
                <div className="space-y-3">
                  {about.references.map((ref, i) => (
                    <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                      <ExternalLink size={16} />
                      <span>{ref.label}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600">İstinad yoxdur.</div>
              )}
            </div>

            <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
              <div className="text-lg font-bold text-gray-900 mb-4">Qalereya</div>
              {Array.isArray(about.photos) && about.photos.length > 1 ? (
                <div className="grid grid-cols-2 gap-3">
                  {about.photos.slice(1).map((p, i) => (
                    <div key={i} className="rounded-lg overflow-hidden border border-gray-200">
                      <img src={p} alt={`Photo ${i + 2}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600">Şəkil mövcud deyil.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
