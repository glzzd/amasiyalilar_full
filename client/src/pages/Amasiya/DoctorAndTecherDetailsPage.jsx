import React, { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Award, GraduationCap, Stethoscope, Lightbulb, BookOpen } from 'lucide-react'
import allDoctorsAndTeachers from '../../mockDatas/allDoctorsAndTeachers.json'

const DoctorAndTecherDetailsPage = () => {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const person = useMemo(() => {
    return Array.isArray(allDoctorsAndTeachers)
      ? allDoctorsAndTeachers.find((item) => item.slug === slug)
      : null
  }, [slug])

  if (!person) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız şəxs haqqında məlumat mövcud deyil.</p>
        <Link
          to="/amasiyalilar/doctors-and-teachers"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Siyahıya Qayıt
        </Link>
      </div>
    )
  }

  const isDoctor = person.category === 'doctor'

  return (
    <div className="min-h-screen pb-16 bg-white">
      <div className="relative h-[380px] md:h-[480px] w-full">
        <div className="absolute inset-0 bg-gray-900">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10">
            <Link
              to="/amasiyalilar/doctors-and-teachers"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Geri Qayıt</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              {person.category && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
                  {isDoctor ? <Stethoscope size={14} /> : <GraduationCap size={14} />}
                  {isDoctor ? 'Həkim' : 'Müəllim'}
                </span>
              )}
              {person.profession && (
                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                  {person.profession}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              {person.name}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-300 text-sm md:text-base">
              {person.birthplace && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-blue-400" />
                  <span>{person.birthplace}</span>
                </div>
              )}
              {(person.born || person.died) && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-blue-400" />
                  <span>
                    {person.born}
                    {person.died ? ` — ${person.died}` : ' •'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-blue-600 rounded-full" />
                Həyatı və Fəaliyyəti
              </h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                <p>{person.biography || person.description}</p>
              </div>
            </section>

            {isDoctor && person.specializations && person.specializations.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Stethoscope className="text-green-600" size={24} />
                  İxtisaslaşma Sahələri
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {person.specializations.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Stethoscope size={20} className="text-green-600" />
                      </div>
                      <span className="font-medium text-gray-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!isDoctor && person.subjects && person.subjects.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpen className="text-indigo-600" size={24} />
                  Dərs Dediyi Fənlər
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {person.subjects.map((subj, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <BookOpen size={20} className="text-indigo-600" />
                      </div>
                      <span className="font-medium text-gray-700">{subj}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {person.achievements && person.achievements.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="text-yellow-500" size={24} />
                  Mükafatları və Nailiyyətləri
                </h3>
                <ul className="space-y-4">
                  {person.achievements.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-yellow-100"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Məlumat Dosyesi</h3>

              <div className="space-y-6">
                {person.profession && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                      {isDoctor ? <Stethoscope size={14} /> : <GraduationCap size={14} />}
                      Fəaliyyət Sahəsi
                    </div>
                    <div className="text-gray-900 font-medium">{person.profession}</div>
                  </div>
                )}

                {person.education && person.education.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                      <GraduationCap size={14} />
                      Təhsili
                    </div>
                    <ul className="space-y-2">
                      {person.education.map((edu, i) => (
                        <li
                          key={i}
                          className="text-gray-900 font-medium text-sm border-l-2 border-gray-200 pl-3"
                        >
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {person.interesting_facts && person.interesting_facts.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb size={14} />
                      Maraqlı Faktlar
                    </div>
                    <ul className="space-y-3">
                      {person.interesting_facts.map((fact, i) => (
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

export default DoctorAndTecherDetailsPage
