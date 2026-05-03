import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { getAbout } from '../../../pages/About/services/aboutService'

const About = () => {
  const [about, setAbout] = useState(null)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        const response = await getAbout()
        const data = response?.data || response?.about || response
        if (!isMounted) return
        setAbout(data || null)
      } catch {
        if (isMounted) setAbout(null)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [])

  const cta = useMemo(() => {
    if (about?.cta?.href) return about.cta
    return { href: '/about', text: 'Daha çox' }
  }, [about])

  if (!about) return null

  return (
    <section className="mt-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div className="relative flex items-center justify-center gap-4">
          <div className="overflow-hidden rounded-md ">
            <img
              src={about.photos?.[0]}
              alt={about.title}
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
        <div>
          {about.label ? (
            <div className="text-xs font-semibold tracking-wide uppercase text-red-500 mb-2">
              {about.label}
            </div>
          ) : null}
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {about.title}
          </h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
            {about.desc}
          </p>
          {Array.isArray(about.bullets) && about.bullets.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {about.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-800 dark:text-slate-200 text-sm">
                  <CheckCircle2 size={16} className="text-red-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {cta?.href ? (
            <Link
              to={cta.href}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              {cta?.text || 'Daha çox'}
              <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default About
