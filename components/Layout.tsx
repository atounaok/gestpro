import React, { ReactNode } from 'react'
import Footer from './Footer'
import Nav from './Nav'

interface RootLayoutProps {
    children: ReactNode;
}


const Layout = ({ children }: RootLayoutProps) => {
  return (
    <div>
        <Nav/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout