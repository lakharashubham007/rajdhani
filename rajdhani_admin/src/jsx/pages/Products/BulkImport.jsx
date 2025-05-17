import React, { useEffect, useState } from "react";
import "./BulkImport.css";
import Select from "react-select";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
// import axios from "axios";
import { bulkImportApi } from "../../../services/apis/BulkImportApi";
import { FaFileAlt } from 'react-icons/fa';
import Loader from "../../components/Loader/Loader";


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
  { value: "Nut", label: "Nut" },
  { value: "Nipple", label: "Nipple" },
  { value: "Cap", label: "Cap" },
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
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

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

  //Reset Thread option
  useEffect(() => {
    setSelectedThread(null)
  }, [selectedProduct])

  //All Templates
  const templateMapping = {
    BSP: {
      fields: [
        "product_type",
        "design",
        "wire_type",
        "ferrule",
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
          ferrule: "Without Ferrule",
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
        "ferrule",
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
          ferrule: "Without Ferrule",
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
        "ferrule",
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
          ferrule: "Without Ferrule",
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
        "ferrule",
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
          ferrule: "Without Ferrule",
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
        "ferrule",
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
          ferrule: "Without Ferrule",
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
        "ferrule",
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
          ferrule: "Without Ferrule",
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
        "ferrule",
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
          ferrule: "Without Ferrule",
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
    "SAE 61": {
      fields: [
        "product_type",
        "design",
        "wire_type",
        "ferrule",
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
          ferrule: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "SAE 61",
          hose_dash_size: '1/4"',
          od: '30.3',
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
    "SAE 62": {
      fields: [
        "product_type",
        "design",
        "wire_type",
        "ferrule",
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
          ferrule: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "SAE 62",
          hose_dash_size: '1/4"',
          od: '32',
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
        "ferrule",
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
          ferrule: "Without Ferrule",
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
        "ferrule",
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
          ferrule: "Without Ferrule",
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
        "ferrule",
        "fitting_piece",
        "skive_type",
        "fitting_thread",
        "hose_dash_size",
        "pipeOD",
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
          ferrule: "Without Ferrule",
          fitting_piece: "Two Piece",
          skive_type: "Non-Skive",
          fitting_thread: "METRIC",
          hose_dash_size: '1/4"',
          pipeOD: '06',
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
        "ferrule",
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
          ferrule: "Without Ferrule",
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
    Nut: {
      fields: [
        "product_type",
        "part",
        "design",
        "fitting_thread",
        "fitting_dash_size",
        "nut_hex",
        "nut_length",
        "additional",
        "weight",
        "uom",
        "price",
        "gst",

      ],
      sampleData: [
        {
          product_type: "End Fittings",
          part: "Nut",
          design: "S",
          fitting_thread: "BSP",
          fitting_dash_size: '1/4"',
          nut_hex: "15",
          nut_length: "15",
          additional: "addon",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    Nipple: {
      fields: [
        "product_type",
        "part",
        "design",
        "wire_type",
        "skive_type",
        "fitting_thread",
        "hose_dash_size",
        "weight",
        "uom",
        "price",
        "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          part: "Nipple",
          design: "S",
          wire_type: "Spiral",
          skive_type: "Non-Skive",
          fitting_thread: "BSP",
          hose_dash_size: '1/4"',
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    Cap: {
      fields: [
        "product_type",
        "part",
        "design",
        "wire_type",
        "skive_type",
        "cap_size",
        "big_bore",
        "od",
        "length",
        "weight",
        "uom",
        "price",
        "gst",
      ],
      sampleData: [
        {
          product_type: "End Fittings",
          part: "Cap",
          design: "S",
          wire_type: "Spiral",
          skive_type: "Non-Skive",
          cap_size: '1/4"',
          big_bore: "28",
          length: "15",
          od: "28",
          additional: "4 Wire",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    "Hose Pipe": {
      fields: [
        "product_type",
        "hose_pipe_mfc",
        "brand_lay_line",
        "hose_dash_size",
        "hose_type",
        "additional",
        "weight",
        "uom",
        "price",
        "gst",
      ],
      sampleData: [
        {
          product_type: "Hose Pipe",
          hose_pipe_mfc: "BSR",
          brand_lay_line: "PRO",
          hose_dash_size: "5/16\"",
          hose_type: "Airdrill",
          additional: "addon",
          weight: '1',
          uom: "set",
          price: "200",
          gst: "18",
        },
      ],
    },
    "Spring": {
      fields: [
        "product_type",
        "inner_diameter",
        "spring_length",
        "spring_type",
        "hose_size",
        "weight",
        "uom",
        "price",
        "gst",
      ],
      sampleData: [
        {
          product_type: "Spring",
          inner_diameter: "20",
          spring_length: "15",
          spring_type: "Compress",
          hose_size: '1/4"',
          weight: '1',
          uom: "set",
          price: "185",
          gst: "18",
        },
      ],
    },
    "O-ring": {
      fields: [
        "product_type",
        "fitting_thread",
        "size",
        "inner_diameter",
        "thickness",
        "hardness",
        "weight",
        "uom",
        "price",
        "gst",
      ],
      sampleData: [
        {
          product_type: "O-ring",
          fitting_thread: "BSP",
          size: '1/4"',
          inner_diameter: "15",
          thickness: "35",
          hardness: "25",
          weight: '1',
          uom: "set",
          price: "185",
          gst: "18",
        },
      ],
    },
    "Dust Cap": {
      fields: [
        "product_type",
        "fitting_thread",
        "size",
        "dustcap_color",
        "male_female_type",
        "weight",
        "uom",
        "price",
        "gst",
      ],
      sampleData: [
        {
          product_type: "Dust Cap",
          fitting_thread: "Metric",
          size: '12X1.5',
          dustcap_color: "Red",
          male_female_type: "Male",
          weight: '1',
          uom: "set",
          price: "185",
          gst: "18",
        },
      ],
    },
    "Sleeve": {
      fields: [
        "product_type",
        "size",
        "inner_diameter",
        "outer_diameter",
        "weight",
        "uom",
        "price",
        "gst",
      ],
      sampleData: [
        {
          product_type: "Sleeve",
          size: '3/8"',
          inner_diameter: "15",
          outer_diameter: "15",
          weight: '1',
          uom: "set",
          price: "185",
          gst: "18",
        },
      ],
    },
    "Vinyl Cover": {
      fields: [
        "product_type",
        "size",
        "inner_diameter",
        "outer_diameter",
        "thickness",
        "weight",
        "uom",
        "price",
        "gst",
      ],
      sampleData: [
        {
          product_type: "Vinyl Cover",
          size: '3/4"',
          inner_diameter: "15",
          outer_diameter: "15",
          thickness: "15",
          weight: '1',
          uom: "set",
          price: "185",
          gst: "18",
        },
      ],
    },
    "Packing": {
      fields: [
        "product_type",
        "item_name",
        "weight",
        "uom",
        "price",
        "gst",
      ],
      sampleData: [
        {
          product_type: "Packing",
          item_name: "Silver tap",
          weight: '1',
          uom: "set",
          price: "185",
          gst: "18",
        },
      ],
    },
    "Tube Fittings": {
      fields: [
        "product_type",
        "tube_fitting_thread",
        "tube_fitting_category",
        "part_code",
        "part_description",
        "weight",
        "uom",
        "price",
        "gst",
      ],
      sampleData: [
        {
          product_type: "Tube Fittings",
          tube_fitting_thread: "Double Ferrule Compression Fitting",
          tube_fitting_category: "Male Connector",
          part_code: "123456ABC",
          part_description: "Double Ferrule Compression Fitting Male Connector 123465ABC",
          weight: '1',
          uom: "set",
          price: "185",
          gst: "18",
        },
      ],
    },

    // Add similar entries for the rest of the thread options...
  };

  //Download Template
  const handleDownload = (withSampleData) => {
    if (selectedProduct?.value === "End Fittings" && !selectedThread) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops',
        text: 'Please select a fitting thread type before downloading.!',
      })
      return;
    }
    const { fields, sampleData } = templateMapping[selectedThread?.value] || templateMapping[selectedProduct?.value] || {};

    if (!fields) {
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
    const fileName = `${selectedThread?.value ? selectedThread?.value : selectedProduct?.value}_template.xlsx`;

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
    try {
      setLoading(true);
      const response = await bulkImportApi(uploadedFile);

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
    } finally{
      setLoading(false);
    }
  };


  return (
    <>
      <Loader visible={loading} />
      <div className="bulkcontainer">
        <h1 className="title">Bulk Import</h1>
        {/* Section 1 Instruction Moduele */}
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
        {/* Section 2 Download Instruction Section */}
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
        {/* Section 3 Excel upload section */}
        <div className="upload-section" style={{ padding: '30px', maxWidth: 'auto', margin: 'auto' }}>
          <h2 style={{ textAlign: 'center' }}>Excel File Upload</h2>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('file-input').click()}
            style={{
              border: '2px dashed #ccc',
              padding: '30px',
              textAlign: 'center',
              cursor: 'pointer',
              borderRadius: '12px',
              backgroundColor: '#fafafa',
              transition: '0.3s',
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <input
              id="file-input"
              type="file"
              accept=".xls,.xlsx"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            {!uploadedFile ? (
              <p style={{ color: '#666', margin: 0 }}>
                Drag and drop your Excel file here, or click to select a file.<br />
                Must be Excel files using our Excel template above.
              </p>
            ) : (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#e6f2ff',
                  borderRadius: '999px',
                  padding: '10px 18px',
                  fontSize: '14px',
                  color: '#005999',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  maxWidth: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <span
                  style={{
                    flex: '1',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {uploadedFile.name}
                </span>
                <span
                  style={{
                    marginLeft: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <FaFileAlt size={16} color="#0073e6" />
                </span>
              </div>
            )}
          </div>

          <div className="action-buttons" style={{ marginTop: '20px', textAlign: 'center' }}>
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
    </>

  );
};

export default BulkImport;







