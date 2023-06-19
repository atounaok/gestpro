'use client'

// Imports react
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react'

// Imports third-party
import TextareaAutosize from 'react-textarea-autosize';
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button as ChakraButton, Container, FormControl } from '@chakra-ui/react';
import { Calendar } from "@/components/ui/calendar"

// Mes dépendances
import Task from '@components/Task'
import { getProjectById, updateProjectName } from '@lib/project/requests';
import { createTask, getAllTasks } from '@lib/task/requests';

// Imports icones
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { CiSquareRemove } from 'react-icons/ci'
import AuthRedirect from '@components/AuthRedirect';
import useCurrentUser from '@hooks/useCurrentUser';
import { createList, getAllLists } from '@lib/list/requests';



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


const ProjectDetails = () => {
  // Si on n'a pas de user, on redirige vers login
  const router = useRouter()
  const { data: user } = useCurrentUser();

  AuthRedirect();

  const { id } = router.query;
  const formRef: any = useRef(null)
  const [state, setState] = useState(initState)
  const [touched, setTouched] = useState({})
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [cardFormOpen, setCardFormOpen] = useState(false);
  const [cardFormOpenList, setCardFormOpenList] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const textarea_ref: any = useRef();
  useEffect(() => {
    textarea_ref.current.focus();
    
  });

  const handleFormSubmit = (e: any) => {
    if (e.keyCode === 13 && e.target.value.trim() !== '') {
      e.preventDefault();
      try {
        addTask();
      } catch (error) {
        console.log(error)
      } finally {
        setState((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            task: {
              name: '',
            },
            
          },
        }));
      }

    }
  };

  const handleListFormSubmit = (e: any) => {
    if (e.keyCode === 13 && e.target.value.trim() !== '') {
      e.preventDefault();
      try {
        addList();
      } catch (error) {
        console.log(error)
      } finally {
        setState((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            list: {
              name: '',
            },
            
          },
        }));
      }

    }
  };


  const onBlur = (e: any) => {
    if (e.target.value.trim() !== '') {
      addTask();
      setCardFormOpen(false);
      setCardFormOpenList(false);
    } else {
      setCardFormOpen(false);
      setCardFormOpenList(false);
    }
  }

  const onListBlur = (e: any) => {
    if (e.target.value.trim() !== '') {
      addList()
      setCardFormOpenList(false);
    } else {
      
      setCardFormOpenList(false);
    }
  }

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

  const obtenirTasks = useCallback(async () => {
    try {
      const allTasks = await getAllTasks(id);

      if (allTasks) {
        setState((prev) => ({
          ...prev,
          tasks: allTasks,
        }));
      }

    } catch (error) {
      console.log('Obtention projets erreur:' + error);
    }
  }, [id])

  // Quand on drop la task: 
  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const tasksCopy = [...state.tasks];
    const [movedTask] = tasksCopy.splice(source.index, 1);
    tasksCopy.splice(destination.index, 0, movedTask);

    setState((prev) => ({
      ...prev,
      tasks: tasksCopy,
    }));
  };

  // Ajouter un tâche

  const listId = '54758fc8acf6895bbcc46819'// J'ai besoin que tu finisse ajouter liste pour ça
  const addTask = async () => {
    try {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));

      const newTask = await createTask({
        projectId: id,
        listId: listId,
        name: state.values.task.name,
      });

      obtenirTasks();
      console.log('Voici la nouvelle tache : ' + newTask);
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

// Ajouter une liste

const addList = async () => {
  try {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    const newList = await createList({
      projectId: id,
      listId: listId,
      name: state.values.task.name,
    });

    getAllLists();
    console.log('Voici la nouvelle tache : ' + newList);
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
      obtenirTasks();
    } catch (error) {
      console.log(error)
    }
  }, [obtenirProjet, obtenirTasks]);

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

    await updateProjectName(user.id, id, target.value)
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
    //await updateProjectName(id, target.value)
  };

  const handleChangeListName = async ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        list: {
          name: target.value,
        },
      },
    }));
    //await updateProjectName(id, target.value)
  };

  return (
    <div className='flex justify-between min-h-screen'>
      <div className='hidden md:flex border min-h-full w-full md:w-[20%] bg-gray-100'>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
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
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId='tasks'>
                  {(provided) => (
                    <ul
                      className='flex flex-col gap-2'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {state.tasks.map((task: any, index: any) => (
                        <Draggable key={index} draggableId={task.id} index={index}>
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Task
                                key={index}
                                title={task.name}
                                totalItems='3'
                                completedItems='0'
                              />
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              <form>
                <TextareaAutosize ref={textarea_ref}
                  className={cardFormOpen ? 'mt-2 w-full min-h-[10vh] resize-none border shadow bg-whit p-2 rounded-md' :
                    'hidden mt-2 w-full min-h-[10vh] resize-none border shadow bg-whit p-2 rounded-md'}
                  onBlur={onBlur} name='taskName'
                  placeholder='Enter a title for this card' onKeyDown={handleFormSubmit}
                  value={state.values.task.name} onChange={handleChangeTaskName} />
              </form>
            </div>

            <div className='flex justify-between items-center px-1 mt-1'>
              <div className='w-full'>
                <Button
                  type='button' onClick={() => { setCardFormOpen((prev) => !prev) }}
                  className='justify-start cursor-pointer px-1 rounded-md py-1 w-full hover:bg-gray-200'>
                  {
                    !cardFormOpen ?
                      (
                        <div className='flex items-center'>
                          <IoMdAdd className='text-green-500 text-xl' />
                          <h4 className='ms-2 font-light text-sm'>Add new card</h4>
                        </div>
                      )
                      :
                      (
                        <div className='flex items-center'>
                          <IoMdRemove className='text-red-500' />
                          <h4 className='ms-2 font-light text-sm'>Cancel modifications</h4>
                        </div>
                      )
                  }
                </Button>
              </div>
              <CiSquareRemove className='text-2xl me-1 text-red-400 hover:text-red-200 cursor-pointer' />
            </div>
          </div>

          <div>
            <button className='flex items-center border max-h-[5vh] rounded-lg py-2 px-6 bg-gray-50 hover:bg-gray-200'
              type='button' onClick={() => { setCardFormOpenList((prev) => !prev) }}>
              <IoMdAdd />
              <p className='ms-1 font-light'>Add another list</p>


            </button>
            <form>
              <TextareaAutosize ref={textarea_ref}
                className={cardFormOpenList ? 'mt-2 w-full min-h-[10vh] resize-none border shadow bg-whit p-2 rounded-md' :
                  'hidden mt-2 w-full min-h-[10vh] resize-none border shadow bg-whit p-2 rounded-md'}
                onBlur={onListBlur} name='listName'
                placeholder='Enter a title for this list' onKeyDown={handleListFormSubmit}
                value={state.values.list.name} onChange={handleChangeListName} />
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
