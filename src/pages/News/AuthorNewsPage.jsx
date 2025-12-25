import React, { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import NewsCard from '../../components/shared/NewsCard'
import allNewsData from '../../mockDatas/allNews.json'
import { Search, TrendingUp, Calendar, Filter, ChevronLeft, ChevronRight, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import Breadcrumb from '../../components/shared/Breadcrumb'

const AuthorNewsPage = () => {
  const { authorName } = useParams()
  const decodedAuthorName = decodeURIComponent(authorName)

  // States
  const [sortOrder, setSortOrder] = useState('newest') // 'newest', 'oldest', 'popular'
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const breadcrumbItems = [
    { label: 'Ana Səhifə', path: '/' },
    { label: 'Xəbərlər', path: '/news' },
    { label: decodedAuthorName }
  ]

  // Filtered & Sorted News for this Author
  const filteredNews = useMemo(() => {
    let result = allNewsData.filter(news => news.author?.name === decodedAuthorName);

    // Filter by Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(news => 
        news.title.toLowerCase().includes(query) || 
        news.content.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === 'popular') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return result;
  }, [sortOrder, searchQuery, decodedAuthorName]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, searchQuery, decodedAuthorName]);

  // Get current page items
  const currentNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredNews]);

  // Pagination Handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Get author info from the first news item (assuming all news by same author have same author info)
  // Or find it from allNewsData
  const authorInfo = useMemo(() => {
    const news = allNewsData.find(n => n.author?.name === decodedAuthorName);
    return news?.author || { name: decodedAuthorName, image: null };
  }, [decodedAuthorName]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 pb-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg shrink-0">
                    {authorInfo.image ? (
                        <img src={authorInfo.image} alt={authorInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                            <User className="w-12 h-12" />
                        </div>
                    )}
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">{authorInfo.name}</h1>
                    <p className="text-gray-500 mt-2 max-w-2xl">
                        Müəllifin bütün paylaşımları və xəbərləri burada yer alır.
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-6 mt-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-gray-900">{filteredNews.length}</span> Xəbər
                        </div>
                        {/* Can add more stats here if available */}
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content Area */}
          <div className="w-full">
            
            {/* Toolbar: Sort & Result Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold text-gray-900">{filteredNews.length}</span>
                <span>xəbər tapıldı</span>
              </div>

              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-gray-400" />
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="newest">Ən yeni</option>
                  <option value="oldest">Ən köhnə</option>
                  <option value="popular">Ən çox oxunan</option>
                </select>
              </div>
            </div>

            {/* News Grid */}
            {currentNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentNews.map((news) => (
                  <NewsCard key={news._id} news={news} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Xəbər tapılmadı</h3>
                <p className="text-gray-500 mt-2">Bu müəllifə aid heç bir xəbər tapılmadı.</p>
                <Link to="/news" className="inline-block mt-4 text-blue-600 font-medium hover:underline">
                  Bütün xəbərlərə bax
                </Link>
              </div>
            )}
            
            {/* Functional Pagination */}
            {filteredNews.length > itemsPerPage && (
              <div className="mt-10 flex justify-center">
                <div className="flex gap-2">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Əvvəlki</span>
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                        currentPage === page 
                          ? "bg-blue-600 text-white shadow-sm" 
                          : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      {page}
                    </button>
                  ))}

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden sm:inline">Sonrakı</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorNewsPage
