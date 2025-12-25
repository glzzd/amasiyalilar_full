import React, { useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  MapPin, 
  Users, 
  Mountain, 
  Home, 
  ArrowLeft, 
  BookOpen, 
  LocateFixed,
  Wind,
  Sun,
  Share2
} from 'lucide-react'
import allLocus from '../../mockDatas/allLocus.json'

const LocusDetailsPage = () => {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const locus = useMemo(() => {
    return allLocus.find(item => item.slug === slug)
  }, [slug])

  if (!locus) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        <h2 className="text-4xl font-bold mb-4">Mahal Tapılmadı</h2>
        <Link to="/" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2">
          <ArrowLeft size={20} /> Ana Səhifəyə Qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-20 selection:bg-green-100 selection:text-green-900">
      
      {/* Immersive Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
            <img 
              src={locus.image} 
              alt={locus.name} 
              className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        </div>

        {/* Navigation Bar inside Hero */}
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-20">
             <Link 
                to="/locus" 
                className="group flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="bg-white/20 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                    <ArrowLeft size={18} className="text-white" />
                </div>
                <span className="font-medium text-white tracking-wide text-sm">Geri Qayıt</span>
             </Link>

             <button className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 hover:bg-white/20 transition-all text-white">
                <Share2 size={20} />
             </button>
        </div>

        {/* Hero Content - Bottom Aligned */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 container mx-auto z-20">
          <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                 <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-green-500/30">
                    Tarixi Mahal
                 </span>
                 <span className="text-gray-300 flex items-center gap-1 text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    <MapPin size={14} /> Qərbi Azərbaycan
                 </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-[0.9] drop-shadow-2xl">
                {locus.name}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl font-light leading-relaxed drop-shadow-md">
                {locus.description}
              </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar / Quick Stats (Sticky) */}
            <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-10 space-y-8">
                    {/* Stats Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-green-500 rounded-full"></span>
                            Qısa Məlumat
                        </h3>
                        <div className="space-y-6">
                            <StatRow icon={<MapPin className="text-blue-500" />} label="Ərazi" value={locus.stats.area} />
                            <div className="h-px bg-gray-50" />
                            <StatRow icon={<Users className="text-green-500" />} label="Əhali" value={locus.stats.population} />
                            <div className="h-px bg-gray-50" />
                            <StatRow icon={<Mountain className="text-purple-500" />} label="Hündürlük" value={locus.stats.elevation} />
                            <div className="h-px bg-gray-50" />
                            <StatRow icon={<Home className="text-orange-500" />} label="Kənd Sayı" value={locus.stats.villages} />
                        </div>
                    </div>

                    {/* Climate/Info Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Wind size={100} />
                        </div>
                        <h3 className="text-lg font-bold mb-6 relative z-10">İqlim və Təbiət</h3>
                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/5">
                                <Sun className="text-yellow-400 mb-2" size={24} />
                                <div className="text-sm text-gray-400">Günəşli</div>
                                <div className="font-bold">~250 gün</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/5">
                                <Wind className="text-blue-300 mb-2" size={24} />
                                <div className="text-sm text-gray-400">İqlim</div>
                                <div className="font-bold">Kontinental</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-16">
                
                {/* Introduction Text */}
                <div className="prose prose-lg prose-gray max-w-none">
                    <p className="text-2xl text-gray-500 leading-relaxed font-light border-l-4 border-gray-200 pl-6 italic">
                        "{locus.description}"
                    </p>
                </div>

                {/* History Section */}
                <section>
                    <SectionHeader icon={<BookOpen />} title="Tarixi Keçmişi" />
                    <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
                        <p className="text-gray-600 leading-loose text-lg text-justify first-letter:text-5xl first-letter:font-black first-letter:text-green-600 first-letter:mr-3 first-letter:float-left">
                            {locus.history}
                        </p>
                    </div>
                </section>

                {/* Geography Section */}
                <section>
                    <SectionHeader icon={<LocateFixed />} title="Coğrafi Mövqeyi" />
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group">
                        <div className="absolute -right-20 -top-20 bg-green-50 w-64 h-64 rounded-full opacity-50 blur-3xl group-hover:bg-green-100 transition-colors duration-700" />
                        <p className="text-gray-600 leading-loose text-lg text-justify relative z-10">
                            {locus.geography}
                        </p>
                    </div>
                </section>

                {/* Culture Section */}
                <section>
                    <SectionHeader icon={<Users />} title="Mədəniyyət" />
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-[2.5rem] p-10 border border-green-100">
                         <p className="text-gray-700 leading-loose text-lg">
                            {locus.culture}
                        </p>
                    </div>
                </section>

                {/* Villages List */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <SectionHeader icon={<Home />} title="Kəndlər" />
                        <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                            Cəmi: {locus.villages.length}
                        </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {locus.villages.map((village, idx) => (
                            <div 
                                key={idx}
                                className="px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-green-700 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 cursor-default font-medium text-sm"
                            >
                                {village}
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
const StatRow = ({ icon, label, value }) => (
    <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-green-600 group-hover:bg-green-50 transition-colors">
                {React.cloneElement(icon, { size: 18 })}
            </div>
            <span className="text-gray-500 font-medium">{label}</span>
        </div>
        <span className="text-gray-900 font-bold">{value}</span>
    </div>
)

const SectionHeader = ({ icon, title }) => (
    <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-gray-200">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h2>
    </div>
)

export default LocusDetailsPage
