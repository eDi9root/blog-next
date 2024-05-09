"use client"

import MarkdownPre from '@/components/markdown/MarkdownPre';
import { Database } from '@/lib/types/supabase';
import { createBrowserClient } from '@supabase/ssr';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Content({ blogId }: { blogId: string }) {
    const [loading, setLoading] = useState(true);

    const [blog, setBlog] = useState<{
        blog_id: string;
        content: string;
        created_at: string;
    } | null>()
    
    const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

    const readContent = async () => {
        const { data } = await supabase
            .from("blog_content")
            .select("*")
            .eq("blog_id", blogId)
            .single()
        setBlog(data)
        setLoading(false)
    }

    useEffect(() => {
        readContent()

        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <Loading />
    }

  return (
    <div>
        <MarkdownPre content={blog?.content || ""} />
        <div className='flex justify-center items-center w-full py-5'>
            <h1 className='text-3xl'>Comment</h1>
        </div>
        <form>
            <Textarea className='min-h-20' placeholder="Type your comment here" />
            <div className='flex justify-end pt-5'>
                <Button>Post</Button>
            </div>
        </form>
        
        <div>

        </div>
    </div>
  )
}
