import useCurrentUser from '@hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { AiOutlineDownCircle, AiFillDownCircle } from 'react-icons/ai'
import TypewriterComponent from 'typewriter-effect'

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context)

  if(!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Home = () => {
  const { data: user } = useCurrentUser();
  return (
    <div className='h-full'>
      <div className='w-full flex-col text-center flex items-center justify-around h-full text-white bg-[#141414] '>
        <h1 className='text-2xl md:text-5xl md:mb-20 font-bold text-left max-w-[85%] md:text-center'>
          <TypewriterComponent
            options={{
              strings: ["Commencer à gérer vos projets avec nous.", "Créez un projet"],
              autoStart: true,
              loop: true
            }}/>
        </h1>
        <p className='max-w-[50%] text-lg font-thin text-left'>
          Nous sommes 
          toujours présent pour 
          vous assurer une bonne 
          gestion de vos projets. <span className='text-red-100'>
          La gestion
          de vos projets n'aura jamais été aussi simple
          avec nous! <span>😎</span>
          </span>
        </p>
        <Link href='#sec1'>
          <AiFillDownCircle className='text-4xl md:text-6xl hover:text-blue-100 cursor-pointer animate-bounce'/>
        </Link>
      </div>
      <section id='sec1' className='h-full bg-[#f9f9f9] flex items-center justify-center'>
        Section 1
      </section>
    </div>
  )
}

// /api/<int:id>/user
export default Home
