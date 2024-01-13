import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Documents from "./Documents";
import Navbar from "./Navbar";
import Upload from "./Upload";

export default function Home() {
  const [user, loading, err] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [user]);
  useEffect(() => {
    
  }, []);


  return <div class="bg-gray-200 h-screen"><Navbar/>
<Upload email={user.email}/>
</div>
}
