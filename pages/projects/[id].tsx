'use client'

import Input from '@components/Input'
import { getProjectById, updateProjectName } from '@lib/requests'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { MdOutlineCreateNewFolder } from 'react-icons/md'



// Variables créées
//const initValues = { userId: "", name: "title" }
const initState = {projet: {name: ""}}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

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

const ProjectDetails = () => {
  const router = useRouter()
  const { id } = router.query;

  const [state, setState] = useState(initState)

  const obtenirProjet = useCallback(async () => {
    try {
      const projects = await getProjectById(id);

      if(projects.name){
         setState((prev) => ({
           projet: {
            ...prev.projet,
            name: projects.name
           },
         }));
       }else{
         console.log('Aucun projet trouvé');
       }

    } catch (error) {
      console.log('Obtention projets erreur:' + error);
    }
  }, [id])

  // Obtenir les projets initialement
useEffect(() => {
  try {
    obtenirProjet();
  } catch (error) {
    console.log(error)
  }
}, [obtenirProjet]);

const handleChange = async ({target}: React.ChangeEvent<HTMLInputElement>) => {
  setState((prev) => ({
    projet: {
      ...prev.projet,
      [target.name]: target.value,
    }
  }))

  await updateProjectName(id, target.value)
  console.log(target)
};
  return (
    <div className='flex justify-between h-full'>
      <div className='border min-h-full w-full md:w-[20%] bg-gray-100'>
        dos
      </div>

      <div className='flex flex-col sm:w-full border px-8 py-4'>
        <div className='flex flex-col w-full border-b justify-center items-start p-3'>
          <div className='flex'>
            <input 
              className='
                text-2xl 
                font-semibold 
                max-w-fit
                border' 
                onChange={handleChange}
                onFocus={(e) => e.target.select()}
                value={state.projet.name} name="name"/>
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
