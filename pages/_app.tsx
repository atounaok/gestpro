import React, { ReactNode } from 'react';
import '@styles/globals.css'
import Nav from '@components/Nav';
import Footer from '@components/Footer';
import { Raleway } from 'next/font/google';
import Providers from '@components/Providers';
import type { AppProps } from 'next/app'
import Layout from '@components/Layout';

const raleway = Raleway({
  subsets: ['latin'],
});

export const metadeta = {
    title: "Gestpro",
    description: 'Here to help you finish your projects'
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
