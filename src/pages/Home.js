import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(saleListings)
useEffect(()=>{
  const fetchofferListings=async()=>{
    try {
      const res= await fetch(`${API_BASE_URL}/api/listing/get?offer=true&limit=6`)
      const data= await res.json()
      setOfferListings(data)
      fetchRentListing()

      
    } catch (error) {
      console.log(error)
    }
  }
  const  fetchRentListing= async()=>{
    try {
      const res = await fetch(`${API_BASE_URL}/api/listing/get?type=rent&limit=6`);
      const data = await res.json();
      setRentListings(data);
      fetchSaleListings();
    } catch (error) {
      console.log(error);
    }

  }
  const fetchSaleListings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/listing/get?type=sale&limit=4`);
      const data = await res.json();
      setSaleListings(data);
    } catch (error) {
      log(error);
    }
  };
  fetchofferListings()
},[])




  return (
   <>
<div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
  <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
    Discover Camplia for your next <span className="text-slate-500">extraordinary</span>
    <br />
    adventure with your dream property
  </h1>
  <div className="text-slate-400 text-xs sm:text-sm">
    Camplia, your gateway to the extraordinary world of real estate, where every property tells a unique story.
    <br />
    Explore homes that inspire, locations that captivate, and the lifestyle you've always dreamed of.
  </div>
  <Link to={'/search'} className="text-slate-700 text-xs sm:text-sm font-bold hover:underline">
    Let's embark on this journey...
  </Link>
</div>
<Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.images[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
         {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>


   </>

  )
}
