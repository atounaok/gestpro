'use client'

import Input from '@components/Input';
import React, { useState, useCallback } from 'react'


const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState('login')

  const toggleIsLogin = useCallback(()=>{
    setIsLogin((currentIsLogin) => currentIsLogin === 'login' ? 'register' : 'login')
  }, [])

  const login = useCallback(async () => {

  }, [])

  const register = useCallback(async () => {

  }, [])

  return (
    <div className='h-full'>
      <Input 
        label='Username'
        onChange={()=> {}}
        id="name"
        value={name}/>
        <Input 
        label='email'
        onChange={()=> {}}
        id="name"
        value={name}/>
        <Input 
        label='password'
        onChange={()=> {}}
        id="name"
        value={name}/>
        <button>
          {isLogin? 'Login' : 'Register'}
        </button>
        <p></p>
    </div>
  )
}

export default Auth
