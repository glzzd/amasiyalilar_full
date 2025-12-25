import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Eye, User, Share2, Facebook, Twitter, Linkedin, Clock } from 'lucide-react'
import allNewsData from '../../mockDatas/allNews.json'
import Breadcrumb from '../../components/shared/Breadcrumb'

const NewDetailsPage = () => {
  const { slug } = useParams()

  // Find the news item
  const news = useMemo(() => {
    return allNewsData.find(item => item.slug === slug)
  }, [slug])

  // Get related news (same category, excluding current)
  const relatedNews = useMemo(() => {
    if (!news) return []
    return allNewsData
      .filter(item => item.category === news.category && item._id !== news._id)
      .slice(0, 3)
  }, [news])

  const breadcrumbItems = useMemo(() => {
    if (!news) return []
    return [
      { label: 'Ana Səhifə', path: '/' },
      { label: 'Xəbərlər', path: '/news' },
      { label: news.title }
    ]
  }, [news])

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
      <Breadcrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content */}
          <article className="lg:w-8/12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Featured Image */}
            <div className="relative aspect-video w-full">
              <img 
                src={news.image} 
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
                    <img src={news.author?.image} alt={news.author?.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-medium text-gray-900">{news.author?.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time>{new Date(news.createdAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{news.views?.toLocaleString()} oxunma</span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                   <Clock className="w-4 h-4" />
                   <span>3 dəq oxuma</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="lead text-xl text-gray-600 mb-6 font-medium">
                  {news.content} {/* Mock data has short content, normally this would be a summary or first paragraph */}
                </p>
                {/* Simulated long content for demo purposes since mock data is short */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                </p>
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Ətraflı Məlumat</h3>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
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
                    <img src={news.author?.image} alt={news.author?.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{news.author?.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Baş Redaktor</p>
                <p className="text-sm text-gray-600 mb-6">
                    Təcrübəli jurnalist və yazar. Amasya və bölgə xəbərləri üzrə mütəxəssis.
                </p>
                <button className="w-full py-2.5 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
                    Müəllifin bütün paylaşımları
                </button>
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
