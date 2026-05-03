import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Map, ArrowRight, Compass, Loader2 } from 'lucide-react'
import { fetchLocus } from './locusService'

const AllLocusPage = () => {
  const [locus, setLocus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        const list = await fetchLocus({ limit: 1000 })
        if (!isMounted) return
        setLocus(Array.isArray(list) ? list : [])
      } catch (err) {
        if (isMounted) setError(err.message || 'Məlumatlar yüklənərkən xəta baş verdi')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24">
      {/* Abstract Background Pattern */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-green-50/50 to-transparent -z-10" />
      <div className="absolute top-0 right-0 p-20 opacity-30 -z-10">
         <Compass size={400} className="text-green-100" strokeWidth={0.5} />
      </div>

      <div className="container mx-auto px-6 ">
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            <Map size={16} />
            <span>Tarixi İrs</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 text-gray-900 tracking-tight leading-[0.9]">
            Tarixi <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">
              Mahallar
            </span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl border-l-4 border-green-500 pl-6">
            Qərbi Azərbaycanın unudulmaz tarixi mahalları. Hər daşı, hər qarışı tarix qoxan, 
            babalarımızın izini daşıyan müqəddəs torpaqlar.
          </p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-green-600" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-900">Xəta baş verdi</h3>
            <p className="text-gray-500 mt-2">{error}</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {locus.map((locus, index) => (
            <Link 
              to={`/locus/${locus.slug}`} 
              key={locus.id}
              className="group flex flex-col gap-6 cursor-pointer"
            >
              {/* Image Card */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl transition-all duration-700 hover:shadow-2xl group-hover:-translate-y-2">
                <img 
                  src={locus.image} 
                  alt={locus.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating Action Button */}
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                  <ArrowRight size={20} className="text-gray-900" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3 px-2">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-sm font-mono text-gray-400">0{index + 1}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-green-600">Mahal</span>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-2">
                    {locus.name}
                  </h3>
                  <p className="text-gray-500 line-clamp-2 leading-relaxed">
                    {locus.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </div>
  )
}

export default AllLocusPage
