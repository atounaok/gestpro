'use client'

import Input from '@components/Input'
import { getProjectById, updateProjectName } from '@lib/requests'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { CiSquareRemove } from 'react-icons/ci'
import { TfiPencil } from 'react-icons/tfi'
import { BsTextParagraph, BsCheck2Square } from 'react-icons/bs'
import Task from '@components/Task'



// Variables créées
//const initValues = { userId: "", name: "title" }
const initState = { projet: { name: "" } }

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
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

      if (projects.name) {
        setState((prev) => ({
          projet: {
            ...prev.projet,
            name: projects.name
          },
        }));
      } else {
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

  const handleChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      projet: {
        ...prev.projet,
        [target.name]: target.value,
      }
    }))

    await updateProjectName(id, target.value)
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
                px-2
                py-1
                border'
              onChange={handleChange}
              onFocus={(e) => e.target.select()}
              value={state.projet.name} name="name" />
          </div>
        </div>
        <div
          className='
          p-6 flex-wrap 
          flex flex-col 
          md:flex-row 
          gap-4'>

          <div className='w-[25%] border py-3 px-3 rounded-lg bg-gray-100'>
            <div className='flex justify-between items-center'>
              <h4 className='font-semibold text-md px-2'>Backlog</h4>
              <BiDotsHorizontalRounded className='hover:bg-gray-100 rounded-md cursor-pointer text-4xl p-2' />
            </div>

            <div className='my-2'>
              <ul className='flex flex-col gap-2'>

                <Task title="Créer un projet" totalItems="3" completedItems="0" />
                <Task title="Authentification" totalItems="3" completedItems="0" />
                <Task title="Gestion de session" totalItems="3" completedItems="0" />

              </ul>
            </div>

            <div className='flex justify-between items-center px-1 mt-1'>
              <div className='flex items-center justify-start cursor-pointer px-1 rounded-lg py-1 w-full hover:bg-gray-200'>
                <IoMdAdd />
                <h4 className='ms-2 font-thin text-sm'>Ajouter une carte</h4>
              </div>
              <CiSquareRemove className='text-2xl me-1 text-red-400 hover:text-red-200 cursor-pointer' />
            </div>
          </div>

          <button className='flex items-center border max-h-[5vh] rounded-lg py-2 px-6 bg-gray-50 hover:bg-gray-200'>
            <IoMdAdd />
            <p className='ms-1 font-light'>Add another list</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
