"use client"

import React, { ChangeEvent, useTransition } from 'react'

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from '@/components/ui/button'
import { deleteBlogById } from '@/lib/actions/blog'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils';

export default function DeleteAlert({blogId} : {blogId: string}) {

  const [isPending, startTransition] = useTransition();
  
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async() => {
      const result = await deleteBlogById(blogId)
      const {error} = JSON.parse(result)
      
      if (error) {
				toast({
					title: "Fail to update ",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{error?.message}</code>
						</pre>
					),
				});
			} else {
				toast({
					title: "Successfully deleted",
				});
			}
    })
    
  }

  return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={onSubmit}>
            <Button className='flex gap-2 items-center'>
              <AiOutlineLoading3Quarters
                className={cn("animate-spin ", {
									hidden: !isPending,
								})} 
              />
              {" "}
              Continue
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
  )
}
