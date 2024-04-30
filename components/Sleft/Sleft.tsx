"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { PiHouseLight } from "react-icons/pi";
import { motion } from "framer-motion"
import { ThemeToggle } from '../theme.toggle';
import { IoArrowBackCircleOutline } from "react-icons/io5";



export default function LeftBar() {
  
  return <div>
    <motion.div
    className='hidden md:block w-full md:w-24 h-fit sticky top-5 rounded-2xl pt-5'
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
      <div className='md:w-24 w-full p-3 border bg-popover border-neutral-800 
      rounded-2xl h-full'>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-x-1 w-full h-fit items-center gap-y-4'>
            <Link href={"/"}>
              <div className='bg-secondary hover:bg-secondary/80 h-[40px] w-[70px]
              rounded-xl flex items-center justify-center'>
                <PiHouseLight className='text-secondary-foreground size-6' />
              </div>
            </Link>
            <div className='bg-secondary hover:bg-secondary/80 h-[40px] w-[70px]
              rounded-xl flex items-center justify-center'>
              <ThemeToggle />
            </div>
            <Link href={".."}>
                <div className='bg-secondary hover:bg-secondary/80 h-[40px] w-[70px]
                rounded-xl flex items-center justify-center'>
                <IoArrowBackCircleOutline className='text-secondary-foreground size-6' />
                </div>
            </Link>
            
          </div>
        </div>
        
      </div>
    </motion.div>
  </div>
}









