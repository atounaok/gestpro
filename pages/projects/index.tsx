import Input from '@components/Input'
import axios from 'axios'
import email from 'next-auth/providers/email'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { MdOutlineCreateNewFolder } from 'react-icons/md'

const Projects = () => {
  const name = "Mon pro"
  const userId = '647611728c88f4840ca4e63c'
    // Register
    const create = useCallback(async () => {
      try {
        await axios.post('/api/project/create', {
          name,
          userId,
        });

      } catch (error) {
          console.log("Je suis ici")
          console.log(error)
      }
  }, [name, userId]);
  
  const projets: any = [
    {id: 1, nom: "Projet 1"},
    {id: 2, nom: "Projet 2"},
    {id: 3, nom: "Projet 3"},
    {id: 4, nom: "Projet 4"},
    {id: 4, nom: "Projet 4"},
    {id: 4, nom: "Projet 4"},
  ]
  return (
    <div className='flex justify-between h-full'>
      <div className='border min-h-full w-full md:w-[20%] bg-gray-100'>
        Dos
      </div>

      <div className='flex flex-col sm:w-full border p-8'>
        <div className='flex flex-col w-full border p-6'>
          <h2 className='text-2xl font-semibold mb-2'>Menu title</h2>
          <div className='flex justify-between items-center'>
            <Input
              label='Rechercher'
              onChange={() => {}}
              id="searchProject"
              type="search"
            />
            <Link href="/projects" 
              onClick={create}
              className='
            bg-[#141414] 
              py-2 px-6 
              text-[#f9f9f9]
              flex items-center
              hover:shadow-xl'>
              <MdOutlineCreateNewFolder 
              className={projets.length > 0 ? 'text-2xl me-2' 
              : 'text-2xl me-2 animate-pulse'}/>
              <p className='text-lg'>Create</p>
            </Link>
          </div>
        </div>
        <div 
          className='
          border
          p-6
          flex flex-col 
          md:flex-row'>
          {
            projets.length > 0 ?
            (
              <div className='
              w-full
              flex-wrap 
              flex flex-col 
              md:flex-row 
              gap-4'>
                {
                  projets.map((projet: any, index: any) => {
                    return (
                      <Link href={'/projects/' + projet.id} key={index} 
                        className='
                        card 
                        h-[200px] 
                        w-[24%] 
                        flex 
                        justify-center 
                        items-center 
                        p-3 border
                        hover:shadow-xl'>
                        {projet.nom}
                      </Link>
                    )
                  })
                }
                <Link href={'/projects/'} 
                  className='
                  card 
                  h-[200px] 
                  w-[24%] 
                  flex text-gray-400
                  justify-center 
                  items-center 
                  p-3 border
                  hover:shadow-xl'>
                  Create new table
                </Link>
              </div>
            )
            
            :

            (
              <div className='text-center w-full text-gray-500'>Vous n'avez aucun projet...</div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Projects