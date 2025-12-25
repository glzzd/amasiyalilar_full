import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import allMenu from '../../../mockDatas/allMenu.json'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'

const sortByOrder = (items) => [...items].sort((a, b) => (a.order || 0) - (b.order || 0))

const SubSubMenu = ({ items }) => {
  const visibleItems = sortByOrder(items.filter(i => i.visible !== false))
  if (visibleItems.length === 0) return null
  return (
    <div className="absolute left-full top-0 ml-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-lg min-w-56 py-2 z-50">
      {visibleItems.map(item => (
        <Link
          key={item.id}
          to={item.path}
          className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  )
}

const SubMenu = ({ items }) => {
  const visibleItems = sortByOrder(items.filter(i => i.visible !== false))
  if (visibleItems.length === 0) return null
  return (
    <div className="absolute left-0 top-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-lg min-w-64 py-2 z-50">
      {visibleItems.map(item => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0
        return (
          <div key={item.id} className="relative group/sub">
            <Link
              to={item.path}
              className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span>{item.label}</span>
              {hasChildren ? <ChevronRight size={16} className="text-slate-500" /> : null}
            </Link>
            {hasChildren ? (
              <div className="hidden group-hover/sub:block">
                <SubSubMenu items={item.children} />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSet, setOpenSet] = useState(new Set())
  const [affixed, setAffixed] = useState(false)
  const [trigger, setTrigger] = useState(0)
  const navRef = useRef(null)
  const topLevel = sortByOrder((Array.isArray(allMenu) ? allMenu : []).filter(i => i.visible !== false))

  const toggleOpen = (id) => {
    setOpenSet(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  useEffect(() => {
    const measure = () => {
      const el = navRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setTrigger(rect.top + window.scrollY)
    }
    measure()
    window.addEventListener('resize', measure, { passive: true })
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setAffixed(window.scrollY >= trigger)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [trigger])

  return (
    <nav
      ref={navRef}
      className={`${affixed ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:bg-slate-900/90' : 'relative bg-white dark:bg-slate-900'} w-full border-b border-slate-200 dark:border-slate-800`}
    >
      <div className="mx-[10px] sm:mx-[20px] lg:mx-[360px] px-[15px] h-12 flex items-center justify-between">
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center size-9 rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <ul className="hidden md:flex items-center gap-6">
          {topLevel.map(item => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0
            return (
              <li key={item.id} className="relative group">
                <Link
                  to={item.path}
                  className="flex items-center gap-1 text-sm font-medium text-slate-800 dark:text-slate-100 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <span>{item.label}</span>
                  {hasChildren ? <ChevronDown size={16} className="text-slate-500" /> : null}
                </Link>
                {hasChildren ? (
                  <div className="hidden group-hover:block">
                    <SubMenu items={item.children} />
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-[15px] pb-3 mx-[10px] sm:mx-[20px]">
          <ul className="flex flex-col gap-1">
            {topLevel.map(item => {
              const hasChildren = Array.isArray(item.children) && item.children.length > 0
              const open = openSet.has(item.id)
              return (
                <li key={item.id}>
                  <div className="flex items-center justify-between">
                    <Link to={item.path} className="py-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                      {item.label}
                    </Link>
                    {hasChildren ? (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center size-8 text-slate-600 dark:text-slate-300"
                        onClick={() => toggleOpen(item.id)}
                        aria-expanded={open}
                      >
                        <ChevronDown size={16} className={`${open ? 'rotate-180' : ''} transition-transform`} />
                      </button>
                    ) : null}
                  </div>
                  {hasChildren && open ? (
                    <div className="pl-3 border-l border-slate-200 dark:border-slate-800">
                      {sortByOrder(item.children.filter(i => i.visible !== false)).map(sub => {
                        const hasGrand = Array.isArray(sub.children) && sub.children.length > 0
                        const subOpen = openSet.has(sub.id)
                        return (
                          <div key={sub.id} className="py-1">
                            <div className="flex items-center justify-between">
                              <Link to={sub.path} className="py-2 text-sm text-slate-700 dark:text-slate-200">
                                {sub.label}
                              </Link>
                              {hasGrand ? (
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center size-8 text-slate-600 dark:text-slate-300"
                                  onClick={() => toggleOpen(sub.id)}
                                  aria-expanded={subOpen}
                                >
                                  <ChevronRight size={16} className={`${subOpen ? 'rotate-90' : ''} transition-transform`} />
                                </button>
                              ) : null}
                            </div>
                            {hasGrand && subOpen ? (
                              <div className="pl-3 border-l border-slate-200 dark:border-slate-800">
                                {sortByOrder(sub.children.filter(i => i.visible !== false)).map(grand => (
                                  <Link
                                    key={grand.id}
                                    to={grand.path}
                                    className="block py-2 text-sm text-slate-600 dark:text-slate-300"
                                  >
                                    {grand.label}
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        )
                      })}
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
