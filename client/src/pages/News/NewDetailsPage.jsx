import React, { useMemo, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Eye, Share2, Facebook, Twitter, Linkedin, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { fetchConfirmedNews, fetchNewsById } from './services/newsService'

const NewDetailsPage = () => {
  const { slug } = useParams()
  const [news, setNews] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadNews = async () => {
      try {
        const [detailData, listData] = await Promise.all([
          fetchNewsById(slug),
          fetchConfirmedNews()
        ])

        if (!isMounted) return

        const detail =
          (detailData && detailData.data) ||
          (detailData && detailData.news) ||
          detailData

        setNews(detail || null)

        if (Array.isArray(listData) && detail) {
          const related = listData
            .filter(
              (item) =>
                item.category === detail.category && item._id !== detail._id
            )
            .slice(0, 3)
          setRelatedNews(related)
        } else {
          setRelatedNews([])
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Xəbər yüklənərkən xəta baş verdi')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadNews()

    return () => {
      isMounted = false
    }
  }, [slug])

  const imageUrl = useMemo(() => {
    if (!news || !news.image) return ''
    if (typeof news.image !== 'string') return ''
    let value = news.image.trim()
    if (value.startsWith('`') && value.endsWith('`')) {
      value = value.slice(1, -1).trim()
    }
    return value
  }, [news])

  const createdByName = useMemo(() => {
    if (!news) return 'Admin'
    if (news.createdBy) {
      const parts = [news.createdBy.name, news.createdBy.surname].filter(Boolean)
      if (parts.length) return parts.join(' ')
    }
    if (news.author?.name) return news.author.name
    return 'Admin'
  }, [news])

  const createdByImage = news?.createdBy?.image || news?.author?.image || ''

  const authorId = useMemo(() => {
    if (!news) return null
    const createdBy = news.createdBy

    if (news.createdById) return news.createdById
    if (typeof createdBy?.userId === 'string') return createdBy.userId
    if (createdBy?.userId?.$oid) return createdBy.userId.$oid
    if (createdBy?.id) return createdBy.id
    if (createdBy?._id) return createdBy._id
    if (news.authorId) return news.authorId
    if (news.author?.id) return news.author.id
    if (news.author?._id) return news.author._id

    return null
  }, [news])

  const contentParagraphs = useMemo(() => {
    if (!news || !news.content || typeof news.content !== 'string') return []
    return news.content.split('\n\n')
  }, [news])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-gray-600">Xəbər yüklənir...</p>
      </div>
    )
  }

  if (error && !news) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Xəta</h2>
        <p className="text-gray-500 mt-2">{error}</p>
        <Link to="/news" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Bütün Xəbərlərə Qayıt
        </Link>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Xəbər tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız xəbər mövcud deyil və ya silinib.</p>
        <Link to="/news" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Bütün Xəbərlərə Qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb */}
      

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content */}
          <article className="lg:w-8/12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Featured Image */}
            <div className="relative aspect-video w-full">
              <img 
                src={imageUrl} 
                alt={news.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                  {news.category}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Header Info */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {news.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    {createdByImage ? (
                      <img src={createdByImage} alt={createdByName} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <span className="font-medium text-gray-900">{createdByName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time>{formatDate(news.createdAt)}</time>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{news.views?.toLocaleString()} oxunma</span>
                </div>
               
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none text-gray-700">
                {contentParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? 'lead text-xl text-gray-600 mb-6 font-medium'
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags & Share */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                 <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-500 mr-2">Etiketlər:</span>
                    <Link to="#" className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors">Amasya</Link>
                    <Link to="#" className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors">Xəbər</Link>
                    <Link to="#" className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors">Gündəm</Link>
                 </div>

                 <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">Paylaş:</span>
                    <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                        <Facebook className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-100 transition-colors">
                        <Twitter className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                        <Share2 className="w-4 h-4" />
                    </button>
                 </div>
              </div>

            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-4/12 space-y-8">
             {/* Author Card */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                    {createdByImage ? (
                      <img src={createdByImage} alt={createdByName} className="w-full h-full object-cover" />
                    ) : null}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{createdByName}</h3>
                <p className="text-sm text-gray-500 mb-4">Xəbər müəllifi</p>
                <p className="text-sm text-gray-600 mb-6">
                    Təcrübəli jurnalist və yazar. Amasya və bölgə xəbərləri üzrə mütəxəssis.
                </p>
                {authorId && (
                  <Link 
                    to={`/author/${encodeURIComponent(authorId)}`}
                    className="block w-full py-2.5 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors"
                  >
                      Müəllifin bütün paylaşımları
                  </Link>
                )}
             </div>

             {/* Related News */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Oxşar Xəbərlər</h3>
                <div className="space-y-6">
                    {relatedNews.length > 0 ? (
                        relatedNews.map(item => (
                            <Link key={item._id} to={`/news/${item.slug}`} className="group flex gap-4">
                                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-blue-600 mb-1 block">{item.category}</span>
                                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                                        {item.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Calendar className="w-3 h-3" />
                                        <time>{new Date(item.createdAt).toLocaleDateString('az-AZ')}</time>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">Oxşar xəbər tapılmadı.</p>
                    )}
                </div>
             </div>
          </aside>

        </div>
      </div>
    </div>
  )
}

export default NewDetailsPage
