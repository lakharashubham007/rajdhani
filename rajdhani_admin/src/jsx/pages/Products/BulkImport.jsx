import React, { useEffect, useState } from "react";
import "./BulkImport.css";
import Select from "react-select";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
// import axios from "axios";
import { bulkImportApi } from "../../../services/apis/BulkImportApi";


const fittingThreadOptions = [
  { value: "BSP", label: "BSP (B)", code: "B", dsc_code: "BSP" },
  { value: "BSP O", label: "BSP ORING (BO)", code: "BO", dsc_code: "BSPO" },
  { value: "JIC", label: "JIC (J)", code: "J", dsc_code: "JIC" },
  { value: "ORFS", label: "ORFS (O)", code: "O", dsc_code: "ORFS" },
  { value: "KOMATSU", label: "KOMATSU (K)", code: "K", dsc_code: "KOMATSU" },
  { value: "METRIC", label: "METRIC", code: "M", dsc_code: "M" },
  { value: "NPT", label: "NPT (NPT)", code: "NPT", dsc_code: "NPT" },
  { value: "JIS", label: "JIS (BSP C-TYPE) (BJ)", code: "BJ", dsc_code: "JIS" },
  { value: "SAE 61", label: "FLG CODE 61- 3000 PSI (3)", code: "3", dsc_code: "JIS" },
  { value: "SAE 62", label: "FLG CODE 62- 6000 PSI (6)", code: "6", dsc_code: "FLG61" },
  { value: "BANJO WITHOUT O", label: "BANJO WITHOUT O (BJ)", code: "BJ", dsc_code: "FLG62" },
  { value: "BANJO WITH O", label: "BANJO WITH O (BJO)", code: "BJO", dsc_code: "BANJO" },
  { value: "METRIC THREAD ORFS", label: "METRIC THREAD ORFS (MO)", code: "MO", dsc_code: "M-ORFS" }
];

const ProductOptions = [
  { value: "End Fittings", label: "End Fittings" },
  { value: "Hose Pipe", label: "Hose Pipe" },
  { value: "Hose Assembly", label: "Hose Assembly" },
  { value: "Spring", label: "Spring" },
  { value: "O-ring", label: "O-ring" },
  { value: "Dust Cap", label: "Dust Cap" },
  { value: "Sleeve", label: "Sleeve" },
  { value: "Vinyl Cover", label: "Vinyl Cover" },
  { value: "Packing", label: "Packing" },
  { value: "Tube Fittings", label: "Tube Fittings" },
];

const BulkImport = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setUploadedFile(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please upload a valid Excel file (.xls or .xlsx).',
      });
    }
  };

  // Handle drag-and-drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setUploadedFile(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please upload a valid Excel file (.xls or .xlsx).',
      });
    }
  };

  // Prevent default behavior for drag events
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const [errors, setErrors] = useState('');

useEffect(() => {
    setSelectedThread(null)
},[selectedProduct])

const templateMapping = {
    BSP: {
      fields: [
        "design",
      "drop_length",
      "fitting_dash_size",
      "fitting_piece",
      "fitting_thread",
      "fitting_type",
      "hose_dash_size",
      "mfc",
      "neck_length",
      "product_type",
      "skive_type",
      "straight_bend_angle",
      "variant",
      "wire_type",
      "with_cap"
      ],
      sampleData: [
        {
            design: "R",
            drop_length: "15",
            fitting_dash_size: "1/4\" (04)",
            fitting_piece: "ONE PIECE - 1",
            fitting_thread: "BSP",
            fitting_type: "Male",
            hose_dash_size: "1/4\" (04)",
            mfc: "101",
            neck_length: "15",
            product_type: "End Fittings",
            skive_type: "NON-SKIVE (NS)",
            straight_bend_angle: "BEND 90",
            variant: "Standard",
            wire_type: "BRAIDED (BR) - B",
            with_cap: "With Cap",
        },
      ],
    },
    "BSP O": {
      fields: [
        "design",
        "fitting_thread",
        "fitting_type",
        "hose_dash_size",
        "skive_type",
      ],
      sampleData: [
        {
          design: "R",
          fitting_thread: "BSP O",
          fitting_type: "Female",
          hose_dash_size: "1/4\"",
          skive_type: "NON-SKIVE (NS)",
        },
      ],
    },
    JIC: {
      fields: [
        "design",
        "fitting_thread",
        "neck_length",
        "product_type",
        "variant",
      ],
      sampleData: [
        {
          design: "R",
          fitting_thread: "JIC",
          neck_length: "20",
          product_type: "End Fittings",
          variant: "High Pressure",
        },
      ],
    },
    // Add similar entries for the rest of the thread options...
  };

  
