import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../config'
import {Swiper,SwiperSlide} from 'swiper/react' 
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'


export default function Listing() {
    SwiperCore.use([Navigation]);
    const[listing,setListing]= useState(null)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(false)
    const params= useParams()
    useEffect(()=>{
        const fetchListing= async()=>{
            try {
                setLoading(true)
                const res= await fetch(`${API_BASE_URL}/api/listing/get/${params.listingId}`)
                const data= await res.json();
                if(data.success===false){
                    setError(true)
                    setLoading(false)
                    return;
                }
                setListing(data)
                setLoading(false)
                setError(false)
               
            } catch (error) {
                setError(true)
                setLoading(false)
            }
          
        }
        fetchListing()
    },[params.listingId])
  return (
 <main>
    {
        loading && <p className='text-center my-7 text'>Loading...</p>

    }
    {
        error && <p className='text-center my-7 text-2xl'>Something went wrong</p>

    }
    {
        listing && !loading && !error &&
       (
        <div>
        <Swiper navigation>
          {listing.images.map((url) => (
            <SwiperSlide key={url}>
              <div
                className='h-[550px] mx-20 my-5'
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: 'cover',  // You can control the background size here
                  maxWidth: '100%',  // Set the maximum width
                  maxHeight: '400px', // Set the maximum height
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
       )
        
    }
 </main>
  )
}
