import React from 'react'
import { cn } from '@/lib/utils'

const AdBanner = ({ src, alt, href, width = 160, height = 600, className }) => {
  const content = (
    <img
      src={src}
      alt={alt}
      style={{ width, height }}
      className={cn('object-cover rounded-md shadow-md', className)}
    />
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
        {content}
      </a>
    )
  }
  return content
}

export default AdBanner
