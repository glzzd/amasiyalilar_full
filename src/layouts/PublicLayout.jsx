import React from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import AdBanner from '@/components/shared/AdBanner'
import leftImg from '@/assets/sidebars/left.svg'
import rightImg from '@/assets/sidebars/right.svg'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div className="min-h-dvh bg-background text-foreground ">
      <Header />
      {/* <aside className="hidden lg:block fixed left-30 top-70 z-40">
        <AdBanner src={leftImg} alt="sol yan görsel" width={160} height={600} />
      </aside>
      <aside className="hidden lg:block fixed right-30 top-70 z-40">
        <AdBanner src={rightImg} alt="sağ yan görsel" width={160} height={600} />
      </aside> */}
      
      <main className="px-[15px] mx-[10px] sm:mx-[20px] lg:mx-[360px] pt-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
