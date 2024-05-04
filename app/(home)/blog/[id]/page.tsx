import { IBlog } from '@/lib/types';
import Image from 'next/image';
import React from 'react'


export async function generateStaticParams() {
	const { data: blogs } = await fetch(
		process.env.SITE_URL + "/api/blog?id=*"
	).then((res) => res.json());

	return blogs;
}


export default async function page({params}: {params: {id: string}}) {
	const { data: blog } = (await fetch(
		process.env.SITE_URL + "/api/blog?id=" + params.id
	).then((res) => res.json())) as {data: IBlog};    

  return (
    <div className='max-w-5xl mx-auto min-h-screen pt-10 space-y-6'>
        <div className='sm:px-10 space-y-5'>
            <h1 className='text-3xl font-bold dark:text-gray-200'>
                {blog?.title}
            </h1>
            <p className='text-sm text-muted-foreground'>
              {new Date(blog?.created_at!).toDateString()}
            </p>
        </div>
        <div className="border border-[#5050505b] text-neutral-300 my-6" />
        <div className='w-full h-72 relative'>
          <Image
            priority
            src={blog?.img_url!}
            alt="cover"
            fill
            className=" object-cover object-center rounded-lg border-[0.5px] border-zinc-600"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
    </div>
  )
}
