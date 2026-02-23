import React, { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Calendar, Tag, Feather, ExternalLink, Hash, Layers } from 'lucide-react'
import library from '../../mockDatas/library.json'

const BookDetailsPage = () => {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const book = useMemo(() => {
    return Array.isArray(library) ? library.find(b => b.slug === slug) : null
  }, [slug])

  const sameAuthorBooks = useMemo(() => {
    if (!book) return []
    return library.filter(b => b.authorId === book.authorId && b.slug !== book.slug).slice(0, 6)
  }, [book])

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Məlumat tapılmadı</h2>
        <p className="text-gray-500 mt-2">Axtardığınız kitab haqqında məlumat mövcud deyil.</p>
        <Link to="/western-azerbaijan/library" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Siyahıya Qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 bg-white text-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/western-azerbaijan/library"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} className="text-gray-700 group-hover:text-blue-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Geri Qayıt</span>
          </Link>
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <ExternalLink size={16} />
            Aç
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <img src={book.cover} alt={book.title} className="w-full h-auto object-cover" />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={20} className="text-indigo-600" />
                <h1 className="text-2xl md:text-3xl font-bold">{book.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <Feather size={16} className="text-purple-600" />
                <Link to={`/western-azerbaijan/authors/${book.authorSlug}`} className="text-blue-600 hover:underline">
                  {book.authorName}
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-4">
              <span className="inline-flex items-center gap-1"><Calendar size={16} /> {book.year}</span>
              {book.publisher ? <span className="inline-flex items-center gap-1"><Layers size={16} /> {book.publisher}</span> : null}
              {book.pages ? <span className="inline-flex items-center gap-1"><BookOpen size={16} /> {book.pages} səhifə</span> : null}
              {book.language ? <span className="inline-flex items-center gap-1">{book.language.toUpperCase()}</span> : null}
              {book.isbn ? <span className="inline-flex items-center gap-1"><Hash size={16} /> {book.isbn}</span> : null}
            </div>

            {Array.isArray(book.genres) && book.genres.length > 0 ? (
              <div className="mb-3 text-sm text-gray-700 inline-flex items-center gap-2">
                <Tag size={16} />
                <span>{book.genres.join(', ')}</span>
              </div>
            ) : null}

            {book.description ? (
              <p className="text-gray-700 leading-relaxed mt-4">
                {book.description}
              </p>
            ) : null}

            {Array.isArray(book.tags) && book.tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {book.tags.map((t, i) => (
                  <span key={i} className="text-xs text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {sameAuthorBooks.length > 0 ? (
          <div className="mt-10">
            <h3 className="text-lg font-bold mb-4">Müəllifin digər kitabları</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sameAuthorBooks.map((b) => (
                <Link key={b.id} to={`/western-azerbaijan/library/${b.slug}`} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={b.cover} alt={b.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold">{b.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{b.year}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default BookDetailsPage
