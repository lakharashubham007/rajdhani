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
  { value: "METRIC THREAD ORFS", label: "METRIC THREAD ORFS (MO)", code: "MO", dsc_code: "M-Flat-Face" }
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
      "product_type",
      "design",
      "wire_type",
      "with_cap", 
      "fitting_piece",
      "skive_type",
      "fitting_thread",
      "hose_dash_size",
      "fitting_dash_size",
      "fitting_type",
      "straight_bend_angle",
      "neck_length",
      "drop_length",
      "weight",
      "uom",
      "price",
      "gst",
    ],
    sampleData: [
      {
      product_type: "End Fittings",
      design: "S",
      wire_type: "Spiral",
      with_cap: "Without Ferrule",
      fitting_piece: "Two Piece",
      skive_type: "Non-Skive",
      fitting_thread: "BSP",
      hose_dash_size: '1/4"',
      fitting_dash_size: '5/16"',
      fitting_type: "Male",
      straight_bend_angle: "Bend 90",
      neck_length: "12",
      drop_length: "12",
      weight: '1',
      uom: "set",
      price: "200",
      gst: "18",
      },
    ],
  },
  "BSP O": {
      fields: [
       "product_type",
      "design",
      "wire_type",
      "with_cap", 
      "fitting_piece",
      "skive_type",
      "fitting_thread",
      "hose_dash_size",
      "fitting_dash_size",
      "fitting_type",
      "straight_bend_angle",
      "neck_length",
      "drop_length",
      "weight",
      "uom",
      "price",
      "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          design: "S",
          wire_type: "Spiral",
          with_cap: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "BSP O",
          hose_dash_size: '1/4"',
          fitting_dash_size: '5/16"',
          fitting_type: "Male",
          straight_bend_angle: "Bend 90",
          neck_length: "12",
          drop_length: "12",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    JIC: {
      fields: [
      "product_type",
      "design",
      "wire_type",
      "with_cap", 
      "fitting_piece",
      "skive_type",
      "fitting_thread",
      "hose_dash_size",
      "fitting_dash_size",
      "fitting_type",
      "straight_bend_angle",
      "neck_length",
      "drop_length",
      "weight",
      "uom",
      "price",
      "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          design: "S",
          wire_type: "Spiral",
          with_cap: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "JIC",
          hose_dash_size: '1/4"',
          fitting_dash_size: '5/16"',
          fitting_type: "Male",
          straight_bend_angle: "Bend 90",
          neck_length: "12",
          drop_length: "12",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    NPT: {
      fields: [
      "product_type",
      "design",
      "wire_type",
      "with_cap", 
      "fitting_piece",
      "skive_type",
      "fitting_thread",
      "hose_dash_size",
      "fitting_dash_size",
      "fitting_type",
      "straight_bend_angle",
      "neck_length",
      "drop_length",
      "weight",
      "uom",
      "price",
      "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          design: "S",
          wire_type: "Spiral",
          with_cap: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "NPT",
          hose_dash_size: '1/4"',
          fitting_dash_size: '3/8"',
          fitting_type: "Male",
          straight_bend_angle: "Bend 90",
          neck_length: "12",
          drop_length: "12",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    JIS: {
      fields: [
      "product_type",
      "design",
      "wire_type",
      "with_cap", 
      "fitting_piece",
      "skive_type",
      "fitting_thread",
      "hose_dash_size",
      "fitting_dash_size",
      "fitting_type",
      "straight_bend_angle",
      "neck_length",
      "drop_length",
      "weight",
      "uom",
      "price",
      "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          design: "S",
          wire_type: "Spiral",
          with_cap: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "JIS",
          hose_dash_size: '1/4"',
          fitting_dash_size: '3/8"',
          fitting_type: "Male",
          straight_bend_angle: "Bend 90",
          neck_length: "12",
          drop_length: "12",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    ORFS: {
      fields: [
      "product_type",
      "design",
      "wire_type",
      "with_cap", 
      "fitting_piece",
      "skive_type",
      "fitting_thread",
      "hose_dash_size",
      "fitting_dash_size",
      "fitting_type",
      "straight_bend_angle",
      "neck_length",
      "drop_length",
      "weight",
      "uom",
      "price",
      "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          design: "S",
          wire_type: "Spiral",
          with_cap: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "ORFS",
          hose_dash_size: '1/4"',
          fitting_dash_size: '3/8"',
          fitting_type: "Male",
          straight_bend_angle: "Bend 90",
          neck_length: "12",
          drop_length: "12",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    KOMATSU: {
      fields: [
      "product_type",
      "design",
      "wire_type",
      "with_cap", 
      "fitting_piece",
      "skive_type",
      "fitting_thread",
      "hose_dash_size",
      "fitting_dash_size",
      "fitting_type",
      "straight_bend_angle",
      "neck_length",
      "drop_length",
      "weight",
      "uom",
      "price",
      "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          design: "S",
          wire_type: "Spiral",
          with_cap: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "KOMATSU",
          hose_dash_size: '1/4"',
          fitting_dash_size: '3/8"',
          fitting_type: "Male",
          straight_bend_angle: "Bend 90",
          neck_length: "12",
          drop_length: "12",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    "SAE 61":{
      fields: [
        "product_type",
        "design",
        "wire_type",
        "with_cap", 
        "fitting_piece",
        "skive_type",
        "fitting_thread",
        "hose_dash_size",
        "od",
        "fitting_type",
        "straight_bend_angle",
        "neck_length",
        "drop_length",
        "weight",
        "uom",
        "price",
        "gst",
        ],
        sampleData: [
          {
            product_type: "End Fittings",
            design: "S",
            wire_type: "Spiral",
            with_cap: "Without Ferrule",
            fitting_piece: "Two Piece",
            skive_type: "Non-Skive",
            fitting_thread: "SAE 61",
            hose_dash_size: '1/4"',
            od: '30.3"',
            fitting_type: "Flange",
            straight_bend_angle: "Bend 90",
            neck_length: "12",
            drop_length: "12",
            weight: '1',
            uom: "set",
            price: "200",
            gst: "18",
          },
        ],

    },
    "SAE 62":{
      fields: [
        "product_type",
        "design",
        "wire_type",
        "with_cap", 
        "fitting_piece",
        "skive_type",
        "fitting_thread",
        "hose_dash_size",
        "od",
        "fitting_type",
        "straight_bend_angle",
        "neck_length",
        "drop_length",
        "weight",
        "uom",
        "price",
        "gst",
        ],
        sampleData: [
          {
            product_type: "End Fittings",
            design: "S",
            wire_type: "Spiral",
            with_cap: "Without Ferrule",
            fitting_piece: "Two Piece",
            skive_type: "Non-Skive",
            fitting_thread: "SAE 62",
            hose_dash_size: '1/4"',
            od: '32"',
            fitting_type: "Cat Flange",
            straight_bend_angle: "Bend 90",
            neck_length: "12",
            drop_length: "12",
            weight: '1',
            uom: "set",
            price: "200",
            gst: "18",
          },
        ],

    },
    "BANJO WITHOUT O": {
      fields: [
      "product_type",
      "design",
      "wire_type",
      "with_cap", 
      "fitting_piece",
      "skive_type",
      "fitting_thread",
      "hose_dash_size",
      "fitting_dash_size",
      "fitting_type",
      "straight_bend_angle",
      "neck_length",
      "drop_length",
      "weight",
      "uom",
      "price",
      "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          design: "S",
          wire_type: "Spiral",
          with_cap: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "BANJO WITHOUT O",
          hose_dash_size: '1/4"',
          fitting_dash_size: '10',
          fitting_type: "Male",
          straight_bend_angle: "Bend 90",
          neck_length: "12",
          drop_length: "12",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    "BANJO WITH O": {
      fields: [
      "product_type",
      "design",
      "wire_type",
      "with_cap", 
      "fitting_piece",
      "skive_type",
      "fitting_thread",
      "hose_dash_size",
      "fitting_dash_size",
      "fitting_type",
      "straight_bend_angle",
      "neck_length",
      "drop_length",
      "weight",
      "uom",
      "price",
      "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          design: "S",
          wire_type: "Spiral",
          with_cap: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "BANJO WITH O",
          hose_dash_size: '1/4"',
          fitting_dash_size: '10',
          fitting_type: "Male",
          straight_bend_angle: "Bend 90",
          neck_length: "12",
          drop_length: "12",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    "METRIC": {
      fields: [
        "product_type",
        "design",
        "wire_type",
        "with_cap", 
        "fitting_piece",
        "skive_type",
        "fitting_thread",
        "hose_dash_size",
        "pipe_od",
        "metric_type",
        "fitting_dash_size",
        "fitting_type",
        "straight_bend_angle",
        "neck_length",
        "drop_length",
        "weight",
        "uom",
        "price",
        "gst",
        ],
        sampleData: [
          {
            product_type: "End Fittings",
            design: "S",
            wire_type: "Spiral",
            with_cap: "Without Ferrule",
            fitting_piece: "Two Piece",
            skive_type: "Non-Skive",
            fitting_thread: "METRIC",
            hose_dash_size: '1/4"',
            pipe_od: '06',
            metric_type: "Light",
            fitting_dash_size: "M12X1.5",
            fitting_type: "Male",
            straight_bend_angle: "Bend 90",
            neck_length: "12",
            drop_length: "12",
            weight: '1',
            uom: "set",
            price: "200",
            gst: "18",
          },
        ],

    },
    "METRIC THREAD ORFS": {
      fields: [
      "product_type",
      "design",
      "wire_type",
      "with_cap", 
      "fitting_piece",
      "skive_type",
      "fitting_thread",
      "hose_dash_size",
      "fitting_dash_size",
      "fitting_type",
      "straight_bend_angle",
      "neck_length",
      "drop_length",
      "weight",
      "uom",
      "price",
      "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          design: "S",
          wire_type: "Spiral",
          with_cap: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "METRIC THREAD ORFS",
          hose_dash_size: '1/4"',
          fitting_dash_size: 'M22X1.5',
          fitting_type: "Male",
          straight_bend_angle: "Bend 90",
          neck_length: "12",
          drop_length: "12",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
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