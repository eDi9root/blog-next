import React, { ReactNode } from 'react'
import Sleft from '@/components/Sleft/Sleft'
import Navlinks from '../dashboard/components/Navlinks'

export default function layout({children} : {children:ReactNode}) {
  return (
    <div className='w-full space-y-2 md:flex gap-5'>
      <div className='max-md:hidden'>
        <Sleft />
      </div>
      <div className='w-full space-y-4 pt-8'>
        {children}
      </div>
      
    </div>
  )
}
