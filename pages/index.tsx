import AuthRedirect from '@components/AuthRedirect'
import useCurrentUser from '@hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AiOutlineDownCircle, AiFillDownCircle } from 'react-icons/ai'
import TypewriterComponent from 'typewriter-effect'

const Home = () => {
  AuthRedirect();

  return (
    <div className='h-full'>
      <div className='w-full flex-col text-center flex items-center justify-around min-h-screen text-white bg-[#141414] '>
        <h1 className='text-2xl md:text-5xl md:mb-20 font-bold max-w-[85%] md:text-center'>
          <TypewriterComponent
            options={{
              strings: ["Commencez à gérer vos projets avec nous."],
              autoStart: true,
              loop: true,
            }}/>
        </h1>
        <p className='max-w-[50%] text-lg font-thin text-left'>
          Nous sommes 
          toujours présent pour 
          vous assurer une bonne 
          gestion de vos projets. <span className='text-red-200'>
          La gestion
          de vos projets n&#39;aura jamais été aussi simple
          avec nous! <span>😎</span>
          </span>
        </p>
        <Link href='#sec1'>
          <AiFillDownCircle className='text-4xl md:text-6xl hover:opacity-80 cursor-pointer animate-bounce'/>
        </Link>
      </div>
      <section id='sec1' className='min-h-screen bg-[#f9f9f9] flex items-center justify-center'>
        Section 1
      </section>
    </div>
  )
}

export default Home
