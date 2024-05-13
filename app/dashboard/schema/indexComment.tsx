import { z } from "zod"

export const CommentFormSchema = z.object({
    display_name: z.string(),
    descript: z.string().min(2, {
        message: "Comment must be at least 2 characters.",
    }),
    post: z.string(),
    email: z.string(),
    url: z.string(),
    uid: z.string(),
    title: z.string(),
})


export type SchemaTypeC = z.infer<typeof CommentFormSchema>