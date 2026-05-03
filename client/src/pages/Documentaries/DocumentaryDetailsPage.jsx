import React, { useMemo, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Tag, Loader2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import OtherDocumentariesSlider from '../../components/shared/OtherDocumentariesSlider'
import { fetchDocumentaries } from './documentariesService'

const DocumentaryDetailsPage = () => {
  const { slug } = useParams()
  const [documentaries, setDocumentaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const toEmbeddableUrl = (input) => {
    if (!input || typeof input !== 'string') return ''
    const raw = input.trim()
    if (!raw) return ''

    if (raw.includes('youtube.com/embed/') || raw.includes('youtube-nocookie.com/embed/')) {
      return raw
    }

    try {
      const url = new URL(raw)
      const host = url.hostname.replace(/^www\./, '')

      if (host === 'youtu.be') {
        const id = url.pathname.split('/').filter(Boolean)[0]
        return id ? `https://www.youtube.com/embed/${id}` : ''
      }

      if (host.endsWith('youtube.com')) {
        if (url.pathname === '/watch') {
          const id = url.searchParams.get('v')
          return id ? `https://www.youtube.com/embed/${id}` : ''
        }
        if (url.pathname.startsWith('/shorts/')) {
          const id = url.pathname.split('/').filter(Boolean)[1]
          return id ? `https://www.youtube.com/embed/${id}` : ''
        }
        if (url.pathname.startsWith('/live/')) {
          const id = url.pathname.split('/').filter(Boolean)[1]
          return id ? `https://www.youtube.com/embed/${id}` : ''
        }
        if (url.pathname.startsWith('/embed/')) {
          const id = url.pathname.split('/').filter(Boolean)[1]
          return id ? `https://www.youtube.com/embed/${id}` : ''
        }
      }

      return raw
    } catch {
      return raw
    }
  }

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        const list = await fetchDocumentaries({ limit: 1000 })
        if (!isMounted) return
        setDocumentaries(Array.isArray(list) ? list : [])
      } catch (err) {
        if (isMounted) setError(err.message || 'Sənədli film məlumatı yüklənərkən xəta baş verdi')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [])

  // Find the documentary
  const doc = useMemo(() => {
    return documentaries.find(item => item.slug === slug)
  }, [documentaries, slug])

  const iframeSrc = useMemo(() => {
    return toEmbeddableUrl(doc?.videoUrl)
  }, [doc?.videoUrl])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Xəta baş verdi</h2>
        <p className="text-gray-500 mt-2">{error}</p>
        <Link to="/documentaries" className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Siyahıya Qayıt
        </Link>
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız film haqqında məlumat mövcud deyil.</p>
        <Link to="/documentaries" className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Siyahıya Qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      
      {/* Video Section */}
      <div className="bg-black py-10 lg:py-16">
        <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
                <div className="aspect-video w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    {iframeSrc ? (
                      <iframe 
                          className="w-full h-full"
                          src={iframeSrc} 
                          title={doc.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/80 px-6 text-center">
                        <a
                          href={doc.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Videonu aç
                        </a>
                      </div>
                    )}
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Main Content (Left) */}
                <div className="lg:col-span-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                            {doc.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(doc.publishDate)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{doc.duration}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        {doc.title}
                    </h1>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <p className="text-xl text-gray-600 font-medium mb-6">
                            {doc.description}
                        </p>
                        <p>
                            Bu sənədli filmdə tamaşaçılar tarixi həqiqətlərin, unudulmaz qəhrəmanlıq salnamələrinin və mədəni irsimizin dərinliklərinə səyahət edəcəklər. 
                            Peşəkar çəkiliş qrupu və tədqiqatçılar tərəfindən hazırlanan bu ekran əsəri, mövzu haqqında ən dolğun və dəqiq məlumatları çatdırmağı hədəfləyir.
                        </p>
                        <p>
                            Filmin ərsəyə gəlməsində arxiv materiallarından, şahid ifadələrindən və ekspert rəylərindən geniş istifadə olunmuşdur. 
                            Məqsədimiz gələcək nəsillərə tariximizi olduğu kimi çatdırmaq və milli dəyərlərimizi təbliğ etməkdir.
                        </p>
                    </div>

                    {/* Share Section */}
                    {/* <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <span className="font-medium text-gray-900">Filmi Paylaş:</span>
                        <div className="flex gap-3">
                            <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-100 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div> */}
                </div>

                {/* Sidebar (Right) */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Film Haqqında</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Janr</span>
                                <span className="font-medium text-gray-900 text-sm text-right">{doc.category}</span>
                            </div>
                            <div className="h-px bg-gray-200" />
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Müddət</span>
                                <span className="font-medium text-gray-900 text-sm text-right">{doc.duration}</span>
                            </div>
                            <div className="h-px bg-gray-200" />
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Yayım Tarixi</span>
                                <span className="font-medium text-gray-900 text-sm text-right">{formatDate(doc.publishDate)}</span>
                            </div>
                            <div className="h-px bg-gray-200" />
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Dil</span>
                                <span className="font-medium text-gray-900 text-sm text-right">Azərbaycan dili</span>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>

            </div>
        </div>
        
        {/* Other Documentaries Slider */}
        <div className="mt-16 pt-10 border-t border-gray-100 max-w-5xl mx-auto">
            <OtherDocumentariesSlider currentSlug={slug} />
        </div>

      </div>
    </div>
  )
}

export default DocumentaryDetailsPage
