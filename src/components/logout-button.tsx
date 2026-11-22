import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/utils/supabase.ts'
import { Button } from '@/components/ui/button.tsx'

export function LogoutButton() {
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/auth/login')
  }

  return <Button onClick={logout}>Sign out</Button>
}
