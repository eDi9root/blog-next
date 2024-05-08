"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { string, z } from "zod"
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { MdOutlinePreview } from "react-icons/md";
import { FaGalacticSenate, FaRegComment, FaRegEdit } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import { Switch } from "@/components/ui/switch"
import { useState, useTransition } from "react"
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPre from "@/components/markdown/MarkdownPre";
import { BlogFormSchema, SchemaType } from "../schema";
import { IBlogDetail } from "@/lib/types";


export default function BlogCreate({
    onHandleSubmit,
    blog
}: {
    onHandleSubmit:(data: SchemaType) =>void
    blog?:IBlogDetail
}) {
  const [isPending, startTransition] = useTransition()
  const [isPre, setPre] = useState<boolean>(false);

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.blog_content?.content || "",
      img_url: blog?.img_url || "",
      is_public: blog?.is_public || true,
      is_comment: blog?.is_comment || false,
      descript: blog?.descript || "",
      tags: blog?.tags || "",
    },
  })

  function onSubmit(data: z.infer<typeof BlogFormSchema>) {
    startTransition(() => {
        onHandleSubmit(data)
    })
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
          y: 0,
          opacity: 1,
          transition: {
          duration: 0.8,
          delay: 0.6,
          type: "spring",
          stiffness: 200,
          },
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border rounded-lg p-4 space-y-6 pb-10">
          <div className="flex items-center gap-5 flex-wrap justify-between pb-4 border-b">
            <div className="flex gap-5 items-center flex-wrap">
              <span 
                role="button" 
                tabIndex={0} 
                className="flex items-center gap-2 border bg-secondary rounded-md p-2 text-sm hover:ring-2 hover:ring-zinc-400 transition-all"
                onClick={() => setPre(!isPre && !form.getFieldState("img_url").invalid)}
                >
                  {isPre ? (
                    <>
                      <FaRegEdit />Edit
                    </> 
                  ) : ( 
                    <>
                      <MdOutlinePreview />Preview
                    </>
                  )}

              </span>

              <FormField
                control={form.control}
                name="is_comment"
                render={({ field }) => (
                  <FormItem>

                    <FormControl>
                      <div className="flex items-center gap-2 border bg-secondary rounded-md py-[7px] px-2 text-sm hover:ring-2 hover:ring-zinc-400 transition-all">
                        <FaRegComment />
                        <span>Comment</span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </div>
                    </FormControl>


                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_public"
                render={({ field }) => (
                  <FormItem>

                    <FormControl>
                      <div className="flex items-center gap-2 border bg-secondary rounded-md py-[7px] px-2 text-sm hover:ring-2 hover:ring-zinc-400 transition-all">
                        <MdPublic />
                        <span>Public</span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </div>
                    </FormControl>


                  </FormItem>
                )}
              />
            </div>
            <Button 
              className={cn("flex items-center gap-1", {"animate-bounce": isPending})}
              disabled={!form.formState.isValid}
            >
              <BiSave /> Save
            </Button>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className={cn("p-2 w-full flex break-words gap-2", 
                  isPre? "divide-x-0" : "divide-x")}>
                    <Input placeholder="title" {...field} className={cn("border-none text-lg font-medium leading-relaxed", isPre ? "w-0 p-0" : "w-full lg:w-1/2")} />
                    <div className={cn("lg:px-10", isPre ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                      <h1 className="text-2xl font-medium">{form.getValues().title}</h1>
                    </div>
                  </div>
                </FormControl>
                {form.getFieldState("title").invalid && 
                form.getValues().title && 
                <div className="px-2">
                  <FormMessage />
                </div>
                }
              </FormItem>
            )}
          />



          <FormField
            control={form.control}
            name="img_url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className={cn("p-2 w-full flex break-words gap-2", 
                  isPre? "divide-x-0" : "divide-x")}>
                    <Input placeholder="Input image url" {...field} className={cn("border-none text-lg font-medium leading-relaxed", isPre ? "w-0 p-0" : "w-full lg:w-1/2")} />
                    <div className={cn("lg:px-10", isPre ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                      {!isPre ? 
                        <>
                        <p>
                          See image on Preview
                        </p>
                        </> : 
                        <div className="relative h-80 mt-5 border rounded-md">
                          <Image src={form.getValues().img_url} alt="preview" fill className="object-cover object-center rounded-md" />
                        </div>
                      }
                    </div>
                  </div>
                </FormControl>
                {form.getFieldState("img_url").invalid && 
                  form.getValues().img_url && 
                  <div className="px-2">
                    <FormMessage />
                  </div>
                }
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descript"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className={cn("p-2 w-full flex break-words gap-2", 
                  isPre? "divide-x-0" : "divide-x")}>
                    <Input placeholder="descript" {...field} className={cn("border-none text-lg font-medium leading-relaxed", isPre ? "w-0 p-0" : "w-full lg:w-1/2")} />
                    <div className={cn("lg:px-10", isPre ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                      <p className="text-sm italic">{form.getValues().descript}</p>
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
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className={cn("p-2 w-full flex break-words gap-2", 
                  isPre? "divide-x-0" : "divide-x")}>
                    <Input placeholder="tags" {...field} className={cn("border-none text-lg font-medium leading-relaxed", isPre ? "w-0 p-0" : "w-full lg:w-1/2")} />
                    <div className={cn("lg:px-10", isPre ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                      <p className="text-medium font-bold text-primary border rounded-md">{form.getValues().tags}</p>
                    </div>
                  </div>
                </FormControl>
                {form.getFieldState("tags").invalid && 
                form.getValues().descript && 
                <div className="px-2">
                  <FormMessage />
                </div>
                }
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className={cn("p-2 w-full flex break-words gap-2", 
                  isPre? "divide-x-0" : "divide-x h-70vh")}>
                    <Textarea placeholder="Content" {...field} className={cn("border-none text-lg font-medium leading-relaxed resize-none h-full", isPre ? "w-0 p-0" : "w-full lg:w-1/2")} />
                    <div className={cn("overflow-y-auto", isPre ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                      <MarkdownPre content={form.getValues().content} />
                    </div>
                  </div>
                </FormControl>
                {form.getFieldState("content").invalid && 
                form.getValues().content && 
                <div className="px-2">
                  <FormMessage />
                </div>
                }
                
              </FormItem>
            )}
          />
        </form>
      </Form>
    </motion.div>
  )
}
