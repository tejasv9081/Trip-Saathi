import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import axios from 'axios';
import { Button } from '../components/ui/Button';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '../constants/options';
//import { toast } from '../components/ui/sonner.jsx';
import { toast } from 'sonner'; 
import { chatSession } from '../service/AIModal';
import { FcGoogle } from "react-icons/fc";
import { db } from '../service/firebaseconfig.jsx';
import { doc, setDoc } from "firebase/firestore"; 

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "../components/ui/dialog.jsx";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [openDailog, setOpenDailog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const handleFormChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login=useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error(error)
  })
  const onGenerateTrip =async() => {
    const user=localStorage.getItem('user');
    if(!user){
      setOpenDailog(true)
      return;
    }

    if (formData?.noOfDays > 5&&!formData?.location||!formData?.budget||!formData?.traveler) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}', formData?.location)
    .replace('{totalDays}', formData?.noOfDays)
    .replace ('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)
    
    //console.log(FINAL_PROMPT) ;

    const result= await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text())
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip=async(TripData)=>{   
      setLoading(true);
      const user=JSON.parse(localStorage.getItem('user'));
      const docId=Date.now().toString()


      await setDoc(doc(db, "AiTrips", docId), {
        userSelection:formData,
        tripData:JSON.parse(TripData),
        userEmail:user?.email,
        id:docId
      });
      setLoading(false);
      navigate('/view-trip/'+docId);

  }
  
  const GetUserProfile= (tokeninfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokeninfo?.access_token}`,
        Accept:'Application/json'
      }

    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false)
      onGenerateTrip();
    })
  }
  const handleQueryChange = async (value) => {
    setQuery(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${encodeURIComponent(value)}&apiKey=TXBjuGdtpRWIBU3J2PELPGIq5Bhi5sBlM2EsELJiOLo`
      );
      const data = await response.json();
      setSuggestions(data.items || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-40 mt-5">
      <h2 className="font-bold font-serif text-3xl sm:text-4xl">
        Tell us your travel preferences 🌴🏕️
      </h2>
      <p className="mt-3 text-gray-500 text-lg sm:text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-10 flex flex-col gap-7">
        <div>
          <h2 className="text-lg sm:text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <div className="relative">
            <Input
              type="text"
              placeholder="Type your destination..."
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto w-full">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery(suggestion.title);
                      setSuggestions([]);
                      handleFormChange("location", suggestion.title);
                    }}
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            onChange={(e) => handleFormChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl my-3 font-medium">
            What is your Budget?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleFormChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget === item.title && "shadow-md border-black"
                }`}
              >
                <h2 className="text-3xl md:text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-md md:text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl my-3 font-medium">
            Who are you traveling with?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleFormChange("traveler", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.traveler === item.people && "shadow-md border-black"
                }`}
              >
                <h2 className="text-3xl md:text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-md md:text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-8 flex justify-end">
          <Button 
          disabled={loading}
          onClick={onGenerateTrip}>
            {loading?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>: 'Generate Trip'
            }
            
            </Button>
        </div>
        <Dialog open={openDailog}>
          
          <DialogContent>
            <DialogHeader>
              
              <DialogDescription>
                <img src="/logo.svg"/>
                <h2 className='text-lg font-bold mt-7 '>Sign in With Google</h2>
                <p>Sign in to the App With Google Authentication Securely.</p>
                <Button
                 
                onClick={login}
                className=" w-full mt-5 flex gap-4 items-center"> 
                
                <FcGoogle className='h-10 w-10'/>
                Sign in With Google 
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
