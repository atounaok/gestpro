'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  return (
    <nav className='flex-between pt-4 w-full mb-16 bg-[#141414] text-[#f9f9f9]'>
      <Link href="/" className=''>
        Gestpro
      </Link>
    </nav>
  )
}

export default Nav
