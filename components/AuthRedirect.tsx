import useCurrentUser from '@hooks/useCurrentUser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Redirect = () => {
    const router = useRouter()
    // Obtenir le user dans la session
    const { data: user } = useCurrentUser();
  
    // Si on n'a pas de user, on redirige vers login
    useEffect(() => {
      if (typeof window !== 'undefined') {
        if(!user){
          router.push('/auth')
        }
      }
    }, [router, user]);
}

export default Redirect
