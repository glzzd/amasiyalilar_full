import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/shared/Breadcrumb'
import { Users, Target, Image as ImageIcon, ArrowRight, Loader2 } from 'lucide-react'
import { getAbout } from './services/aboutService'
import allNews from '../../mockDatas/allNews.json'
import allMartyrs from '../../mockDatas/allMartyrs.json'
import allVeterans from '../../mockDatas/allVeterans.json'
import allDocumentaries from '../../mockDatas/allDocumentaries.json'
import allVideos from '../../mockDatas/allVideos.json'
import allHeroes from '../../mockDatas/allHeroes.json'
import allLocus from '../../mockDatas/allLocus.json'
import ourIntellectuals from '../../mockDatas/ourIntellectuals.json'

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAbout()
        if (response.data) {
          setAboutData(response.data)
        }
      } catch (err) {
        console.error('Haqqımızda məlumatı alınarkən xəta:', err)
        setError('Məlumatları yükləmək mümkün olmadı')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const dynamicStats = useMemo(() => {
    // Eğer backend'den gelen stats varsa onu kullan, yoksa hesaplanan değerleri kullan
    if (aboutData?.stats && aboutData.stats.length > 0) {
      return aboutData.stats
    }

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
  }, [aboutData])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
      </div>
    )
  }

  if (error || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>{error || 'Məlumat tapılmadı'}</p>
      </div>
    )
  }

  return (
    <div className="bg-white text-gray-900 ">
      <div className="container mx-auto px-4 ">
       
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ">
          <div className="relative overflow-hidden rounded-xl aspect-video md:aspect-auto md:h-full">
            {aboutData.photos && aboutData.photos.length > 0 ? (
              <img
                src={aboutData.photos[0]}
                alt={aboutData.title}
                className="w-full h-full object-cover rounded-xl shadow-lg"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
            
            {aboutData.label && (
              <div className="absolute left-4 top-4 px-3 py-1 rounded-md bg-red-600 text-white text-xs font-semibold shadow-md">
                {aboutData.label}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 mb-6">
              {aboutData.title}
            </h1>
            
            <div className="prose prose-lg text-gray-600 mb-8 leading-relaxed">
              {aboutData.desc}
            </div>

            {Array.isArray(aboutData.bullets) && aboutData.bullets.length > 0 && (
              <ul className="space-y-4 mb-8">
                {aboutData.bullets.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center size-6 rounded-full bg-red-100 text-red-600 shrink-0 mt-0.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            )}
            
            {aboutData.cta && aboutData.cta.text && (
              <div className="mt-4">
                <Link 
                  to={aboutData.cta.href || '/'} 
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {aboutData.cta.text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mission & Vision Section */}
        {(aboutData.mission || aboutData.vision) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            {aboutData.mission && (
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Missiyamız</h3>
                <p className="text-gray-600 leading-relaxed">
                  {aboutData.mission}
                </p>
              </div>
            )}
            
            {aboutData.vision && (
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
                <p className="text-gray-600 leading-relaxed">
                  {aboutData.vision}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        {Array.isArray(dynamicStats) && dynamicStats.length > 0 && (
          <div className="mt-20 bg-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-red-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {dynamicStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    {stat.value}
                    <span className="text-red-500 text-3xl">+</span>
                  </div>
                  <div className="text-gray-400 font-medium text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Section */}
        {aboutData.team && aboutData.team.length > 0 && (
          <div className="mt-20 mb-10">
            <div className="text-center mb-12">
              <span className="text-red-600 font-semibold tracking-wider text-sm uppercase">Komandamız</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Layihənin Yaradıcı Heyəti</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutData.team.map((member, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4 bg-gray-100">
                    {member.avatar ? (
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-red-600 font-medium text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AboutPage
