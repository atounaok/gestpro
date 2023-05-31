import React from 'react';
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';

function Loading(){
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStrart = (url: string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url: string) => (url === router.asPath) &&setTimeout(()=> {setLoading(false)}, 2000);

    router.events.on('routeChangeStart', handleStrart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStrart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    }
  })
  return loading? loading && (
    <div className=''>
      loading...
    </div>
  ) : null
}

export const metadeta = {
    title: "Gestpro",
    description: 'Here to help you finish your projects'
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <Layout >
          <NextNProgress color="radial-gradient(rgb(254, 202, 202), rgb(220, 38, 38))"/>
          <Component {...pageProps} />
        </Layout>
    </>
  )
}

export default MyApp
