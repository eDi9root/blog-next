import { create } from 'zustand'
import { User } from "@supabase/supabase-js"

interface userState {
  user: User | undefined
  setUser: (user: User | undefined) => void
}

export const useUser = create<userState>()((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user })),
}))