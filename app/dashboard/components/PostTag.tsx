import React from 'react'
import Tag from './tag';
import TagNonLink from './tagNonLink';

interface PostTagProps {
    tags?: string;
    option?: number;
}

export default function PostTag({tags, option}: PostTagProps) {

    const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : []

    if (option == 1) {
        return (
            <>
            {tagArray?.map((tag) => (
                <Tag tag={tag} key={tag} />
            ))}
            </>
        )
    } else {
        return (
            <>
            {tagArray?.map((tag) => (
                <TagNonLink tag={tag} key={tag} />
            ))}
            </>
        )
    }
    
}

