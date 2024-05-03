"use client"

import React from 'react'
import BlogCreate from '../../components/BlogCreate'
import { SchemaType } from '../../schema'
import { toast } from '@/components/ui/use-toast'
import { createBlog } from '@/lib/actions/blog'
import { useRouter } from 'next/navigation'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

export default function Page() {
  const router = useRouter()

  const handleCreate = async (data: SchemaType) => {

    const result = JSON.parse(await createBlog(data));
    const { error } = result as PostgrestSingleResponse<null>;

    if (error?.message) {
      toast({
        title: "Fail to create a blog post",
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code>{error.message}</code>
          </pre>
        ),
      })
    } else {
      toast({
        title: "Successfully Created " + data.title,
      })
      router.push("/dashboard")
    }
  }
  
  return (
    <BlogCreate onHandleSubmit={handleCreate} />
  )
}
