const XLSX = require("xlsx");
const { Products ,ProductCodeCounter} = require("../models");

// fitting thread options
const fittingThreadOptions = [
    { value: "BSP", code: "B", dsc_code: "BSP" },
    { value: "BSP O", code: "BO", dsc_code: "BSPO" },
    { value: "JIC", code: "J", dsc_code: "JIC" },
    { value: "ORFS", code: "O", dsc_code: "ORFS" },
    { value: "KOMATSU", code: "K", dsc_code: "KOMATSU" },
    { value: "METRIC", code: "M", dsc_code: "M" },
    { value: "NPT", code: "NPT", dsc_code: "NPT" },
    { value: "JIS", code: "BJ", dsc_code: "JIS" },
    { value: "SAE 61", code: "", dsc_code: "61-(3)" },
    { value: "SAE 62", code: "", dsc_code: "62-(6)" },
    { value: "BANJO WITHOUT O", code: "BJ", dsc_code: "BANJO-WO" },
    { value: "BANJO WITH O", code: "BJO", dsc_code: "BANJO" },
    { value: "METRIC THREAD ORFS", code: "MO", dsc_code: "M Flat Face" },
];

const fittingTypeOptions = [
    { value: "Female", code: "F", dsc_code: "Female" },
    { value: "Male", code: "M", dsc_code: "Male" },
    { value: "Flange", code: "FL", dsc_code: "Flange" },
    { value: "Cat Flange", code: "FLC", dsc_code: "CAT Flange" },
];


const straightBendangleOptions = [
    { value: "Straight", code: "S", dsc_code: "Straight" },
    { value: "Bend 90", code: "90", dsc_code: "Bend 90" },
    { value: "Bend 75", code: "75", dsc_code: "Bend 75" },
    { value: "Bend 67.5", code: "67.5", dsc_code: "Bend 67.5" },
    { value: "Bend 45", code: "45", dsc_code: "Bend 45" },
    { value: "Bend 30", code: "30", dsc_code: "Bend 30" },
    { value: "Bend 22.5", code: "22.5", dsc_code: "Bend 22.5" },
    { value: "Bend 15", code: "15", dsc_code: "Bend 15" },
    { value: "Bend 135", code: "135", dsc_code: "Bend 135" },
];

const wireTypeOptions = [
    { value: "Braided", code: "B", dsc_code: "BR" },
    { value: "Spiral", code: "S", dsc_code: "SP" },
    { value: "Teflon", code: "T", dsc_code: "TF" },
];

const fittingPieceOptions = [
    { value: "One Piece", code: "1" },
    { value: "Two Piece", code: "2" },
    { value: "Three Piece", code: "3" },
];

const skiveTypeOptions = [
    { value: "Skive", code: "SK", dsc_code: "(SKIVE)" },
    { value: "Non-Skive", code: "NS", dsc_code: "(NON-SKIVE)" },
    { value: "Inner-Skive", code: "IS", dsc_code: "(INNER-SKIVE)" },
];

const designOption = [
    { value: "R", label: "R" },
    { value: "S", label: "S" },
    { value: "K", label: "K" },
    { value: "P", label: "P" },
    { value: "H", label: "H" },
    { value: "Y", label: "Y" },
];

const CapWithoutCapOptions = [
    { value: "With Ferrule", label: "With Ferrule", code: "", dsc_code: "" },
    { value: "Without Ferrule", label: "Without Ferrule", code: "WF", dsc_code: "Without Ferrule" },
  ];

