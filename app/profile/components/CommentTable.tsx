"use client"

import { useUser } from '@/lib/store/user'
import React, { useEffect, useState } from 'react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

import { FaEye, FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DeleteComment from './DeleteComment';
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/lib/types/supabase';

export default function CommentTable() {

    const [comment, setComment] = useState<{
        created_at: string;
        descript: string;
        display_name: string;
        email: string | null;
        id: string;
        post: string;
        url: string | null;
        uid: string | null;
        title: string | null;
    }[] | null>()

    const user = useUser((state) => state.user)

    const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

    const readComment = async () => {
        const { error, data } = await supabase
            .from("comment")
            .select("*")
            .eq("uid", user?.id!)
            .order("created_at", { ascending: true });
        
        if (!error && data) {
            setComment(data)
        } else {
            setComment([])
        }
    }

    useEffect(() => {
        readComment()
    }, [])
    
    return (
        <div className='border bg-border rounded-md'>
          <div className='grid grid-cols-5 p-5 text-muted-foreground'>
            <h1 className='col-span-2'>Post Title</h1>
            <h1 className='col-span-2'>Your Comment</h1>
          </div>
          <div className="border border-muted-foreground text-neutral-300" />
          
          <div>
            {comment?.map((cm, index) => {
              return (
                <div className='grid grid-cols-5 p-5 items-center' key={index}>
                  <h1 className='col-span-2'>
                    {cm.title}
                  </h1>
                  <div className='col-span-2'>
                    {cm.descript}
                  </div>
                  <Actions id={cm.id} pid={cm.post} />
                </div>
              )
            })}
          </div>
          
          <div className="border border-muted-foreground text-neutral-300" />
        </div>
        
      )
    }
    
    const Actions = ({id, pid} : {id:string, pid:string}) => {
        return (
          <div className='flex justify-end items-center gap-2 flex-wrap'>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/blog/${pid}`} >
                    <Button variant="ghost2" size="icon" className='gap-x-2'>
                      <FaEye />
                      <span className='sr-only'>View</span>
                    </Button>
                  </Link>
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
                  <DeleteComment uid={id} pid={pid} />
                </AlertDialog>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/dashboard/blog/edit/${id}`} >
                    <Button variant="ghost2" size="icon" className='gap-x-2'>
                      <FaEdit />
                      <span className='sr-only'>Edit</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
              </Tooltip> */}
            </TooltipProvider>
          </div>
        )
    }
    