const handleDownload = (withSampleData) => {
    if (!selectedThread) {
    //   alert("Please select a fitting thread type before downloading.");
      Swal.fire({
        icon: 'warning',
        title: 'Oops',
        text: 'Please select a fitting thread type before downloading.!',                        
      })
      return;
    }
  
    // Get the selected thread's template details
    const { fields, sampleData } = templateMapping[selectedThread.value] || {};
  
    if (!fields) {
    //   alert("No template available for the selected fitting thread type.");
      Swal.fire({
        icon: 'warning',
        title: 'Oops',
        text: 'No template available for the selected fitting thread type!',                        
      })
      return;
    }
  
    // Use the sample data or create an empty row for the template
    const data = withSampleData ? sampleData : [{}];
  
    // Create a new workbook and append the data
    const ws = XLSX.utils.json_to_sheet(data, { header: fields });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    // Generate the filename dynamically
    const fileName = `${selectedThread.value}_template.xlsx`;
  
    // Create a download link and trigger the file download
    XLSX.writeFile(wb, fileName);
  };

  // Handle file submission
  const handleSubmit = async () => {
    if (!uploadedFile) {
      Swal.fire({
        icon: "error",
        title: "No File Selected",
        text: "Please upload a file before submitting.",
      });
      return;
    }
console.log("uploadedFile uploadedFile uploadedFile",uploadedFile)
    // const formData = new FormData();
    // formData.append("file", uploadedFile);
    try {
        const response = await bulkImportApi(uploadedFile);
        console.log("Bulk import response:", response);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Import Successful",
          text: response?.data?.message || "Your data has been imported successfully!",
        });
        setUploadedFile(null); // Reset file input
      } else {
        Swal.fire({
          icon: "error",
          title: "Import Failed",
          text: response?.data?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error importing file:", error);
      Swal.fire({
        icon: "error",
        title: "Import Failed",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };
  

  return (
    <div className="bulkcontainer">
      <h1 className="title">Bulk Import</h1>

      <div className="steps-grid">
                {/* Step 1 */}
                <div className="step-card">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2 className="step-title">Step 1</h2>
                        <img
                            src="https://restaurant.idea2reality.tech/public/assets/admin/img/bulk1.png"
                            alt="Logo"
                            style={{ width: '50px', height: '50px' }}
                        />
                    </div>
                    <p className="step-subtitle">Download The Excel File</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
                        <li style={{ listStyleType: 'disc' }}>Select Product.</li>
                        <li style={{ listStyleType: 'disc' }}>Select Product Fitting Type Like BSP, JIS, M ..etc</li>
                        <li style={{ listStyleType: 'disc' }}>Download the format file and fill it with proper data.</li>
                        <li style={{ listStyleType: 'disc' }}>Download the example file to understand how the data must be filled.</li>
                        <li style={{ listStyleType: 'disc' }}>Upload the Excel file.</li>
                    </ul>
                </div>

                {/* Step 2 */}
                <div className="step-card">
                <div className="d-flex align-items-center justify-content-between">
                        <h2 className="step-title">Step 2</h2>
                        <img
                            src="https://restaurant.idea2reality.tech/public/assets/admin/img/bulk2.png"
                            alt="Logo"
                            style={{ width: '50px', height: '50px' }}
                        />
                    </div>
                    <p className="step-subtitle">Match Spreadsheet Data According To Instruction</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
                        <li style={{ listStyleType: 'disc' }}>Fill up the data according to the format.</li>
                        <li style={{ listStyleType: 'disc' }}>Fill values based on given structure.</li>
                    </ul>
                </div>


                {/* Step 3 */}
                <div className="step-card">
                <div className="d-flex align-items-center justify-content-between">
                        <h2 className="step-title">Step 3</h2>
                        <img
                            src="https://restaurant.idea2reality.tech/public/assets/admin/img/bulk3.png"
                            alt="Logo"
                            style={{ width: '50px', height: '50px' }}
                        />
                    </div>
                    <p className="step-subtitle">Validate Data And Complete Import</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
                        <li style={{ listStyleType: 'disc' }}>Select the upload option in the Excel file upload section.</li>
                        <li style={{ listStyleType: 'disc' }}>Upload your file in .xls or .xlsx format.</li>
                        <li style={{ listStyleType: 'disc' }}>Click the upload button.</li>
                    </ul>
                </div>
            </div>
      
      <div className="download-section">
        <h2 className="upload-title">Download Template</h2>
        <div className="row">
          <div className="col-md-4">
            <label className="col-form-label">Select Product</label>
            <Select
              value={selectedProduct}
              onChange={(option) => setSelectedProduct(option)}
              options={ProductOptions}
              placeholder="Select Product"
              styles={{
                control: (provided) => ({
                  ...provided,
                  color: '#7e7e7e',
                  paddingLeft: '15px',
                }),
              }}
            />
            {errors && <span className="text-danger fs-12">{errors}</span>}
          </div>

          {selectedProduct?.value === "End Fittings" && (
            <div className="col-md-4">
              <label className="col-form-label">Select Fitting Thread Type</label>
              <Select
                options={fittingThreadOptions}
                value={selectedThread}
                onChange={(option) => setSelectedThread(option)}
                placeholder="Select Fitting Thread"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    color: '#7e7e7e',
                    paddingLeft: '15px',
                  }),
                }}
              />
            </div>
          )}
        </div>

        <div className="download-buttons-section">
          <p className="download-title">Download Spreadsheet Template</p>
          <div className="download-buttons">
            <button
              className="btn primary"
              onClick={() => handleDownload(true)}
            >
              With Sample Data
            </button>
            <button
              className="btn secondary"
              onClick={() => handleDownload(false)}
            >
              Without Any Data
            </button>
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      {/* <div className="upload-section">
         <h2 className="upload-title">Excel File Upload</h2>
         <div className="file-dropzone">
          <p>Must be Excel files using our Excel template above</p>
         </div>
        <div className="action-buttons">
          <button className="btn reset">Reset</button>
          <button className="btn import">Import</button>
        </div>
      </div> */}
       <div className="upload-section">
        <h2 className="upload-title">Excel File Upload</h2>
        <div
          className="file-dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('file-input').click()}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <p>
            Drag and drop your Excel file here, or click to select a file.
            <br />
            Must be Excel files using our Excel template above.
          </p>
          <input
            id="file-input"
            type="file"
            accept=".xls,.xlsx"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        {uploadedFile && <p style={{ marginTop: '10px' }}>Uploaded File: {uploadedFile.name}</p>}
        <div className="action-buttons" style={{ marginTop: '20px' }}>
          <button
            className="btn reset"
            onClick={() => setUploadedFile(null)}
          >
            Reset
          </button>
          <button
            className="btn secondary"
            disabled={!uploadedFile}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkImport;









//Second Last
// import React, { useState } from "react";
// import "./BulkImport.css";
// import Select from "react-select";
// import * as XLSX from "xlsx";


// const fittingThreadOptions = [
//   { value: "BSP", label: "BSP (B)", code: "B", dsc_code: "BSP" },
//   { value: "BSP O", label: "BSP ORING (BO)", code: "BO", dsc_code: "BSPO" },
//   { value: "JIC", label: "JIC (J)", code: "J", dsc_code: "JIC" },
//   { value: "ORFS", label: "ORFS (O)", code: "O", dsc_code: "ORFS" },
//   { value: "KOMATSU", label: "KOMATSU (K)", code: "K", dsc_code: "KOMATSU" },
//   { value: "METRIC", label: "METRIC", code: "M", dsc_code: "M" },
//   { value: "NPT", label: "NPT (NPT)", code: "NPT", dsc_code: "NPT" },
//   { value: "JIS", label: "JIS (BSP C-TYPE) (BJ)", code: "BJ", dsc_code: "JIS" },
//   { value: "SAE 61", label: "FLG CODE 61- 3000 PSI (3)", code: "3", dsc_code: "JIS" },
//   { value: "SAE 62", label: "FLG CODE 62- 6000 PSI (6)", code: "6", dsc_code: "FLG61" },
//   { value: "BANJO WITHOUT O", label: "BANJO WITHOUT O (BJ)", code: "BJ", dsc_code: "FLG62" },
//   { value: "BANJO WITH O", label: "BANJO WITH O (BJO)", code: "BJO", dsc_code: "BANJO" },
//   { value: "METRIC THREAD ORFS", label: "METRIC THREAD ORFS (MO)", code: "MO", dsc_code: "M-ORFS" }
// ];

// const ProductOptions = [
//   { value: "End Fittings", label: "End Fittings" },
//   { value: "Hose Pipe", label: "Hose Pipe" },
//   { value: "Hose Assembly", label: "Hose Assembly" },
//   { value: "Spring", label: "Spring" },
//   { value: "O-ring", label: "O-ring" },
//   { value: "Dust Cap", label: "Dust Cap" },
//   { value: "Sleeve", label: "Sleeve" },
//   { value: "Vinyl Cover", label: "Vinyl Cover" },
//   { value: "Packing", label: "Packing" },
//   { value: "Tube Fittings", label: "Tube Fittings" },
// ];

// const BulkImport = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [errors, setErrors] = useState('');

//   return (
//     <div className="container">
//       <h1 className="title">Bulk Import</h1>
//       <div className="steps-grid">
//         {/* Step 1 */}
    //     <div className="step-card">
    //       <div className="d-flex align-items-center justify-content-between">
    //         <h2 className="step-title">Step 1</h2>
    //         <img
    //           src="https://restaurant.idea2reality.tech/public/assets/admin/img/bulk1.png"
    //           alt="Logo"
    //           style={{ width: '50px', height: '50px' }}
    //         />
    //       </div>
    //       <p className="step-subtitle">Download The Excel File</p>
    //       <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
    //         <li>Select Product.</li>
    //         <li>Select Product Fitting Type Like BSP, JIS, M ..etc</li>
    //         <li>Download the format file and fill it with proper data.</li>
    //         <li>Download the example file to understand how the data must be filled.</li>
    //         <li>Upload the Excel file.</li>
    //       </ul>
    //     </div>

    //     {/* Step 2 */}
    //     <div className="step-card">
    //       <h2 className="step-title">Step 2</h2>
    //       <p className="step-subtitle">Match Spreadsheet Data According To Instruction</p>
    //       <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
    //         <li>Fill up the data according to the format.</li>
    //         <li>You can get the restaurant ID; input the correct IDs.</li>
    //       </ul>
    //     </div>

    //     {/* Step 3 */}
    //     <div className="step-card">
    //       <h2 className="step-title">Step 3</h2>
    //       <p className="step-subtitle">Validate Data And Complete Import</p>
    //       <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
    //         <li>Select the upload option in the Excel file upload section.</li>
    //         <li>Upload your file in .xls or .xlsx format.</li>
    //         <li>Click the upload button.</li>
    //       </ul>
    //     </div>
    //   </div>

//       <div className="download-section">
//         <h2 className="upload-title">Download Template</h2>
//         <div className="row">
//           <div className="col-md-4">
//             <label className="col-form-label">Select Product</label>
//             <Select
//               value={selectedProduct}
//               onChange={(option) => setSelectedProduct(option)}
//               options={ProductOptions}
//               placeholder="Select Product"
//               styles={{
//                 control: (provided) => ({
//                   ...provided,
                  
//                   color: '#7e7e7e',
//                   paddingLeft: '15px',
//                 }),
//               }}
//             />
//             {errors && <span className="text-danger fs-12">{errors}</span>}
//           </div>

//           {selectedProduct?.value === "End Fittings" && (
//             <div className="col-md-4">
//               <label className="col-form-label">Select Fitting Thread Type</label>
//               <Select
//                 options={fittingThreadOptions}
//                 placeholder="Select Fitting Thread"
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
                    
//                     color: '#7e7e7e',
//                     paddingLeft: '15px',
//                   }),
//                 }}
//               />
//             </div>
//           )}
//         </div>

//         <div className="download-buttons-section">
//           <p className="download-title">Download Spreadsheet Template</p>
//           <div className="download-buttons">
//             <button className="btn primary">With Sample Data</button>
//             <button className="btn secondary">Without Any Data</button>
//           </div>
//         </div>
//       </div>

//       {/* File Upload Section */}
//       <div className="upload-section">
//         <h2 className="upload-title">Excel File Upload</h2>
//         <div className="file-dropzone">
//           <p>Must be Excel files using our Excel template above</p>
//         </div>
//         <div className="action-buttons">
//           <button className="btn reset">Reset</button>
//           <button className="btn import">Import</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulkImport;























// import React from "react";
// import "./BulkImport.css";
// import Select from "react-select";


// const BulkImport = () => {
//     let errors = '';
//     return (
//         <div className="container">
//             <h1 className="title">Bulk Import</h1>
            // <div className="steps-grid">
            //     {/* Step 1 */}
            //     <div className="step-card">
            //         <div className="d-flex align-items-center justify-content-between">
            //             <h2 className="step-title">Step 1</h2>
            //             <img
            //                 src="https://restaurant.idea2reality.tech/public/assets/admin/img/bulk1.png"
            //                 alt="Logo"
            //                 style={{ width: '50px', height: '50px' }}
            //             />
            //         </div>
            //         <p className="step-subtitle">Download The Excel File</p>
            //         <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
            //             <li style={{ listStyleType: 'disc' }}>Select Product.</li>
            //             <li style={{ listStyleType: 'disc' }}>Select Product Fitting Type Like BSP, JIS, M ..etc</li>
            //             <li style={{ listStyleType: 'disc' }}>Download the format file and fill it with proper data.</li>
            //             <li style={{ listStyleType: 'disc' }}>Download the example file to understand how the data must be filled.</li>
            //             <li style={{ listStyleType: 'disc' }}>Upload the Excel file.</li>
            //         </ul>
            //     </div>

            //     {/* Step 2 */}
            //     <div className="step-card">
            //         <h2 className="step-title">Step 2</h2>
            //         <p className="step-subtitle">Match Spreadsheet Data According To Instruction</p>
            //         <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
            //             <li style={{ listStyleType: 'disc' }}>Fill up the data according to the format.</li>
            //             <li style={{ listStyleType: 'disc' }}>You can get the restaurant ID; input the correct IDs.</li>
            //         </ul>
            //     </div>
            //     {/* Step 3 */}
            //     <div className="step-card">
            //         <h2 className="step-title">Step 3</h2>
            //         <p className="step-subtitle">Validate Data And Complete Import</p>
            //         <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
            //             <li style={{ listStyleType: 'disc' }}>Select the upload option in the Excel file upload section.</li>
            //             <li style={{ listStyleType: 'disc' }}>Upload your file in .xls or .xlsx format.</li>
            //             <li style={{ listStyleType: 'disc' }}>Click the upload button.</li>
            //         </ul>
            //     </div>
            // </div>


//             <div className="download-section">
//                 <h2 className="upload-title">Download Template</h2>


//                 <div className="row">
//                     <div className="col-md-4">
//                         <label className="col-form-label">Select Product</label>
//                         {/* <label className="col-form-label" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                       With Cap / Without Cap
//                     </label> */}
//                         <Select
//                             value={"selectedWithCapWithoutCapOption"}
//                             onChange={(option) => {
//                                 // setSelectedWithCapWithoutCapOption(option);
//                                 // setFormData({
//                                 //   ...formData,
//                                 //   with_cap: option.value,
//                                 // });
//                             }}
//                             defaultValue={"selectedWithCapWithoutCapOption"}
//                             options={"withCapWithoutCapOption"}
//                             style={{
//                                 lineHeight: "40px",
//                                 color: "#7e7e7e",
//                                 paddingLeft: " 15px",
//                             }}
//                         />
//                         {errors.with_cap && (
//                             <span className="text-danger fs-12">
//                                 {errors.with_cap}
//                             </span>
//                         )}
//                     </div>


//                     <div className="col-md-4">
//                         <label className="col-form-label">Select Fitting Thread Type</label>
//                         {/* <label className="col-form-label" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                       With Cap / Without Cap
//                     </label> */}
//                         <Select
//                             value={"selectedWithCapWithoutCapOption"}
//                             onChange={(option) => {
//                                 // setSelectedWithCapWithoutCapOption(option);
//                                 // setFormData({
//                                 //   ...formData,
//                                 //   with_cap: option.value,
//                                 // });
//                             }}
//                             defaultValue={"selectedWithCapWithoutCapOption"}
//                             options={"withCapWithoutCapOption"}
//                             style={{
//                                 lineHeight: "40px",
//                                 color: "#7e7e7e",
//                                 paddingLeft: " 15px",
//                             }}
//                         />
//                         {errors.with_cap && (
//                             <span className="text-danger fs-12">
//                                 {errors.with_cap}
//                             </span>
//                         )}
//                     </div>
//                 </div>

//                 <div className="download-buttons-section">
//                     <p className="download-title">Download Spreadsheet Template</p>
//                     <div className="download-buttons">
//                         <button className="btn primary">With Sample Data</button>
//                         <button className="btn secondary">Without Any Data</button>
//                     </div>
//                 </div>

//             </div>



//             {/* File Upload Section */}
//             <div className="upload-section">
//                 <h2 className="upload-title">Excel File Upload</h2>
//                 {/* <div className="radio-group">
//                     <label className="radio-option">
//                         <input type="radio" name="uploadType" value="new" />
//                         Upload New Data
//                     </label>
//                     <label className="radio-option">
//                         <input type="radio" name="uploadType" value="update" />
//                         Update Existing Data
//                     </label>
//                 </div> */}
//                 <div className="file-dropzone">
//                     <p>Must be Excel files using our Excel template above</p>
//                 </div>
//                 <div className="action-buttons">
//                     <button className="btn reset">Reset</button>
//                     <button className="btn import">Import</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BulkImport;