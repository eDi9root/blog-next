import React from 'react'
import { Button } from '@/components/ui/button';

import { IoCreateOutline } from "react-icons/io5";
import Link from 'next/link';
import BoardTable from './components/BoardTable';

export default function Dashboard() {
  return (
    <div className='w-full'>

        <div className='bg-popover lg:bg-transparent rounded-2xl'>
          <div>
            <div className='flex gap-x-6 p-4'>
              <h1 className='text-2xl'>
                Dashboard
              </h1>
              <div className='text-muted-foreground max-w-sm text-sm'>
                This page is a dashboard for administrators. 
                This allows to handle a variety of management tasks.
              </div>
              
            </div>
            <div className="border border-[#5050505b] text-neutral-300 my-4" />

            <div className='bg-popover rounded-lg space-y-2'>
              <div className='flex items-center justify-between gap-x-6 p-4'>
                <h2>Blog Table</h2>
                <Link href="/dashboard/blog/create">
                  <Button variant="secondary" className='gap-x-2'>
                    Create <IoCreateOutline />
                  </Button>
                </Link>
              </div>

              <BoardTable />
            </div>

          </div>
        </div> 

        

      
    </div>
  )
}
