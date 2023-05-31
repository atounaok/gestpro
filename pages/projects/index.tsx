import Inpute from '@components/Input'
import axios from 'axios'
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { Container, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';
import { Button as ChakraButton} from '@chakra-ui/react';
import { createProject } from '@lib/requests';

const initValues = { userId: "647611728c88f4840ca4e63c", name: "title" }

const initState = {values: initValues, isLoading: false}

const Projects = () => {
  const [state, setState] = useState(initState)
  const [touched, setTouched] = useState({})

  const { values, isLoading } = state

  const onBlur = ({target}: any) => setTouched((prev) => ({...prev, 
    [target.name]: true
  }))

  const handleChange = ({target}: any) => setState((prev) => ({
    ...prev,
    values: {
      ...prev.values,
      [target.name]: target.value,
    }
  }))

  const onCreate = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true
    }));

    try {
      await createProject(values)
      setState((prev) => ({
        ...prev,
        isLoading: false
      }));
    } catch (error) {
      console.log(error)
    }
  }

  const name = "Mon pro"
  const userId = '647611728c88f4840ca4e63c'
    // creer
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
              className={projets.length > 0 ? 'text-2xl me-2' 
              : 'text-2xl me-2 animate-pulse'}/>

              <p className='text-lg'>Create</p>
            </Button>
            <UncontrolledPopover placement="bottom-start" target="createPopoverButton">
              <PopoverBody className='bg-[#f9f9f9] py-3 px-4 border'>
                <Container className='flex flex-col justify-center items-center'>
                  <div className='flex justify-start items-start w-full border-b'><Heading className='text-xl mb-2 font-semibold'>Create a table</Heading></div>
                  
                  <FormControl isRequired isInvalid={touched.name && !values.name} className='my-4'>
                    <FormLabel>Table name</FormLabel>
                    <Input className='px-2 py-1'onBlur={onBlur}
                    name='name' errorBorderColor='red.300'
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
                      <div className='flex justify-start items-start w-full border-b'><Heading className='text-xl mb-2 font-semibold'>Create a table</Heading></div>
                      
                      <FormControl isRequired isInvalid={touched.name && !values.name} className='my-4'>
                        <FormLabel>Table name</FormLabel>
                        <Input className='px-2 py-1'onBlur={onBlur}
                        name='name' errorBorderColor='red.300'
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