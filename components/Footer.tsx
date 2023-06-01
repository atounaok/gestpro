import React from 'react'
import  {TbMapPinFilled}  from 'react-icons/tb'
import  { BsTelephoneFill, BsLinkedin }  from 'react-icons/bs'
import { TbMail } from 'react-icons/tb'
import { FaGithubSquare } from 'react-icons/fa'
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className=''>
      <div 
        className='
          flex
          flex-col 
          items-start
          justify-center 
          p-0
          font-thin
          text-md
          '>
            <div className='px-4'>
              <h5 className='text-lg font-light'>Contact</h5>
              <div className='flex items-center'>
                <TbMapPinFilled className='me-2'/>
                <p>
                  1660 Bd de l'Entente, Québec, QC G1S 4S3
                </p>
              </div>
              <div className='flex items-center'>
                <BsTelephoneFill className='text-sm me-2'/>
                <p>
                  (418)-123-4567
                </p>
              </div>
              <div className='flex items-center'>
                <TbMail className='me-2'/>
                <p>
                  atounoak@gmail.com
                </p>
              </div>
            </div>
            <div className='px-4'>
              <ul className='flex flex-col gap-2'>
                <Link href="/" className='hover:font-semibold'>
                  Home
                </Link>
                <Link href="/projects" className='hover:font-semibold'>
                  Workspace
                </Link>
                <Link href="/profile" className='hover:font-semibold'>
                  Profile
                </Link>
              </ul>
            </div>
            <div className='px-4'>
              <h5 className='text-md font-light'>Nous joindre</h5>
              <div className='flex items-center gap-2'>
                <FaGithubSquare className='text-4xl hover:opacity-80 cursor-pointer'/>
                <BsLinkedin className='text-[32px] hover:opacity-80 cursor-pointer'/>
              </div>
            </div>
            <div className='bg-black w-full p-3 text-center'>
              <p>&copy; Copyright 2023 Gestpro - Tous droits réservés</p>
              <p>Wily Tatow & Abdelbrahim Tounao Kiri</p>
            </div>
      </div>
    </footer>
  )
}

export default Footer