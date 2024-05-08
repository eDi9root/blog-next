"use client"

import { useUser } from '@/lib/store/user'
import { createBrowserClient } from '@supabase/ssr'
import React, { useEffect }  from 'react'

export default function SessionProvider() {
  const setUser = useUser((state) => state.setUser)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

	const readSession = async () => {
		const { data: userSesssion } = await supabase.auth.getSession();

		if (userSesssion.session) {
			const { data } = await supabase
				.from("users")
				.select("*")
				.eq("id", userSesssion.session?.user.id)
				.single();
			setUser(data);
		}
	};

  useEffect(() => {
    readSession()
    // eslint-disable-next-line
  }, [])

  return <></>;
}
