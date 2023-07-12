import React from 'react'

interface InputProps {
    id: string;
    onChange: any;
    value?: string;
    label: string;
    type?: string;
    width?: number;
    height?: number;
}

const Input: React.FunctionComponent<InputProps> = ({
    id, onChange, value, label, type, width, height
}) => {
  return (
    <div className='sm:relative'>
        <input
            id={id}
            value={value}
            type={type}
            onChange={onChange}
            width={width && width + "px"}
            height={height && height + "px"}
            className='
                block
                px-3 sm:px-6 rounded-md
                py-2 sm:pt-6 sm:pb-1
                w-full
                text-md
                text-[#141414]
                bg-neutral-200
                appearance-none
                focus:outline-none
                focus:ring-0 sm:placeholder-transparent
                peer hover:shadow-sm'
            placeholder={label}
            />
        <label
        htmlFor={id}
         className='hidden sm:absolute
            sm:flex
            text-md
            text-zinc-400
            transform
            -translate-y-3
            scale-75
            top-4
            z-10
            origin-[0]
            left-6
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3
        '>
            {label}
        </label>
    </div>
  )
}

export default Input