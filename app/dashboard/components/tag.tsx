import Link from 'next/link';
import React from 'react'
import {slug} from 'github-slugger'
import { badgeVariants } from '@/components/ui/badge';

interface TagProps {
    tag: string;
    current?:boolean;
    count?: number;
}
export default function Tag({ tag, current, count }: TagProps) {
  return <Link 
    className={badgeVariants({variant: current ? "default" : "secondary", 
        className: "no-underline",
    })}
    href={`/tags/${slug(tag)}`}
    >
        {tag}
    </Link>
}

