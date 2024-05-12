"use client"

import { Database } from '@/lib/types/supabase';
import { createBrowserClient } from '@supabase/ssr';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

export default function Comment({ blogId }: {blogId: string}) {

    const [comment, setComment] = useState<{
        created_at: string;
        descript: string;
        display_name: string;
        email: string | null;
        id: string;
        post: string; 
        url: string | null;
    }[] | null>()

    const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

    const readComment = async () => {
        const { error, data } = await supabase
            .from("comment")
            .select("*")
            .eq("post", blogId)
            .order("created_at", { ascending: true });

        if (!error && data) {
            setComment(data)
        } else {
            setComment([])
        }
    }
    
    useEffect(() => {
        readComment()
    }, [])

    return (
        <div className='min-h-72'>
            <div className='flex justify-center items-center w-full py-5'>
                <h1 className='text-3xl'>What people are Saying</h1>
            </div>
            <div>
                {comment?.map((cm, index) => {
                    return (
                        <div key={index} className="flex flex-col gap-2 pb-8 h-fit"> 
                            <div className='flex items-center gap-x-4 px-4 py-2'>
                                <Image 
                                    src={cm.url!} 
                                    alt={cm.display_name} 
                                    width={45}
                                    height={45}
                                    className='rounded-full ring-2 ring-green-950 hover:ring-green-500'
                                />
                                <div className='flex flex-col'>              
                                    <div className='font-semibold text-muted-foreground'>
                                        {cm.display_name}
                                    </div>  
                                    <div className='font-medium text-sm text-muted-foreground'>
                                        {cm.created_at.slice(0,10)}
                                    </div>
                                </div> 
                               
                            </div>                         
                            <div className='flex pl-4'>
                                    {cm.descript}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
