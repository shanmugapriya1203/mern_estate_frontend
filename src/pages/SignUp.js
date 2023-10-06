import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { API_BASE_URL } from '../config';
import axios from 'axios';
export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    setLoading(true);
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      
      });
      const data= response.data
      if(data.success=== false){
        setLoading(false)
        setError(data.message)
        return;
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
      

  } catch (error) {
     setLoading(false);
      setError(error.message);
  }
 



    }




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-4 text-center">Sign Up</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            id="username"
            onChange={handleChange}
            value={formData.username}
          />
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
          className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        </form>

        <div className="mt-5 text-center">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-blue-700">
            Sign In
          </Link>
        </div>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );

  }