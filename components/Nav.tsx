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
    <nav className='flex-between py-4 px-2 sm:px-4 w-full mb-16 bg-[#141414] text-[#f9f9f9]'>
      <Link href="/" className=''>
        <p className='font-semibold hover:text-blue-100'>Gestpro</p>
      </Link>
    </nav>
  )
}

export default Nav
