import { readBlogContentById } from '@/lib/actions/blog'
import React from 'react'
import EditUtil from './components/EditUtil'
import { IBlogDetail } from '@/lib/types'

export default async function Edit({params}: {params: {id:string}}) {

  const { data: blog } = await readBlogContentById(params.id)
  return (
    <div>
      <EditUtil blog={blog as IBlogDetail} />
    </div>
  )
}
