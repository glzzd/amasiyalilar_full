import React, { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Home,
  Info,
  Map,
  Globe2,
  Users,
  Phone,
  Newspaper,
  Shield,
  Medal,
  Film,
  Star,
  Landmark,
  MapPin,
  Building,
  Ruler,
  Pen,
  Stethoscope,
  Badge,
  Trophy,
  Video,
  Music,
  Briefcase,
  Plane,
  BookOpen
} from 'lucide-react'

const iconMap = {
  home: Home,
  info: Info,
  map: Map,
  globe: Globe2,
  users: Users,
  phone: Phone,
  newspaper: Newspaper,
  shield: Shield,
  medal: Medal,
  film: Film,
  star: Star,
  landmark: Landmark,
  'map-pin': MapPin,
  city: Building,
  building: Building,
  ruler: Ruler,
  pen: Pen,
  stethoscope: Stethoscope,
  badge: Badge,
  trophy: Trophy,
  video: Video,
  music: Music,
  briefcase: Briefcase,
  plane: Plane,
  library: BookOpen
}

const adminMenu = [
  {
    id: 'admin-section-content',
    label: 'Əsas məlumatlar',
    children: [
      {
        id: 'admin-about-us',
        label: 'Haqqımızda (aboutUs.json)',
        path: '/admin/content/about-us',
        icon: 'info'
      },
      {
        id: 'admin-about-west',
        label: 'Qərbi Azərbaycan haqqında',
        path: '/admin/content/about-west-azerbaijan',
        icon: 'globe'
      },
      {
        id: 'admin-contact',
        label: 'Əlaqə məlumatları',
        path: '/admin/content/contact',
        icon: 'phone'
      },
      {
        id: 'admin-menu',
        label: 'Sayt menyusu (allMenu.json)',
        path: '/admin/content/menu',
        icon: 'map'
      }
    ]
  },
  {
    id: 'admin-section-news',
    label: 'Xəbərlər və media',
    children: [
      {
        id: 'admin-news',
        label: 'Xəbərlər (allNews.json)',
        path: '/admin/content/news',
        icon: 'newspaper'
      },
      {
        id: 'admin-documentaries',
        label: 'Sənədli filmlər',
        path: '/admin/content/documentaries',
        icon: 'film'
      },
      {
        id: 'admin-videos',
        label: 'Videolar (allVideos.json)',
        path: '/admin/content/videos',
        icon: 'video'
      },
      {
        id: 'admin-musics',
        label: 'Musiqilər (allMusics.json)',
        path: '/admin/content/musics',
        icon: 'music'
      }
    ]
  },
  {
    id: 'admin-section-heroes',
    label: 'Qəhrəmanlar',
    children: [
      {
        id: 'admin-martyrs',
        label: 'Şəhidlər (allMartyrs.json)',
        path: '/admin/content/martyrs',
        icon: 'shield'
      },
      {
        id: 'admin-veterans',
        label: 'Qazilər (allVeterans.json)',
        path: '/admin/content/veterans',
        icon: 'medal'
      },
      {
        id: 'admin-heroes',
        label: 'Unudulmaz qəhrəmanlar',
        path: '/admin/content/heroes',
        icon: 'star'
      }
    ]
  },
  {
    id: 'admin-section-west',
    label: 'Qərbi Azərbaycan',
    children: [
      {
        id: 'admin-districts',
        label: 'Rayonlar (allDistricts.json)',
        path: '/admin/content/districts',
        icon: 'map'
      },
      {
        id: 'admin-counties',
        label: 'Mahallar (allCounties.json)',
        path: '/admin/content/counties',
        icon: 'landmark'
      },
      {
        id: 'admin-city',
        label: 'Şəhər (city.json)',
        path: '/admin/content/city',
        icon: 'city'
      },
      {
        id: 'admin-area',
        label: 'Ərazisi (area.json)',
        path: '/admin/content/area',
        icon: 'ruler'
      },
      {
        id: 'admin-locus',
        label: 'Mahallar (allLocus.json)',
        path: '/admin/content/locus',
        icon: 'map-pin'
      },
      {
        id: 'admin-villages',
        label: 'Kəndlər (allVillages.json)',
        path: '/admin/content/villages',
        icon: 'map-pin'
      },
      {
        id: 'admin-intellectuals-west',
        label: 'Qərbi Azərbaycan ziyalıları',
        path: '/admin/content/our-intellectuals',
        icon: 'users'
      },
      {
        id: 'admin-monuments',
        label: 'Abidələr (allMonuments.json)',
        path: '/admin/content/monuments',
        icon: 'landmark'
      },
      {
        id: 'admin-library',
        label: 'Kitabxana (library.json)',
        path: '/admin/content/library',
        icon: 'library'
      }
    ]
  },
  {
    id: 'admin-section-amasiyalilar',
    label: 'Amasiyalılar',
    children: [
      {
        id: 'admin-officers',
        label: 'Vəzifəli şəxslər',
        path: '/admin/content/officers',
        icon: 'badge'
      },
      {
        id: 'admin-authors',
        label: 'Şair və yazıçılar',
        path: '/admin/content/authors',
        icon: 'pen'
      },
      {
        id: 'admin-doctors-teachers',
        label: 'Həkim və müəllimlər',
        path: '/admin/content/doctors-and-teachers',
        icon: 'stethoscope'
      },
      {
        id: 'admin-athletes',
        label: 'İdmançılar (allAthletes.json)',
        path: '/admin/content/athletes',
        icon: 'trophy'
      },
      {
        id: 'admin-business',
        label: 'İş adamları (allBusiness.json)',
        path: '/admin/content/business',
        icon: 'briefcase'
      },
      {
        id: 'admin-abroads',
        label: 'Xaricdə yaşayanlar (AllAbroads.json)',
        path: '/admin/content/abroads',
        icon: 'globe'
      }
    ]
  }
]

