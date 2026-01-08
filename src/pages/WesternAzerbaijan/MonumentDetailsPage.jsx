import React, { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Landmark, MapPin, Calendar, Image as ImageIcon, Ruler, Layers, Shield, BookOpen, Link as LinkIcon } from 'lucide-react'
import allMonuments from '../../mockDatas/allMonuments.json'

const MonumentDetailsPage = () => {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const monument = useMemo(() => {
    return Array.isArray(allMonuments) ? allMonuments.find(m => m.slug === slug) : null
  }, [slug])

  if (!monument) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız abidə haqqında məlumat mövcud deyil.</p>
        <Link to="/western-azerbaijan/monuments" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Abidələrə Qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/western-azerbaijan/monuments"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} className="text-gray-700 group-hover:text-blue-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Geri Qayıt</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative h-80 md:h-[420px] w-full">
            <img
              src={monument.image}
              alt={monument.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
              <div className="container mx-auto px-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest bg-indigo-600 text-white px-3 py-1 rounded-full">
                    Abidə
                  </span>
                  <span className="text-gray-200 text-xs bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    Qərbi Azərbaycan
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {monument.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed text-base">
                  {monument.description}
                </p>
              </div>

              {Array.isArray(monument.materials) && monument.materials.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Layers size={18} className="text-indigo-600" />
                    <div className="text-lg font-bold">Materiallar</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {monument.materials.map((m, i) => (
                      <span key={i} className="px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {Array.isArray(monument.gallery) && monument.gallery.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ImageIcon size={18} className="text-indigo-600" />
                    <div className="text-lg font-bold">Qalereya</div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {monument.gallery.map((src, i) => (
                      <div key={i} className="rounded-lg overflow-hidden border border-gray-100">
                        <img src={src} alt={`${monument.name} ${i + 1}`} className="w-full h-40 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {Array.isArray(monument.historicalEvents) && monument.historicalEvents.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={18} className="text-indigo-600" />
                    <div className="text-lg font-bold">Tarixi Hadisələr</div>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {monument.historicalEvents.map((e, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {Array.isArray(monument.references) && monument.references.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <LinkIcon size={18} className="text-indigo-600" />
                    <div className="text-lg font-bold">İstinadlar</div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {monument.references.map((ref, i) => (
                      <li key={i}>
                        <a href={ref.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700">
                          {ref.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
                <div className="text-lg font-bold text-gray-900 mb-4">Qısa Məlumat</div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-indigo-600" />
                    <span>{monument.region} • {monument.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-600" />
                    <span>Dövr: {monument.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Landmark size={16} className="text-indigo-600" />
                    <span>Tip: {monument.type}</span>
                  </div>
                  {monument.stats?.built ? (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-indigo-600" />
                      <span>İnşa: {monument.stats.built}</span>
                    </div>
                  ) : null}
                  {monument.stats?.height ? (
                    <div className="flex items-center gap-2">
                      <Ruler size={16} className="text-indigo-600" />
                      <span>Hündürlük: {monument.stats.height}</span>
                    </div>
                  ) : null}
                  {monument.dimensions?.width || monument.dimensions?.length || monument.dimensions?.area ? (
                    <div className="space-y-2">
                      {monument.dimensions?.width ? (
                        <div className="flex items-center gap-2">
                          <Ruler size={16} className="text-indigo-600" />
                          <span>En: {monument.dimensions.width}</span>
                        </div>
                      ) : null}
                      {monument.dimensions?.length ? (
                        <div className="flex items-center gap-2">
                          <Ruler size={16} className="text-indigo-600" />
                          <span>Uzunluq: {monument.dimensions.length}</span>
                        </div>
                      ) : null}
                      {monument.dimensions?.area ? (
                        <div className="flex items-center gap-2">
                          <Ruler size={16} className="text-indigo-600" />
                          <span>Sahə: {monument.dimensions.area}</span>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {monument.coordinates?.lat && monument.coordinates?.lng ? (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-indigo-600" />
                      <span>Koordinatlar: {monument.coordinates.lat}, {monument.coordinates.lng}</span>
                    </div>
                  ) : null}
                  {monument.protectionStatus ? (
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-indigo-600" />
                      <span>Status: {monument.protectionStatus}</span>
                    </div>
                  ) : null}
                  {monument.condition ? (
                    <div className="flex items-center gap-2">
                      <Layers size={16} className="text-indigo-600" />
                      <span>Vəziyyət: {monument.condition}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonumentDetailsPage
