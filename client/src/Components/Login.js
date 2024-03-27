import React, { useEffect, useState } from "react";
import { auth, signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import docker from "../assets/docker.png"
import axios from "axios";

export default function Login() {
  const [user, loading, err] = useAuthState(auth);
  const [checked, setchecked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if(user){
      registerUser();
      navigate("/user")
    }
  }, [user]);


  async function registerUser() {
    try{
  let res=await axios.post("/user/register",{
    name:user.displayName,
        email:user.email
  })
  console.log(res)
}
catch(err){
  console.log(err);
}
  }

  async function handleLogin() {
    await signInWithGoogle();
  }
  return <div class="h-screen relative py-16 bg-gradient-to-br from-sky-50 to-gray-200">  
    <div class="relative container m-auto px-10 mt-20 text-gray-500  xl:px-40 xl:mt-40">
        <div class="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div class="rounded-xl bg-white shadow-xl">
                <div class="p-6 sm:p-16">
                    <div class="space-y-4">
                        <img src={docker} loading="lazy" class="w-10" alt="tailus logo"/>
                        <h2 class="mb-8 text-2xl text-cyan-900 font-bold">Log in to scan your<br/> Docker Images.</h2>
                    </div>
                    <div class="mt-16 grid space-y-4">
                        <button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100" onClick={handleLogin}>
                            <div class="relative flex items-center space-x-4 justify-center">
                                <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" class="absolute left-0 w-5" alt="google logo"/>
                                <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Sign in with Google</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}
