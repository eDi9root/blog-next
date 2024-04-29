import React, { ReactNode } from 'react'
import Navlinks from './components/Navlinks'

export default function layout({children} : {children:ReactNode}) {
  return (
    <div className='w-full space-y-2'>
        <Navlinks />
      {children}
    </div>
  )
}
