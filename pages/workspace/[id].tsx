'use client'

// Imports react
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'

// Imports third-party
import TextareaAutosize from 'react-textarea-autosize';
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";
import { Button as ChakraButton, Container, FormControl } from '@chakra-ui/react';

// Mes dépendances
import Task from '@components/Task'
import { getProjectById, updateProjectName } from '@lib/project/requests';
import { createTask } from '@lib/task/requests';

// Imports icones
import { IoMdAdd } from 'react-icons/io'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { CiSquareRemove } from 'react-icons/ci'



// Variables créées
const initState = {
  values: {
    projet: { name: "" },
    list: { name: "" },
    task: { name: "" },
  },
  lists: [],
  tasks: [],
  isLoading: false,
};

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
  const [touched, setTouched] = useState({})

  const onBlur = ({target}: any) => setTouched((prev) => ({...prev, 
    [target.name]: true
  }))

  const obtenirProjet = useCallback(async () => {
    try {
      const projects = await getProjectById(id);

      if (projects.name) {
        setState((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            projet: {
              ...prev.values.projet,
              name: projects.name
            }
          }
        }));
      } else {
        console.log('Aucun projet trouvé');
      }

    } catch (error) {
      console.log('Obtention projets erreur:' + error);
    }
  }, [id])

  // Ajouter un tâche
  const listId = '54758fc8acf6895bbcc46819'// J'ai besoin que tu finisse ajouter liste pour ça
  const addTask = async () => {
    try {
      console.log("add task")
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
  
      const newTask = await createTask({
        projectId: id,
        listId: listId,
        name: state.values.task.name,
      });
  
      console.log('Voici la nouvelle tache: ' + newTask);
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  // Obtenir le projet initialement
  useEffect(() => {
    try {
      obtenirProjet();
    } catch (error) {
      console.log(error)
    }
  }, [obtenirProjet]);

  // Modifier nom du projet
  const handleChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        projet: {
          ...prev.values.projet,
          name: target.value,
        },
      },
    }));

    await updateProjectName(id, target.value)
  };

  const handleChangeTaskName = async ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        task: {
          name: target.value,
        },
      },
    }));
    console.log(state.values.task.name)
    //await updateProjectName(id, target.value)
  };

  return (
    <div className='flex justify-between h-full'>
      <div className='hidden md:flex border min-h-full w-full md:w-[20%] bg-gray-100'>
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
                px-2 rounded-md
                py-1
                border'
              onChange={handleChange}
              onFocus={(e) => e.target.select()}
              value={state.values.projet.name} name="name" />
          </div>
        </div>
        <div
          className='
          p-6 flex-wrap 
          flex flex-col 
          md:flex-row 
          gap-4'>

          <div className='md:w-[25%] border py-3 px-3 rounded-lg bg-gray-100'>
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
              <div className='w-full'>
                <Button id="addTaskBtn"
                  type='button'
                  className='flex items-center justify-start cursor-pointer px-1 rounded-lg py-1 w-full hover:bg-gray-200'>
                  <IoMdAdd />
                  <h4 className='ms-2 font-thin text-sm'>Ajouter une carte</h4>
                </Button>
                <UncontrolledPopover placement="bottom-start" target="addTaskBtn">
                  <PopoverBody className='bg-[#f9f9f9] py-3 px-4 border rounded-md'>
                    <Container className='flex flex-col justify-center items-center'>                    
                      <FormControl isRequired isInvalid={touched.name && !state.values.task.name} className='my-4 '>
                        <TextareaAutosize className='px-2 py-1 resize-none rounded-md'onBlur={onBlur}
                        name='taskName'
                        placeholder='Enter a title for this card' 
                        value={state.values.task.name} onChange={handleChangeTaskName}/>
                      </FormControl>

                      <ChakraButton
                        type='submit' onClick={addTask}
                        disabled={!state.values.task.name}
                        isLoading={state.isLoading}
                        colorScheme="blue"
                        variant="outline"
                        className='border rounded-md w-full py-1 hover:bg-gray-200'>
                        <p className='text-lg text-center'>Create</p>
                      </ChakraButton>
                    </Container>
                  </PopoverBody>
                </UncontrolledPopover>
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
