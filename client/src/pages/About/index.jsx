import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/shared/Breadcrumb'
import { Users, Target, Image as ImageIcon, ArrowRight } from 'lucide-react'
import about from '../../mockDatas/aboutUs.json'
import allNews from '../../mockDatas/allNews.json'
import allMartyrs from '../../mockDatas/allMartyrs.json'
import allVeterans from '../../mockDatas/allVeterans.json'
import allDocumentaries from '../../mockDatas/allDocumentaries.json'
import allVideos from '../../mockDatas/allVideos.json'
import allHeroes from '../../mockDatas/allHeroes.json'
import allLocus from '../../mockDatas/allLocus.json'
import ourIntellectuals from '../../mockDatas/ourIntellectuals.json'

const AboutPage = () => {
  const dynamicStats = React.useMemo(() => {
    const safeLen = (arr) => (Array.isArray(arr) ? arr.length : 0)
    const hasImageCount = (arr, key = 'image') =>
      Array.isArray(arr)
        ? arr.filter((item) => typeof item?.[key] === 'string' && item[key].length > 0).length
        : 0

    const articles = safeLen(allNews)
    const martyrVeteran = safeLen(allMartyrs) + safeLen(allVeterans)
    const documentaries = safeLen(allDocumentaries)
    const photoArchive =
      hasImageCount(allNews, 'image') +
      hasImageCount(allMartyrs, 'image') +
      hasImageCount(allVeterans, 'image') +
      hasImageCount(allHeroes, 'image') +
      hasImageCount(allLocus, 'image') +
      hasImageCount(ourIntellectuals, 'image') +
      hasImageCount(allDocumentaries, 'thumbnail') +
      hasImageCount(allVideos, 'thumbnail')

    return [
      { label: 'Toplanan məqalə', value: articles },
      { label: 'Şəhid və qazi haqqında qeyd', value: martyrVeteran },
      { label: 'Sənədli film', value: documentaries },
      { label: 'Foto arxiv', value: photoArchive }
    ]
  }, [])
  return (
    <div className="bg-white text-gray-900 ">
    

      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-10">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={about.photos?.[0]}
              alt={about.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {about.label ? (
              <div className="absolute left-4 top-4 px-3 py-1 rounded-md bg-red-600 text-white text-xs font-semibold">
                {about.label}
              </div>
            ) : null}
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              {about.title}
            </h1>
            <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
              {about.desc}
            </p>

            {Array.isArray(about.bullets) && about.bullets.length > 0 ? (
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {about.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center size-6 rounded-md bg-red-100 text-red-600 shrink-0">•</span>
                    <span className="text-gray-800">{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            
          </div>
        </div>

       

        {Array.isArray(dynamicStats) && dynamicStats.length > 0 ? (
          <div className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {dynamicStats.map((s, i) => (
                <div key={i} className="p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
                  <div className="text-4xl font-black text-gray-900">{s.value}</div>
                  <div className="mt-2 text-sm text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

       

        
      </div>
    </div>
  )
}

export default AboutPage
