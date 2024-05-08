"use client"

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import SupabaseClient from './SupabaseClient';
import { useUser } from '@/lib/store/user';
import Profile from './Profile';
import { readTags } from '@/lib/actions/blog';
import PostTag from '@/app/dashboard/components/PostTag';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function RightBar() {
  const user = useUser((state) => state.user)
  const [tags, setTags] = useState<string[]>([]);
  
  const readTagsData = async () => {
    const { data } = await readTags();
    if (data !== null) {
      // Extract tags from data
      const extractedTags = data.map(item => item.tags);
      // Filter out duplicates
      const uniqueTags = Array.from(new Set(extractedTags));
      setTags(uniqueTags);
    }
  };

  useEffect(() => {
    readTagsData()
}, [])

  return <div className='sticky top-5 h-fit'>
    <motion.div
    className='hidden max-xl:hidden lg:block w-full lg:w-fit'
    initial={{
      y: 15, 
      opacity: 0
    }}
    animate={{
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6, 
        delay: 0.8,
        type: "spring", 
        stiffness: 200,
      },
    }}
    >
    <div className='md:w-60 w-full rounded-2xl h-fit'>
      <div>
        <div className='bg-popover min-w-min rounded-2xl p-4 border border-neutral-800 h-fit'>
          
          {user?.id ? 
          <div>
            <h1 className='font-bold my-4'>Profile</h1>
            <div>
              <Profile />
            </div>
          </div> : 
          <div>
            <h2 className='font-bold'>
              Create an account
            </h2>
            <p className='text-xs my-5 text-muted-foreground'>
              Continue to create your account for our blog
            </p>
            <div className='rounded-md w-full'>
            <SupabaseClient />
            </div>
          </div>
          }

          <div className="border border-[#5050505b] text-neutral-300 my-5" />

          <div className='col-span-12 row-start-3 h-fit'>
            <h1 className='font-bold pb-4'>Tags</h1>
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag, index) => (
                  <PostTag tags={tag} key={index} option={1} />
                ))}
            </div>
          </div>

          <div className="border border-[#5050505b] text-neutral-300 my-5" />

        </div>
      </div>
    </div>

    </motion.div>
  </div>
  
}