import { z } from "zod"

export const BlogFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  img_url: z.string().url({
    message: "Invalid url"
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
  is_public: z.boolean(),
  is_comment: z.boolean(),
}).refine((data)=> {
  const img_url = data.img_url
  try {
    const url = new URL(img_url)

    return url.hostname === "images.unsplash.com"
  } catch {
    return false
  }
}, {message: "Only support images from unsplash", path: ["img_url"],})

export type SchemaType = z.infer<typeof BlogFormSchema>