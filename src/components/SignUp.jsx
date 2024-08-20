import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Logo from './Logo';
function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  // return <div>SignUp</div>;

  const create = async (data) => {
    setError('');
    try {
      const userAccountCreated = await authService.createAccount(data);
      console.log('userAccountCreateduserAccountCreated', userAccountCreated);
      if (userAccountCreated) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Already have an account?&nbsp;
          <Link to='/login' className='font-medium text-primary transition-all duration-200 hover:underline'>
            Sign In
          </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-5'>
            <Input
              label='Full name'
              placeholder='Enter your name'
              {...register('name', {
                required: true,
              })}
            />
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
              placeholder='Enter your password'
              type='password'
              {...register('password', {
                required: true,
                validate: {
                  matchPatern: (passwd) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(passwd) || 'Password must contain at least 8 characters,1 uppercase letter,1 lowercase letter 1 number and special characters',
                },
              })}
            />
            <Button className='w-full' type='submit'>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
