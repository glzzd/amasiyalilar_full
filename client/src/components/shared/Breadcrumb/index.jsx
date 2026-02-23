import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <div className="bg-white border-b border-gray-200 w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
                )}
                
                {isLast ? (
                  <span className="text-gray-900 font-medium truncate">
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    to={item.path} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
