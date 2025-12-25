import React from 'react'
import Hero from '@/components/shared/Hero'
import TrendingNews from '@/components/shared/Trending'
import About from '@/components/shared/About'
import OurIntellectuals from '@/components/shared/OurIntellectuals'
import LatestVideos from '@/components/shared/LatestVideos'

const HomePage = () => {
  return (
    <div className="space-y-6">
      <Hero />
      <TrendingNews />
      <About />
      <LatestVideos />
      <OurIntellectuals />
    </div>
  )
}

export default HomePage
