"use client";

import React from 'react'
import { MdChromeReaderMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';

export default function Navlinks() {
    const pathname = usePathname();

    const links = [
        {
            href: "/dashboard",
            text: "dashboard",
            Icon: MdChromeReaderMode,
        },
        {
            href: "/dashboard/user",
            text: "user",
            Icon: FaUserCircle,
        },
    ]

    return (
    <div>
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
            <div className='flex items-center gap-5 pb-2 border-b pt-5'>
                {links.map(({href, text, Icon}, index) => {
                    return <Link 
                        href={href} 
                        key={index} 
                        className={cn("flex items-center gap-1 text-sm text-muted-foreground hover:underline transition-all",
                            { "text-primary underline": pathname === href}
                        )}
                        >
                        <Icon /> /{text}
                    </Link>
                })}
            </div>
        </motion.div>
    </div>
    )
}
