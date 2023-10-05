import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-4 text-center">Sign Up</h1>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            id="username"
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            id="password"
          />
          <button
            className="bg-blue-700 text-white py-2 rounded-lg uppercase hover:bg-blue-800"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-5 text-center">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
