import React, { useEffect } from 'react'
import { Map, Ruler, Mountain, Landmark, Users, CalendarDays, Images } from 'lucide-react'
import city from '../../mockDatas/city.json'

const CityDetailsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (!city || !city.name) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Şəhər haqqında məlumat mövcud deyil.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative h-80 md:h-[420px] w-full">
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
              <div className="container mx-auto px-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest bg-red-600 text-white px-3 py-1 rounded-full">
                    Şəhər
                  </span>
                  <span className="text-gray-200 text-xs bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    Qərbi Azərbaycan
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {city.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed text-base">
                  {city.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-gray-100 p-5">
                  <div className="text-sm font-semibold text-gray-900 mb-3">Coğrafiya</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{city.geography}</p>
                </div>
                <div className="rounded-xl border border-gray-100 p-5">
                  <div className="text-sm font-semibold text-gray-900 mb-3">İqtisadiyyat</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{city.economy}</p>
                </div>
                <div className="rounded-xl border border-gray-100 p-5 md:col-span-2">
                  <div className="text-sm font-semibold text-gray-900 mb-3">Mədəniyyət</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{city.culture}</p>
                </div>
              </div>

              {Array.isArray(city.gallery) && city.gallery.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Images size={18} className="text-red-600" />
                    <div className="text-lg font-bold">Qalereya</div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {city.gallery.map((src, i) => (
                      <div key={i} className="rounded-lg overflow-hidden border border-gray-100">
                        <img src={src} alt={`${city.name} ${i + 1}`} className="w-full h-40 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {Array.isArray(city.landmarks) && city.landmarks.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Landmark size={18} className="text-indigo-600" />
                    <div className="text-lg font-bold">Abidələr</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {city.landmarks.map((lm, i) => (
                      <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
                        <div className="aspect-[16/10]">
                          <img src={lm.image} alt={lm.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <div className="text-base font-bold">{lm.title}</div>
                          <div className="text-xs text-gray-500">{lm.location} • {lm.period}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {Array.isArray(city.districts) && city.districts.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Landmark size={18} className="text-green-600" />
                    <div className="text-lg font-bold">Şəhər Rayonları</div>
                    <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                      Cəmi: {city.districts.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {city.districts.map((v, i) => (
                      <span key={i} className="text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                        {v}
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
                    <Ruler size={16} className="text-red-600" />
                    <span>Ərazi: {city.stats?.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-red-600" />
                    <span>Əhali: {city.stats?.population}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mountain size={16} className="text-red-600" />
                    <span>Hündürlük: {city.stats?.elevation}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-3" />
                  <div className="flex items-center gap-2">
                    <Map size={16} className="text-red-600" />
                    <span>Mərkəz: {city.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-red-600" />
                    <span>Təsis: {city.founded}</span>
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

export default CityDetailsPage
