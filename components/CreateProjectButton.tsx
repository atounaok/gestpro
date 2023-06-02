import { Heading, FormControl, FormLabel, FormErrorMessage, Button as ChakraButton } from '@chakra-ui/react'
import React from 'react'
import { Button, UncontrolledPopover, PopoverBody, Container, Input } from 'reactstrap'

const CreateProject = ({touched, values, onBlur, handleChange, onCreate, isLoading}: 
    {touched: any, values: any, onBlur: any, handleChange: any, onCreate: any, isLoading: any}) => {
  return (
    <div className='md:w-[24%]'>
        <Button 
            id="createPopoverButtonLg"
            type='button'
            className='
            card rounded-md
            h-[200px] 
            w-full
            md:flex text-gray-400
            justify-center 
            items-center 
            p-3 border
            hover:shadow-xl hidden'>
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
}

export default CreateProject
