import React from 'react';
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider, useSession } from 'next-auth/react';

export const metadeta = {
    title: "Gestpro",
    description: 'Here to help you finish your projects'
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
          <Layout>
            <NextNProgress color="radial-gradient(rgb(254, 202, 202), rgb(220, 38, 38))"/>
            <Component {...pageProps} />
          </Layout>
      </SessionProvider>
    </>
  )
}

export default MyApp
