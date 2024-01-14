import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Navbar from "./Navbar";
import f1 from "../dummy_json/1.json"
import f2 from "../dummy_json/2.json"
import f3 from "../dummy_json/3.json"
import { JSONGrid } from '@redheadphone/react-json-grid'
import Dropdown from "react-dropdown";

const DeepAnalyse=()=>{
    const [user, loading, err] = useAuthState(auth);
    const reports=[f1,f2,f3]
  const navigate = useNavigate();
  const [sqlData, setsqlData] = useState([]);
  let [type,setType]=useState("")

  let viewType={
    "Options":reports.map(report=>report.image_name)
  };
  const handleOnChangeForViewType = (option) => {
    setType(option.value);
  };


  async function handleSubmitClick() {
    let curReport;
    for (let report of reports){
      if(report.image_name==type){
        curReport=[report];
      }
    }
    setsqlData(curReport);
  }
  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [user]);
  useEffect(() => {
  }, []);

return <div>
<Navbar/>
<div className=" flex flex-grow">
        <div className=" z-10 absolute left-0 right-0 w-full h-full md:w-60%  xl:relative flex  flex-col xl:w-1/5 my-4 py-4 bg-slate-100 px-4 rounded-2xl shadow-xl border border-slate-400 ">
          <div id="dropdown-adder" className="flex flex-col justify-center mt-4 w-full self-center ">
          <Dropdown
          className=" mb-1"
          options={viewType["Options"]}
          placeholder={"Select Image"}
          onChange={(option) => handleOnChangeForViewType(option)}
        />
          </div>
          <div className=" flex  justify-center items-center">
            <button
              className=" w-full bg-sky-700 text-white py-2.5 rounded-lg hover:bg-sky-600 hover:animate-pulse"
              onClickCapture={handleSubmitClick}
            >
              Fetch Data
            </button>
          </div>
        </div>
        <JSONGrid data={sqlData}/>
</div>

</div>
}
export default DeepAnalyse;