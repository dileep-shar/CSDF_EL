import React, { useEffect, useState } from "react";import Report from "./Reports/Reports"
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Documents from "./Documents";
import Navbar from "./Navbar";
import Upload from "./Upload";
import f1 from "../dummy_json/1.json"
import f2 from "../dummy_json/2.json"
import f3 from "../dummy_json/3.json"

const Analyse=()=>{
    const [user, loading, err] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [user]);
  useEffect(() => {
    methd()
  }, []);
const methd=async ()=>{
  const res=await axios.post("/user/fetchAllImages",{
    email:"karthikpai08@gmail.com"
  })  

  // console.log(res.data.reports)
  let x=JSON.parse(res.data.reports)
  console.log(x)
  console.log(JSON.parse(x[0]))
}
const reports=[f1,f2,f3]
return <div>
<Navbar/>
<Report email={user?.email} reports={reports}/>
</div>
}
export default Analyse;