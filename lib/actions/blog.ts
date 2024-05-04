"use server"

import { SchemaType } from '@/app/dashboard/schema'
import { createSupabaseServerClient } from '../supabase';
import { revalidatePath } from 'next/cache'
import { IBlog } from '../types';

const DASHBOARD = "/dashboard/blog";


export async function createBlog (data: SchemaType) {
    const {["content"]: excludedKey, ...blog} = data

    const supabase = await createSupabaseServerClient();
    const blogResult = await supabase
      .from("blog")
      .insert(blog)
      .select("id")
      .single();

    if (blogResult.error?.message && !blogResult.data) {
      return JSON.stringify(blogResult);
    } else {
      const result = await supabase
        .from("blog_content")
        .insert({ blog_id: blogResult?.data?.id!, content: data.content });

      revalidatePath(DASHBOARD);
      return JSON.stringify(result);
  }
}

export async function readBlog() {
	const supabase = await createSupabaseServerClient();
	return supabase
		.from("blog")
		.select("*")
		.eq("is_public", true)
		.order("created_at", { ascending: true });
}

export async function readBlogAdmin() {
	const supabase = await createSupabaseServerClient();
	return supabase
		.from("blog")
		.select("*")
		.order("created_at", { ascending: true });
}

export async function deleteBlogById(blogId: string) {
	const supabase = await createSupabaseServerClient();
	const result = await supabase.from("blog").delete().eq("id", blogId);
		revalidatePath(DASHBOARD);
		revalidatePath("/blog/" + blogId);
		return JSON.stringify(result);
}

export async function updateBlogById(blogId: string, data: IBlog) {
	const supabase = await createSupabaseServerClient();
	const result = await supabase.from("blog").update(data).eq("id", blogId);
		revalidatePath(DASHBOARD);
		revalidatePath("/blog/" + blogId);
	return JSON.stringify(result);
}

export async function updateBlogDetailById (
	blogId: string,
	data: SchemaType
) {
	const { ["content"]: excludedKey, ...blog } = data;

	const supabase = await createSupabaseServerClient();
	const resultBlog = await supabase
		.from("blog")
		.update(blog)
		.eq("id", blogId);
	if (resultBlog.error) {
		return JSON.stringify(resultBlog);
	} else {
		const result = await supabase
			.from("blog_content")
			.update({ content: data.content })
			.eq("blog_id", blogId);
			
		revalidatePath(DASHBOARD);
		revalidatePath("/blog/" + blogId);
		return JSON.stringify(result);
	}
}

export async function readBlogContentById(blogId: string) {
	const supabase = await createSupabaseServerClient();
	return await supabase
			.from("blog")
			.select("*,blog_content(*)")
			.eq("id", blogId)
			.single();
}