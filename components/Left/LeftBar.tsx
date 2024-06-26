"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { PiHouseLight } from "react-icons/pi";
import { SiGnubash } from "react-icons/si";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import { motion } from "framer-motion"
import TooltipHover from '../TooltipHover/TooltipHover';
import { ThemeToggle } from '../theme.toggle';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { readBlogId } from '@/lib/actions/blog';


export default function LeftBar() {
  const [open, setOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  
  const [blog, setBlog] = useState<{
      id: string;
  }[] | null>()
  
  const CalcLen = async () => {
    const { data } = await readBlogId();
    setBlog(data)
  };

  useEffect(() => {
    CalcLen()
  }, [])

  const len = blog?.length

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const encoded = encodeURI(searchQuery)
    if (encoded.trim() === '') {
      router.push('/')
    } else {
      router.push(`/search/${encoded}`)
    }
  }

  
  return <div>
    <motion.div
    className='hidden md:block w-full md:w-70 h-fit sticky top-5 rounded-2xl'
    initial={{
      y: 15, 
      opacity: 0
    }}
    animate={{
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4, 
        type: "spring", 
        stiffness: 200,
      },
    }}
    >
      <div className='md:w-80 w-full p-3 border bg-popover border-neutral-800 
      rounded-2xl h-full'>
        <div className='flex'>
          <div className='w-full relative'>
            <SiGnubash className='size-24' />

            <div onClick={() => setOpen(!open)}
            className='bg-primary w-3 h-3 cursor-pointer rounded-full absolute 
            top-5 right-[6rem] animate-pulse'
            />

            {open && (
                <div className='border border-ring h-5 flex items-center 
                justify-center rounded-2xl w-fit px-2 absolute top-4 right-4'>
                  <p className='text-[11px] font-semibold text-ring'>
                    Open to Work
                  </p>
                </div>
            )}

            <h1 className="font-extrabold text-xl mt-4">
              eDi9root
            </h1>

            <p className="text-xs font-semibold mt-3">
              ojs3771o@gmail.com 📧
            </p>
            <div className='flex my-6'>
              <TooltipHover />
            </div>
          </div>

          <div className='flex gap-x-1 w-full h-fit'>
            <Link href={"/"}>
              <div className='bg-secondary hover:bg-secondary/80 h-8 w-8
              rounded-full flex items-center justify-center'>
                <PiHouseLight className='text-secondary-foreground size-5' />
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <div className='hidden justify-center w-full items-center space-x-4 md:flex h-9'>
           <FaSearch className='size-6' />
           <form className='w-full' onSubmit={handleSearch}>
              <Input 
                type='Search Posts' 
                placeholder='Search Posts'
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)} 
              />
          </form>
        </div>

        <div className="border border-[#5050505b] text-neutral-300 my-6" />

        <div className='w-full mt-5 my-3'>
          <h2 className='my-4 font-semibold'>
            About
          </h2>
          <p className='text-[13px] my-3'>
            Welcome to my Dev Blog, Own Space for writing down thoughts, and sharing information
            Feel free to get in touch!
          </p>
          <div className='mt-6 flex justify-between text-sm'>
            <div className='flex items-center gap-x-1'>
              <MdOutlineLibraryBooks />
              <span className="text-xs">
                The total number of blog posts:
              </span>
            </div>
            <div className='flex items-center gap-x-1'>
              <span className='text-base'>
                {len} Posts
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </motion.div>
  </div>
}









