"use client"

import Link from 'next/link'
import React, { useState } from 'react'

import { FaGithub, FaLinkedin, FaInstagramSquare} from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { SiGnubash } from "react-icons/si";

import { 
    motion,
    useTransform,
    useMotionValue,
    useSpring,
    AnimatePresence,
 } from "framer-motion"

export default function TooltipHover() {
  const [hovered, setHovered] = useState<number | null>();

  const springCon = { stiffness: 100, damping: 5}

  const value = useMotionValue(0);

  const rotate = useSpring(
    useTransform(value, [-100, 100], [-45, 45]),
    springCon
  )

  const translateX = useSpring(
    useTransform(value, [-100, 100], [-50, 50]),
    springCon
  );

  const links = [
    {
        id: 1,
        name: "Github",
        img: <FaGithub className='size-8 rounded-md' />,
        url: "https://github.com/eDi9root/",
    },
    {
        id: 2,
        name: "Instagram",
        img: <FaInstagramSquare className='size-8 rounded-md' />,
        url: "https://www.instagram.com/junseok0h/",
    },
    {
        id: 3,
        name: "linkedin",
        img: <FaLinkedin className='size-8 rounded-md' />,
        url: "https://www.linkedin.com/in/junseok-oh/",
    },
    {
        id: 4,
        name: "Personal Site",
        img: <CiUser className='size-8 rounded-md' />,
        url: "https://edi9root.vercel.app/",
    },
  ]
  
  return <div className='flex w-full cursor-pointer gap-x-9 items-center flex-row'>
    {links.map((tooltip, idx) => (
        <div 
            className='-mr-2 relative group'
            key={tooltip.name}
            onMouseEnter={() => setHovered(tooltip.id)}
            onMouseLeave={() => setHovered(null)}
        >
            <AnimatePresence mode="wait">
                {hovered === tooltip.id && (
                    <motion.div
                        initial={{ 
                            opacity: 0, 
                            y: 22, 
                            scale: 0.6
                        }}
                        animate={{
                            opacity: 1,
                            y:0,
                            scale: 1,
                            transition: {
                                type: "spring",
                                stiffness: 240,
                                damping: 10,
                            }
                        }}
                        exit={{
                            opacity: 0,
                            y: 22,
                            scale: 0.6,
                        }}
                        style={{
                            translateX: translateX,
                            rotate: rotate,
                            whiteSpace: "nowrap",
                        }}
                        className='bg-background absolute -top-16 -left-1/2 translate-x-1/2 flex text-sx flex-col items-center justify-center
                        rounded-md z-50 shadow-xl px-4 py-2'
                    >
                        <div className='absolute inset-x-13 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent h-px' />
                        <div className='absolute left-13 z-30 w-[40%]  -bottom-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent h-px'/>
                        <div className='font-bold relative z-30 text-base'>
                            {tooltip.name}
                        </div>
                        <div className='text-xs'>
                            {tooltip.url}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Link 
                href={tooltip.url}
                target='_blank'
                rel='noreferrer'
            >
                {tooltip.img}
            </Link>
        </div>
    ))}
  </div>

}









