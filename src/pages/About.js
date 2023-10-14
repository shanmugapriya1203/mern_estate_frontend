import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto text-center'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Camplia</h1>
      <p className='mb-4 text-slate-700'>
        Camplia is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
      </p>
      <p className='mb-4 text-slate-700'>
        Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
      </p>
      <p className='mb-4 text-slate-700'>
        Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
      </p>
      <div className="flex flex-center mt-6 items-center">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 mx-2">
          <FaFacebook size={24} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 mx-2">
          <FaTwitter size={24} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 mx-2">
          <FaInstagram size={24} />
        </a>
      </div>
   
    </div>
  );
}
