import React, { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Globe2, MapPin, Briefcase, Calendar, Award } from 'lucide-react'
import allAbroads from '../../mockDatas/AllAbroads.json'

const AbroadDetailsPage = () => {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const person = useMemo(() => {
    return Array.isArray(allAbroads) ? allAbroads.find((p) => p.slug === slug) : null
  }, [slug])

  if (!person) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız şəxs tapılmadı və ya mövcud deyil.</p>
        <Link
          to="/amasiyalilar/abroad"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Siyahıya qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 pt-6 pb-10">
          <Link
            to="/amasiyalilar/abroad"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Geri qayıt</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[3/4] bg-gray-800">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  <Globe2 size={14} />
                  <span>
                    {person.city}, {person.country}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                {person.name}
              </h1>
              <p className="text-lg text-white/80 mb-2">{person.profession}</p>
              {person.organization && (
                <p className="text-sm text-white/80 mb-4">{person.organization}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-white/80 mb-6">
                {person.birthplace && (
                  <div className="inline-flex items-center gap-2">
                    <MapPin size={18} className="text-blue-300" />
                    <span>{person.birthplace}</span>
                  </div>
                )}
                {(person.born || person.died) && (
                  <div className="inline-flex items-center gap-2">
                    <Calendar size={18} className="text-blue-300" />
                    <span>
                      {person.born}
                      {person.died ? ` — ${person.died}` : ' •'}
                    </span>
                  </div>
                )}
                {person.abroad_since && (
                  <div className="inline-flex items-center gap-2">
                    <Globe2 size={18} className="text-blue-300" />
                    <span>{person.abroad_since}-ci ildən xaricdə yaşayır</span>
                  </div>
                )}
                <span className="text-[11px] uppercase tracking-wide bg-blue-700/80 text-white px-2.5 py-1 rounded-full border border-blue-400/60">
                  Amasiya
                </span>
              </div>

              <p className="text-base text-white/80 leading-relaxed mb-6">{person.description}</p>

              {person.organization && (
                <div className="bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white/85">
                  <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Briefcase size={16} className="text-blue-300" />
                    Fəaliyyət göstərdiyi yer
                  </h2>
                  <p>{person.organization}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx_auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Həyat və fəaliyyət</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {person.biography}
            </p>
          </div>
          <div className="lg:col-span-4">
            {Array.isArray(person.achievements) && person.achievements.length > 0 ? (
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Award size={18} className="text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">Əsas nailiyyətlər</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  {person.achievements.map((ach) => (
                    <li key={ach} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AbroadDetailsPage
