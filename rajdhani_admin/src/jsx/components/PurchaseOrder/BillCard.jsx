import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DownloadBill } from '../../../services/apis/purchaseOrderBillApi';

const BillCard = ({ ind, val, handleGetBillData }) => {
   const navigate = useNavigate();


  //  const handleDownloadBill=async(id)=>{
  //   try{
  //    const res = await DownloadBill(id);
  //      console.log("download",res?.data);

  //   }catch(err){
  //    console.log(err)
  //   }
  //  }

  const handleDownloadBill = async (id) => {
    try {
      const res = await DownloadBill(id); // This will fetch the file with the filename in the response body
      
      // console.log("reeee",res)  
      // console.log("File download response:", res);
      // Assuming the response data contains a file and filename in JSON format
      const fileData = res.data.fileContent; // The actual file content
      const filename = res.data.data.fileName; // The filename from the response body
      // Create a Blob object from the file data (assuming fileData is the binary data or a base64 string)
      const fileBlob = new Blob([fileData], { type: res.headers['content-type'] });
      // Create a link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(fileBlob); // Create a URL for the Blob
      link.setAttribute('download', filename); // Set the download attribute to the filename
      // Append the link to the body (it won't be visible)
      document.body.appendChild(link);
      // Programmatically trigger a click on the link to start the download
      link.click();
      // Clean up by removing the link element after triggering the download
      document.body.removeChild(link);
    } catch (err) {
      console.log("Error during file download:", err);
    }
  };
  

  return (
    <div className="bill-card" >
      {/* Header */}
      <div onClick={() => handleGetBillData(val?._id)}>
      <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
        <div className='d-flex justify-content-between'>
        <div>
        <h5 style={{ margin: "0", fontSize: "14px", fontWeight: "bold" }}>
          Bill {ind + 1}
        </h5>
        <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#555" }}>
        {val?.bill_doc ? val.bill_doc.slice(0, 20) : "No Document"}
        </p>
        </div>
        <button className="btn btn-xs sharp btn-primary"
          onClick={() => navigate(`/billview/${val?._id}`)}>
         <i className="fa-solid fa-eye"></i>
        </button>
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: "10px" }}>
        <p style={{
            margin: "0",
            fontSize: "12px",
            color: "#333",
          }}>
          <strong>Bill No.:</strong> {val?.bill_no || "N/A"}
        </p>
        <p style={{
            margin: "5px 0 0",
            fontSize: "12px",
            color: "#333",
          }}>
          <strong>Date:</strong> {val?.bill_date || "N/A"}
        </p>
      </div>
      </div>
      {/* Download Button */}
      <button
        className="download-btn"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "30px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "3px",
          padding: "6px 12px",
          fontSize: "12px",
          cursor: "pointer",
        }}
        onClick={() => handleDownloadBill(val?.bill_no)}>
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
