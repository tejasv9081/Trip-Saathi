import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { db } from '../service/firebaseconfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigation=useNavigation();
    const[userTrips,setUserTrips]=useState([]);

    useEffect(() =>{
        GetUserTrips();
    },[])
    
    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            navigation('/');
            return;
        }
        setUserTrips([]);
        const q=query(collection(db,'AiTrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal=>[...prevVal,doc.data()])
        });
    }

  return (
    <div className='px-5 sm:px-10 md:px-20 lg:px-32 xl:px-40 mt-5'>
        <h2 className='font-bold text-3xl font-serif'>My Trips</h2>

        <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
            {userTrips?.length>0?userTrips.map((trip,index) =>(
                <UserTripCardItem trip={trip}  key={index}/>

            ))
            :[1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>


                </div>
            ))
        }
        </div>

    </div>
  )
}

export default MyTrips