import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import Cookies from 'js-cookie'; // Import the js-cookie library

import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/signin`,
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

      dispatch(signInSuccess(data));

      // Set the "access_token" cookie with the token received in the response
      Cookies.set('access_token', data.token, { expires: 7 }); // Expires in 7 days

      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));

      if (error.response && error.response.status === 404) {
        window.alert('User not found');
      } else if (error.response && error.response.status === 401) {
        window.alert('Invalid credentials');
      } else {
        window.alert('An unexpected error occurred. Please try again later.');
      }
    }
  }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-4 text-center">Sign In</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <button
            disabled={loading}
            className={`bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 ${
              loading ? 'opacity-80 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth/>
        </form>

        <div className="mt-5 text-center">
          <p>Don't have an account?</p>
          <Link to="/sign-up" className="text-blue-700">
            Sign Up
          </Link>
        </div>
      </div>
    
    </div>
  );
}
