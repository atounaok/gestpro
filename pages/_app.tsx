import React from 'react';
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@components/Layout';

export const metadeta = {
    title: "Gestpro",
    description: 'Here to help you finish your projects'
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout >
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
