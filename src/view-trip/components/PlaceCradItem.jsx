import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCradItem({ place }) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank'>
      <div className='w-[420px] h-[160px] rounded-xl text-black p-3 border mt-1 flex gap-3 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src="/placeholder.jpeg" className='w-[100px] h-[100px] rounded-lg object-cover' alt={place.placeName} />
        
        <div className="flex flex-col justify-between w-full">
          <h2 className='font-bold text-base '>{place.placeName}</h2>
          <p className='text-sm text-gray-500 line-clamp-3'>{place.placeDetails}</p>
          <h2 className='text-xs text-gray-600'>🕙 {place.travelTime}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCradItem
