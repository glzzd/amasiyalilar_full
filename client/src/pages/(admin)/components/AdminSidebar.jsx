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
        id: 'admin-martyrs',
        label: 'Şəhidlər (allMartyrs.json)',
        path: '/admin/content/martyrs',
        icon: 'medal'
      },
      {
        id: 'admin-heroes',
        label: 'Qəhrəmanlar (allHeroes.json)',
        path: '/admin/content/heroes',
        icon: 'star'
      },
      {
        id: 'admin-veterans',
        label: 'Qazilər (allVeterans.json)',
        path: '/admin/content/veterans',
        icon: 'shield'
      },
      {
        id: 'admin-videos',
        label: 'Videolar (allVideos.json)',
        path: '/admin/content/videos',
        icon: 'video'
      },
      {
        id: 'admin-documentaries',
        label: 'Sənədli filmlər (allDocumentaries.json)',
        path: '/admin/content/documentaries',
        icon: 'film'
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
    id: 'admin-section-locus',
    label: 'Yerlər və abidələr',
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
                        'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200',
                        active
                          ? 'bg-blue-50 text-blue-700 font-medium shadow-sm ring-1 ring-blue-100'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      ].join(' ')
                    }}
                  >
                    {iconElement && (
                      <span className={`w-4 h-4 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`}>
                        {iconElement}
                      </span>
                    )}
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mt-4 mb-1">
                    {iconElement && <span className="w-4 h-4 text-gray-400">{iconElement}</span>}
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
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700">Naviqasiya</h2>
        <p className="text-xs text-gray-500 mt-1">İdarəetmə paneli menyusu</p>
      </div>
      <nav className="p-3 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
        {renderItems(menuItems)}
      </nav>
    </div>
  )
}

export default AdminSidebar
