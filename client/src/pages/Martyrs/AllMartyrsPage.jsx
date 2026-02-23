import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Award, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import allMartyrs from '../../mockDatas/allMartyrs.json'
import { cn, formatDate } from '@/lib/utils'

const AllMartyrsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  

  const filteredMartyrs = useMemo(() => {
    return allMartyrs.filter(martyr => 
      martyr.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      martyr.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      martyr.rank.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // Pagination Logic
  const totalPages = Math.ceil(filteredMartyrs.length / itemsPerPage)

  

  const currentMartyrs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredMartyrs.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, filteredMartyrs])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans ">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Şəhidlərimiz
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Vətən uğrunda canından keçən qəhrəmanlarımızı qürurla və hörmətlə yad edirik. 
            Onların xatirəsi qəlbimizdə əbədi yaşayacaq.
          </p>
          
          <div className="mt-10 max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Şəhid axtar..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
            <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Martyrs Grid */}
      <div className="container mx-auto px-4 py-16">
        {currentMartyrs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentMartyrs.map((martyr) => (
              <div key={martyr.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img 
                    src={martyr.image} 
                    alt={martyr.fullName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3 shadow-lg">
                      {martyr.rank}
                    </span>
                    <h3 className="text-2xl font-bold leading-tight">{martyr.fullName}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-red-500 shrink-0" />
                      <span className="text-sm">
                        {formatDate(martyr.birthDate)} - {formatDate(martyr.deathDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                      <span className="text-sm">{martyr.location}</span>
                    </div>
                    {martyr.awards && martyr.awards.length > 0 && (
                      <div className="flex items-start gap-3 text-gray-600">
                        <Award className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-sm italic">{martyr.awards.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                    {martyr.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Əbədi Xatirə</span>
                    <Link to={`/martyrs/${martyr.slug}`} className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors">
                      Ətraflı Oxu →
                    </Link>
                  </div>
                </div>
              </div>
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
        {filteredMartyrs.length > itemsPerPage && (
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
                      ? "bg-red-600 text-white shadow-sm" 
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

export default AllMartyrsPage
