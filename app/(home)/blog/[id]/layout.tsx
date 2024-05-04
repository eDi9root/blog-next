import React, { ReactNode } from 'react'
import Sleft from '@/components/Sleft/Sleft'

export default function layout({children} : {children:ReactNode}) {
  return (
    <div className='w-full space-y-2 md:flex gap-5'>
      <div className='max-md:hidden'>
        <Sleft />
      </div>
      <div className='w-full space-y-4'>
        {children}
      </div>
      
    </div>
  )
}
