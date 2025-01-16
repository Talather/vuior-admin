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
        padding: "17px",
        color: "#333",
        width: "95%",
        maxWidth: "400px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: "10px", fontSize: "20px", fontWeight: "bold" }}>
        Pending Transactions
      </div>

      {/* Subtitle */}
     
      <div
        style={{
          fontSize: "26px",
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
          <div className="flex flex-row justify-around ">
      <div style={{ width: "100%", height: "107px" ,backgroundColor:'rd',marginTop:"2vh"}}>
        <ResponsiveContainer>
          {/* <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Patients" fill="#1abc9c" radius={[10, 10, 0, 0]} />
          </BarChart> */}
                   <BarChartExample />
        </ResponsiveContainer>
              </div>

              <div className="text-md text-gray-5 mr-7 ml-6 mt-7"><p>Increase in Data by 500 transactions in the last 7 days.</p></div>
              </div>
    </div>
  );
};

export default BarChartCard;
