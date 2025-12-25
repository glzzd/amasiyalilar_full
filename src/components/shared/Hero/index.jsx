import React from 'react'
import { Link } from 'react-router-dom'
import allNews from '../../../mockDatas/allNews.json'
import { formatDate } from '@/lib/utils'

const Card = ({ item, size = 'md' }) => (
  <Link to={item.slug ? `/news/${item.slug}` : '#'} className="group relative block md:h-full overflow-hidden rounded-md transform-gpu transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-auto md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
    <div className="absolute left-0 top-0 m-3">
      {item.category ? (
        <span className="inline-block rounded px-2 py-1 text-xs font-semibold bg-sky-500 text-white transition-all group-hover:brightness-110">
          {item.category}
        </span>
      ) : null}
    </div>
    <div className="absolute left-0 right-0 bottom-0 p-4">
      <div className="text-white/80 text-xs">
        {formatDate(item.createdAt)}
      </div>
      <div className={`text-white font-bold ${size === 'lg' ? 'text-xl md:text-2xl' : 'text-sm md:text-base'} mt-1 line-clamp-2 transition-colors group-hover:text-red-400`}>
        {item.title}
      </div>
      <div className="text-white/80 text-xs mt-1">
        {(item.author && item.author.name) ? item.author.name : ''}{item.author && item.author.name ? ' · ' : ''}{Number(item.views || 0).toLocaleString('tr-TR')} oxunma
      </div>
      
    </div>
  </Link>
)

const Hero = () => {
  const sorted = Array.isArray(allNews)
    ? [...allNews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : []
  const items = sorted.slice(0, 4)
  if (items.length === 0) return null

  const leftFeatured = items[0]
  const rightTop = items[1]
  const rightBottomLeft = items[2]
  const rightBottomRight = items[3]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-4">
      <div className="md:h-[436px]">
        {leftFeatured ? <Card item={leftFeatured} size="lg" /> : null}
      </div>
      <div className="grid gap-[12px] md:gap-4 md:h-[436px]">
        <div className="md:h-[210px]">
          {rightTop ? <Card item={rightTop} /> : null}
        </div>
        <div className="grid grid-cols-2 gap-[12px] md:gap-4 md:h-[210px]">
          <div className="md:h-full">{rightBottomLeft ? <Card item={rightBottomLeft} /> : null}</div>
          <div className="md:h-full">{rightBottomRight ? <Card item={rightBottomRight} /> : null}</div>
        </div>
      </div>
    </div>
  )
}

export default Hero
