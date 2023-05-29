import React, { ReactNode } from 'react'

interface RootLayoutProps {
    children: ReactNode;
}
const AuthLayout = ({children}: RootLayoutProps) => {
    return (
    <>
        <main>
            {children}
        </main>
    </>
  )
}

export default AuthLayout
