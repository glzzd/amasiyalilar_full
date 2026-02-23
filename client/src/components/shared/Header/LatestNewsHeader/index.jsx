import React, { useState, useEffect } from 'react';
import allNews from '../../../../mockDatas/allNews.json';
import { Megaphone, Facebook, Twitter, Instagram, Youtube, UserCircle } from 'lucide-react';

const LatestNewsHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const now = new Date();
  const recentNews = Array.isArray(allNews)
    ? allNews.filter((n) => {
        const dt = new Date(n.createdAt);
        return dt <= now && now.getTime() - dt.getTime() <= 3 * 24 * 60 * 60 * 1000;
      })
    : [];
  const recentLength = recentNews.length;
  const sourceNews =
    recentLength > 0
      ? recentNews
      : (Array.isArray(allNews)
          ? [...allNews].sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          : []);
  const sourceLength = sourceNews.length;

  useEffect(() => {
    if (!sourceLength) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sourceLength);
    }, 5000);

    return () => clearInterval(interval);
  }, [sourceLength]);

  if (!sourceLength) {
    return (
      <div className="w-full bg-slate-900 text-white border-b border-slate-800 ">
        <div className="mx-[10px] sm:mx-[20px] lg:mx-[360px] px-[15px] h-10 flex items-center">
          <div className="flex items-center gap-2 bg-red-600 px-3 py-1 h-full text-xs font-bold uppercase tracking-wider shrink-0 z-10">
            <Megaphone size={14} />
            <span className="hidden sm:inline">Son xəbərlər</span>
          </div>
          <div className="flex-1 pl-4 text-sm">Son 3 gündə xəbər paylaşılmayıb</div>
          <div className="hidden md:flex items-center gap-3 ml-4 shrink-0">
            <a href="#" aria-label="Facebook" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="Twitter" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Twitter size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="YouTube" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <Youtube size={16} />
            </a>
            <a href="/admin" aria-label="Giriş" className="text-slate-300 hover:text-white transition-colors">
              <UserCircle size={18} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentNews = sourceNews[currentIndex];

  return (
    <div className="w-full bg-slate-900 text-white border-b border-slate-800">
      <div className="mx-[10px] sm:mx-[20px] lg:mx-[360px] px-[15px] h-10 flex items-center overflow-hidden justify-between">
        <div className='flex items-center gap-2'>

       
        <div className="flex items-center gap-2 bg-red-600 px-3 py-5 h-full text-xs font-bold uppercase tracking-wider shrink-0 z-10">
          <Megaphone size={14} />
          <span className="hidden sm:inline">Son xəbərlər</span>
        </div>
        <div className="flex-1 relative h-full flex items-center pl-4 overflow-hidden">
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up {
              animation: slideUp 0.5s ease-out forwards;
            }
          `}</style>
          <div 
            key={currentNews._id}
            className="animate-slide-up truncate w-full"
          >
            <span className="text-slate-400 text-xs mr-2 font-medium">
              {new Date(currentNews.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-sm font-medium hover:text-red-400 cursor-pointer transition-colors">
              {currentNews.title}
            </span>
          </div>
        </div>
         </div>


        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a href="#" aria-label="Facebook" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            <Facebook size={16} />
          </a>
          <a href="#" aria-label="Twitter" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            <Twitter size={16} />
          </a>
          <a href="#" aria-label="Instagram" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            <Instagram size={16} />
          </a>
          <a href="#" aria-label="YouTube" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            <Youtube size={16} />
          </a>
          <a href="/admin" aria-label="Giriş" className="text-slate-300 hover:text-white transition-colors">
            <UserCircle size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LatestNewsHeader;
