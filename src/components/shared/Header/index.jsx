import React from 'react'
import LatestNewsHeader from './LatestNewsHeader'
import LogoAreaHeader from './LogoAreaHeader'
import Navbar from '../Navbar'

const Header = () => {
  return (
    <div className=''>
        <LatestNewsHeader />
        <LogoAreaHeader />
        <Navbar />
    </div>
  )
}

export default Header
