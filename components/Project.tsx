import useCurrentUser from '@hooks/useCurrentUser'
import Link from 'next/link'
import React from 'react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'


const Project = ({ index, project, onClick }: { index: any, project: any, onClick: any }) => {
    const { data: user } = useCurrentUser()
  return (
    <div key={index} 
        className='
        card rounded-md
        h-[200px] 
        md:w-[24%] 
        flex flex-col
        justify-center 
        items-center 
        p-3 border
        hover:shadow-xl'>
            
        <Link href={`/${user?.id}/workspace/` + project.id} passHref  
        className='w-full h-full flex text-center 
        items-center justify-center'>
            {project.name}
        </Link>

        <div className='border-t w-full p-1 flex items-center justify-between'>
            <AiOutlineUsergroupAdd className='cursor-pointer text-xl text-[#141414] hover:text-gray-400' onClick={() => {alert('btn partager cliqué')}}/>
            <RiDeleteBin5Line className='cursor-pointer text-xl  text-red-400 hover:text-red-200' onClick={onClick}/>
        </div>
    </div>
  )
}

export default Project
