// import { readAllTags } from '@/lib/actions/blog'
// import React, { useEffect, useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
// import PostTag from '@/app/dashboard/components/PostTag'

// interface TagData {
//     tags: string;
// }

// export default async function TagsCard() {
//     const [tags, setTags] = useState<TagData[]>([]);

//     useEffect(() => {
//         async function fetchTags() {
//             try {
//                 const {data} = await readAllTags()
//                 if (data) {
//                     setTags(data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching tags:', error)
//             }
//         }
//         fetchTags()
//     }, [])

//     const conTags = tags.map(tagData => tagData.tags).join(',')

//   return (
//     <div>
//         <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
//             <CardHeader>
//             <CardTitle>Tags</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-wrap gap-2">
//             {tags?.map((tag) => (
//                 <PostTag tags={conTags} />
//             ))}
//             </CardContent>
//         </Card>
//     </div>
//   )
// }
