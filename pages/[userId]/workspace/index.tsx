'use client'

//Imports react
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'

// Import third-party
import { Container, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";
import { Button as ChakraButton } from '@chakra-ui/react';
import { Calendar } from "@/components/ui/calendar"

// Mes dépendances
import useCurrentUser from '@hooks/useCurrentUser';
import Inpute from '@components/Input'
import { createProject, deleteProject, getAllProjects, getLastProject, getProjectByName } from '@lib/project/requests';

// Import icones
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import AuthRedirect from '@components/AuthRedirect';
import Project from '@components/Project';
import CreateProjectButton from '@components/CreateProjectButton';
import Image from 'next/image';

// Variables créées
const initValues = { userId: "", name: "title" }
const initState = { values: initValues, isLoading: false, projets: [] }


const Projects = () => {
  // Obtenir le user dans la session
  const router = useRouter();
  const { data: user } = useCurrentUser();

  // Si on n'a pas de user, on redirige vers login
  AuthRedirect();

  const [state, setState] = useState(initState)
  const [touched, setTouched] = useState({} as any)
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const { values, isLoading } = state

  const onBlur = ({ target }: any) => setTouched((prev: any) => ({
    ...prev,
    [target.name]: true
  }))

  // Handle change de Create project
  const handleChange = ({ target }: any) => setState((prev) => ({
    ...prev,
    values: {
      ...prev.values,
      userId: user.id,
      [target.name]: target.value,
    }
  }))


  // Créer un projet
  const onCreate = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true
    }));

    try {
      await createProject({
        ...values,
        userId: user.id,
        backgroundImage
      });

      const idProject = await getLastProject(user.id);

      router.push(`/${user.id}/workspace/${idProject}`);
    } catch (error) {
      console.log(error)
    } finally {
      setState((prev) => ({
        ...prev,
        isLoading: false
      }));
    }
  }

  // Fonction pour obtenir les projets
  const obtenirProjets = useCallback(async () => {
    try {
      const projects = await getAllProjects(user.id);

      setState((prev) => ({
        ...prev,
        projets: projects,
      }));
    } catch (error) {
      console.log('Obtention projets erreur:' + error);
    }
  }, [user?.id])


  // Empty dependency array to ensure the callback is created only once

  // Supprimer un projet
  const handleDelete = async (userId: string, projetId: string) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      try {
        await deleteProject(projetId);
        await obtenirProjets();
        //window.location.reload();
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Obtenir les projets initialement
  useEffect(() => {
    try {
      let p = obtenirProjets();
    } catch (error) {
      console.log(error)
    }
  }, [obtenirProjets]); // Include 'projets' in the dependency array

  // Handle change de barre de recherche
  const handleSearch = async ({ target }: any) => {
    const projects = await getProjectByName(user?.id, target.value);

    if (projects) {
      setState((prev) => ({
        ...prev,
        projets: projects,
      }));
    } else if (target.value.trim() !== "") {
      setState((prev) => ({
        ...prev,
        projets: [],
      }));
    }

    if (target.value.trim() === "") {
      obtenirProjets();
    }
  }

  // gerer le clic sur une image background pour un projet

  const defaultBackgroundImage = 'https://trello.com/assets/707f35bc691220846678.svg';
  const [backgroundImage, setBackgroundImage] = useState(defaultBackgroundImage);

  const handleClickImage = (src: React.SetStateAction<string>) => {
    setBackgroundImage(src);
  };

  return (
    <div className='min-h-screen flex justify-between'>
      <div className='border hidden md:flex w-full md:w-[20%] bg-gray-100'>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>

      <div className='flex flex-col w-full p-8'>
        <div className='flex flex-col w-full border rounded-t-md p-6'>
          <h2 className='text-2xl font-semibold mb-2'>Menu title</h2>
          <div className='flex flex-col md:flex-row justify-between gap-3 md:items-center'>
            <Inpute
              label='Rechercher'
              onChange={handleSearch}
              id="searchProject"
              type="search"
            />

            <Button
              id="createPopoverButton"
              type='button'
              className='
            bg-[#141414] 
              py-2 px-6 rounded-md
              text-[#f9f9f9]
              flex items-center
              hover:shadow-xl'>

              <MdOutlineCreateNewFolder
                className={state.projets.length > 0 ? 'text-2xl me-2'
                  : 'text-2xl me-2 animate-pulse'} />

              <p className='text-lg'>Create</p>
            </Button>
            <UncontrolledPopover placement="bottom-start" target="createPopoverButton">
              <PopoverBody className='bg-[#f9f9f9] py-3 px-4 border rounded-md'>
                <Container className='flex flex-col justify-center items-center'>
                  <div className='flex justify-start items-start w-full border-b'><Heading className='text-xl mb-2 font-semibold'>Create a project</Heading></div>

                  <FormControl isRequired isInvalid={touched.name && !values.name} className='my-4 '>

                    <div className="image mx-auto my-2 py-2 px-2" style={{ backgroundImage: `url(${backgroundImage})` }}>
                      <Image src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt="Description de l'image" width={300} height={300} />
                    </div>

                    <div className="image-container mx-auto my-8">
                      <div className="image-scroll ">
                        <Image className=' cursor-pointer' src="https://trello.com/assets/707f35bc691220846678.svg" alt="Image 1" width={50} height={50} onClick={() => handleClickImage('https://trello.com/assets/707f35bc691220846678.svg')} />
                        <Image className=' cursor-pointer' src="https://trello.com/assets/d106776cb297f000b1f4.svg" alt="Image 2" width={50} height={50} onClick={() => handleClickImage('https://trello.com/assets/d106776cb297f000b1f4.svg')} />
                        <Image className=' cursor-pointer' src="https://trello.com/assets/8ab3b35f3a786bb6cdac.svg" alt="Image 3" width={50} height={50} onClick={() => handleClickImage('https://trello.com/assets/8ab3b35f3a786bb6cdac.svg')} />
                        <Image className=' cursor-pointer' src="https://trello.com/assets/a7c521b94eb153008f2d.svg" alt="Image 4" width={50} height={50} onClick={() => handleClickImage('https://trello.com/assets/a7c521b94eb153008f2d.svg')} />
                        <Image className=' cursor-pointer' src="https://trello.com/assets/aec98becb6d15a5fc95e.svg" alt="Image 5" width={50} height={50} onClick={() => handleClickImage('https://trello.com/assets/aec98becb6d15a5fc95e.svg')} />

                      </div>
                    </div>

                    <FormLabel>Table name</FormLabel>
                    <Input className='px-2 py-1 rounded-md' onBlur={onBlur}
                      name='name' errorBorderColor='red.300' onFocus={(e) => e.target.select()}
                      type="text" value={values.name} onChange={handleChange} />

                    <FormErrorMessage className='text-red-500'>Name required</FormErrorMessage>
                  </FormControl>

                  <ChakraButton
                    type='submit'
                    disabled={!values.name}
                    onClick={onCreate}
                    isLoading={isLoading}
                    colorScheme="blue"
                    variant="outline"
                    className='border rounded-md w-full py-1 hover:bg-gray-200'>
                    <p className='text-lg text-center'>Create</p>
                  </ChakraButton>
                </Container>
              </PopoverBody>
            </UncontrolledPopover>

          </div>
        </div>

        <div
          className='
          border rounded-b-md
          p-6 border-t-0
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
                        <Project key={index} index={index} project={projet} onClick={() => { handleDelete(user.id, projet.id) }} />
                      )
                    })
                  }
                  <CreateProjectButton touched={touched} values={values} onBlur={onBlur} handleChange={handleChange} onCreate={onCreate} isLoading={isLoading} />
                </div>
              )

              :

              (
                <div className='text-center w-full text-gray-500'>Vous n&#39;avez aucun projet...</div>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default Projects
