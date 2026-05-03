import React from 'react'
import logo from '../../../../assets/amasiyalilar_logo.png'
import wac from '../../../../assets/wac.jpeg'

const LogoAreaHeader = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center mx-[10px] sm:mx-[20px] lg:mx-[360px] px-[15px] my-4 md:my-6 gap-3'>
      <div className='w-full md:flex-1'>
        <img src={logo} alt="logo" className="max-w-full h-auto md:w-[300px] md:h-[60px]" />
      </div>
      <div className='w-full md:flex-1'>
        <a href="https://westaz.org/az" target="_blank" rel="noopener noreferrer">
          <img src={wac} alt="reklam" className="w-full h-auto md:w-[1000px] md:h-[90px]" />
        </a>
      </div>
    </div>
  )
}

export default LogoAreaHeader
