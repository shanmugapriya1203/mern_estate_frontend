import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md sticky top-0 z-10'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-2xl text-slate-700 ml-2'>
            <span className='text-slate-500'>Camp</span>
            <span className='text-slate-700'>Lia</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-300 p-3 rounded-md flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-64 text-slate-600'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          {/* Navigation Links */}
          <Link to='/'>
            <li className='text-slate-700 hover:underline font-semibold'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='text-slate-700 hover:underline font-semibold'>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <div className='flex items-center'>
                <img
                  className='rounded-full h-10 w-10 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                />
                <span className='text-slate-700 ml-2 uppercase font-extrabold'>{currentUser.username}</span>
              </div>
            ) : (
              <Link to='/sign-in'>
                <li className='rounded-md bg-slate-500 text-white px-4 py-2 hover:bg-slate-700'> Sign in</li>
              </Link>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
