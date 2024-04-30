import React, { ReactNode } from 'react'
import Navlinks from './components/Navlinks'
import Sleft from '@/components/Sleft/Sleft'

export default function layout({children} : {children:ReactNode}) {
  return (
    <div className='w-full space-y-2 flex gap-5'>
        <Sleft />
      <div className='w-full'>
        <Navlinks />
        {children}
      </div>
      
    </div>
  )
}
