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
import { Link } from 'react-router-dom';

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
    <main className='p-4 max-w-md mx-auto'>
    <h1 className='text-4xl font-bold text-center my-6 text-gray-500'>Profile Settings</h1>
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
        className='rounded-full h-20 w-20 object-cover cursor-pointer self-center mt-2'
        onClick={() => fileRef.current.click()}
      />
      <p className='text-sm self-center'>
        {fileUploadError ? (
          <span className='text-red-600'>
            Error: Image upload failed (image must be less than 2 MB)
          </span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className='text-gray-500'>{`Uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className='text-green-600'>Image successfully uploaded!</span>
        ) : (
          ''
        )}
      </p>
  
      <label htmlFor='username' className='text-lg font-semibold text-gray-500'>Username</label>
      <input
        defaultValue={currentUser?.username || ''}
        onChange={handleChange}
        type='text'
        id='username'
        placeholder='Username'
        className='border p-3 rounded-lg'
      />
      <label htmlFor='email' className='text-lg font-semibold text-gray-500'>Email</label>
      <input
        defaultValue={currentUser?.email || ''}
        onChange={handleChange}
        type='email'
        id='email'
        placeholder='Email'
        className='border p-3 rounded-lg'
      />
      <label htmlFor='password' className='text-lg font-semibold text-gray-500'>New Password</label>
      <input
        type='password'
        onChange={handleChange}
        id='password'
        placeholder='New Password'
        className='border p-3 rounded-lg'
      />
  
      <button
        type='submit'
        className='bg-gray-500 text-white rounded-lg p-3 uppercase hover:bg-gray-600 hover:opacity-90'
      >
        UPDATE
      </button>
      <Link to={"/create-listing"} className='bg-green-600 text-white rounded-lg p-3 uppercase hover:bg-green-700 hover:opacity-90 text-center'>Create Listing</Link>
    </form>
    <div className='flex justify-between mt-4'>
      <button
        type='button'
        className='text-red-600 border border-red-600 rounded-lg p-2 hover:bg-red-600 hover:text-white'
        onClick={handleDeleteUser}
      >
        Delete My Account
      </button>
      <button
        type='button'
        className='text-red-600 border border-red-600 rounded-lg p-2 hover:bg-red-600 hover:text-white'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  
    <p className='text-green-600 mt-5'>
      {updateSuccess ? 'Profile successfully updated!' : ''}
    </p>
  </main>
  
  
  
  
  );
}
