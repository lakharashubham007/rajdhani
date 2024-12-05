import React from 'react';

const BillCard = ({ ind, val, handleGetBillData }) => {
  return (
    <div
      className="bill-card"
      style={{
        width: "200px",
        margin: '12px',
        padding: "0",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        height: "130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
      onClick={() => handleGetBillData(val?._id)}
    >
      {/* Header */}
      <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
        <h5 style={{ margin: "0", fontSize: "14px", fontWeight: "bold" }}>
          Bill {ind + 1}
        </h5>
        <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#555" }}>
        {val?.bill_doc ? val.bill_doc.slice(0, 20) : "No Document"}
        </p>
      </div>

      {/* Details */}
      <div style={{ padding: "10px" }}>
        <p
          style={{
            margin: "0",
            fontSize: "12px",
            color: "#333",
          }}
        >
          <strong>Bill No.:</strong> {val?.bill_no || "N/A"}
        </p>
        <p
          style={{
            margin: "5px 0 0",
            fontSize: "12px",
            color: "#333",
          }}
        >
          <strong>Date:</strong> {val?.bill_date || "N/A"}
        </p>
      </div>

      {/* Download Button */}
      <button
        className="download-btn"
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "3px",
          padding: "5px 10px",
          fontSize: "12px",
          cursor: "pointer",
        }}
        onClick={() => console.log(`Downloading bill: ${val?.bill_doc}`)}
      >
        <i className="fa-solid fa-download"></i> 
      </button>
    </div>
  );
};

export default BillCard;


// import React from 'react';

// const BillCard = ({ ind, val, handleGetBillData }) => {
//   return (
//     <button
//       className="bill-card-btn"
//       onClick={() => handleGetBillData(val?._id)}
//       style={{
//         width: "200px",
//         margin: "10px",
//         padding: "0",
//         border: "1px solid #ddd",
//         borderRadius: "5px",
//         backgroundColor: "#fff",
//         boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//         textAlign: "left",
//         overflow: "hidden",
//         height: "130px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//     >
//       {/* Header */}
//       <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
//         <h5 style={{ margin: "0", fontSize: "14px", fontWeight: "bold" }}>
//           Bill {ind + 1}
//         </h5>
//         <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#555" }}>
//           {val?.bill_doc || "No Document"}
//         </p>
//       </div>

//       {/* Details */}
//       <div style={{ padding: "10px" }}>
//         <p
//           style={{
//             margin: "0",
//             fontSize: "12px",
//             color: "#333",
//           }}
//         >
//           <strong>Amount:</strong> ₹{val?.bill_amount || "N/A"}
//         </p>
//         <p
//           style={{
//             margin: "5px 0 0",
//             fontSize: "12px",
//             color: "#333",
//           }}
//         >
//           <strong>Date:</strong> {val?.bill_date || "N/A"}
//         </p>

        
//       </div>

       
//     </button>
//   );
// };

// export default BillCard;








// import React from 'react';

// const BillCard = ({ind, val,handleGetBillData}) => {

//   return (
//     <button className='bill-card-btn' onClick={()=>handleGetBillData(val?._id)}>
//     <div className="bill-card">
//       <div className="bill-header">
//         <h2>Bill Summary {ind + 1}</h2>
//         <p className="pb-0 mb-0">{val?.bill_doc}</p>
//         <p className="pb-0 mb-0">{val?.bill_id}</p>
//       </div>
//       <div className="bill-details">
//       </div>
//       {/* <div className="bill-total">
//         <p>Total: <span>${total.toFixed(2)}</span></p>
//       </div> */}
//       <div className="bill-footer">
//         <p>Thank you for your business!</p>
//       </div>
//     </div>
//     </button>
//   );
// }

// export default BillCard;
