"use client"

import BlogCreate from '@/app/dashboard/components/BlogCreate'
import { SchemaType } from '@/app/dashboard/schema';
import { toast } from '@/components/ui/use-toast';
import { updateBlogDetailById } from '@/lib/actions/blog';
import { IBlogDetail } from '@/lib/types'
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function EditUtil({blog}: {blog:IBlogDetail}) {
    const router = useRouter();
    const OnHandleEdit = async (data: SchemaType) => {
		const result = JSON.parse(
			await updateBlogDetailById(blog?.id!, data)
		) as PostgrestSingleResponse<null>;
		if (result.error) {
			toast({
				title: "Fail to update ",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">
							{result.error?.message}
						</code>
					</pre>
				),
			});
		} else {
			toast({
				title: "Successfully update 🎉",
			});
			router.push("/dashboard");
		}
	};

  return (
    <BlogCreate onHandleSubmit={OnHandleEdit} blog={blog} />
  )
}
