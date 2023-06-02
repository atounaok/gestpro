import { SessionProvider, useSession } from 'next-auth/react';
import { Raleway } from 'next/font/google';
import React, { ReactNode } from 'react'
import Footer from './Footer'
import Nav from './Nav'

interface RootLayoutProps {
  children: ReactNode;
}

const raleway = Raleway({
  subsets: ['latin'],
});

const Layout = ({ children }: RootLayoutProps) => {
  return (
    <div className={raleway.className + 'min-h-screen'}>
      <Nav />
      <div className='min-h-screen flex flex-col justify-center'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout