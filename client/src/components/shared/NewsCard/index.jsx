import React from 'react'
import { Link } from 'react-router-dom'
import { Eye, Calendar } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'

const getImageUrl = (image) => {
  if (!image || typeof image !== 'string') return ''
  let value = image.trim()
  if (value.startsWith('`') && value.endsWith('`')) {
    value = value.slice(1, -1).trim()
  }
  return value
}

const NewsCard = ({ news, className }) => {
  const imageUrl = getImageUrl(news.image)
  const createdByName = news.createdBy?.name || news.author?.name || 'Admin'
  const createdByImage = news.createdBy?.image || news.author?.image || ''
  const contentPreview = (() => {
    if (!news.content || typeof news.content !== 'string') return ''
    const normalized = news.content.replace(/\s+/g, ' ').trim()
    if (normalized.length <= 180) return normalized
    return `${normalized.slice(0, 180)}…`
  })()

  return (
    <Link 
      to={`/news/${news.slug}`} 
      className={cn(
        "group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={news.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-sm max-w-[200px] truncate">
            {news.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-3 group-hover:text-blue-600 transition-colors">
          {news.title}
        </h3>

        {contentPreview && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {contentPreview}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 shrink-0">
              {createdByImage ? (
                <img src={createdByImage} alt={createdByName} className="w-full h-full object-cover" />
              ) : null}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-gray-800 truncate">
                {createdByName}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <time className="truncate">{formatDate(news.createdAt)}</time>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
            <Eye className="w-3.5 h-3.5" />
            <span>{news.views?.toLocaleString() || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NewsCard
