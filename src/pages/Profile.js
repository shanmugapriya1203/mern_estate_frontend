import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess
,signOutUserStart,signOutUserSuccess,signOutUserFailure } from '../redux/user/userSlice';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await axios.post(
        `${API_BASE_URL}/api/user/update/${currentUser?._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;
      if (data.success === false) {
        const errorMessage = data.message || 'An unexpected error occurred.';
        window.alert(errorMessage);
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    const confirmed = window.confirm('Do you want to delete your account? This action cannot be undone.');
  
    if (confirmed) {
      try {
        dispatch(deleteUserStart());
        const response = await axios.delete(
          `${API_BASE_URL}/api/user/delete/${currentUser?._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = response.data;
        if (data.success === false) {
          const errorMessage = data.message || 'An unexpected error occurred.';
          window.alert(errorMessage);
          return;
        }
        dispatch(deleteUserSuccess(data));
        navigate('/sign-in');
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    }
  };

  
  const handleSignOut = async () => {
    const confirmed = window.confirm('Do you want to sign out?');
  
    if (confirmed) {
      try {
        dispatch(signOutUserStart());
        const response = await axios.get(`${API_BASE_URL}/api/auth/signout`);
        const data = response.data;
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data));
        navigate('/sign-in')
      } catch (error) {
        dispatch(signOutUserFailure(error.message));
      }
    }
  };
  
  return (
    <main className='p-3 max-w-md mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='images/*'
          onChange={(e) => setFile(e.target.files[0])}
        />

        <img
          src={formData.avatar || (currentUser?.avatar || '')}
          alt='Profile'
          className='rounded-full h-16 w-16 object-cover cursor-pointer self-center mt-1'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <label htmlFor='username'>Username</label>
        <input
          defaultValue={currentUser?.username || ''}
          onChange={handleChange}
          type='text'
          id='username'
          placeholder='Username'
          className='border p-3 rounded-lg'
        />
        <label htmlFor='email'>Email</label>
        <input
          defaultValue={currentUser?.email || ''}
          onChange={handleChange}
          type='email'
          id='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          onChange={handleChange}
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
      <div className='flex justify-between mt-4'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}>Delete an account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign Out</span>
      </div>

      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </main>
  );
}
