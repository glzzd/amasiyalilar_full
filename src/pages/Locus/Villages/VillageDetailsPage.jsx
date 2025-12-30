import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Landmark, ArrowLeft, Ruler, Mountain, CalendarDays, Compass } from 'lucide-react'
import Breadcrumb from '../../../components/shared/Breadcrumb'
import allVillages from '../../../mockDatas/allVillages.json'

const VillageDetailsPage = () => {
  const { slug } = useParams()
  const village = React.useMemo(() => {
    return allVillages.find(v => v.slug === slug)
  }, [slug])

  if (!village) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        <h2 className="text-3xl font-bold mb-4">Kənd tapılmadı</h2>
        <Link to="/locus/villages" className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2">
          <ArrowLeft size={18} /> Kəndlər siyahısına qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24">
     

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mt-10">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={village.image}
              alt={village.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute left-4 top-4 px-3 py-1 rounded-md bg-green-600 text-white text-xs font-semibold">
              {village.mahal}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{village.name}</h1>
              <Link
                to={`/locus/${village.mahalSlug}`}
                className="text-sm px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {village.mahal}
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2 text-gray-600">
              <MapPin size={18} />
              <span className="text-sm">{village.location}</span>
            </div>
            <p className="mt-4 text-gray-700 text-base leading-relaxed">
              {village.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded border border-gray-200">
                {village.populationHistoric}
              </span>
              {Array.isArray(village.tags) && village.tags.map((t, i) => (
                <span key={i} className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded border border-gray-200">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Link to="/locus/villages" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                <ArrowLeft size={16} />
                Siyahıya qayıt
              </Link>
              <Link to={`/locus/${village.mahalSlug}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors">
                <Landmark size={16} />
                Mahal səhifəsi
              </Link>
            </div>
          </div>
        </div>

        {village.historicalNotes ? (
          <div className="mt-12 p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <Landmark size={18} />
              <span className="text-sm font-semibold">Tarixi Qeydlər</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{village.historicalNotes}</p>
          </div>
        ) : null}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {village.culture ? (
            <div className="p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Landmark size={18} />
                <span className="text-sm font-semibold">Mədəniyyət</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{village.culture}</p>
            </div>
          ) : null}

          {village.economy ? (
            <div className="p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Ruler size={18} />
                <span className="text-sm font-semibold">İqtisadiyyat</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{village.economy}</p>
            </div>
          ) : null}
        </div>

        {(Array.isArray(village.landmarks) && village.landmarks.length > 0) || (Array.isArray(village.notablePeople) && village.notablePeople.length > 0) ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.isArray(village.landmarks) && village.landmarks.length > 0 ? (
              <div className="p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 text-gray-700 mb-4">
                  <Landmark size={18} />
                  <span className="text-sm font-semibold">Öne Çıxan Məkanlar</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {village.landmarks.map((lm, i) => (
                    <span key={i} className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded border border-gray-200">
                      {lm}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {Array.isArray(village.notablePeople) && village.notablePeople.length > 0 ? (
              <div className="p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 text-gray-700 mb-4">
                  <Landmark size={18} />
                  <span className="text-sm font-semibold">Önəmli Şəxslər</span>
                </div>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {village.notablePeople.map((p, i) => (
                    <li key={i} className="text-sm">{p}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}

        {Array.isArray(village.gallery) && village.gallery.length > 0 ? (
          <div className="mt-12">
            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <Landmark size={18} />
              <span className="text-sm font-semibold">Qalereya</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {village.gallery.map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-gray-200">
                  <img src={src} alt={`${village.name}-gallery-${i}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {(village.elevation || village.area || village.establishedYear || village.coordinates) ? (
          <div className="mt-12 p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <Compass size={18} />
              <span className="text-sm font-semibold">Coğrafi Məlumatlar</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {village.elevation ? (
                <span className="inline-flex items-center gap-2 text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded border border-gray-200">
                  <Mountain size={14} /> {village.elevation}
                </span>
              ) : null}
              {village.area ? (
                <span className="inline-flex items-center gap-2 text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded border border-gray-200">
                  <Ruler size={14} /> {village.area}
                </span>
              ) : null}
              {village.establishedYear ? (
                <span className="inline-flex items-center gap-2 text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded border border-gray-200">
                  <CalendarDays size={14} /> {village.establishedYear}
                </span>
              ) : null}
              {village.coordinates ? (
                <span className="inline-flex items-center gap-2 text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded border border-gray-200">
                  <Compass size={14} /> {village.coordinates.lat}, {village.coordinates.lng}
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default VillageDetailsPage
