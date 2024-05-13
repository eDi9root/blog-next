"use client"

import Comment from '@/app/dashboard/components/Comment'
import { SchemaTypeC } from '@/app/dashboard/schema/indexComment';
import { toast } from '@/components/ui/use-toast';
import { createComment, getTitle } from '@/lib/actions/blog';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function CommentUtil({blogId, title}: {blogId: string, title: string}) {
    const router = useRouter();

    const OnHandle = async (data: SchemaTypeC) => {

		const result = JSON.parse(await createComment(data))
        const { error } = result as PostgrestSingleResponse<null>;

		if (error?.message) {
			toast({
				title: "Fail to create a comment",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code>
							{error.message}
						</code>
					</pre>
				),
			});
		} else {
			toast({
				title: "Successfully Created Comment 🎉",
			});
			router.push(`/blog/${blogId}`);
		}
	};

  return (
    <Comment onHandleSubmit={OnHandle} blogId={blogId} title={title} />
  )
}
