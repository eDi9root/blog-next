import Link from 'next/link';
import React from 'react'
import {slug} from 'github-slugger'
import { badgeVariants } from '@/components/ui/badge';

interface TagProps {
    tag: string;
    current?:boolean;
    count?: number;
}
export default function TagNonLink({ tag, current, count }: TagProps) {
  return <div 
    className={badgeVariants({variant: current ? "default" : "secondary", 
        className: "no-underline",
    })}
    >
        {tag}
    </div>
}

