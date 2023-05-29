'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const [providers, setProviders] = useState(null)
  const [isLogged, setIslogged] = useState(false)

  const [nav, setNav] = useState(false)

  const handleNav = () => {
      setNav(!nav)
  }

  return (
    <nav className='flex-between py-4 px-2 sm:px-4 w-full mb-16 bg-[#141414] text-[#f9f9f9]'>
      <Link href="/" className=''>
        <p className='font-semibold hover:text-blue-100'>Gestpro</p>
      </Link>

      {/* Mobile Navigation */}
      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70 ' : ''}>
        <div className={nav ? 'md:hidden fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#f9f9f9] p-10 ease-in duration-500' 
          :'fixed p-10 left-[-100%] top-0 ease-in duration-500' }>
          <div>
            <div className='flex w-full items-center justify-between'>
              <Link href="/" className=''>
                <p className='font-semibold text-[#141414]'>Gestpro</p>
              </Link>
              <AiOutlineClose className='cursor-pointer text-[#141414]' onClick={handleNav} />
            </div>
            <div className='border-b border-gray-300 my-4'>
              <p className='w-[85%] md:w-[90%] py-4 text-[#141414]'>Toujours présent pour vous!</p>
            </div>
          </div>
          <div className='py-4 flex flex-col'>
            <div className=''>
              {isLogged? (
                <div className='flex flex-col'> 

                <Link href="/"
                className='w-full text-gray-700 hover:text-gray-500 font-medium'
                onClick={() => setNav(false)}>
                  My projects
                </Link>

                <Link href="/auths"
                  onClick={() => setNav(false)}
                  className='mt-5 text-left w-full text-gray-700 hover:text-gray-500 font-medium'>
                  Sign Out
                </Link>

              </div>    
              ) : (
                <div className='flex flex-col'> 
                      <Link href="/auths" 
                        onClick={() => setNav(false)}
                        className='mt-5 w-full text-left text-gray-700 hover:text-gray-500 font-medium'>
                        Sign In
                      </Link>
                </div> 
              )}
            </div>
            <div className='pt-40'>
              <p className='uppercase tracking-widest text-[#141414]'>Lets go</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className=''>
        {isLogged? (
          <ul className='md:flex hidden justify-between'>
            <Link href="/" className='py-1 px-3 hover:bg-[#f9f9f9] hover:text-[#141414]'>
              <p className=''>My projects</p>
            </Link>
            <Link href="/auths" className='py-1 px-3 ms-5 hover:bg-[#f9f9f9] hover:text-[#141414]'>
              <p className=''>Sign Out</p>
            </Link>
          </ul>
        ): (
          <ul className='md:flex hidden justify-between'>
            <Link href="/auths" className='py-1 px-3 ms-5 hover:bg-[#f9f9f9] hover:text-[#141414]'
              onClick={() => {}}>
              <p className=''>Sign In</p>
            </Link>
          </ul>
        )}

        <RxHamburgerMenu className='md:hidden cursor-pointer hover:text-lg' size={20} 
          onClick={handleNav}/>
      </div> 

    </nav>
  )
}

export default Nav
