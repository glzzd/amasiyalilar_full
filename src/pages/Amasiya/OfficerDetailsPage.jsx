import React, { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Book, Award, Briefcase, GraduationCap, Lightbulb } from 'lucide-react'
import allOfficers from '../../mockDatas/allOfficers.json'

const OfficerDetailsPage = () => {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const officer = useMemo(() => {
    return Array.isArray(allOfficers) ? allOfficers.find(i => i.slug === slug) : null
  }, [slug])

  if (!officer) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız şəxs haqqında məlumat mövcud deyil.</p>
        <Link to="/amasiya/officers" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Siyahıya Qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16 bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <div className="absolute inset-0 bg-gray-900">
           <img
            src={officer.image}
            alt={officer.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
             <Link
              to="/amasiya/officers"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Geri Qayıt</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              {officer.region && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {officer.region}
                </span>
              )}
              {officer.profession && (
                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                  {officer.profession}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              {officer.name}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-300 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-400" />
                <span>{officer.birthplace}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-blue-400" />
                <span>{officer.born} — {officer.died}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Biography */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
                Həyatı və Fəaliyyəti
              </h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                <p>{officer.biography || officer.description}</p>
              </div>
            </section>

            {/* Positions */}
            {officer.positions && officer.positions.length > 0 && (
              <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Briefcase className="text-blue-600" size={24} />
                  Tutduğu Vəzifələr
                </h3>
                <ul className="space-y-4">
                  {officer.positions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-blue-100/50">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Achievements */}
            {officer.achievements && officer.achievements.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="text-purple-600" size={24} />
                  Mükafatları və Nailiyyətləri
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {officer.achievements.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white transition-colors">
                        <Award size={20} className="text-gray-500 group-hover:text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-purple-900">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Stats Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Məlumat Dosyesi</h3>
              
              <div className="space-y-6">
                {officer.profession && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                      <Briefcase size={14} />
                      Fəaliyyət Sahəsi
                    </div>
                    <div className="text-gray-900 font-medium">{officer.profession}</div>
                  </div>
                )}

                {officer.education && officer.education.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                      <GraduationCap size={14} />
                      Təhsili
                    </div>
                    <ul className="space-y-2">
                      {officer.education.map((edu, i) => (
                        <li key={i} className="text-gray-900 font-medium text-sm border-l-2 border-gray-200 pl-3">
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {officer.interesting_facts && officer.interesting_facts.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb size={14} />
                      Maraqlı Faktlar
                    </div>
                    <ul className="space-y-3">
                      {officer.interesting_facts.map((fact, i) => (
                        <li key={i} className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default OfficerDetailsPage
