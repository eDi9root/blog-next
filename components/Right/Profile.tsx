import { useUser } from '@/lib/store/user'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { RxDashboard } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import { createBrowserClient } from '@supabase/ssr'

export default function profile() {
    const user = useUser((state) => state.user)
    const setUser = useUser((state) => state.setUser);

    const isAdmin = user?.user_metadata?.role === "admin"

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogout = async () => {
        await supabase.auth.signOut();
		setUser(undefined);
    }

    return <div>
        <div className='flex gap-3 my-4'>
            <div>
                <Image 
                    src={user?.user_metadata.avatar_url} 
                    alt={user?.user_metadata.user_name} 
                    width={45}
                    height={45}
                    className='rounded-full ring-2 ring-green-950 hover:ring-green-500'
                /> 
            </div>
            <div>
                <p className="text-sm">{user?.user_metadata?.user_name}</p>
                <p className="text-sm text-muted-foreground">{user?.user_metadata?.email}</p>
            </div>
        </div>
        <div className='w-full mt-5'>
            {isAdmin && (
                <Link href='/dashboard' className='block'>
                    <Button variant="secondary" size="custom3">
                        <RxDashboard />Dashboard
                    </Button>
                </Link>
            )}
        </div> 
        <div className='w-full mt-5 my-3'>
            <Button variant="secondary" size='custom3' onClick={handleLogout}>
                <IoLogOutOutline />Log out
            </Button>
        </div>

        
    </div>
    
}
