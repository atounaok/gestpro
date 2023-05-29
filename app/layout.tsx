import React, { ReactNode } from 'react';
import '@styles/globals.css'

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
        <body>
        <div className='main'>
            <div className='gradient'/>
        </div>
        <main className='app'>
            {children}
        </main>
        </body>
    </html>
  )
}

export default RootLayout
