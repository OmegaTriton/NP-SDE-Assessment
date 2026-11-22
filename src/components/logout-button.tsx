import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/utils/supabase.ts'
import { Button } from '@/components/ui/button.tsx'

interface ButtonProps{
  className: string,
  isAnonymous: boolean
}

export function LogoutButton({className, isAnonymous}: ButtonProps) {
  const navigate = useNavigate()

  const logout = async () => {
    if(isAnonymous){
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from("tasks")
      .delete()
      .eq('user_id', user?.id);
    }

    await supabase.auth.signOut()
    navigate('/auth/login')
  }

  return <Button className={className} onClick={logout}>Sign out</Button>
}
