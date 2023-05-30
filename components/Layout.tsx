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
    <div className={raleway.className}>
        <Nav/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout