import React from 'react'
import Tag from './tag';

interface PostTagProps {
    tags?: string;
}

export default function PostTag({tags}: PostTagProps) {

    const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : []
    
    return (
        <div className='flex gap-2'>
        {tagArray?.map((tag) => (
            <Tag tag={tag} key={tag} />
        ))}
        </div>
    )
}

