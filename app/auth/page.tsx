'use client'

import Input from '@components/Input';
import { signIn } from 'next-auth/react';
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';


const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState('login')

  const toggleIsLogin = useCallback(()=>{
    setIsLogin((currentIsLogin) => currentIsLogin === 'login' ? 'register' : 'login')
  }, [])

  //Connexion
  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });

      router.push('/');
    } catch (error) {
      console.log(error)
    }
  }, [email, password, router])

  //Inscription
  const register = useCallback(async () => {
    try {
      await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          name,
          password
        })
      });

      login();
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login])


  return (
    <div className='h-full'>
      <h2 className='text-4xl mb-8 font-semibold'>
        {isLogin === 'login' ? 'Sign in' : 'Register'}
      </h2>
      <div>
        {isLogin === 'register' && (
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
          value={email}/>

          <Input 
          label='Password'
          onChange={(e:any) => setPassword(e.target.value)}
          id="password"
          value={password}/>
      </div>
        
      <button onClick={isLogin === 'login' ? login : register} 
        className='bg-[#141414] py-3 text-white rounded-md w-full mt-10 hover:bg-gray-900 transition'>
          {isLogin === 'login' ? 'Login' : 'Sign up'}
      </button>

      <p className='text-neutral-500 mt-12'>
          {isLogin === 'login' ? 'First time using Gestpro?' : 'Already have an account?'}  
          <span onClick={toggleIsLogin} className='text-blue-700 ml-1 hover:underline hover:text-blue-400 cursor-pointer'>
              {isLogin === 'login' ? 'Create an account' : 'Login'}    
          </span>    
      </p>
    </div>
  )
}

export default Auth
