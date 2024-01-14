import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
export default function Graph({graphInfo,graphType}) {
  const [graph, setGraph] = useState(()=><div></div>);

  useEffect(()=>{
    handleDataChange()
  },[graphType,graphInfo])

  useEffect(()=>{

  },[graph])
  async function handleDataChange() {
    if(!graphInfo||!graphInfo.series||!graphInfo.labels)return
    fetchGraphData();
  }
  let graphs={
    // "Bar":(graphData)=><Chart options={graphData.options} series={graphData.series} labels={graphData.labels} type="bar" />,
    "Pie":(graphData)=><Chart  options={graphData.options} series={graphData.series} labels={graphData.labels} type="pie"  />,
    "Donut":(graphData)=><Chart options={graphData.options} series={graphData.series} labels={graphData.labels} type="donut" />,
  }
  function fetchGraphData() {
    let tmp = {
      options: {
        labels: graphInfo.labels,
      },
      series: graphInfo.series,
      labels: graphInfo.labels,
    };
    loadGraph(tmp);
  }
  const loadGraph = (graphData) => {
    try {
      if (graphData == null || graphData.length == 0) return;
      setGraph(()=> <div>
        <div style={{ width: "50%" }}></div>
        {graphs[graphType](graphData)}
        </div>);
    } catch (err) {
    }
  };
  return graph
  
}
