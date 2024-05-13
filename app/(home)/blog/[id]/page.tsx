import { IBlog, IBlogDetailComment } from '@/lib/types';
import Image from 'next/image';
import React from 'react'
import Content from './components/Content';
import PostTag from '@/app/dashboard/components/PostTag';
import CommentUtil from '@/app/dashboard/components/CommentUtil';
import Comment from './components/Comment'
import { getTitle } from '@/lib/actions/blog';

export async function generateStaticParams() {
	const { data: blogs } = await fetch(
		process.env.SITE_URL + "/api/blog?id=*"
	).then((res) => res.json());

	return blogs;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
	const { data: blog } = (await fetch(
		process.env.SITE_URL + "/api/blog?id=" + params.id
	).then((res) => res.json())) as { data: IBlog };

	return {
		title: blog?.title,
    description: blog?.descript,
    tags: blog?.tags,
		authors: {
			name: "JunseokOh",
		},
		openGraph: {
			title: blog?.title,
      Description: blog?.descript,
			url: "https://edi9root-blog.vercel.app/blog" + params.id,
			siteName: "edi9root-blog",
			images: blog?.img_url,
			type: "website",
		},
    twitter: {
      card: "summary_large_image",
      title: blog?.title,
      description: blog?.descript,
      images: [blog?.img_url],
    },
		keywords: ["Edi9root", "JunseokOh", "Personal Blog"],
	};
}



export default async function page({params}: {params: {id: string}}) {
	const { data: blog } = (await fetch(
		process.env.SITE_URL + "/api/blog?id=" + params.id
	).then((res) => res.json())) as {data: IBlog};

  const { data: title } = await getTitle(params.id)

  
  if (!blog?.id) {
    return <h1>Not found</h1>
  }

  return (
    <div className='max-w-5xl mx-auto min-h-screen pt-10 space-y-6'>
        <div className='sm:px-10 space-y-5'>
            <h1 className='text-3xl font-bold dark:text-gray-200'>
                {blog?.title}
            </h1>
            <div className='flex items-center justify-between'>
              <div className='text-sm text-muted-foreground'>
                {new Date(blog?.created_at!).toDateString()}
              </div>
              <div className='flex flex-wrap gap-2'>
                <PostTag tags={blog.tags} option={1} />
              </div>
            </div>
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
        <div className='italic text-sm'>
          {blog?.descript}
        </div>
        <Content blogId={params.id} />
        <CommentUtil blogId={params.id} title={title?.title!} />
        <Comment blogId={params.id} />
    </div>
  )
}
