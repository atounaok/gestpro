import { SessionProvider, useSession } from 'next-auth/react';
import { Raleway } from 'next/font/google';
import React, { ReactNode } from 'react'
import Footer from './Footer'
import Nav from './Nav'
import Head from 'next/head';

interface RootLayoutProps {
  children: ReactNode;
}

const raleway = Raleway({
  subsets: ['latin'],
});

const Layout = ({ children }: RootLayoutProps) => {
  return (
    <div className={raleway.className + 'min-h-screen'}>
      <Head>
        <title>Gestpro</title>
        <meta name="description" content="Here to help you finish your projects" />
        <link rel="shortcut icon" href="#" />
      </Head>

      <Nav />

      <div className='min-h-screen flex flex-col justify-center'>
        {children}
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout