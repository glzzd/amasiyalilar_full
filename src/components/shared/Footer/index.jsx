import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-8 bg-[#0e172c] text-white">
      <div className="mx-[10px] sm:mx-[20px] lg:mx-[360px] px-[15px] py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
           <div className='w-full md:flex-1'>
        <img src="https://placehold.co/240x48/png?text=AmasiyalılarLogo" alt="logo" className="max-w-full h-auto md:w-[300px] md:h-[60px]" />
      </div>
            <p className="mt-2 text-white/80 text-sm">
              Qərbi Azərbaycan Türklərinin və Qərbi Azərbaycanda yaşayan insanların mədəni irsini, ənənələrini və gündəmini paylaşan platforma.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide uppercase text-white/70">Keçidlər</div>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/about" className="inline-flex items-center gap-2 text-white/90 hover:text-red-400 transition-colors text-sm">
                  <ChevronRight size={16} /> Haqqımızda
                </Link>
              </li>
              <li>
                <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-red-400 transition-colors text-sm">
                  <ChevronRight size={16} /> Xəbərlər
                </Link>
              </li>
              <li>
                <Link to="/intellectuals" className="inline-flex items-center gap-2 text-white/90 hover:text-red-400 transition-colors text-sm">
                  <ChevronRight size={16} /> Ziyalılar
                </Link>
              </li>
              <li>
                <Link to="/contact" className="inline-flex items-center gap-2 text-white/90 hover:text-red-400 transition-colors text-sm">
                  <ChevronRight size={16} /> Əlaqə
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide uppercase text-white/70">Abunə ol</div>
            <form className="mt-2 flex items-center gap-2">
              <input
                type="email"
                placeholder="E-poçt"
                className="w-full rounded-md bg-white/10 text-white placeholder-white/60 border border-white/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors text-sm font-semibold"
              >
                Göndər
              </button>
            </form>
            <div className="mt-3 text-white/60 text-xs">
              Abunə olaraq yeniliklərdən xəbərdar olun.
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-[10px] sm:mx-[20px] lg:mx-[360px] px-[15px] py-4 flex items-center justify-between">
          <div className="text-xs text-white/60">© {new Date().getFullYear()} Amasiyalilar.az. Bütün hüquqlar qorunur.</div>
          <div className="text-xs text-white/60">Məxfilik • Şərtlər</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
