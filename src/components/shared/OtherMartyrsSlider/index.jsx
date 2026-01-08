import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import allMartyrs from '../../../mockDatas/allMartyrs.json'

const OtherMartyrsSlider = ({ currentSlug }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const others = useMemo(() => {
    return allMartyrs.filter(m => m.slug !== currentSlug)
  }, [currentSlug])

  // Responsive items per view
  // We'll use CSS media queries to determine width, but for index calculation we need to know
  // how many are visible. For simplicity, let's assume:
  // Mobile: 1, Tablet: 2, Desktop: 3
  // We can use a ResizeObserver or just hardcode for logic if we want "per item" sliding.
  // Let's stick to sliding 1 item at a time.
  
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
        <h3 className="text-2xl font-bold text-gray-900">Digər Şəhidlərimiz</h3>
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
          {others.map((martyr) => (
            <div 
              key={martyr.id}
              className="shrink-0"
              style={{ width: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})` }}
            >
              <Link to={`/martyrs/${martyr.slug}`} className="block group/card h-full">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={martyr.image} 
                      alt={martyr.fullName} 
                      className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="text-xs font-semibold px-2 py-1 bg-red-50 text-red-600 rounded-full">
                        {martyr.rank}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 group-hover/card:text-red-600 transition-colors">
                      {martyr.fullName}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-auto">
                      {martyr.description}
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

export default OtherMartyrsSlider
