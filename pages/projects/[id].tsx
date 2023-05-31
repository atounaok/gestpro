import Input from '@components/Input'
import Link from 'next/link'
import React from 'react'
import { MdOutlineCreateNewFolder } from 'react-icons/md'

const ProjectDetails = () => {
  return (
    <div className='flex justify-between h-full'>
      <div className='border min-h-full w-full md:w-[20%] bg-gray-100'>
        Dos
      </div>

      <div className='flex flex-col sm:w-full border p-8'>
        <div className='flex flex-col w-full border-b p-6'>
          <div className='flex flex-col justify-between items-center'>
            <input 
              className='
                text-2xl 
                font-semibold 
                mb-2 w-fit 
                hover:outline-1' 
                value="titre"/>
            <p></p>
          </div>
        </div>
        <div 
          className='
          
          p-6 flex-wrap 
          flex flex-col 
          md:flex-row 
          gap-4'>

        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
