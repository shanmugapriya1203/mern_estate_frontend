import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <main className='p-3 max-w-md mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <img
          src={currentUser.avatar}
          alt='Profile'
          className='rounded-full h-20 w-20 object-cover cursor-pointer self-center mt-2'
        />
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          placeholder='Username'
          className='border p-3 rounded-lg'
        
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
         
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
       
        />

        <button
          type='submit'
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
         >
          UPDATE
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete an account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </main>
  );
}
