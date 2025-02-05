import React from 'react'
import PlaceCradItem from './PlaceCradItem'

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places To Visit</h2>

      <div className='mt-5'>
        {Object.keys(trip.tripData?.itinerary || {})
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) // Sort day1, day2, day3 properly
          .map((dayKey, index) => {
            const dayData = trip.tripData.itinerary[dayKey]; // Get data for each day
            return (
              <div key={index}>
                <h2 className='font-medium font-semibold uppercase text-lg'>{dayKey}</h2>
                <div className='grid md:grid-cols-2 gap-12 mb-2'>
                {dayData.places?.map((place, index) => (
                  <div key={index}className=''>
                    {/* <h2>{place.time || "Anytime"}</h2> Check if time exists */}
                    <PlaceCradItem place={place} />
                    
                  </div>
                ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
