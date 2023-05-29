import React, { ReactNode } from 'react';
import '@styles/globals.css'
import Nav from '@components/Nav';
import Footer from '@components/Footer';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
});

export const metadeta = {
    title: "Gestpro",
    description: 'Here to help you finish your projects'
}

interface RootLayoutProps {
    children: ReactNode;
  }


const RootLayout = ({children}: RootLayoutProps) => {
  return (
    <html lang='en'>
        <body className={raleway.className}>
        <div className='main'>
            <div className='gradient'/>
        </div>
        <main className='app bg-[#f9f9f9]'>
          <Nav/>
          {children}
          <Footer/>
        </main>
        </body>
    </html>
  )
}

export default RootLayout
