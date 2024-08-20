import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input } from './index';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-center  '>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 `}>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Don&apos;t have any account?&nbsp;
          <Link to='/signup' className='font-medium text-primary transition-all duration-200 hover:underline'>
            Sign Up
          </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'></p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input
              label='Email:'
              placeholder='Enter your email'
              type='email'
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) => /[\w\d.+]+@[\w\d]+(?:\.[a-z]{2,4}){1,2}/gi.test(value) || 'Email Address must be valid address',
                },
              })}
            />
            <Input
              label='Password'
              type='password'
              placeholder='Enter your password'
              {...register('password', {
                required: true,
                validate: {
                  matchPatern: (passwd) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(passwd) || 'Password must contain at least 8 characters,1 uppercase letter,1 lowercase letter 1 number and special characters',
                },
              })}
            />
            <Button type='submit'> Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
