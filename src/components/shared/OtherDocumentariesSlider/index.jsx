import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import allDocumentaries from '../../../mockDatas/allDocumentaries.json'

const OtherDocumentariesSlider = ({ currentSlug }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef(null)

  const others = useMemo(() => {
    return allDocumentaries.filter(d => d.slug !== currentSlug)
  }, [currentSlug])

  // Responsive items per view
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1)
      else if (window.innerWidth < 1024) setItemsPerView(2)
      else setItemsPerView(3)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, others.length - itemsPerView)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= maxIndex) return 0
        return prev + 1
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused, maxIndex])

  const next = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prev = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }

  if (others.length === 0) return null

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Digər Sənədli Filmlər</h3>
        <div className="flex gap-2">
          <button 
            onClick={prev}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {others.map((doc) => (
            <div 
              key={doc.id}
              className="shrink-0"
              style={{ width: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})` }}
            >
              <Link to={`/documentaries/${doc.slug}`} className="block group/card h-full">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={doc.thumbnail} 
                      alt={doc.title} 
                      className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                        {doc.duration}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="text-xs font-semibold px-2 py-1 bg-purple-50 text-purple-600 rounded-full">
                        {doc.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 group-hover/card:text-purple-600 transition-colors">
                      {doc.title}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-auto">
                      {doc.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OtherDocumentariesSlider
