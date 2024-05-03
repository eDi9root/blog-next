import { Button } from '@/components/ui/button'
import React from 'react'

import { FaEye, FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { readBlog, updateBlogById } from '@/lib/actions/blog';
import DeleteAlert from './DeleteAlert';
import SwitchForm from './SwitchForm';
import { SchemaType } from '../schema';
import Link from 'next/link';

export default async function BoardTable() {
  const { data: blogs } = await readBlog()

  return (
    <div className='border bg-border rounded-md'>
      <div className='grid grid-cols-5 p-5 text-muted-foreground'>
        <h1 className='col-span-2'>Title</h1>
        <h1>Comment</h1>
        <h1>Public</h1>
      </div>
      <div className="border border-muted-foreground text-neutral-300" />
      
      <div>
        {blogs?.map((blog, index) => {
          const updatedComment = updateBlogById.bind(null, blog.id, {is_comment:!blog.is_comment} as SchemaType)
          const updatedPublic = updateBlogById.bind(null, blog.id, {is_public:!blog.is_public} as SchemaType)
          return (
            <div className='grid grid-cols-5 p-5 items-center' key={index}>
              <h1 className='col-span-2'>{blog.title}</h1>
              <SwitchForm checked={blog.is_comment} name="comment" onSubmit={updatedComment} />
              <SwitchForm checked={blog.is_public} name="public" onSubmit={updatedPublic} />
              <Actions id={blog.id} />

                  
              
            </div>
          )
        })}
      </div>
      
      <div className="border border-muted-foreground text-neutral-300" />
    </div>
    
  )
}

const Actions = ({id} : {id:string}) => {
    return (
      <div className='flex justify-end items-center gap-2 flex-wrap'>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost2" size="icon" className='gap-x-2'>
                <FaEye />
                <span className='sr-only'>View</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View</TooltipContent>
          </Tooltip>
          <Tooltip>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost2" size="icon" className='gap-x-2'>
                    <MdDeleteSweep />
                    <span className='sr-only'>Delete</span>
                  </Button>
                </TooltipTrigger>
              </AlertDialogTrigger>
              <DeleteAlert blogId={id} />
            </AlertDialog>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/dashboard/blog/edit/${id}`} >
                <Button variant="ghost2" size="icon" className='gap-x-2'>
                  <FaEdit />
                  <span className='sr-only'>Edit</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
}
