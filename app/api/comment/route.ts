// import { createSupabaseServerClient } from '@/lib/supabase';
// import { Database } from '@/lib/types/supabase';
// import { createClient } from '@supabase/supabase-js';
// import { NextResponse } from 'next/server';


// export default async function POST(req: Request) {

//     const body = await req.json();
//     const { post, email, descript, display_name, uid } = body;

//     const supabase = await createClient<Database>(
// 		process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// 	);
//     const { data, error } = await supabase
//       .from("comment")
//       .insert({
//         post,
//         email,
//         display_name,
//         descript,
//         uid
//       })
//       .select("id");

//     if (error) {
//       return new NextResponse(JSON.stringify({ error: error.message }), {
//           status: 500
//       })
//     }
//     return new NextResponse(JSON.stringify({ success: true }), {
//       status: 200
//     })
// }