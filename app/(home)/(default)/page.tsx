import React from 'react'
import LeftBar from '@/components/Left/LeftBar';
import { readBlog } from '@/lib/actions/blog';
import Link from 'next/link';
import Image from 'next/image';

export default async function page() {
  let {data: blogs} = await readBlog()

  return (
    <div className='flex w-full gap-10 flex-col md:flex-row'>
      <LeftBar />

      <div className='w-full'>
  
        <div className='bg-popover lg:bg-transparent rounded-2xl'>
          <div>
            <div className='flex gap-x-6 p-4 mt-2'>
              <h1 className='text-2xl'>
                Dev Blog
              </h1>
              <p className='text-muted-foreground max-w-sm text-sm'>
                Own Space for writing down thoughts, and sharing information
              </p>
            </div>

            <div className="border border-[#5050505b] text-neutral-300 my-6" />
            
            <div className='rounded-lg w-full grid grid-cols-1 space-y-5'>
              {blogs?.map((blog, index) => {
                return (
                  <Link 
                  key={index}
                  href={"/blog/" + blog.id}
                  className='bg-popover hover:bg-neutral-500 dark:hover:bg-neutral-800 duration-150 transition-all ease-in p-4 border rounded-md min-h-48 flex items-center'
                  >
                    <div className="flex items-end">
                      <Image 
                      src={blog.img_url} 
                      alt='cover'
                      className='rounded-md object-cover w-32 h-32'
                      width={1000}
                      height={1000}
                      />
                    </div>
                    <div className='ml-4 space-y-2'>
                      <h1 className='font-bold text-lg'>
                        {blog.title}
                      </h1>
                      <p className='pt-10 text-sm dark:text-gray-400 text-neutral-500 font-semibold'>
                          {new Date(blog.created_at).toDateString()}
                      </p>                     
                    </div>
                  </Link>
                  
                )
                
              })}
              
            </div>
          </div>
        </div> 
      </div>
    </div>

  )
}
