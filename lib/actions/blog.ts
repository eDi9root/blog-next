"use server"

import { cookies } from 'next/headers'
import { createServerClient } from "@supabase/ssr"
import { SchemaType } from '@/app/dashboard/schema'
import { Database } from '../types/supabase'
import { revalidatePath } from 'next/cache'

const cookieStore = cookies()
const DASHBOARD = "/dashboard/blog";

const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
)

export async function createBlog (data: SchemaType) {
    const {["content"]: excludedKey, ...blog} = data

    const resultBlog = await supabase.from("blog").insert(blog).select("id").single()

    if (resultBlog.error) {
        return JSON.stringify(resultBlog)
    } else {
        const result = await supabase.from("blog_content").insert({blog_id: resultBlog.data.id!, content:data.content})
        
        // revalidation needed
        return JSON.stringify(result)
    }
}

export async function readBlog() {
  	return supabase
		.from("blog")
		.select("*")
		.order("created_at", { ascending: true });
}

export async function deleteBlogById(blogId: string) {
	const result = await supabase.from("blog").delete().eq("id", blogId);
	revalidatePath(DASHBOARD);
	revalidatePath("/blog/" + blogId);
	return JSON.stringify(result);
}

export async function updateBlogById(blogId: string, data: SchemaType) {
	const result = await supabase.from("blog").update(data).eq("id", blogId);
	revalidatePath(DASHBOARD);
	revalidatePath("/blog/" + blogId);
	return JSON.stringify(result);
}