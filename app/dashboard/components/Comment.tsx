"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { Textarea } from "@/components/ui/textarea";
import { CommentFormSchema, SchemaTypeC } from "../schema/indexComment"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useUser } from "@/lib/store/user"
import { AiOutlineLoading3Quarters } from "react-icons/ai"


export default function Comment({
    onHandleSubmit,
    blogId
}: {
    onHandleSubmit:(data: SchemaTypeC) =>void
    blogId: string
}) {
  const [isPending, startTransition] = useTransition()
  const user = useUser((state) => state.user)

  const form = useForm<z.infer<typeof CommentFormSchema>>({
    mode: "all",
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      display_name: user?.user_metadata?.user_name || "",
      descript: "",
      post: blogId || "",
      email: user?.email || "",
      url: user?.user_metadata?.avatar_url || "/apple-touch-icon.png",
    },
  })

  function onSubmit(data: z.infer<typeof CommentFormSchema>) {
    startTransition(() => {
        onHandleSubmit(data)
    })
  }

  return (
    <div className=''>
        <div className='flex justify-center items-center w-full py-5'>
            <h1 className='text-3xl'>Share your thoughts</h1>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="descript"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea 
                                className="min-h-20" 
                                placeholder="Type your comment here" 
                                {...field} 
                                onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end pt-5'>
                    <Button className="flex gap-2">
                        Post 
                        <AiOutlineLoading3Quarters className={cn("animate-spin", {hidden: !isPending})} />
                    </Button>
                </div>
            </form>
        </Form>
        
        <div>
        </div>
    </div>
  )
}

        
        
        
