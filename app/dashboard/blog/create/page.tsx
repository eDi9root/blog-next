"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { useState } from "react"

const FormSchema = z.object({
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
})

export default function CreateForm() {
  const [isPre, setPre] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      img_url: "",
      is_public: true,
      is_comment: false,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border rounded-lg p-4 space-y-6">
          <div className="flex items-center flex-wrap justify-between pb-4 border-b">
            <div className="flex gap-5 items-center">
              <span 
                role="button" 
                tabIndex={0} 
                className="flex items-center gap-2 border bg-secondary rounded-md p-2 text-sm hover:ring-2 hover:ring-zinc-400 transition-all"
                onClick={() => setPre(!isPre)}
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
            <Button className="flex items-center gap-1"><BiSave /> Save</Button>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="p-2 w-full">
                    <Input placeholder="title" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </motion.div>
  )
}
