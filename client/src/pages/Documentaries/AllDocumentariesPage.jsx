import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Play, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import allDocumentaries from '../../mockDatas/allDocumentaries.json'
import { cn, formatDate } from '@/lib/utils'

const AllDocumentariesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  

  const filteredDocs = useMemo(() => {
    return allDocumentaries.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // Pagination Logic
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage)

  

  const currentDocs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredDocs.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, filteredDocs])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sənədli Filmlər
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tariximizi, mədəniyyətimizi və qəhrəmanlarımızı əks etdirən video salnamə.
          </p>
          
          <div className="mt-10 max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Film axtar..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
            <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Documentaries Grid */}
      <div className="container mx-auto px-4 py-16">
        {currentDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentDocs.map((doc) => (
              <Link to={`/documentaries/${doc.slug}`} key={doc.id} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={doc.thumbnail} 
                      alt={doc.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </div>
                    </div>

                    <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                            {doc.category}
                        </span>
                    </div>

                    <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                        {doc.duration}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(doc.publishDate)}</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {doc.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                      {doc.description}
                    </p>
                    
                    <div className="pt-4 border-t border-gray-100 flex items-center text-purple-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      İzlə <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Nəticə tapılmadı</h3>
            <p className="text-gray-500 mt-2">Axtarışınıza uyğun məlumat tapılmadı.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredDocs.length > itemsPerPage && (
          <div className="mt-16 flex justify-center">
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
                      ? "bg-purple-600 text-white shadow-sm" 
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
  )
}

export default AllDocumentariesPage
