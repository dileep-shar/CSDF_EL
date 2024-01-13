import React, { useEffect, useState } from "react";import Report from "./Reports/Reports"
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Documents from "./Documents";
import Navbar from "./Navbar";
import Upload from "./Upload";
const Analyse=()=>{
    const [user, loading, err] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [user]);
  useEffect(() => {
    
  }, []);
return <div>
<Navbar/>
<Report email={user.email}/>
</div>
}
export default Analyse;