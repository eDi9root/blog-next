import React from 'react'
import Markdown from "react-markdown"
import { cn } from "@/lib/utils";
import rehypeHighlight from "rehype-highlight";
import { icons } from "@/lib/icons";

import { FiTerminal } from "react-icons/fi";
import "highlight.js/styles/github-dark-dimmed.min.css";
import CopyIcon from './CopyIcon';

export default function MarkdownPre({
    content, 
    className,
}:{
    content: string 
    className?: string
}) {
  return (
    <Markdown
    rehypePlugins={[rehypeHighlight]}
    className={cn("space-y-6 md:pl-5", className)}
    components={{
        h1:({node, ...props}) => {
            return <h1 {...props} className='text-3xl font-bold'/>
        },
        h2:({node, ...props}) => {
            return <h2 {...props} className='text-2xl font-bold'/>
        },
        h3:({node, ...props}) => {
            return <h3 {...props} className='text-xl font-bold'/>
        },
        code: ({ node, className, children, ...props }) => {
			const match = /language-(\w+)/.exec(className || "");
			const id = (Math.floor(Math.random() * 100) + 1).toString();
				if (match?.length) {
					let Icon = FiTerminal;
					const isMatch = icons.hasOwnProperty(match[1]);
				if (isMatch) {
					Icon = icons[match[1] as keyof typeof icons];
				}
				return (
					<div className="bg-markdownPre text-markdownPre-foreground border-[0.5px] rounded-md border-zinc-500">
						<div className="flex items-center justify-between px-5 py-2 border-b-[0.5px] border-zinc-500">
							<div className="flex items-center gap-2">
								<Icon />
								<p className="text-sm">
									{/* @ts-ignore  */}
									{node?.data?.meta}
								</p>
							</div>
							<CopyIcon id={id} />
						</div>
						<div className="overflow-x-auto w-full">
							<div className="p-5" id={id}>
								{children}
							</div>
						</div>
					</div>
				);
			} else {
				return (
					// TODO: convert to code block
					<code
						className="text-lg break-words bg-zinc-700 px-1 rounded-sm"
						{...props}
					>
						{children}
					</code>
				);
			}
		},
    }}>
      {content}
    </Markdown>
  )
}
