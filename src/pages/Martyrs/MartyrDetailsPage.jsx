import React, { useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Award, MapPin, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import allMartyrs from '../../mockDatas/allMartyrs.json'
import { formatDate } from '@/lib/utils'
import OtherMartyrsSlider from '../../components/shared/OtherMartyrsSlider'

const MartyrDetailsPage = () => {
  const { slug } = useParams()

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  // Find the martyr
  const martyr = useMemo(() => {
    return allMartyrs.find(item => item.slug === slug)
  }, [slug])

  if (!martyr) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız şəhid haqqında məlumat mövcud deyil.</p>
        <Link to="/martyrs" className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Şəhidlər Siyahısına Qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">

      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Hero Section with Image and Overlay */}
          <div className="relative h-96 md:h-[500px] w-full">
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
             <img 
               src={martyr.image} 
               alt={martyr.fullName} 
               className="w-full h-full object-cover object-top"
             />
             
             <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 text-white">
                <div className="container mx-auto">
                    <span className="inline-block px-4 py-1.5 bg-red-600 text-white text-sm font-bold rounded-full mb-4 shadow-lg tracking-wide uppercase">
                        {martyr.rank}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        {martyr.fullName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-gray-200 text-lg">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-red-500" />
                            <span>{formatDate(martyr.birthDate)} - {formatDate(martyr.deathDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-red-500" />
                            <span>{martyr.location}</span>
                        </div>
                    </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 md:p-12">
            
            {/* Main Content (Left) */}
            <div className="lg:col-span-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-4">
                    Həyatı və Döyüş Yolu
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="text-xl text-gray-600 font-medium mb-8">
                        {martyr.description}
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                    </p>
                    
                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Xatirəsi</h3>
                    <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p>
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-medium text-gray-900">Xatirəni Paylaş:</span>
                    <div className="flex gap-3">
                        <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                            <Facebook className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-100 transition-colors">
                            <Twitter className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar (Right) */}
            <div className="lg:col-span-4 space-y-8">
                
                {/* Awards Card */}
                {martyr.awards && martyr.awards.length > 0 && (
                    <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl border border-red-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Award className="w-6 h-6 text-red-600" />
                            Təltifləri
                        </h3>
                        <ul className="space-y-3">
                            {martyr.awards.map((award, index) => (
                                <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-red-50 shadow-sm">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0" />
                                    <span className="text-gray-800 font-medium">{award}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Quick Info Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Qısa Məlumat</h3>
                    <div className="space-y-4">
                        <div>
                            <span className="text-sm text-gray-500 block mb-1">Doğum Tarixi</span>
                            <span className="font-medium text-gray-900">
                                {formatDate(martyr.birthDate)}
                            </span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div>
                            <span className="text-sm text-gray-500 block mb-1">Şəhadət Tarixi</span>
                            <span className="font-medium text-gray-900">
                                {formatDate(martyr.deathDate)}
                            </span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div>
                            <span className="text-sm text-gray-500 block mb-1">Rütbəsi</span>
                            <span className="font-medium text-gray-900">{martyr.rank}</span>
                        </div>
                         <div className="h-px bg-gray-100" />
                        <div>
                            <span className="text-sm text-gray-500 block mb-1">Dəfn Yeri</span>
                            <span className="font-medium text-gray-900">{martyr.location}</span>
                        </div>
                    </div>
                </div>

            </div>

          </div>
        </div>
        
        {/* Other Martyrs Slider */}
        <div className="mt-12">
            <OtherMartyrsSlider currentSlug={slug} />
        </div>

      </div>
    </div>
  )
}

export default MartyrDetailsPage
