import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/utils/supabase.ts'
import { Button } from '@/components/ui/button.tsx'

interface ButtonProps{
  className: string
}

export function LogoutButton({className}: ButtonProps) {
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/auth/login')
  }

  return <Button className={className} onClick={logout}>Sign out</Button>
}
