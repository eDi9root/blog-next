"use client"

import React from 'react'
import { Button } from '../ui/button'
import { FaGithub, FaGoogle } from "react-icons/fa";
import { createBrowserClient } from '@supabase/ssr'
import { usePathname } from 'next/navigation';

export default function SupabaseClient() {
  const pathname = usePathname()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handler = () => {
    supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
        },
    })
  }

  return (
    <div>
        <Button variant='secondary' size='custom3' onClick={handler}>
          <FaGithub className='mr-[7px] h-4 w-4' />Github
        </Button>
    </div>
  )
}
