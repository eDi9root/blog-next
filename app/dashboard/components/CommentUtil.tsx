"use client"

import Comment from '@/app/dashboard/components/Comment'
import { SchemaTypeC } from '@/app/dashboard/schema/indexComment';
import { toast } from '@/components/ui/use-toast';
import { createComment } from '@/lib/actions/blog';
import { IBlogDetailComment } from '@/lib/types'
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function CommentUtil({comment}: {comment:IBlogDetailComment}) {
    const router = useRouter();

    const OnHandle = async (data: SchemaTypeC) => {

		const result = JSON.parse(await createComment(comment?.id!, data))
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
			router.push(`/blog/${comment?.id}`);
		}
	};

  return (
    <Comment onHandleSubmit={OnHandle} blog={comment} />
  )
}