const hoseDashSizeOptions = [
    { value: "3/16\"", code: "O3", dsc_code: "3/16\"" },
    { value: "1/4\"", code: "O4", dsc_code: "1/4\"" },
    { value: "5/16\"", code: "O5", dsc_code: "5/16\"" },
    { value: "3/8\"", code: "O6", dsc_code: "3/8\"" },
    { value: "1/2\"", code: "O8", dsc_code: "1/2\"" },
    { value: "5/8\"", code: "10", dsc_code: "5/8\"" },
    { value: "3/4\"", code: "12", dsc_code: "3/4\"" },
    { value: "1\"", code: "16", dsc_code: "1\"" },
    { value: "1-1/4\"", code: "20", dsc_code: "1-1/4\"" },
    { value: "1-1/2\"", code: "24", dsc_code: "1-1/2\"" },
    { value: "2\"", code: "32", dsc_code: "2\"" },
    { value: "2-1/2\"", code: "40", dsc_code: "2-1/2\"" },
    { value: "3\"", code: "48", dsc_code: "3\"" },
    { value: "3-1/2\"", code: "56", dsc_code: "3-1/2\"" },
    { value: "4\"", code: "64", dsc_code: "4\"" },
    { value: "4-1/2\"", code: "72", dsc_code: "4-1/2\"" },
    { value: "5\"", code: "80", dsc_code: "5\"" },
    { value: "13/32\"", code: "", dsc_code: "13/32\"" },
    { value: "7/8\"", code: "", dsc_code: "7/8\"" },
    { value: "1-1/8\"", code: "", dsc_code: "1-1/8\"" },
    { value: "1-3/8\"", code: "", dsc_code: "1-3/8\"" },
    { value: "1-13/16\"", code: "", dsc_code: "1-13/16\"" },
    { value: "2-3/8\"", code: "", dsc_code: "2-3/8\"" },
];


