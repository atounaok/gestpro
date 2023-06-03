import React from 'react'
import { BsCheck2Square, BsTextParagraph } from 'react-icons/bs'
import { TfiPencil } from 'react-icons/tfi'

const Task = ({ title, totalItems, completedItems }: { title: string, totalItems: string, completedItems: string }) => {
    return (
      <li className='border shadow bg-[#f9f9f9] cursor-pointer hover:bg-gray-100 p-2 rounded-md'>
        <div className='flex justify-between items-center mb-2'>
          <p className='font-light text-sm'>{title}</p>
          <button className='hover:bg-gray-200 p-1 rounded-md' onClick={() => alert('Modifier task')}>
            <TfiPencil className='text-gray-500 text-md'/>
          </button>
        </div>
        <div className='flex justify-start items-center px-1'>
          <BsTextParagraph className='me-3 text-sm font-thin'/>
          <div className='flex justify-center items-center'>
            <BsCheck2Square className='font-thin me-1 text-sm'/>
            <p className='font-thin text-sm'>{completedItems}/{totalItems}</p>
          </div>
        </div>
      </li>
    )
  }
  

export default Task