const getIconComponent = (icon) => {
  if (!icon) return null
  const Component = iconMap[icon]
  if (!Component) return null
  return <Component size={14} className="shrink-0" />
}

const AdminSidebar = () => {
  const location = useLocation()

  const menuItems = useMemo(() => adminMenu, [])

  const renderItems = (items, depth = 0) => {
    const paddingLeft = depth === 0 ? 'pl-0' : depth === 1 ? 'pl-3' : 'pl-6'

    return (
      <ul className="space-y-1">
        {items.map((item) => {
          const hasChildren = Array.isArray(item.children) && item.children.length > 0
          const isActive =
            item.path && (location.pathname === item.path || location.pathname.startsWith(item.path + '/'))

          const iconElement = getIconComponent(item.icon)

          return (
            <li key={item.id || item.path}>
              <div className={paddingLeft}>
                {item.path ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive: linkActive }) => {
                      const active = isActive || linkActive
                      return [
                        'flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors',
                        active
                          ? 'bg-slate-800 text-slate-50'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      ].join(' ')
                    }}
                  >
                    {iconElement && (
                      <span className="w-4 h-4 text-slate-400 group-hover:text-slate-200">{iconElement}</span>
                    )}
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ) : (
                  <div className="flex items-center gap-2 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {iconElement && <span className="w-4 h-4 text-slate-500">{iconElement}</span>}
                    <span className="truncate">{item.label}</span>
                  </div>
                )}
              </div>

              {hasChildren && (
                <div className="mt-0.5">{renderItems(item.children, depth + 1)}</div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <aside className="w-60 shrink-0 border-r border-slate-800 bg-slate-950/60">
      <div className="py-3 px-2">
        <div className="mb-3 px-2">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Sayt Menyusu
          </div>
          <div className="text-[11px] text-slate-500">
            allMenu.json faylındakı bütün əsas bölmələr
          </div>
        </div>
        <nav className="space-y-2 text-xs text-slate-300">
          {renderItems(menuItems)}
        </nav>
      </div>
    </aside>
  )
}

export default AdminSidebar
