import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, fetchUserType } from "../../firebase";
import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "./Dropdown.css";
import * as XLSX from "xlsx";
import Graph from "./Graph";
import Table from "./Table";
import jsPDF from "jspdf";
import PieChartIcon from '@mui/icons-material/PieChart';
import CloseIcon from "@mui/icons-material/Close";
import TableRowsIcon from '@mui/icons-material/TableRows';

const Reports = ({ email }) => {
  let viewType,
    firstOption,
    queryFunctions = {
      Student: async (queryType) =>
        await axios.post("/student/get_students_report", {
          data: {
            query: queryType,
            email: email,
          },
        }),
      Professor: async (queryType) =>
        await axios.post("/professor/get_professor_report", {
          data: {
            query: queryType,
            email: email,
          },
        }),
      Project: async (queryType) =>
        await axios.post("/project/get_projects_report", {
          data: {
            query: queryType,
            email: email,
          },
        }),
    };
    viewType = {
      Options: ["Project"],
      Project: ["Projects This Student is Working On", "List Of Projects"],
    };
    firstOption = "Project";



  const [reRender, shouldReRender] = useState(0);
  const [queryType, setqueryType] = useState("");
  const [sqlData, setsqlData] = useState([]);
  const [isSQLQuery, setisSQLQuery] = useState(false);
  const [sqlQuery, setsqlQuery] = useState("");

  const [barCharCol, setBarChartCol] = useState([]);
  const [barData1, setBarData1] = useState("");
  const [barData2, setBarData2] = useState("");
  const [type, settype] = useState(firstOption);
  const [graphType, setGraphType] = useState("Pie");
  const [lOrR, setLOrR] = useState(0)
  const graphTypes = [
    // "Bar",
    "Donut",
    "Pie",
  ];

  const handleOnChangeForViewType = (option) => {
    settype(option.value);
    setqueryType("");
  };

  const handleOnChangeForQueryType = (option) => setqueryType(option.value);
  // const handleOnChangeForSwitch = () => setisSQLQuery(!isSQLQuery);
  const handleSqlQueryChange = (quer) => setsqlQuery(quer.target.value);

  async function handleSubmitClick() {
    if (isSQLQuery) {
      const tempData = await axios.post("/project/sql_query", {
        data: {
          query: sqlQuery,
        },
      });
      setsqlData(tempData.data.data);
      setBarData1("");
      setBarData2("");
      setBarChartCol(Object.keys(tempData.data.result[0]));
      return;
    }
    // console.log(queryFunctions[type])
    const tempData = await queryFunctions[type](queryType);
    setsqlData(tempData.data.result);
    setBarData1("");
    setBarData2("");
    setBarChartCol(Object.keys(tempData.data.result[0]));
  }

  function handelesetLOrR(val){
    if (lOrR == 0) setLOrR(val);
    else setLOrR(0);
  }
  function generateXL() {
    let temp = sqlData;
    // temp = [{}].concat(temp);
    let worksheet;
  

     worksheet = XLSX.utils.json_to_sheet(temp,{ origin: 'A2' });
     XLSX.utils.sheet_add_aoa(worksheet, [[queryType]], { origin: 'A1' });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, queryType+".xlsx");
  }

  function generatePDF() {
    var doc = new jsPDF("p", "pt");
    doc.text(20, 20, "College Project Management System");
    doc.setFont("helvetica");
    // doc.setFontType("normal");
    doc.text(20, 60, sqlData);

    doc.save("sample-file.pdf");
  }

  const generateGraph = () => {
    if (!barData1 || !barData2) return;
    shouldReRender(reRender + 1);
  };

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
          <div className="flex flex-col justify-center mt-4 w-full self-center ">
            <Dropdown
              className=" mb-1"
              options={viewType["Options"]}
              placeholder={firstOption}
              onChange={(option) => handleOnChangeForViewType(option)}
            />
            <Dropdown
              className=" mb-1"
              options={viewType[type]}
              onChange={(option) => handleOnChangeForQueryType(option)}
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
        <h3 className=" w-full p-2 my-2 mx-1 text-center">{queryType}</h3>
          <Table data={sqlData} />
          {sqlData != null && sqlData.length != 0 ? (
            <div className=" grid grid-cols-2 w-full gap-1">
            <button
              className=" px-4 py-2 bg-gray-300 mx-2 w-full hover:bg-gray-500 hover:text-white"
              onClickCapture={generateXL}
            >
              Convert To XL
            </button>
            <a
              className=" px-4 py-2 bg-gray-300 mx-2 w-full text-black text-center hover:underline hover:bg-gray-500 hover:text-white"
              href={`https://mail.google.com/mail/u/${email}/?fs=1&tf=cm&su=${queryType} Excel file`}
              target="_blank"
            >
              Mail XL File
            </a>
            </div>
          ) : (
            <></>
          )}
        </div>
        {(lOrR == 2 ||
          window.matchMedia("(min-width: 1280px)").matches) && ( 
        <div className=" absolute left-0 right-0 h-full  xl:relative w-full xl:w-[40rem] my-4 mx-2 flex flex-col py-4 bg-slate-100 px-4 rounded-2xl shadow-xl border border-slate-400">
          <Dropdown
            className=" mb-1"
            options={barCharCol}
            onChange={(option) => setBarData1(option.value)}
          />
          <Dropdown
            className=" mb-1"
            options={barCharCol}
            onChange={(option) => setBarData2(option.value)}
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
          <h3 className=" text-center w-full p-2 my-2 mx-1">{queryType}</h3>
          <div className=" border-2 rounded-2xl my-2 border-black py-4  ">

            <Graph
              data={sqlData}
              xCol={barData1}
              yCol={barData2}
              reRender={reRender}
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
