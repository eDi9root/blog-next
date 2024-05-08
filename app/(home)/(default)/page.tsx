import React from 'react'
import LeftBar from '@/components/Left/LeftBar';
import { readBlog } from '@/lib/actions/blog';
import Link from 'next/link';
import Image from 'next/image';
import Sleft from '@/components/Sleft/Sleft';
import ClientPagination from '@/components/ClientPagination';
import PostTag from '@/app/dashboard/components/PostTag';

export default async function page({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) {
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '5'

  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page) // 5, 10, 15 ...

  let {data: blogs} = await readBlog()

  const entries = blogs?.slice(start, end)

  return (
    <div className='flex w-full gap-10 flex-col md:flex-row'>
      <LeftBar />
      <div className="hidden w-full mb-[-20px] max-md:flex justify-center sticky top-0">
        <Sleft />
      </div>

      <div className='w-full'>
  
        <div className='bg-background lg:bg-transparent rounded-2xl'>
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
              {entries?.map((blog, index) => {
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
                    <div className='ml-4 space-y-2 w-5/6 pt-6'>
                      <h1 className='font-bold text-lg'>
                        {blog.title}
                      </h1>
                      <p className='text-sm italic'>
                        {blog.descript}
                      </p>                      
                      <p className='py-2 text-sm'>
                        {/* <PostTag tags={blog.tags} /> */}
                      </p>
                      <div className='flex justify-end items-center'>
                        <p className='pt-2 text-sm dark:text-gray-400 text-neutral-500 font-semibold'>
                            {new Date(blog.created_at).toDateString()}
                        </p>  
                      </div>                   
                    </div>
                  </Link>
                )
                
              })}
              <div className='pb-4'>
                <ClientPagination />
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>

  )
}
