'use client'

import React, { SetStateAction, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'
import { VscSignIn } from 'react-icons/vsc'
import { IoIosLogOut } from 'react-icons/io'
import { GrProjects } from 'react-icons/gr'
import { CiUser } from 'react-icons/ci'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion, getSession, SessionProvider } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import useCurrentUser from '@hooks/useCurrentUser'
import { Button, Container, Input, PopoverBody, UncontrolledPopover } from "reactstrap";
import { Heading, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { NextPageContext } from 'next'
import { userAgent } from 'next/server'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'


const Nav = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const [arrowUp, setArrowUp] = useState(false)
  const handleArrow = () => {
    setArrowUp((prev) => !prev)
  }
 useEffect(() => {
   const setUpProviders = async () => {
     const response = await getProviders();
     setProviders(response)
   }
   setUpProviders();
}, [])

  const [nav, setNav] = useState(false)
  const handleNav = () => {
      setNav(!nav)
  }

  return (
    <SessionProvider session={session}>
          <nav className='flex-between py-4 px-2 sm:px-4 w-full bg-[#141414] text-[#f9f9f9]'>
      <Link href="/" className=''>
        <p className='font-semibold hover:text-blue-100'>Gestpro</p>
      </Link>

      {/* Mobile Navigation */}
      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70 ' : ''}>
        <div className={nav ? 'md:hidden fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#f9f9f9] p-10 ease-in duration-500' 
          :'fixed p-10 left-[-100%] top-0 ease-in duration-500' }>
          <div>
            <div className='flex w-full items-center justify-between'>
              <Link href="/" onClick={() => setNav(false)}>
                <p className='font-semibold text-[#141414]'>Gestpro</p>
              </Link>
              <AiOutlineClose className='cursor-pointer  text-[#141414]' onClick={handleNav} />
            </div>
            <div className='border-b border-gray-300 my-4'>
              <p className='w-[85%] md:w-[90%] py-4 text-[#141414]'>Toujours présent pour vous!</p>
            </div>
          </div>
          <div className='py-4 flex flex-col'>
            <div className=''>
              {session ? (
                <div className='flex flex-col'> 

                  <Link href="/projects"
                  className='
                    w-full 
                  text-gray-700 
                    font-light
                    flex
                    items-center
                    p-2
                    hover:bg-gray-200 
                    hover:cursor-pointer 
                    rounded-md'
                    onClick={() => setNav(false)}>
                    <GrProjects className='me-2 text-md'/>
                    <p>Workspace</p>
                  </Link>

                </div>    
              ) : (
                <>
                </>
              )}
            </div>
            <div className='pt-40'>
              <p className='uppercase tracking-widest text-[#141414]'>Lets go</p>
              
              <Link href="/profile"
                className='
                  w-full 
                text-gray-700 
                  font-light
                  flex
                  items-center
                  p-2
                  hover:bg-gray-200 
                  hover:cursor-pointer 
                  rounded-md'
                onClick={() => setNav(false)}>
                  <div className='me-1 p-0'><CiUser className='text-xl'/></div>
                  <p>My profile</p>
              </Link>

              <div 
                className='
                flex 
                items-center  
                hover:bg-gray-200 
                hover:cursor-pointer 
                p-2 rounded-md'>
                <IoIosLogOut className='text-[#141414] text-2xl me-1'/>
                <button
                    onClick={() => {
                      setNav(false);
                      signOut();
                    }}
                    className='text-left w-full text-gray-700 font-light'>
                    Sign Out
                  </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className=''>
        {session?.user ? (
          <ul className='md:flex hidden items-center justify-between'>
            <Link href="/projects" className='py-1 rounded-md px-3 hover:bg-[#f9f9f9] hover:text-[#141414]'>
              <p className=''>Workspace</p>
            </Link>

            <Button 
              id="profileImg"
              type='button' onClick={handleArrow}
              className={session.user.image ? 'flex ms-4 justify-center items-center bg-contain' : 'ms-4 py-1 px-3 rounded-md hover:text-[#141414] hover:bg-[#f9f9f9]'}>
                {session.user.image ? <Image className='rounded-md hover:opacity-80 border-none' src={session?.user?.image ? session?.user?.image : '/public/assets/images/default-user-icon.png'} width={30} height={30} alt="user img"/> : <div className='flex justify-between items-center'>{
                  !arrowUp? <RiArrowDropDownLine className='text-2xl p-0 me-1'/> : <RiArrowDropUpLine className='text-2xl p-0 me-1'/>
                }<p>Profile</p></div>}
            </Button>
            <UncontrolledPopover placement="bottom-start" target="profileImg">
              <PopoverBody className='bg-[#f9f9f9] py-3 px-4 border rounded-md'>
              <Link href="/profile"
                className='
                  w-full 
                text-gray-700 
                  font-light
                  flex
                  items-center
                  p-2
                  hover:bg-gray-200 
                  hover:cursor-pointer 
                  rounded-md'
                onClick={() => setNav(false)}>
                  <div className='me-1 p-0'><CiUser className='text-xl'/></div>
                  <p>My profile</p>
              </Link>
              <div 
                className='
                flex mt-3
                items-center  
                hover:bg-gray-200 
                hover:cursor-pointer 
                p-2 rounded-md'>
                <IoIosLogOut className='text-[#141414] text-2xl me-1'/>
                <button
                    onClick={() => {
                      setNav(false);
                      signOut();
                    }}
                    className='text-left w-full text-gray-700 font-light'>
                    Sign Out
                  </button>
              </div>
              
              </PopoverBody>
            </UncontrolledPopover>


          </ul>
        ): (
            <></>
        )}

        <RxHamburgerMenu className={session ? 'md:hidden cursor-pointer hover:text-lg' : 'hidden'} size={20} 
          onClick={handleNav}/>
      </div> 

    </nav>
    </SessionProvider>

  )
}

export default Nav
