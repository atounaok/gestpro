import useCurrentUser from '@hooks/useCurrentUser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Redirect = () => {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  // Si on n'a pas de user, on redirige vers login
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [isLoading, user, router]);
}

export default Redirect
