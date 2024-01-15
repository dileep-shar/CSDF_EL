import React, { useEffect, useState } from "react";import Report from "./Reports/Reports"
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Navbar from "./Navbar";

const Analyse=()=>{
    const [user, loading, err] = useAuthState(auth);
  const navigate = useNavigate();
  const [reports,setReports]=useState([])
  
  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    fetchImages()
  }, [user]);
const fetchImages=async ()=>{
  const res=await axios.post("/user/fetchAllImages",{
    email:user.email
  })  
  setReports(res?.data?.reports)
  console.log(res.data.reports);
}
return <div>
<Navbar/>
{
 <Report email={user?.email} reports={reports}/>
}
</div>
}
export default Analyse;