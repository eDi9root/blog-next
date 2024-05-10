import LeftBar from '@/components/Left/LeftBar';
import Sleft from '@/components/Sleft/Sleft';
import { Search } from '@/lib/actions/blog';
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import PostTag from '@/app/dashboard/components/PostTag';

export default async function page({
  params,
}: {
  params: {value: string}
}) {
    const decodedQuery = decodeURIComponent(params.value)

    let {data: blogs} = await Search(decodedQuery)
    const len = blogs?.length

  return (
    <div className='flex w-full gap-10 flex-col md:flex-row'>
      <LeftBar />
      <div className="hidden w-full mb-[-20px] max-md:flex justify-center sticky top-0">
        <Sleft />
      </div>

      <div className='w-full'>
  
        <div className='bg-background lg:bg-transparent rounded-2xl'>
          <div>
            <div className='flex items-center justify-center gap-x-6 p-4 mt-4'>
              <h1 className='text-3xl font-extrabold'>
                Results for: {decodedQuery}
              </h1>
            </div>
            <div className='text-xl font-bold flex items-center justify-center pt-2 text-primary/80'>
              Total {len} Postings
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
                    <div className='ml-4 space-y-2 w-5/6 pt-6'>
                      <h1 className='font-bold text-lg'>
                        {blog.title}
                      </h1>
                      <p className='text-sm italic'>
                        {blog.descript}
                      </p>                      
                      <div className='py-2 text-sm'>
                        <PostTag tags={blog.tags!} option={0} />
                      </div>
                      <div className='flex justify-end items-center'>
                        <p className='pt-2 text-sm dark:text-gray-400 text-neutral-500 font-semibold'>
                            {new Date(blog.created_at).toDateString()}
                        </p>  
                      </div>                   
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
