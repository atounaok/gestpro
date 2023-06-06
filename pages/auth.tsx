import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Input from '@/components/Input'
import axios from 'axios';
import { getSession, signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { NextPageContext } from 'next';
import useCurrentUser from '@hooks/useCurrentUser';
import { useRouter } from 'next/router';


const Auth = () => {
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])


    // Login
    const login = useCallback(async () => {
      try {
          await signIn('credentials', {
              email,
              password,
          });

      } catch (error) {
          console.log(error)
      }
  }, [email, password])
  
  // Register
  const register = useCallback(async () => {
      try {
          await axios.post('/api/register', {
              email,
              name,
              password
          });

          login()
      } catch (error) {
          console.log(error)
      }
  }, [email, name, password, login]);


  return (
    <div className="">
      <div className="">
        <div className='flex justify-center'>
            <div className='px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
                <h2 className='text-black text-4xl mb-8 font-semibold'>
                    {variant === 'login' ? 'Sign in' : 'Register'}
                </h2>
                <div className='flex flex-col gap-4'>
                    {variant === 'register' && (
                    <Input
                        label='Username'
                        onChange={(e:any) => setName(e.target.value)}
                        id="name"
                        value={name}
                    />)}

                    <Input
                        label='Email'
                        onChange={(e:any) => setEmail(e.target.value)}
                        id="email"
                        type="email"
                        value={email}
                    />
                    <Input
                        label='Password'
                        onChange={(e:any) => setPassword(e.target.value)}
                        id="password"
                        type="password"
                        value={password}
                    />
                </div>

                <button onClick={variant === 'login' ? login : register} className='bg-gray-900 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
                    {variant === 'login' ? 'Login' : 'Sign up'}
                </button>

                <div className="login-separator-component ">
                    <span className="separator-line "/>
                    <h2 className='whitespace-nowrap mx-2  font-semibold'>Or {variant === 'login' ? 'Login' : 'Sign up'} with</h2>
                    <span className="separator-line"/>
                </div>


                <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                    <div onClick={() => signIn('google', { callbackUrl: '/' })} 
                    className='
                        w-10
                        h-10
                        bg-white
                        rounded-full
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        hover:opacity-80
                        transition
                    '>
                        <FcGoogle size={30}/>
                    </div>
                    <div onClick={() => signIn('github', { callbackUrl: '/' })}
                    className='
                        w-10
                        h-10
                        bg-white
                        rounded-full
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        hover:opacity-80
                        transition
                    '>
                        <FaGithub size={30}/>
                    </div>
                </div>

                <p className='text-neutral-500 mt-12'>
                    {variant === 'login' ? 'First time using Gestpro?' : 'Already have an account?'}  
                    <span onClick={toggleVariant} className='text-black ml-1 hover:underline hover:text-gray-500 cursor-pointer'>
                        {variant === 'login' ? 'Create an account' : 'Login'}    
                    </span>    
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
