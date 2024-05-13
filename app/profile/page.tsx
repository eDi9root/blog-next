import React from 'react'
import { Button } from '@/components/ui/button';

import { IoCreateOutline } from "react-icons/io5";
import Link from 'next/link';
import CommentTable from './components/CommentTable';

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
                This page is a dashboard for users. 
                This allows only to handle some parts of client tasks.
                 <br />
                <div className='font-bold text-base'>
                    Client Posting Will Be Updated Soon!
                </div>
              </div>
              
            </div>
            <div className="border border-[#5050505b] text-neutral-300 my-4" />

            <div className='bg-popover rounded-lg space-y-2'>
              <div className='flex items-center justify-between gap-x-6 p-4'>
                <h2>Blog Table</h2>
                <Link href="/">
                  <Button variant="secondary" className='gap-x-2'>
                    Not in Service <IoCreateOutline />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="border border-[#5050505b] text-neutral-300 my-10" />

            <div className='bg-popover rounded-lg space-y-2'>
              <div className='flex items-center justify-between gap-x-6 p-4'>
                <h2>Comment Table</h2>
              </div>
              <CommentTable />
              
            </div>

          </div>
        </div> 
      
    </div>
  )
}
