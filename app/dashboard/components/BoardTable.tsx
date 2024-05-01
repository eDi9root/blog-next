import { Button } from '@/components/ui/button'
import React from 'react'

import { BsThreeDots } from "react-icons/bs";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { readBlog } from '@/lib/actions/blog';

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
      
      {blogs?.map((blog, index) => {
        return (
          <div className='grid grid-cols-5 p-5' key={index}>
            <h1 className='col-span-2'>{blog.title}</h1>
            <Switch checked={blog.is_comment} />
            <Switch checked={blog.is_public} />
            <DropdownMenu>
                <DropdownMenuTrigger><BsThreeDots /></DropdownMenuTrigger>
                <DropdownMenuContent className='bg-background'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex justify-center'>
                        <Actions />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
          </div>
        )
      })}
      


      <div className="border border-muted-foreground text-neutral-300" />
    </div>
    
  )
}

const Actions = () => {
    return (
        <div className='flex justify-end items-center gap-2 flex-wrap p-2'>
            <Button variant="outline" className='gap-x-2'><FaEye /> View</Button>
            <Button variant="outline" className='gap-x-2'><MdDeleteSweep />Delete</Button>
            <Button variant="outline" className='gap-x-2'><FaEdit />Edit</Button>
        </div>
    )
}
