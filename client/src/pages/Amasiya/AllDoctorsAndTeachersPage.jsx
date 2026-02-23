import React, { useMemo, useState } from 'react'
import { Search, Calendar, MapPin, GraduationCap, Stethoscope } from 'lucide-react'
import { Link } from 'react-router-dom'
import allDoctorsAndTeachers from '../../mockDatas/allDoctorsAndTeachers.json'

const AllDoctorsAndTeachers = () => {
  const people = useMemo(() => {
    return Array.isArray(allDoctorsAndTeachers) ? allDoctorsAndTeachers : []
  }, [])

  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return people.filter(item => {
      const matchesRole =
        roleFilter === 'all' ||
        (roleFilter === 'doctor' && item.category === 'doctor') ||
        (roleFilter === 'teacher' && item.category === 'teacher')

      const inName = item.name.toLowerCase().includes(q)
      const inDesc = item.description?.toLowerCase().includes(q)
      const inPlace = item.birthplace?.toLowerCase().includes(q)
      const inProf = item.profession?.toLowerCase().includes(q)

      const matchesSearch = !q || inName || inDesc || inPlace || inProf

      return matchesRole && matchesSearch
    })
  }, [query, roleFilter, people])

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  }, [filtered, currentPage])

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24">
      <div className="container mx-auto px-6 pt-12">
        <div className="max-w-3xl mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 tracking-tight leading-[0.95]">
            Amasiya Həkimləri və Müəllimləri
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Amasiya rayonundan çıxmış, təhsildə və səhiyyədə iz qoymuş həkim və müəllimlər. Onların fəaliyyəti
            həm Amasiyada, həm də bütün Azərbaycanda xatırlanır.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch md:items-center">
          <div className="relative flex-grow">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Axtar (ad, ixtisas, yer)..."
              className="w-full pl-3 pr-9 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRoleFilter('all')}
              className={`px-4 py-2 rounded-full border text-sm font-medium ${
                roleFilter === 'all'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              Hamısı
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter('doctor')}
              className={`px-4 py-2 rounded-full border text-sm font-medium inline-flex items-center gap-2 ${
                roleFilter === 'doctor'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Stethoscope size={16} />
              Həkimlər
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter('teacher')}
              className={`px-4 py-2 rounded-full border text-sm font-medium inline-flex items-center gap-2 ${
                roleFilter === 'teacher'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <GraduationCap size={16} />
              Müəllimlər
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map(item => (
              <Link
                to={`/amasiyalilar/doctors-and-teachers/${item.slug}`}
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                      {item.category === 'doctor' ? (
                        <>
                          <Stethoscope size={14} />
                          Həkim
                        </>
                      ) : (
                        <>
                          <GraduationCap size={14} />
                          Müəllim
                        </>
                      )}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white leading-tight mb-1">{item.name}</h3>
                    <p className="text-white/80 text-sm font-medium">{item.profession}</p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
                    {item.birthplace && (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-blue-500" />
                        <span>{item.birthplace}</span>
                      </div>
                    )}
                    {(item.born || item.died) && (
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-blue-500" />
                        <span>
                          {item.born}
                          {item.died ? ` — ${item.died}` : ' •'}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                    {item.description}
                  </p>

                  {item.achievements && item.achievements.length > 0 && (
                    <ul className="text-xs text-gray-500 space-y-1 mb-4">
                      {item.achievements.slice(0, 2).map((ach, idx) => (
                        <li key={idx} className="truncate">
                          • {ach}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Heç nə tapılmadı</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Axtarış sorğunuza və filtrə uyğun nəticə tapılmadı. Zəhmət olmasa başqa açar sözlər və ya filtr seçin.
            </p>
          </div>
        )}
        {filtered.length > itemsPerPage ? (
          <div className="mt-10 flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1.5 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                Geri
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1
                const active = page === currentPage
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1.5 rounded-md border ${
                      active
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1.5 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                İrəli
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AllDoctorsAndTeachers
