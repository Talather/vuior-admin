'use client';
import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import BarChartExample from "../dashboard-cards/chart";

const data = [
  { name: "Mon", Patients: 800 },
  { name: "Tue", Patients: 950 },
  { name: "Wed", Patients: 792 },
  { name: "Thu", Patients: 523 },
  { name: "Fri", Patients: 501 },
  { name: "Sat", Patients: 493 },
  { name: "Sun", Patients: 700 },
];

const BarChartCard = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "15px",
        color: "#333",
              width: "25vw",
        height:"25vh",
        // maxWidth: "340px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Title */}
      <div style={{  color:"#10a37f",marginBottom: "20px", fontSize: "27px", fontWeight: "bold" }}>
        Total Credits Distributed
      </div>

      {/* Subtitle */}
     
      <div
        style={{
          fontSize: "34px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        10,525
        {/* <span
          style={{
            fontSize: "16px",
            marginLeft: "10px",
            backgroundColor: "#93E9BE", // Darker green for badge
            padding: "5px 10px",
            borderRadius: "8px",
          }}
        >
          +15.2%
        </span> */}
          </div>
          



          {/* Bar Chart */}
          {/* <div className="mt-5">
          <div className="flex flex-row justify-around p-3 ">
             
              <CircularIconBox />
              <div className="mt-3">
                  <p>General Room</p>
              </div>
              <div className="mt-3">
              <p >110</p></div>



        



          </div> */}
          {/* <hr  className=''width="95%" size={10}> */}
          {/* <hr class="border-t border-gray-300 my-1"></hr>

          <div className="flex flex-row justify-around  p-4">
              <CircularIconBox />
              <div className="mt-3">
                  <p>General Room</p>
              </div>
              <div className="mt-3">
              <p >110</p></div>



        </div> */}
      
      
      
      
      </div>
    // </div>
  );
};

export default BarChartCard;


import { MdOutlineAccountBalance } from 'react-icons/md';

const CircularIconBox = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#f0f0f0',  // Change color as needed
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    }}>
      <MdOutlineAccountBalance size={24} color="#333" />  {/* Customize icon size and color */}
    </div>
  );
};