"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { string, z } from "zod"

import { Button } from "@/components/ui/button"

import { useState, useTransition } from "react"
import { Textarea } from "@/components/ui/textarea";
import { CommentFormSchema, SchemaTypeC } from "../schema/indexComment"
import { IBlogDetailComment } from "@/lib/types";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"


export default function Comment({
    onHandleSubmit,
    blog
}: {
    onHandleSubmit:(data: SchemaTypeC) =>void
    blog?:IBlogDetailComment
}) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof CommentFormSchema>>({
    mode: "all",
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      display_name: blog?.comment.display_name || "",
      descript: blog?.comment.descript || "",
      post: blog?.blog_content?.blog_id || "",
      email: blog?.comment.email || "",
      uid: blog?.comment.uid || "",
    },
  })

  function onSubmit(data: z.infer<typeof CommentFormSchema>) {
    startTransition(() => {
        onHandleSubmit(data)
    })
  }

  return (
    <div className=' min-h-96'>
        <div className='flex justify-center items-center w-full py-5'>
            <h1 className='text-3xl'>Share your thoughts!</h1>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="descript"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className={cn("p-2 w-full flex break-words gap-2")}>
                                    <Input placeholder="Type your comment here" {...field} className={cn("border-none text-lg font-medium leading-relaxed")} />
                                    <div>
                                    <h1 className="text-2xl font-medium">{form.getValues().descript}</h1>
                                    </div>
                                </div>
                            </FormControl>
                            {form.getFieldState("descript").invalid && 
                            form.getValues().descript && 
                            <div className="px-2">
                                <FormMessage />
                            </div>
                            }
                        </FormItem>
                    )}
                />
            </form>
        </Form>
        
        <div>
        </div>
    </div>
  )
}

        
        
        
