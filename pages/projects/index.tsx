//Imports
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

import { Container, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";
import { Button as ChakraButton} from '@chakra-ui/react';

import useCurrentUser from '@hooks/useCurrentUser';
import Inpute from '@components/Input'
import { createProject, deleteProjects, getLastId, getProjects } from '@lib/requests';

import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { MdOutlineCreateNewFolder } from 'react-icons/md'


// Variables créées
const initValues = { userId: "", name: "title" }
const initState = {values: initValues, isLoading: false, projets: []}


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


const Projects = () => {
  // Obtenir user dans la session
  const { data: user } = useCurrentUser();

  const router = useRouter();
  const [state, setState] = useState(initState)
  const [touched, setTouched] = useState({})
  // const [projets, setProjets] = useState([])

  const { values, isLoading } = state

  const onBlur = ({target}: any) => setTouched((prev) => ({...prev, 
    [target.name]: true
  }))

  const handleChange = ({target}: any) => setState((prev) => ({
    ...prev,
    values: {
      ...prev.values,
      userId: user.id,
      [target.name]: target.value,
    }
  }))

// Creer un projet
  const onCreate = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true
    }));

    try {
      await createProject({
        ...values,
        userId: user.id, // Assurez-vous que user.id contient la valeur correcte
      });

      setState((prev) => ({
        ...prev,
        isLoading: false
      }));

      const idProject = await getLastId(user.id);

      router.push(`/projects/${idProject}`);
    } catch (error) {
      console.log(error)
    }
  }

// Fonction pour obtenir les projets
const obtenirProjets = useCallback(async () => {
  try {
    const projects = await getProjects();

    setState((prev) => ({
      ...prev,
      projets: projects,
    }));
  } catch (error) {
    console.log('Obtention projets erreur:' + error);
  }
}, [])


 // Empty dependency array to ensure the callback is created only once

// Supprimer un projet
const handleDelete = async (projetId: string) => {
  try {
    await deleteProjects(projetId);
    window.location.reload();
  } catch (error) {
    console.log(error)
  }
}

// Obtenir les projets initialement
useEffect(() => {
  try {
    let projets = obtenirProjets();
  } catch (error) {
    console.log(error)
  }
}, [obtenirProjets]); // Include 'projets' in the dependency array

  
  return (
    <div className='flex justify-between h-full'>
      <div className='border min-h-full w-full md:w-[20%] bg-gray-100'>
        Dos
      </div>

      <div className='flex flex-col sm:w-full border p-8'>
        <div className='flex flex-col w-full border p-6'>
          <h2 className='text-2xl font-semibold mb-2'>Menu title</h2>
          <div className='flex justify-between items-center'>
            <Inpute
              label='Rechercher'
              onChange={() => {}}
              id="searchProject"
              type="search"
            />

            <Button
              id="createPopoverButton"
              type='button'
              className='
            bg-[#141414] 
              py-2 px-6 
              text-[#f9f9f9]
              flex items-center
              hover:shadow-xl'>

              <MdOutlineCreateNewFolder 
              className={state.projets.length > 0 ? 'text-2xl me-2' 
              : 'text-2xl me-2 animate-pulse'}/>

              <p className='text-lg'>Create</p>
            </Button>
            <UncontrolledPopover placement="bottom-start" target="createPopoverButton">
              <PopoverBody className='bg-[#f9f9f9] py-3 px-4 border'>
                <Container className='flex flex-col justify-center items-center'>
                  <div className='flex justify-start items-start w-full border-b'><Heading className='text-xl mb-2 font-semibold'>Create a project</Heading></div>
                  
                  <FormControl isRequired isInvalid={touched.name && !values.name} className='my-4'>
                    <FormLabel>Table name</FormLabel>
                    <Input className='px-2 py-1'onBlur={onBlur}
                    name='name' errorBorderColor='red.300' onFocus={(e) => e.target.select()}
                    type="text" value={values.name} onChange={handleChange}/>

                      <FormErrorMessage className='text-red-500'>Name required</FormErrorMessage>
                  </FormControl>

                  <ChakraButton
                    type='submit'
                    disabled={!values.name}
                    onClick={onCreate}
                    isLoading={isLoading}
                    colorScheme="blue"
                    variant="outline"
                    className='border w-full py-1 hover:bg-gray-200'>
                    <p className='text-lg text-center'>Create</p>
                  </ChakraButton>
                </Container>
              </PopoverBody>
            </UncontrolledPopover>
            
          </div>
        </div>
        <div 
          className='
          border
          p-6
          flex flex-col 
          md:flex-row'>
          {
            state.projets.length > 0 ?
            (
              <div className='
              w-full
              flex-wrap 
              flex flex-col 
              md:flex-row 
              gap-4'>
                {
                  state.projets.map((projet: any, index: any) => {
                    return (
                      <div key={index} 
                        className='
                        card
                        h-[200px] 
                        w-[24%] 
                        flex flex-col
                        justify-center 
                        items-center 
                        p-3 border
                        hover:shadow-xl'>
                        <Link href={'/projects/' + projet.id} passHref key={index}  
                        className='w-full h-full flex text-center 
                        items-center justify-center'>
                          {projet.name}
                        </Link>

                        <div className='border-t w-full p-1 flex items-center justify-between'>
                          <AiOutlineUsergroupAdd className='cursor-pointer text-xl text-[#141414] hover:text-gray-400' onClick={() => {alert('btn partager cliqué')}}/>
                          <RiDeleteBin5Line className='cursor-pointer text-xl  text-red-400 hover:text-red-200' onClick={() => handleDelete(projet.id)}/>
                        </div>
                      </div>
                    )
                  })
                }
                <Button 
                  id="createPopoverButtonLg"
                  type='button'
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
                </Button>
                <UncontrolledPopover placement="right-end" target="createPopoverButtonLg">
                  <PopoverBody className='bg-[#f9f9f9] py-3 px-4 border'>
                    <Container className='flex flex-col justify-center items-center'>
                      <div className='flex justify-start items-start w-full border-b'><Heading 
                      className='text-xl mb-2 font-semibold'>Create a project</Heading></div>
                      
                      <FormControl isRequired isInvalid={touched.name && !values.name} className='my-4'>
                        <FormLabel>Table name</FormLabel>
                        <Input className='px-2 py-1'onBlur={onBlur}
                        name='name' errorBorderColor='red.300' onFocus={(e) => e.target.select()}
                        type="text" value={values.name} onChange={handleChange}/>
                          <FormErrorMessage className='text-red-500'>Name required</FormErrorMessage>
                      </FormControl>

                      <ChakraButton
                        type='submit'
                        disabled={!values.name}
                        onClick={onCreate}
                        isLoading={isLoading}
                        colorScheme="blue"
                        variant="outline"
                        className='border w-full py-1 hover:bg-gray-200'>
                        <p className='text-lg text-center'>Create</p>
                      </ChakraButton>
                    </Container>
                  </PopoverBody>
                </UncontrolledPopover>
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