import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Award, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import allHeroes from '../../mockDatas/allHeroes.json'
import { cn, formatDate } from '@/lib/utils'

const AllHeroesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  

  const filteredHeroes = useMemo(() => {
    return allHeroes.filter(hero => 
      hero.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hero.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hero.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // Pagination Logic
  const totalPages = Math.ceil(filteredHeroes.length / itemsPerPage)

  

  const currentHeroes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredHeroes.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, filteredHeroes])

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
            Milli Qəhrəmanlarımız
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tariximizdə iz qoymuş, xalqımızın qürur mənbəyi olan dahi şəxsiyyətlər və qəhrəmanlar.
          </p>
          
          <div className="mt-10 max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Qəhrəman axtar..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
            <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Heroes Grid */}
      <div className="container mx-auto px-4 py-16">
        {currentHeroes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentHeroes.map((hero) => (
              <div key={hero.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img 
                    src={hero.image} 
                    alt={hero.fullName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                    <span className="inline-block px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full mb-3 shadow-lg">
                      {hero.title}
                    </span>
                    <h3 className="text-2xl font-bold leading-tight">{hero.fullName}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                      <span className="text-sm">
                        {formatDate(hero.birthDate)} - {formatDate(hero.deathDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                      <span className="text-sm">{hero.location}</span>
                    </div>
                    {hero.awards && hero.awards.length > 0 && (
                      <div className="flex items-start gap-3 text-gray-600">
                        <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-sm italic">{hero.awards.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                    {hero.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tarixi Şəxsiyyət</span>
                    <Link to={`/heroes/${hero.slug}`} className="text-amber-600 text-sm font-medium hover:text-amber-700 transition-colors">
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
        {filteredHeroes.length > itemsPerPage && (
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
                      ? "bg-amber-600 text-white shadow-sm" 
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

export default AllHeroesPage
