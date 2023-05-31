import Input from '@components/Input'
import Link from 'next/link'
import React from 'react'

const Projects = () => {
  const projets = [
    {id: 1, nom: "Projet 1"},
    {id: 2, nom: "Projet 2"},
    {id: 3, nom: "Projet 3"},
    {id: 4, nom: "Projet 4"},
  ]
  return (
    <div className='flex justify-between h-full'>
      <div className='border min-h-full w-full md:w-[20%] bg-gray-100'>
        Dos
      </div>

      <div className='flex flex-col sm:w-full border p-8'>
        <div className='flex flex-col w-full border p-2'>
          <h2 className='text-2xl font-semibold mb-2'>Menu title</h2>
          <div className='flex'>
            <Input
              label='Rechercher'
              onChange={() => {}}
              id="searchProject"
              type="search"
            />
          </div>
        </div>
        <div className='border h-full p-6  flex flex-col md:flex-row justify-between'>
          {
            projets.map((projet, index) => {
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
        </div>
      </div>
    </div>
  )
}

export default Projects