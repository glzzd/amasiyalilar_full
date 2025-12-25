import React from 'react'
import { Link } from 'react-router-dom'
import { Eye, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const NewsCard = ({ news, className }) => {
  return (
    <Link 
      to={`/news/${news.slug}`} 
      className={cn(
        "group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-sm">
            {news.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Date & Views */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <time>{new Date(news.createdAt).toLocaleDateString('az-AZ')}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>{news.views?.toLocaleString() || 0}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {news.title}
        </h3>

        {/* Author */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                <img src={news.author?.image} alt={news.author?.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium text-gray-700">{news.author?.name}</span>
        </div>
      </div>
    </Link>
  )
}

export default NewsCard
