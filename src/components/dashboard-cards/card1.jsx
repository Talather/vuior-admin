import React from "react";

const GreenCard = () => {
  return (
    <div
      style={{
        backgroundColor: "#1abc9c", // Green color
        borderRadius: "12px",
        padding: "20px",
        color: "#fff",
        width: "300px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ marginBottom: "35px", fontSize: "24px", fontWeight: "bold" }}>
        Total Payments Processed
      </div>
      <div
        style={{
          fontSize: "36px",
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
            backgroundColor: "#16a085", // Darker green for badge
            padding: "5px 10px",
            borderRadius: "8px",
          }}
        >
          +15.2%
        </span> */}
      </div>
      {/* <div style={{ marginTop: "10px", fontSize: "14px" }}>
        Data obtained for the last 7 days from 5,567 visitors to 7,525 visitors.
      </div> */}
      <div
        style={{
          height: "6px",
          backgroundColor: "#fff",
          borderRadius: "3px",
          marginTop: "15px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "6px",
            width: "80%",
            backgroundColor: "#16a085", // Progress bar
          }}
        ></div>
      </div>
      <div style={{ marginTop: "10px", fontSize: "12px" }}>1,345 today</div>
    </div>
  );
};

export default GreenCard;
