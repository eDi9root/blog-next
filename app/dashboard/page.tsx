"use client"

import React from 'react'
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className='w-full'>
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
        <div className='bg-popover lg:bg-transparent rounded-2xl'>
          <div>
            <div className='flex gap-x-6 p-4'>
              <h1 className='text-2xl'>
                Dashboard
              </h1>
            </div>
          </div>
        </div> 

        <div className="border border-[#5050505b] text-neutral-300 my-6" />

      </motion.div>
    </div>
  )
}
