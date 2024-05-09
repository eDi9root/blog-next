import { createSupabaseServerClient } from '@/lib/supabase';
import React, { useState } from 'react'


export default function Search() {
    const [value, setValue] = useState<any>([])
    
    
    const SearchBar = async(valueSearch: string) => {
        const supabase = await createSupabaseServerClient();
        const result = supabase
            .from('blog')
            .select("*")
            .textSearch('tags, title', valueSearch, 
            {type: 'websearch', config: 'english'})
            .order("created_at", { ascending: true });
        setValue(result)   
    }

  return (
    <div>
      
    </div>
  )
}
