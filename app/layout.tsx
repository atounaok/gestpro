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
        <body className={`${raleway.className} m-0 p-0 bg-[#f9f9f9]`}>
          <main className='app'>
            <Nav/>
            {children}
            <Footer/>
          </main>
        </body>
    </html>
  )
}

export default RootLayout
