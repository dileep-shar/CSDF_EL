import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, fetchUserType } from "../../firebase";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import Dropdown from "react-dropdown";
import "./Dropdown.css";
import * as XLSX from "xlsx";
import Graph from "./Graph";
import Table from "./Table";
import jsPDF from "jspdf";
import PieChartIcon from '@mui/icons-material/PieChart';
import CloseIcon from "@mui/icons-material/Close";
import TableRowsIcon from '@mui/icons-material/TableRows';
import * as FilterFunctions from "./FilterFunctions";


const Reports = ({ email,reports }) => {

  
  const [sqlData, setsqlData] = useState([]);
  const [packageOptions,setPackageOptions]=useState([]);
  const [barCharCol, setBarChartCol] = useState(["Vulnerability Severity Analysis"]);
  const [graphInfo,setGraphInfo]=useState({});
  const [image, setImage] = useState("");
  const [filterType,setFilterType]=useState("")
  const [packages,setPackages]=useState("")
  const [graphType, setGraphType] = useState("Pie");
  const [lOrR, setLOrR] = useState(0)
  const graphTypes = [
    "Donut",
    "Pie",
  ];
  let viewType={
    "Options":reports?.map(report=>report.image_name),
    "Filters":["Basic Info","OS Data","Creation History","Packages","Vulnerabilities"]
  };
  let filterFunctionMapping={
    "Basic Info":(report)=>FilterFunctions.BasicInfo(report),
    "OS Data":(report)=>FilterFunctions.OSInfo(report),
    "Creation History":(report)=>FilterFunctions.CreationHistory(report),
    "Packages":(report)=>FilterFunctions.Packages(report),
    "Vulnerabilities":(report,packages)=>FilterFunctions.Vulnerabilities(report,packages)
    
  }
  const handleOnChangeForViewType = (option) => {
    setImage(option.value);
  };
  const handleOnChangeForFilterType=(option)=>{
    setFilterType(option.value)
  }
  const handleOnChangeForPackageType=(option)=>{
    setPackages(option.value)
  }
  useEffect(()=>{
    if(!reports)return;
  },[reports])
  useEffect(() => {
    let curReport;
    for (let report of reports){
      if(report.image_name==image){
        curReport=report;
      }
    }
    let data=curReport?.data?.Results?.map(result=>result.Target);
    if(data)
      setPackageOptions(data)
  }, [image])
  useEffect(() => {
  generateGraph();
  }, [graphType,graphInfo])
  async function handleSubmitClick() {
    if(!image||!filterType)return;
    let curReport;
    for (let report of reports){
      if(report.image_name==image){
        curReport=report;
      }
    }
    let tableData;
    if(filterType!="Vulnerabilities"){
    tableData=filterFunctionMapping[filterType](curReport.data)
    }
    else{
    tableData=filterFunctionMapping[filterType](curReport.data,packages)
    }
    setsqlData(tableData);
  }

  function handelesetLOrR(val){
    if (lOrR == 0) setLOrR(val);
    else setLOrR(0);
  }
  function generateXL() {
    console.log("here")
    let temp = sqlData;
    // temp = [{}].concat(temp);
    let worksheet;
     worksheet = XLSX.utils.json_to_sheet(temp,{ origin: 'A2' });
     XLSX.utils.sheet_add_aoa(worksheet, [[filterType]], { origin: 'A1' });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, image+" "+filterType+".xlsx");
  }

  const generateGraph=()=>{
    let curReport;
    for (let report of reports){
      if(report.image_name==image){
        curReport=report;
      }
    }
    if(!curReport)return
    let temp1;
    curReport?.data?.Results?.forEach(result=>{
        if(result.Target==packages){
            temp1=result?.Vulnerabilities
        }
    })
    if(!temp1)return 
    temp1=temp1?.map(x=>x.Severity)
    let occurrencesCount={}
    temp1.forEach(occurrence => {
      if (occurrencesCount[occurrence]) {
        occurrencesCount[occurrence]++;
      } else {
        occurrencesCount[occurrence] = 1;
      }
    });
    setGraphInfo({
      "series":Object.values(occurrencesCount),
      "labels":Object.keys(occurrencesCount)
    })
  }

  useEffect(() => {}, [email]);

  return (
    <div className=" flex flex-col h-screen">
      <div className=" grid  grid-cols-2 justify-items-center w-full xl:hidden ">
        <button
          className=" bg-gray-200 py-2 self-center w-full border-r-2 border-black hover:bg-gray-600  hover:text-white"
          onClickCapture={() => handelesetLOrR(1)}
        >
          { lOrR== 1 ? <CloseIcon /> : <TableRowsIcon />}
          All Projects
        </button>
        <button
          className=" bg-gray-200 py-2 self-center w-full  border-black hover:bg-gray-600  hover:text-white"
          onClickCapture={() => handelesetLOrR(2)}
        >
          {lOrR == 2 ? <CloseIcon /> : <PieChartIcon />}
           ChartGenerator
        </button>
      </div>
      <div className=" flex flex-grow">
      {(lOrR == 1 ||
          window.matchMedia("(min-width: 1280px)").matches) && ( 
        <div className=" z-10 absolute left-0 right-0 w-full h-full md:w-60%  xl:relative flex  flex-col xl:w-1/5 my-4 py-4 bg-slate-100 px-4 rounded-2xl shadow-xl border border-slate-400 ">
          <div id="dropdown-adder" className="flex flex-col justify-center mt-4 w-full self-center ">
          <Dropdown
          className=" mb-1"
          options={viewType["Options"]}
          placeholder={"Select Image"}
          onChange={(option) => handleOnChangeForViewType(option)}
        />
        <Dropdown
          className=" mb-1"
          options={viewType["Filters"]}
          placeholder={"Select Filter"}
          onChange={(option) => handleOnChangeForFilterType(option)}
        />
        <Dropdown
          className=" mb-1"
          options={packageOptions}
          placeholder={"Select Package"}
          onChange={(option) => handleOnChangeForPackageType(option)}
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
        </div>)}

        <div className="flex flex-col mx-4 overflow-x-auto flex-grow p-2 w-3/5">
        <h3 className=" w-full p-2 my-2 mx-1 text-center">{filterType}</h3>
          <Table data={sqlData} />
          {sqlData != null && sqlData.length != 0 ? (
            <div className=" grid grid-cols-2 w-full gap-1">
            <button
              className=" px-4 py-2 bg-gray-300 mx-2 w-full hover:bg-gray-500 hover:text-white"
              onClickCapture={generateXL}
            >
              Convert To XL
            </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {(lOrR == 2 ||
          window.matchMedia("(min-width: 1280px)").matches) && ( 
        <div className=" absolute left-0 right-0 h-full  xl:relative w-full xl:w-[40rem] my-4 mx-2 flex flex-col py-4 bg-slate-100 px-4 rounded-2xl shadow-xl border border-slate-400">
          <Dropdown
            className=" mb-1"
            options={barCharCol}
            placeholder="Vulnerability Severity Analysis"
            onChange={(option) => {}}
          />
          <Dropdown
            className=" mb-1"
            options={graphTypes}
            placeholder={"Pie"}
            onChange={(option) => setGraphType(option.value)}
          />
          <button
            className="  py-2 bg-gray-300  w-full"
            onClickCapture={generateGraph}
          >
            Generate Graph
          </button>
          <h3 className=" text-center w-full p-2 my-2 mx-1">Vulnerability Severity Analysis</h3>
          <div className=" border-2 rounded-2xl my-2 border-black py-4  ">

            <Graph
              graphInfo={graphInfo}
              graphType={graphType}
            />{" "}
            : <div />
          </div>
        </div>)}
      </div>
    </div>
  );
};
export default Reports;
