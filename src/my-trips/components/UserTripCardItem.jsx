import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
  return (
    <Link to={'/view-trip/'+ trip?.id}>
    <div className='text-black hover:scale-105 transition-all '>
        <img src='/place.jpeg' className="object-cover rounded-xl hover:shadow-md h-[220px]"/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
            <h2 className='text-gray-400 text-sm'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
        </div>

    </div>
    </Link>
  )
}

export default UserTripCardItem