const fittingDashSizeOptions = [
    // BSP
    { thread_type: "BSP", dash: "O4", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
    { thread_type: "BSP", dash: "O5", inch: "5/16\"", thread: "5/16\"", dsc_code: "5/16\"", variant: "Standard" },
    { thread_type: "BSP", dash: "O6", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
    { thread_type: "BSP", dash: "O8", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
    { thread_type: "BSP", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8\"", variant: "Standard" },
    { thread_type: "BSP", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
    { thread_type: "BSP", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
    { thread_type: "BSP", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
    { thread_type: "BSP", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
    { thread_type: "BSP", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },


    // BSP O
    { thread_type: "BSP O", dash: "O4", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
    { thread_type: "BSP O", dash: "O5", inch: "5/16\"", thread: "5/16\"", dsc_code: "5/16\"", variant: "Standard" },
    { thread_type: "BSP O", dash: "O6", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
    { thread_type: "BSP O", dash: "O8", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
    { thread_type: "BSP O", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8\"", variant: "Standard" },
    { thread_type: "BSP O", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
    { thread_type: "BSP O", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
    { thread_type: "BSP O", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
    { thread_type: "BSP O", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
    { thread_type: "BSP O", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },


    // JIC
    { thread_type: "JIC", dash: "O4", inch: "1/4\"", thread: "7/16\"", dsc_code: "7/16\"", variant: "Standard" },
    { thread_type: "JIC", dash: "O5", inch: "5/16\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Lower Jump" },
    { thread_type: "JIC", dash: "O6", inch: "3/8\"", thread: "9/16\"", dsc_code: "9/16\"", variant: "Standard" },
    { thread_type: "JIC", dash: "O8", inch: "1/2\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
    { thread_type: "JIC", dash: "10", inch: "5/8\"", thread: "7/8\"", dsc_code: "7/8\"", variant: "Standard" },
    { thread_type: "JIC", dash: "12", inch: "3/4\"", thread: "1-1/16\"", dsc_code: "1-1/16\"", variant: "Standard" },
    { thread_type: "JIC", dash: "16", inch: "1\"", thread: "1-5/16\"", dsc_code: "1-5/16\"", variant: "Standard" },
    { thread_type: "JIC", dash: "20", inch: "1-1/4\"", thread: "1-5/8\"", dsc_code: "1-5/8\"", variant: "Standard" },
    { thread_type: "JIC", dash: "24", inch: "1-1/2\"", thread: "1-7/8\"", dsc_code: "1-7/8\"", variant: "Standard" },
    { thread_type: "JIC", dash: "32", inch: "2\"", thread: "2-1/2\"", dsc_code: "2-1/2\"", variant: "Upper Jump" },


    // NPT
    { thread_type: "NPT", dash: "O4", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
    // { thread_type: "NPT", dash: "O5", inch: "5/16\"", thread: null, dsc_code: null, variant: "Lower Jump" },
    { thread_type: "NPT", dash: "O6", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: null },
    { thread_type: "NPT", dash: "O8", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: null },
    // { thread_type: "NPT", dash: "10", inch: "5/8\"", thread: null, dsc_code: null, variant: null },
    { thread_type: "NPT", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: null },
    { thread_type: "NPT", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: null },
    { thread_type: "NPT", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: null },
    { thread_type: "NPT", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Upper Jump" },
    { thread_type: "NPT", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Upper Jump" },



    // JIS
    { thread_type: "JIS", dash: "O4", inch: "1/4\"", thread: "1/4\"", variant: "Standard", dsc_code: "1/4\"" },
    { thread_type: "JIS", dash: "O6", inch: "3/8\"", thread: "3/8\"", variant: "Lower Jump", dsc_code: "3/8\"" },
    { thread_type: "JIS", dash: "O8", inch: "1/2\"", thread: "1/2\"", variant: null, dsc_code: "1/2\"" },
    { thread_type: "JIS", dash: "10", inch: "5/8\"", thread: "5/8\"", variant: null, dsc_code: "5/8\"" },
    { thread_type: "JIS", dash: "12", inch: "3/4\"", thread: "3/4\"", variant: null, dsc_code: "3/4\"" },
    { thread_type: "JIS", dash: "16", inch: "1\"", thread: "1\"", variant: null, dsc_code: "1\"" },
    { thread_type: "JIS", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", variant: "Upper Jump", dsc_code: "1-1/4\"" },
    { thread_type: "JIS", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", variant: null, dsc_code: "1-1/2\"" },
    { thread_type: "JIS", dash: "32", inch: "2\"", thread: "2\"", variant: "Upper Jump", dsc_code: "2\"" },


    // ORFS
    { thread_type: "ORFS", dash: "O4", inch: "1/4\"", thread: "9/16\"", variant: "Standard", dsc_code: "9/16\"" },
    // { thread_type: "ORFS", dash: "O5", inch: "5/16\"", thread: null, variant: null, dsc_code: null },
    { thread_type: "ORFS", dash: "O6", inch: "3/8\"", thread: "11/16\"", variant: "Standard", dsc_code: "11/16\"" },
    { thread_type: "ORFS", dash: "O8", inch: "1/2\"", thread: "13/16\"", variant: "Standard", dsc_code: "13/16\"" },
    { thread_type: "ORFS", dash: "10", inch: "5/8\"", thread: "1\"", variant: "Standard", dsc_code: "1\"" },
    { thread_type: "ORFS", dash: "12", inch: "3/4\"", thread: "1-3/16\"", variant: "Standard", dsc_code: "1-3/16\"" },
    { thread_type: "ORFS", dash: "16", inch: "1\"", thread: "1-7/16\"", variant: "Standard", dsc_code: "1-7/16\"" },
    { thread_type: "ORFS", dash: "20", inch: "1-1/4\"", thread: "1-11/16\"", variant: "Standard", dsc_code: "1-11/16\"" },
    { thread_type: "ORFS", dash: "24", inch: "1-1/2\"", thread: "2\"", variant: "Standard", dsc_code: "2\"" },
    // { thread_type: "ORFS", dash: "32", inch: "2\"", thread: null, variant: "Upper Jump", dsc_code: null },


    // KOMATSU
    { thread_type: "KOMATSU", dash: "O4", inch: "1/4\"", thread: "14X1.5", variant: "Standard", dsc_code: "14X1.5" },
    // { thread_type: "KOMATSU", dash: "O5", inch: "5/16\"", thread: null, variant: null, dsc_code: "5/16" },
    { thread_type: "KOMATSU", dash: "O6", inch: "3/8\"", thread: "18X1.5", variant: "Lower Jump", dsc_code: "18X1.5" },
    { thread_type: "KOMATSU", dash: "O8", inch: "1/2\"", thread: "22X1.5", variant: null, dsc_code: "22X1.5" },
    { thread_type: "KOMATSU", dash: "10", inch: "5/8\"", thread: "24X1.5", variant: null, dsc_code: "24X1.5" },
    { thread_type: "KOMATSU", dash: "12", inch: "3/4\"", thread: "30X1.5", variant: null, dsc_code: "30X1.5" },
    { thread_type: "KOMATSU", dash: "16", inch: "1\"", thread: "33X1.5", variant: null, dsc_code: "33X1.5" },
    { thread_type: "KOMATSU", dash: "20", inch: "1-1/4\"", thread: "36X1.5", variant: "Upper Jump", dsc_code: "36X1.5" },
    { thread_type: "KOMATSU", dash: "24", inch: "1-1/2\"", thread: "42X1.5", variant: "Upper Jump", dsc_code: "42X1.5" },
    // { thread_type: "KOMATSU", dash: "32", inch: "2\"", thread: null, variant: "Upper Jump", dsc_code: "2" },

   // SAE 61
    { thread_type: "SAE 61", dash: "08", thread: "30.3", inch: "30.3\"", variant: "Standard", dsc_code: "30.3" },
    { thread_type: "SAE 61", dash: "12", thread: "38.1", inch: "38.1\"", variant: null, dsc_code: "38.1" },
    { thread_type: "SAE 61", dash: "16", thread: "44.4", inch: "44.4\"", variant: null, dsc_code: "44.4" },
    { thread_type: "SAE 61", dash: "20", thread: "50.8", inch: "50.8\"", variant: null, dsc_code: "50.8" },
    { thread_type: "SAE 61", dash: "24", thread: "60.3", inch: "60.3\"", variant: null, dsc_code: "60.3" },
    { thread_type: "SAE 61", dash: "32", thread: "71", inch: "71\"", variant: null, dsc_code: "71" },

    // SAE 62
    { thread_type: "SAE 62", dash: "08", thread: "32", inch: "32\"", variant: "Standard", dsc_code: "32" },
    { thread_type: "SAE 62", dash: "10", thread: "34", inch: "34\"", variant: null, dsc_code: "34" },
    { thread_type: "SAE 62", dash: "12", thread: "41.4", inch: "41.4\"", variant: null, dsc_code: "41.4" },
    { thread_type: "SAE 62", dash: "16", thread: "47.4", inch: "47.4\"", variant: null, dsc_code: "47.4" },
    { thread_type: "SAE 62", dash: "20", thread: "54", inch: "54\"", variant: null, dsc_code: "54" },
    { thread_type: "SAE 62", dash: "24", thread: "63.5", inch: "63.5\"", variant: null, dsc_code: "63.5" },
    { thread_type: "SAE 62", dash: "32", thread: "79.6", inch: "79.6\"", variant: null, dsc_code: "79.6" },

    // BANJO WITHOUT O 
    { thread_type: "BANJO WITHOUT O", dash: "10", inch:"10", thread: "10", variant: "Standard", dsc_code: "10" },
    { thread_type: "BANJO WITHOUT O", dash: "12", inch:"12", thread: "12", variant: "Standard", dsc_code: "12" },
    { thread_type: "BANJO WITHOUT O", dash: "14", inch:"14", thread: "14", variant: "Standard", dsc_code: "14" },
    { thread_type: "BANJO WITHOUT O", dash: "16", inch:"16", thread: "16", variant: "Standard", dsc_code: "16" },
    { thread_type: "BANJO WITHOUT O", dash: "18", inch:"18", thread: "18", variant: "Standard", dsc_code: "18" },
    { thread_type: "BANJO WITHOUT O", dash: "22", inch:"22", thread: "22", variant: "Standard", dsc_code: "22" },

    // BANJO WITH O 
    { thread_type: "BANJO WITH O", dash: "10", inch: "10", thread: "10", variant: "Standard", dsc_code: "10" },
    { thread_type: "BANJO WITH O", dash: "12", inch: "12", thread: "12", variant: "Standard", dsc_code: "12" },
    { thread_type: "BANJO WITH O", dash: "14", inch: "14", thread: "14", variant: "Standard", dsc_code: "14" },
    { thread_type: "BANJO WITH O", dash: "16", inch: "16", thread: "16", variant: "Standard", dsc_code: "16" },
    { thread_type: "BANJO WITH O", dash: "18", inch: "18", thread: "18", variant: "Standard", dsc_code: "18" },
    { thread_type: "BANJO WITH O", dash: "22", inch: "22", thread: "22", variant: "Standard", dsc_code: "22" },


    // Metric Light
    {thread_type: "METRIC", metric_type: "Light", dash: "06", pipe_od: "06", thread: "M12X1.5", variant: null, dsc_code: "M12X1.5" },
    {thread_type: "METRIC", metric_type: "Light", dash: "08", pipe_od: "08", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    {thread_type: "METRIC", metric_type: "Light", dash: "10", pipe_od: "10", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    {thread_type: "METRIC", metric_type: "Light", dash: "12", pipe_od: "12", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    {thread_type: "METRIC", metric_type: "Light", dash: "15", pipe_od: "15", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    {thread_type: "METRIC", metric_type: "Light", dash: "18", pipe_od: "18", thread: "M26X1.5", variant: null, dsc_code: "M26X1.5" },
    {thread_type: "METRIC", metric_type: "Light", dash: "22", pipe_od: "22", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    {thread_type: "METRIC", metric_type: "Light", dash: "28", pipe_od: "28", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    {thread_type: "METRIC", metric_type: "Light", dash: "35", pipe_od: "35", thread: "M45X2.0", variant: null, dsc_code: "M45X2.0" },
    {thread_type: "METRIC", metric_type: "Light", dash: "42", pipe_od: "42", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Heavy
    {thread_type: "METRIC", metric_type: "Heavy", dash: "06", pipe_od: "06", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy", dash: "08", pipe_od: "08", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy", dash: "10", pipe_od: "10", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy", dash: "12", pipe_od: "12", thread: "M20X1.5", variant: null, dsc_code: "M20X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy", dash: "14", pipe_od: "14", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy", dash: "16", pipe_od: "16", thread: "M24X1.5", variant: null, dsc_code: "M24X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy", dash: "20", pipe_od: "20", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    {thread_type: "METRIC", metric_type: "Heavy", dash: "25", pipe_od: "25", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    {thread_type: "METRIC", metric_type: "Heavy", dash: "30", pipe_od: "30", thread: "M42X2.0", variant: null, dsc_code: "M42X2.0" },
    {thread_type: "METRIC", metric_type: "Heavy", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Light With O
    {thread_type: "METRIC", metric_type: "Light With O", dash: "06", pipe_od: "06", thread: "M12X1.5", variant: null, dsc_code: "M12X1.5" },
    {thread_type: "METRIC", metric_type: "Light With O", dash: "08", pipe_od: "08", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    {thread_type: "METRIC", metric_type: "Light With O", dash: "10", pipe_od: "10", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    {thread_type: "METRIC", metric_type: "Light With O", dash: "12", pipe_od: "12", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    {thread_type: "METRIC", metric_type: "Light With O", dash: "15", pipe_od: "15", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    {thread_type: "METRIC", metric_type: "Light With O", dash: "18", pipe_od: "18", thread: "M26X1.5", variant: null, dsc_code: "M26X1.5" },
    {thread_type: "METRIC", metric_type: "Light With O", dash: "22", pipe_od: "22", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    {thread_type: "METRIC", metric_type: "Light With O", dash: "28", pipe_od: "28", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    {thread_type: "METRIC", metric_type: "Light With O", dash: "35", pipe_od: "35", thread: "M45X2.0", variant: null, dsc_code: "M45X2.0" },
    {thread_type: "METRIC", metric_type: "Light With O", dash: "42", pipe_od: "42", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Heavy With O
    {thread_type: "METRIC", metric_type: "Heavy With O", dash: "06", pipe_od: "06", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy With O", dash: "08", pipe_od: "08", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy With O", dash: "10", pipe_od: "10", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy With O", dash: "12", pipe_od: "12", thread: "M20X1.5", variant: null, dsc_code: "M20X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy With O", dash: "14", pipe_od: "14", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy With O", dash: "16", pipe_od: "16", thread: "M24X1.5", variant: null, dsc_code: "M24X1.5" },
    {thread_type: "METRIC", metric_type: "Heavy With O", dash: "20", pipe_od: "20", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    {thread_type: "METRIC", metric_type: "Heavy With O", dash: "25", pipe_od: "25", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    {thread_type: "METRIC", metric_type: "Heavy With O", dash: "30", pipe_od: "30", thread: "M42X2.0", variant: null, dsc_code: "M42X2.0" },
    {thread_type: "METRIC", metric_type: "Heavy With O", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    //metricThreadOrfs
    { thread_type: "METRIC THREAD ORFS", dash: "08", inchs: "1/2\"",inch:"M22X1.5", thread: "M22X1.5", dsc_code: "22X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "08", inchs: "1/2\"",inch:"M26X1.5", thread: "M26X1.5", dsc_code: "26X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "10", inchs: "5/8\"",inch:"M27X1.5", thread: "M27X1.5", dsc_code: "27X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "10", inchs: "5/8\"",inch:"M26X1.5", thread: "M26X1.5", dsc_code: "26X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "12", inchs: "3/4\"",inch:"M27X1.5", thread: "M27X1.5", dsc_code: "27X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "12", inchs: "3/4\"",inch:"M26X1.5", thread: "M26X1.5", dsc_code: "26X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "12", inchs: "3/4\"",inch:"M38X1.5", thread: "M38X1.5", dsc_code: "38X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"",inch:"M39X2", thread: "M39X2", dsc_code: "39X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"",inch:"M36X2.0", thread: "M36X2.0", dsc_code: "36X2.0" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"",inch:"M38X1.5", thread: "M38X1.5", dsc_code: "38X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"",inch:"M42X2", thread: "M42X2", dsc_code: "42X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "20", inchs: "1-1/4\"",inch:"M42X2", thread: "M42X2", dsc_code: "42X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "20", inchs: "1-1/4\"",inch:"M45X2", thread: "M45X2", dsc_code: "45X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "20", inchs: "1-1/4\"",inch:"M52X2", thread: "M52X2", dsc_code: "52X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "24", inchs: "1-1/2\"",inch:"M52X2", thread: "M52X2", dsc_code: "52X2" }


];


// Function to get fitting dash size based on fitting thread and size
function getFittingDashSize(fittingThread, fittingDashSize, metricType, pipeOD) {

    // Match fitting thread type with dash size options
    for (const option of fittingDashSizeOptions) {
        if (option.thread_type == fittingThread && option.thread == fittingDashSize) {
            return option.dash; // Return the corresponding dash size code
        }
        if(option.thread_type == fittingThread && option.pipe_od == pipeOD && option.thread == fittingDashSize && option.metric_type == metricType){
            return option.dash
        }
    }
    // If no matching option is found, return a default value or handle error as needed
    return "N/A";
}

// Function to get fitting DESCRIPTION size based on fitting thread and size
function getFittingDashdscSize(fittingThread, fittingDashSize, metricType,pipeOD) {
    // Match fitting thread type with dash size options
    for (const option of fittingDashSizeOptions) {
        if (option.thread_type == fittingThread && option.thread == fittingDashSize) {
            return option.dsc_code; // Return the corresponding dash size code
        }
       
        if(option.thread_type == fittingThread && option.pipe_od == pipeOD && option.thread == fittingDashSize && option.metric_type == metricType){
            return option.dsc_code
        }
    }
    // If no matching option is found, return a default value or handle error as needed
    return "Not";
}

// Create maps for quick lookup
const createMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.code;
    return map;
}, {});

// Create dsc maps for quick lookup
const createDscMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.dsc_code;
    return map;
}, {});

//DESCRIPTION 
const fittingThreadDscMap = createDscMap(fittingThreadOptions);
const fittingTypeDscMap = createDscMap(fittingTypeOptions);
const hoseDashSizeDscMap = createDscMap(hoseDashSizeOptions);
const straightBendangleDscMap = createDscMap(straightBendangleOptions);
const skiveTypDsceMap = createDscMap(skiveTypeOptions);
const wireTypeDscMap = createDscMap(wireTypeOptions);
const withFerruleDscMap = createDscMap(CapWithoutCapOptions)

//FITTING CODE
const fittingThreadMap = createMap(fittingThreadOptions);
const fittingTypeMap = createMap(fittingTypeOptions);
const straightBendangleMap = createMap(straightBendangleOptions);
const wireTypeMap = createMap(wireTypeOptions);
const fittingPieceMap = createMap(fittingPieceOptions);
const skiveTypeMap = createMap(skiveTypeOptions);
const hoseDashSizeMap = createMap(hoseDashSizeOptions);
const designMap = createMap(designOption);
const withFerruleMap = createMap(CapWithoutCapOptions)



// Import products from an Excel file
const bulkimport = async (filePath) => {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (!sheetData.length) {
            throw new Error("No data found in the uploaded file");
        }

        // Fetch last assigned product codes for all unique categories in the sheet
        const categories = [...new Set(sheetData.map(row => row["wire_type"]))];
        const productCounters = await ProductCodeCounter.find({ category: { $in: categories } });

        // Create a map for quick lookup of last assigned product codes
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }


        // Process and save each product
        const products = sheetData.map((row) => {
            const design = row["design"] || "";
            const fittingThread = row["fitting_thread"] || "";
            const fittingType = row["fitting_type"] || "";
            const straightBendAngle = row["straight_bend_angle"] || "";
            const wireType = row["wire_type"] || "";
            const withCap = row["ferrule"] || "";
            const fittingPiece = row["fitting_piece"] || "";
            const skiveType = row["skive_type"] || "";
            const hoseDashSize = row["hose_dash_size"] || "";
            const fittingDashSize = row["fitting_dash_size"] || row["od"]  || "";
            const dropLength = row["drop_length"] || "";
            const metricType = row["metric_type"] || "";
            const pipeOD = row['pipe_od'] || "";


            console.log("fittingThread fittingThread fittingThread fittingThread",fittingThread,fittingDashSize,metricType,pipeOD)

            //For Product Code
            if (!categoryCodeMap[wireType]) {
                throw new Error(`Category series code not found for wire type: ${wireType}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[wireType] += 1;
            const product_code = categoryCodeMap[wireType];

            //code
            const fittingThreadCode = fittingThreadMap[fittingThread] || "";
            const fittingTypeCode = fittingTypeMap[fittingType] || "";
            const straightBendAngleCode = straightBendangleMap[straightBendAngle.trim()] || "";
            const wireTypeCode = wireTypeMap[wireType] || "";
            const fittingPieceCode = fittingPieceMap[fittingPiece] || "";
            const skiveTypeCode = skiveTypeMap[skiveType] || "";
            const hoseDashSizeCode = hoseDashSizeMap[hoseDashSize] || "";
            const designCode = designMap[design] || "";
            // Get the corresponding dash size
            const fittingdashSizeCode = getFittingDashSize(fittingThread, fittingDashSize, metricType, pipeOD);
            const withCapCode = withFerruleMap[withCap] || "";


            //DESCRIPTION
            const fittingThreadDscCode = fittingThreadDscMap[fittingThread] || "";
            const fittingTypeDscCode = fittingTypeDscMap[fittingType] || "";
            const hoseDashSizedscCode = hoseDashSizeDscMap[hoseDashSize] || "";
            const straightBendAngleDscCode = straightBendangleDscMap[straightBendAngle] || "";
            const skiveTypeDscCode = skiveTypDsceMap[skiveType] || "";
            const wireTypeDscCode = wireTypeDscMap[wireType] || "";
            const fittingdashSizeDscCode = getFittingDashdscSize(fittingThread, fittingDashSize, metricType, pipeOD);
            const withCapDscCode = withFerruleDscMap[withCap] || "";


            console.log("fittingThread fittingThread fittingThread fittingThread",fittingdashSizeDscCode)


            const desc_Code = `${wireTypeDscCode}-${fittingThreadDscCode} ${hoseDashSizedscCode}X${fittingdashSizeDscCode} ${fittingTypeDscCode} ${straightBendAngleDscCode} ${skiveTypeDscCode} ${dropLength ? "DL-"+dropLength : ""} ${withCapDscCode}`.trim();

            const fitting_Code = `${row["design"] || ""}${wireTypeCode}${fittingPieceCode}-${skiveTypeCode}-${hoseDashSizeCode}${fittingdashSizeCode}${fittingThreadCode ? "-"+fittingThreadCode : ''}${fittingTypeCode? "-"+fittingTypeCode : ""}${straightBendAngleCode}${dropLength ? "-" + dropLength : ""}${withCapCode ? '-'+withCapCode : ""}`.trim();


            return {
                ...row,
                product_code,
                desc_Code,
                fitting_Code,
            };
        });
        
        //Create Products in db
        await Products.insertMany(products);

        // Update productCounter table with the last assigned product codes
        await Promise.all(
            categories.map(category => 
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[category] } }
                )
            )
        );

        return products.length;
    } catch (error) {
        console.error("Error importing products:", error);
        throw error;
    }
};

module.exports = {
    bulkimport,
};
