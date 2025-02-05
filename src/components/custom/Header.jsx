import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog.jsx";
import axios from "axios";


function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDailog, setOpenDailog] = useState(false);
  const login=useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error(error)
  })

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
      window.location.reload()
    })
  }
  // const navigation=useNavigation();
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="top-0 left-0 w-full bg-white shadow-sm z-50 p-4  flex justify-between items-center px-5">
      <a href="/"><img src="/logos.jpeg" alt="Logo" className="h-12 w-15 rounded-full" /></a>
      {/* <h2 className="font-serif text-pretty text-3xl font-bold ">TRIP--SAATHI </h2> */}
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
            <Button variant="outline" className="rounded-full text-black">Create Trip</Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full text-black">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger><img
              src={user?.picture}
              className="h-[35px] w-[35px] rounded-full"/></PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();


                }}>LogOut</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={()=>setOpenDailog(true)}>Sign In</Button>
        )}
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
  );
}

export default Header;

