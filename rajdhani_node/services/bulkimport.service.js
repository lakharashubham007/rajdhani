const XLSX = require("xlsx");
const { Products, ProductCodeCounter } = require("../models");

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

const wireTypeCapOptions = [
    { value: "Braided", code: "B", dsc_code: "Braided" },
    { value: "Spiral", code: "S", dsc_code: "Spiral" },
    { value: "Teflon", code: "T", dsc_code: "Teflon" },
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
    { thread_type: "BANJO WITHOUT O", dash: "10", inch: "10", thread: "10", variant: "Standard", dsc_code: "10" },
    { thread_type: "BANJO WITHOUT O", dash: "12", inch: "12", thread: "12", variant: "Standard", dsc_code: "12" },
    { thread_type: "BANJO WITHOUT O", dash: "14", inch: "14", thread: "14", variant: "Standard", dsc_code: "14" },
    { thread_type: "BANJO WITHOUT O", dash: "16", inch: "16", thread: "16", variant: "Standard", dsc_code: "16" },
    { thread_type: "BANJO WITHOUT O", dash: "18", inch: "18", thread: "18", variant: "Standard", dsc_code: "18" },
    { thread_type: "BANJO WITHOUT O", dash: "22", inch: "22", thread: "22", variant: "Standard", dsc_code: "22" },

    // BANJO WITH O 
    { thread_type: "BANJO WITH O", dash: "10", inch: "10", thread: "10", variant: "Standard", dsc_code: "10" },
    { thread_type: "BANJO WITH O", dash: "12", inch: "12", thread: "12", variant: "Standard", dsc_code: "12" },
    { thread_type: "BANJO WITH O", dash: "14", inch: "14", thread: "14", variant: "Standard", dsc_code: "14" },
    { thread_type: "BANJO WITH O", dash: "16", inch: "16", thread: "16", variant: "Standard", dsc_code: "16" },
    { thread_type: "BANJO WITH O", dash: "18", inch: "18", thread: "18", variant: "Standard", dsc_code: "18" },
    { thread_type: "BANJO WITH O", dash: "22", inch: "22", thread: "22", variant: "Standard", dsc_code: "22" },


    // Metric Light
    { thread_type: "METRIC", metric_type: "Light", dash: "06", pipe_od: "06", thread: "M12X1.5", variant: null, dsc_code: "M12X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "08", pipe_od: "08", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "10", pipe_od: "10", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "12", pipe_od: "12", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "15", pipe_od: "15", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "18", pipe_od: "18", thread: "M26X1.5", variant: null, dsc_code: "M26X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "22", pipe_od: "22", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { thread_type: "METRIC", metric_type: "Light", dash: "28", pipe_od: "28", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { thread_type: "METRIC", metric_type: "Light", dash: "35", pipe_od: "35", thread: "M45X2.0", variant: null, dsc_code: "M45X2.0" },
    { thread_type: "METRIC", metric_type: "Light", dash: "42", pipe_od: "42", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Heavy
    { thread_type: "METRIC", metric_type: "Heavy", dash: "06", pipe_od: "06", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "08", pipe_od: "08", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "10", pipe_od: "10", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "12", pipe_od: "12", thread: "M20X1.5", variant: null, dsc_code: "M20X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "14", pipe_od: "14", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "16", pipe_od: "16", thread: "M24X1.5", variant: null, dsc_code: "M24X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "20", pipe_od: "20", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "25", pipe_od: "25", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "30", pipe_od: "30", thread: "M42X2.0", variant: null, dsc_code: "M42X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Light With O
    { thread_type: "METRIC", metric_type: "Light With O", dash: "06", pipe_od: "06", thread: "M12X1.5", variant: null, dsc_code: "M12X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "08", pipe_od: "08", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "10", pipe_od: "10", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "12", pipe_od: "12", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "15", pipe_od: "15", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "18", pipe_od: "18", thread: "M26X1.5", variant: null, dsc_code: "M26X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "22", pipe_od: "22", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "28", pipe_od: "28", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "35", pipe_od: "35", thread: "M45X2.0", variant: null, dsc_code: "M45X2.0" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "42", pipe_od: "42", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Heavy With O
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "06", pipe_od: "06", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "08", pipe_od: "08", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "10", pipe_od: "10", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "12", pipe_od: "12", thread: "M20X1.5", variant: null, dsc_code: "M20X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "14", pipe_od: "14", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "16", pipe_od: "16", thread: "M24X1.5", variant: null, dsc_code: "M24X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "20", pipe_od: "20", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "25", pipe_od: "25", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "30", pipe_od: "30", thread: "M42X2.0", variant: null, dsc_code: "M42X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    //metricThreadOrfs
    { thread_type: "METRIC THREAD ORFS", dash: "08", inchs: "1/2\"", inch: "M22X1.5", thread: "M22X1.5", dsc_code: "22X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "08", inchs: "1/2\"", inch: "M26X1.5", thread: "M26X1.5", dsc_code: "26X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "10", inchs: "5/8\"", inch: "M27X1.5", thread: "M27X1.5", dsc_code: "27X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "10", inchs: "5/8\"", inch: "M26X1.5", thread: "M26X1.5", dsc_code: "26X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "12", inchs: "3/4\"", inch: "M27X1.5", thread: "M27X1.5", dsc_code: "27X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "12", inchs: "3/4\"", inch: "M26X1.5", thread: "M26X1.5", dsc_code: "26X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "12", inchs: "3/4\"", inch: "M38X1.5", thread: "M38X1.5", dsc_code: "38X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"", inch: "M39X2", thread: "M39X2", dsc_code: "39X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"", inch: "M36X2.0", thread: "M36X2.0", dsc_code: "36X2.0" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"", inch: "M38X1.5", thread: "M38X1.5", dsc_code: "38X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"", inch: "M42X2", thread: "M42X2", dsc_code: "42X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "20", inchs: "1-1/4\"", inch: "M42X2", thread: "M42X2", dsc_code: "42X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "20", inchs: "1-1/4\"", inch: "M45X2", thread: "M45X2", dsc_code: "45X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "20", inchs: "1-1/4\"", inch: "M52X2", thread: "M52X2", dsc_code: "52X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "24", inchs: "1-1/2\"", inch: "M52X2", thread: "M52X2", dsc_code: "52X2" }


];

const fittingOringDashSizeOptions = [
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
    { thread_type: "Flange", dash: "08", thread: "30.3", inch: "30.3\"", variant: "Standard", dsc_code: "30.3" },
    { thread_type: "Flange", dash: "12", thread: "38.1", inch: "38.1\"", variant: null, dsc_code: "38.1" },
    { thread_type: "Flange", dash: "16", thread: "44.4", inch: "44.4\"", variant: null, dsc_code: "44.4" },
    { thread_type: "Flange", dash: "20", thread: "50.8", inch: "50.8\"", variant: null, dsc_code: "50.8" },
    { thread_type: "Flange", dash: "24", thread: "60.3", inch: "60.3\"", variant: null, dsc_code: "60.3" },
    { thread_type: "Flange", dash: "32", thread: "71", inch: "71\"", variant: null, dsc_code: "71" },

    // SAE 62
    { thread_type: "Flange", dash: "08", thread: "32", inch: "32\"", variant: "Standard", dsc_code: "32" },
    { thread_type: "Flange", dash: "10", thread: "34", inch: "34\"", variant: null, dsc_code: "34" },
    { thread_type: "Flange", dash: "12", thread: "41.4", inch: "41.4\"", variant: null, dsc_code: "41.4" },
    { thread_type: "Flange", dash: "16", thread: "47.4", inch: "47.4\"", variant: null, dsc_code: "47.4" },
    { thread_type: "Flange", dash: "20", thread: "54", inch: "54\"", variant: null, dsc_code: "54" },
    { thread_type: "Flange", dash: "24", thread: "63.5", inch: "63.5\"", variant: null, dsc_code: "63.5" },
    { thread_type: "Flange", dash: "32", thread: "79.6", inch: "79.6\"", variant: null, dsc_code: "79.6" },

    // BANJO WITHOUT O 
    { thread_type: "BANJO WITHOUT O", dash: "10", inch: "10", thread: "10", variant: "Standard", dsc_code: "10" },
    { thread_type: "BANJO WITHOUT O", dash: "12", inch: "12", thread: "12", variant: "Standard", dsc_code: "12" },
    { thread_type: "BANJO WITHOUT O", dash: "14", inch: "14", thread: "14", variant: "Standard", dsc_code: "14" },
    { thread_type: "BANJO WITHOUT O", dash: "16", inch: "16", thread: "16", variant: "Standard", dsc_code: "16" },
    { thread_type: "BANJO WITHOUT O", dash: "18", inch: "18", thread: "18", variant: "Standard", dsc_code: "18" },
    { thread_type: "BANJO WITHOUT O", dash: "22", inch: "22", thread: "22", variant: "Standard", dsc_code: "22" },

    // BANJO WITH O 
    { thread_type: "BANJO WITH O", dash: "10", inch: "10", thread: "10", variant: "Standard", dsc_code: "10" },
    { thread_type: "BANJO WITH O", dash: "12", inch: "12", thread: "12", variant: "Standard", dsc_code: "12" },
    { thread_type: "BANJO WITH O", dash: "14", inch: "14", thread: "14", variant: "Standard", dsc_code: "14" },
    { thread_type: "BANJO WITH O", dash: "16", inch: "16", thread: "16", variant: "Standard", dsc_code: "16" },
    { thread_type: "BANJO WITH O", dash: "18", inch: "18", thread: "18", variant: "Standard", dsc_code: "18" },
    { thread_type: "BANJO WITH O", dash: "22", inch: "22", thread: "22", variant: "Standard", dsc_code: "22" },


    // Metric Light
    { thread_type: "METRIC", metric_type: "Light", dash: "06", pipe_od: "06", thread: "M12X1.5", variant: null, dsc_code: "M12X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "08", pipe_od: "08", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "10", pipe_od: "10", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "12", pipe_od: "12", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "15", pipe_od: "15", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "18", pipe_od: "18", thread: "M26X1.5", variant: null, dsc_code: "M26X1.5" },
    { thread_type: "METRIC", metric_type: "Light", dash: "22", pipe_od: "22", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { thread_type: "METRIC", metric_type: "Light", dash: "28", pipe_od: "28", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { thread_type: "METRIC", metric_type: "Light", dash: "35", pipe_od: "35", thread: "M45X2.0", variant: null, dsc_code: "M45X2.0" },
    { thread_type: "METRIC", metric_type: "Light", dash: "42", pipe_od: "42", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Heavy
    { thread_type: "METRIC", metric_type: "Heavy", dash: "06", pipe_od: "06", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "08", pipe_od: "08", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "10", pipe_od: "10", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "12", pipe_od: "12", thread: "M20X1.5", variant: null, dsc_code: "M20X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "14", pipe_od: "14", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "16", pipe_od: "16", thread: "M24X1.5", variant: null, dsc_code: "M24X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "20", pipe_od: "20", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "25", pipe_od: "25", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "30", pipe_od: "30", thread: "M42X2.0", variant: null, dsc_code: "M42X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Light With O
    { thread_type: "METRIC", metric_type: "Light With O", dash: "06", pipe_od: "06", thread: "M12X1.5", variant: null, dsc_code: "M12X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "08", pipe_od: "08", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "10", pipe_od: "10", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "12", pipe_od: "12", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "15", pipe_od: "15", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "18", pipe_od: "18", thread: "M26X1.5", variant: null, dsc_code: "M26X1.5" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "22", pipe_od: "22", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "28", pipe_od: "28", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "35", pipe_od: "35", thread: "M45X2.0", variant: null, dsc_code: "M45X2.0" },
    { thread_type: "METRIC", metric_type: "Light With O", dash: "42", pipe_od: "42", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Heavy With O
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "06", pipe_od: "06", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "08", pipe_od: "08", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "10", pipe_od: "10", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "12", pipe_od: "12", thread: "M20X1.5", variant: null, dsc_code: "M20X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "14", pipe_od: "14", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "16", pipe_od: "16", thread: "M24X1.5", variant: null, dsc_code: "M24X1.5" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "20", pipe_od: "20", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "25", pipe_od: "25", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "30", pipe_od: "30", thread: "M42X2.0", variant: null, dsc_code: "M42X2.0" },
    { thread_type: "METRIC", metric_type: "Heavy With O", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    //metricThreadOrfs
    { thread_type: "METRIC THREAD ORFS", dash: "08", inchs: "1/2\"", inch: "M22X1.5", thread: "M22X1.5", dsc_code: "22X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "08", inchs: "1/2\"", inch: "M26X1.5", thread: "M26X1.5", dsc_code: "26X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "10", inchs: "5/8\"", inch: "M27X1.5", thread: "M27X1.5", dsc_code: "27X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "10", inchs: "5/8\"", inch: "M26X1.5", thread: "M26X1.5", dsc_code: "26X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "12", inchs: "3/4\"", inch: "M27X1.5", thread: "M27X1.5", dsc_code: "27X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "12", inchs: "3/4\"", inch: "M26X1.5", thread: "M26X1.5", dsc_code: "26X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "12", inchs: "3/4\"", inch: "M38X1.5", thread: "M38X1.5", dsc_code: "38X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"", inch: "M39X2", thread: "M39X2", dsc_code: "39X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"", inch: "M36X2.0", thread: "M36X2.0", dsc_code: "36X2.0" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"", inch: "M38X1.5", thread: "M38X1.5", dsc_code: "38X1.5" },
    { thread_type: "METRIC THREAD ORFS", dash: "16", inchs: "1\"", inch: "M42X2", thread: "M42X2", dsc_code: "42X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "20", inchs: "1-1/4\"", inch: "M42X2", thread: "M42X2", dsc_code: "42X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "20", inchs: "1-1/4\"", inch: "M45X2", thread: "M45X2", dsc_code: "45X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "20", inchs: "1-1/4\"", inch: "M52X2", thread: "M52X2", dsc_code: "52X2" },
    { thread_type: "METRIC THREAD ORFS", dash: "24", inchs: "1-1/2\"", inch: "M52X2", thread: "M52X2", dsc_code: "52X2" }


];

const nutFittingThreadOptions = [
    { value: "BSP", label: "BSP (B)", code: "B", dsc_code: "BSP" },
    { value: "JIC", label: "JIC (J)", code: "J", dsc_code: "JIC" },
    { value: "ORFS", label: "ORFS (O)", code: "O", dsc_code: "ORFS" },
    { value: "METRIC KOMATSU", label: "METRIC KOMATSU (MK)", code: "MK", dsc_code: "METRIC KOMATSU" },
    { value: "METRIC LIGHT", label: "METRIC(LIGHT) (DL)", code: "DL", dsc_code: "METRIC LIGHT" },
    { value: "METRIC HEAVY", label: "METRIC(HEAVY) (DH)", code: "DH", dsc_code: "METRIC HEAVY" },
    { value: "JIS", label: "JIS (BSP C-TYPE) (BJ)", code: "BJ", dsc_code: "JIS" }
];

const nutFittingDashSize = [
    // BSP
    { thread_type: "BSP", dash: "04", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
    { thread_type: "BSP", dash: "05", inch: "5/16\"", thread: "5/16\"", dsc_code: "5/16\"", variant: "Standard" },
    { thread_type: "BSP", dash: "06", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
    { thread_type: "BSP", dash: "08", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
    { thread_type: "BSP", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8\"", variant: "Standard" },
    { thread_type: "BSP", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
    { thread_type: "BSP", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
    { thread_type: "BSP", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
    { thread_type: "BSP", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
    { thread_type: "BSP", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },


    // JIC
    { thread_type: "JIC", dash: "04", inch: "1/4\"", thread: "7/16\"", dsc_code: "7/16\"", variant: "Standard" },
    { thread_type: "JIC", dash: "05", inch: "5/16\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
    { thread_type: "JIC", dash: "06", inch: "3/8\"", thread: "9/16\"", dsc_code: "9/16\"", variant: "Standard" },
    { thread_type: "JIC", dash: "08", inch: "1/2\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
    { thread_type: "JIC", dash: "10", inch: "5/8\"", thread: "7/8\"", dsc_code: "7/8\"", variant: "Standard" },
    { thread_type: "JIC", dash: "12", inch: "3/4\"", thread: "1-1/16\"", dsc_code: "1-1/16\"", variant: "Standard" },
    { thread_type: "JIC", dash: "16", inch: "1\"", thread: "1-5/16\"", dsc_code: "1-5/16\"", variant: "Standard" },
    { thread_type: "JIC", dash: "20", inch: "1-1/4\"", thread: "1-5/8\"", dsc_code: "1-5/8\"", variant: "Standard" },
    { thread_type: "JIC", dash: "24", inch: "1-1/2\"", thread: "1-7/8\"", dsc_code: "1-7/8\"", variant: "Standard" },
    { thread_type: "JIC", dash: "32", inch: "2\"", thread: "2-1/2\"", dsc_code: "2-1/2\"", variant: "Standard" },

    // NPT
    { thread_type: "NPT", dash: "04", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
    //  { thread_type: "NPT", dash: "05", inch: "5/16\"", thread: "", dsc_code: "", variant: "Standard" },
    { thread_type: "NPT", dash: "06", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
    { thread_type: "NPT", dash: "08", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
    //  { thread_type: "NPT", dash: "10", inch: "5/8\"", thread: "", dsc_code: "", variant: "Standard" },
    { thread_type: "NPT", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
    { thread_type: "NPT", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
    { thread_type: "NPT", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
    { thread_type: "NPT", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
    { thread_type: "NPT", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },

    // JIS
    { thread_type: "JIS", dash: "04", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
    //  { thread_type: "JIS", dash: "05", inch: "5/16\"", thread: "", dsc_code: "", variant: "Standard" },
    { thread_type: "JIS", dash: "06", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
    { thread_type: "JIS", dash: "08", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
    { thread_type: "JIS", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8\"", variant: "Standard" },
    { thread_type: "JIS", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
    { thread_type: "JIS", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
    { thread_type: "JIS", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
    { thread_type: "JIS", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
    { thread_type: "JIS", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },

    // ORFS
    { thread_type: "ORFS", dash: "04", inch: "1/4\"", thread: "9/16\"", dsc_code: "9/16\"", variant: "Standard" },
    //  { thread_type: "ORFS", dash: "05", inch: "5/16\"", thread: "", dsc_code: "", variant: "Standard" },
    { thread_type: "ORFS", dash: "06", inch: "3/8\"", thread: "11/16\"", dsc_code: "11/16\"", variant: "Standard" },
    { thread_type: "ORFS", dash: "08", inch: "1/2\"", thread: "13/16\"", dsc_code: "13/16\"", variant: "Standard" },
    { thread_type: "ORFS", dash: "10", inch: "5/8\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
    { thread_type: "ORFS", dash: "12", inch: "3/4\"", thread: "1-3/16\"", dsc_code: "1-3/16\"", variant: "Standard" },
    { thread_type: "ORFS", dash: "16", inch: "1\"", thread: "1-7/16\"", dsc_code: "1-7/16\"", variant: "Standard" },
    { thread_type: "ORFS", dash: "20", inch: "1-1/4\"", thread: "1-11/16\"", dsc_code: "1-11/16\"", variant: "Standard" },
    { thread_type: "ORFS", dash: "24", inch: "1-1/2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },
    //  { thread_type: "ORFS", dash: "32", inch: "2\"", thread: "", dsc_code: "", variant: "Standard" },

    // KOMATSU
    { thread_type: "METRIC KOMATSU", dash: "04", inch: "1/4\"", thread: "14X1.5", dsc_code: "14X1.5", variant: "Standard" },
    // { thread_type: "KOMATSU", dash: "05", inch: "5/16\"", thread: "", dsc_code: "", variant: "Standard" },
    { thread_type: "METRIC KOMATSU", dash: "06", inch: "3/8\"", thread: "18X1.5", dsc_code: "18X1.5", variant: "Standard" },
    { thread_type: "METRIC KOMATSU", dash: "08", inch: "1/2\"", thread: "22X1.5", dsc_code: "22X1.5", variant: "Standard" },
    { thread_type: "METRIC KOMATSU", dash: "10", inch: "5/8\"", thread: "24X1.5", dsc_code: "24X1.5", variant: "Standard" },
    { thread_type: "METRIC KOMATSU", dash: "12", inch: "3/4\"", thread: "30X1.5", dsc_code: "30X1.5", variant: "Standard" },
    { thread_type: "METRIC KOMATSU", dash: "16", inch: "1\"", thread: "33X1.5", dsc_code: "33X1.5", variant: "Standard" },
    { thread_type: "METRIC KOMATSU", dash: "20", inch: "1-1/4\"", thread: "36X1.5", dsc_code: "36X1.5", variant: "Standard" },
    { thread_type: "METRIC KOMATSU", dash: "24", inch: "1-1/2\"", thread: "42X1.5", dsc_code: "42X1.5", variant: "Standard" },
    // { thread_type: "KOMATSU", dash: "32", inch: "2\"", thread: "", dsc_code: "", variant: "Standard" },

    // Metric Light
    { thread_type: "METRIC LIGHT", dash: "06", pipe_od: "06", thread: "M12X1.5", variant: null, dsc_code: "M12X1.5" },
    { thread_type: "METRIC LIGHT", dash: "08", pipe_od: "08", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { thread_type: "METRIC LIGHT", dash: "10", pipe_od: "10", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { thread_type: "METRIC LIGHT", dash: "12", pipe_od: "12", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { thread_type: "METRIC LIGHT", dash: "15", pipe_od: "15", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { thread_type: "METRIC LIGHT", dash: "18", pipe_od: "18", thread: "M26X1.5", variant: null, dsc_code: "M26X1.5" },
    { thread_type: "METRIC LIGHT", dash: "22", pipe_od: "22", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { thread_type: "METRIC LIGHT", dash: "28", pipe_od: "28", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { thread_type: "METRIC LIGHT", dash: "35", pipe_od: "35", thread: "M45X2.0", variant: null, dsc_code: "M45X2.0" },
    { thread_type: "METRIC LIGHT", dash: "42", pipe_od: "42", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Heavy
    { thread_type: "METRIC HEAVY", dash: "06", pipe_od: "06", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { thread_type: "METRIC HEAVY", dash: "08", pipe_od: "08", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { thread_type: "METRIC HEAVY", dash: "10", pipe_od: "10", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { thread_type: "METRIC HEAVY", dash: "12", pipe_od: "12", thread: "M20X1.5", variant: null, dsc_code: "M20X1.5" },
    { thread_type: "METRIC HEAVY", dash: "14", pipe_od: "14", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { thread_type: "METRIC HEAVY", dash: "16", pipe_od: "16", thread: "M24X1.5", variant: null, dsc_code: "M24X1.5" },
    { thread_type: "METRIC HEAVY", dash: "20", pipe_od: "20", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { thread_type: "METRIC HEAVY", dash: "25", pipe_od: "25", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { thread_type: "METRIC HEAVY", dash: "30", pipe_od: "30", thread: "M42X2.0", variant: null, dsc_code: "M42X2.0" },
    { thread_type: "METRIC HEAVY", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

];

const nippleFittingThreadOptions = [
    { value: "BSP", label: "BSP (B)", code: "B", dsc_code: "BSP" },
    { value: "BSP ORING", label: "BSP ORING (BO)", code: "BO", dsc_code: "BSP ORING" },
    { value: "JIC", label: "JIC (J)", code: "J", dsc_code: "JIC" },
    { value: "ORFS", label: "ORFS (O)", code: "O", dsc_code: "ORFS" },
    { value: "METRIC KOMATSU", label: "METRIC KOMATSU (MK)", code: "MK", dsc_code: "METRIC KOMATSU" },
    { value: "METRIC LIGHT", label: "METRIC(LIGHT) (DL)", code: "DL", dsc_code: "METRIC LIGHT" },
    { value: "METRIC LIGHT WITH O", label: "METRIC(LIGHT) WITH O (DLO)", code: "DLO", dsc_code: "METRIC LIGHT WITH O" },
    { value: "METRIC HEAVY", label: "METRIC(HEAVY) (DH)", code: "DH", dsc_code: "METRIC HEAVY" },
    { value: "METRIC HEAVY WITH O", label: "METRIC(HEAVY) WITH O (DHO)", code: "DHO", dsc_code: "METRIC HEAVY WITH O" },
    { value: "JIS", label: "JIS (BSP C-TYPE) (BJ)", code: "BJ", dsc_code: "JIS" },
    { value: "METRIC THREAD ORFS", label: "METRIC THREAD ORFS (MO)", code: "MO", dsc_code: "METRIC THREAD ORFS" }
];

const MFCOptions = [
    { value: "MFC", label: "MFC", code: "MFC", dsc_code: "MFC" },
    { value: "IBL", label: "IBL", code: "IBL", dsc_code: "IBL" },
    { value: "BPL", label: "BPL", code: "IBL", dsc_code: "BPL" },
    { value: "BSR", label: "BSR", code: "BSR", dsc_code: "BSR" },
    { value: "IBN", label: "IBN", code: "IBN", dsc_code: "IBN" },
    { value: "BIN", label: "BIN", code: "BIN", dsc_code: "BIN" },
    { value: "ILT", label: "ILT", code: "ILT", dsc_code: "ILT" },
    { value: "None", label: "None", code: "", dsc_code: "" }
];


const BrandLayLineOptions = [
    { value: "ADVANCE", label: "ADVANCE", code: "ADVANCE", dsc_code: "ADVANCE" },
    { value: "RAJDHANI", label: "RAJDHANI", code: "RAJDHANI", dsc_code: "RAJDHANI" },
    { value: "PRO", label: "PRO", code: "PRO", dsc_code: "PRO" },
    { value: "MINEXPERT", label: "MINEXPERT", code: "MINEXPERT", dsc_code: "MINEXPERT" },
    { value: "R PARTS", label: "R PARTS", code: "R PARTS", dsc_code: "R PARTS" },
    { value: "ADVANCE SHIELD", label: "ADVANCE SHIELD", code: "ADVANCE SHIELD", dsc_code: "ADVANCE SHIELD" },
    { value: "BCS174", label: "BCS174", code: "BCS174", dsc_code: "BCS174" },
    { value: "EATON", label: "EATON", code: "EATON", dsc_code: "EATON" },
    { value: "EUROFLEX", label: "EUROFLEX", code: "EUROFLEX", dsc_code: "EUROFLEX" },
    { value: "MANULI", label: "MANULI", code: "MANULI", dsc_code: "MANULI" },
    { value: "SB FLEX", label: "SB FLEX", code: "SB FLEX", dsc_code: "SB FLEX" },
    { value: "SB PARTS", label: "SB PARTS", code: "SB PARTS", dsc_code: "SB PARTS" },
    { value: "SEMPRIT", label: "SEMPRIT", code: "SEMPRIT", dsc_code: "SEMPRIT" },
    { value: "INDO", label: "INDO", code: "INDO", dsc_code: "INDO" }
];


const HoseTypeOptions = [
    { value: "R1", label: "R1", code: "R1", dsc_code: "R1" },
    { value: "R2", label: "R2", code: "R2", dsc_code: "R2" },
    { value: "R3", label: "R3", code: "R3", dsc_code: "R3" },
    { value: "R4", label: "R4", code: "R4", dsc_code: "R4" },
    { value: "R6", label: "R6", code: "R6", dsc_code: "R6" },
    { value: "4XP", label: "4XP", code: "4XP", dsc_code: "4XP" },
    { value: "4XH", label: "4XH", code: "4XH", dsc_code: "4XH" },
    { value: "R15", label: "R15", code: "R15", dsc_code: "R15" },
    { value: "TEFLON", label: "TEFLON", code: "R14", dsc_code: "R14" },
    { value: "R5", label: "R5", code: "R5", dsc_code: "R5" },
    { value: "R5R", label: "R5R", code: "R5R", dsc_code: "R5R" },
    { value: "R1(HT)", label: "R1(HT)", code: "R1(HT)", dsc_code: "R1(HT)" },
    { value: "R2(HT)", label: "R2(HT)", code: "R2(HT)", dsc_code: "R2(HT)" },
    { value: "EC(640)", label: "EC(640)", code: "EC(640)", dsc_code: "EC(640)" },
    { value: "Rockdrill", label: "Rockdrill", code: "RD", dsc_code: "Rockdrill" },
    { value: "Airdrill", label: "Airdrill", code: "AD", dsc_code: "Airdrill" },
    { value: "Pneumatic", label: "Pneumatic", code: "PU", dsc_code: "Pneumatic" },
    { value: "Chemical", label: "Chemical", code: "CH", dsc_code: "Chemical" },
    { value: "Airwater", label: "Airwater", code: "AW", dsc_code: "Airwater" },
    { value: "Steam", label: "Steam", code: "ST", dsc_code: "Steam" }
];


const dustCapColorsOption = [
    { value: "Red", label: "Red", dsc_code: "Red" },
    { value: "Blue", label: "Blue", dsc_code: "Blue" },
    { value: "Green", label: "Green", dsc_code: "Green" },
    { value: "Yellow", label: "Yellow", dsc_code: "Yellow" },
    { value: "Orange", label: "Orange", dsc_code: "Orange" },
    { value: "Purple", label: "Purple", dsc_code: "Purple" },
    { value: "Black", label: "Black", dsc_code: "Black" },
    { value: "White", label: "White", dsc_code: "White" },
    { value: "Brown", label: "Brown", dsc_code: "Brown" },
    { value: "Gray", label: "Gray", dsc_code: "Gray" },
    { value: "Pink", label: "Pink", dsc_code: "Pink" }
];

const sleeveSizesOption = [
    { value: "3/16", label: "3/16\"", dsc_code: "3/16\"" },
    { value: "1/4", label: "1/4\"", dsc_code: "1/4\"" },
    { value: "5/16", label: "5/16\"", dsc_code: "5/16\"" },
    { value: "3/8", label: "3/8\"", dsc_code: "3/8\"" },
    { value: "1/2", label: "1/2\"", dsc_code: "1/2\"" },
    { value: "5/8", label: "5/8\"", dsc_code: "5/8\"" },
    { value: "3/4", label: "3/4\"", dsc_code: "3/4\"" },
    { value: "1", label: "1\"", dsc_code: "1\"" },
    { value: "1-1/4", label: "1-1/4\"", dsc_code: "1-1/4\"" },
    { value: "1-1/2", label: "1-1/2\"", dsc_code: "1-1/2\"" },
    { value: "2", label: "2\"", dsc_code: "2\"" },
    { value: "2-1/2", label: "2-1/2\"", dsc_code: "2-1/2\"" },
    { value: "3", label: "3\"", dsc_code: "3\"" },
    { value: "3-1/2", label: "3-1/2\"", dsc_code: "3-1/2\"" },
    { value: "4", label: "4\"", dsc_code: "4\"" },
    { value: "4-1/2", label: "4-1/2\"", dsc_code: "4-1/2\"" },
    { value: "5", label: "5\"", dsc_code: "5\"" },
    { value: "13/32", label: "13/32\"", dsc_code: "13/32\"" },
    { value: "7/8", label: "7/8\"", dsc_code: "7/8\"" },
    { value: "1-1/8", label: "1-1/8\"", dsc_code: "1-1/8\"" },
    { value: "1-3/8", label: "1-3/8\"", dsc_code: "1-3/8\"" },
    { value: "1-13/16", label: "1-13/16\"", dsc_code: "1-13/16\"" },
    { value: "2-3/8", label: "2-3/8\"", dsc_code: "2-3/8\"" }
];

const vcSizesOption = [
    { value: "3/16", label: "3/16\"", dsc_code: "3/16\"" },
    { value: "1/4", label: "1/4\"", dsc_code: "1/4\"" },
    { value: "5/16", label: "5/16\"", dsc_code: "5/16\"" },
    { value: "3/8", label: "3/8\"", dsc_code: "3/8\"" },
    { value: "1/2", label: "1/2\"", dsc_code: "1/2\"" },
    { value: "5/8", label: "5/8\"", dsc_code: "5/8\"" },
    { value: "3/4", label: "3/4\"", dsc_code: "3/4\"" },
    { value: "1", label: "1\"", dsc_code: "1\"" },
    { value: "1-1/4", label: "1-1/4\"", dsc_code: "1-1/4\"" },
    { value: "1-1/2", label: "1-1/2\"", dsc_code: "1-1/2\"" },
    { value: "2", label: "2\"", dsc_code: "2\"" },
    { value: "2-1/2", label: "2-1/2\"", dsc_code: "2-1/2\"" },
    { value: "3", label: "3\"", dsc_code: "3\"" },
    { value: "3-1/2", label: "3-1/2\"", dsc_code: "3-1/2\"" },
    { value: "4", label: "4\"", dsc_code: "4\"" },
    { value: "4-1/2", label: "4-1/2\"", dsc_code: "4-1/2\"" },
    { value: "5", label: "5\"", dsc_code: "5\"" },
    { value: "13/32", label: "13/32\"", dsc_code: "13/32\"" },
    { value: "7/8", label: "7/8\"", dsc_code: "7/8\"" },
    { value: "1-1/8", label: "1-1/8\"", dsc_code: "1-1/8\"" },
    { value: "1-3/8", label: "1-3/8\"", dsc_code: "1-3/8\"" },
    { value: "1-13/16", label: "1-13/16\"", dsc_code: "1-13/16\"" },
    { value: "2-3/8", label: "2-3/8\"", dsc_code: "2-3/8\"" }
];

const dustCapThreadType = [
    { value: "BSP", label: "BSP", code: "B", dsc_code: "B" },
    { value: "UNF", label: "UNF", code: "UNF", dsc_code: "UNF" },
    { value: "Metric", label: "METRIC", code: "M", dsc_code: "M" },
    { value: "Flange", label: "Flange", code: "Flange", dsc_code: "Flange" },
];

const oRingThreadTypeOption = [
    { value: "BSP", label: "BSP", code: "B", dsc_code: "BSP" },
    { value: "ORFS", label: "ORFS", code: "O", dsc_code: "ORFS" },
    { value: "METRIC", label: "METRIC", code: "M", dsc_code: "" },
    { value: "Flange", label: "Flange", code: "Flange", dsc_code: "Flange" },
];

const dustCapMatricOption = [
    { thread_type: "METRIC", thread: "10X1", dsc_code: "10X1" },
    { thread_type: "METRIC", thread: "12X1.5", dsc_code: "12X1.5" },
    { thread_type: "METRIC", thread: "14X1.5", dsc_code: "14X1.5" },
    { thread_type: "METRIC", thread: "16X1.5", dsc_code: "16X1.5" },
    { thread_type: "METRIC", thread: "18X1.5", dsc_code: "18X1.5" },
    { thread_type: "METRIC", thread: "20X1.5", dsc_code: "20X1.5" },
    { thread_type: "METRIC", thread: "22X1.5", dsc_code: "22X1.5" },
    { thread_type: "METRIC", thread: "24X1.5", dsc_code: "24X1.5" },
    { thread_type: "METRIC", thread: "26X1.5", dsc_code: "26X1.5" },
    { thread_type: "METRIC", thread: "30X1.5", dsc_code: "30X1.5" },
    { thread_type: "METRIC", thread: "30X2", dsc_code: "30X2" },
    { thread_type: "METRIC", thread: "33X1.5", dsc_code: "33X1.5" },
    { thread_type: "METRIC", thread: "36X1.5", dsc_code: "36X1.5" },
    { thread_type: "METRIC", thread: "36X2", dsc_code: "36X2" },
    { thread_type: "METRIC", thread: "38X1.5", dsc_code: "38X1.5" },
    { thread_type: "METRIC", thread: "42X1.5", dsc_code: "42X1.5" },
    { thread_type: "METRIC", thread: "42X2", dsc_code: "42X2" },
    { thread_type: "METRIC", thread: "45X1.5", dsc_code: "45X1.5" },
    { thread_type: "METRIC", thread: "45X2", dsc_code: "45X2" },
    { thread_type: "METRIC", thread: "52X1.5", dsc_code: "52X1.5" },
    { thread_type: "METRIC", thread: "52X2", dsc_code: "52X2" },
    { thread_type: "METRIC", thread: "65X2", dsc_code: "65X2" }
];

const springTypeOption = [
    { value: "Compress", label: "Compress", dsc_code: "Compress" },
    { value: "Normal", label: "Normal", dsc_code: "" }
  ];


// Function to get fitting dash size based on fitting thread and size
function getFittingDashSize(fittingThread, fittingDashSize, metricType, pipeOD) {

    // Match fitting thread type with dash size options
    for (const option of fittingDashSizeOptions) {
        if (option.thread_type == fittingThread && option.thread == fittingDashSize) {
            return option.dash; // Return the corresponding dash size code
        }
        if (option.thread_type == fittingThread && option.pipe_od == pipeOD && option.thread == fittingDashSize && option.metric_type == metricType) {
            return option.dash
        }
    }
    // If no matching option is found, return a default value or handle error as needed
    return "N/A";
}

// Function to get fitting DESCRIPTION size based on fitting thread and size
function getFittingDashdscSize(fittingThread, fittingDashSize, metricType, pipeOD) {
    // Match fitting thread type with dash size options
    for (const option of fittingDashSizeOptions) {
        if (option.thread_type == fittingThread && option.thread == fittingDashSize) {
            return option.dsc_code; // Return the corresponding dash size code
        }

        if (option.thread_type == fittingThread && option.pipe_od == pipeOD && option.thread == fittingDashSize && option.metric_type == metricType) {
            return option.dsc_code
        }
    }
    // If no matching option is found, return a default value or handle error as needed
    return "Not";
}

// Function to get fitting DESCRIPTION size based on fitting thread and size
function getFittingDashOringdscSize(fittingThread, fittingDashSize, metricType, pipeOD) {
    // Match fitting thread type with dash size options
    for (const option of fittingOringDashSizeOptions) {
        if (option.thread_type == fittingThread && option.thread == fittingDashSize) {
            return option.dsc_code; // Return the corresponding dash size code
        }
        //This below condition is for metric option 
        if (option.thread_type == fittingThread && option.dash == fittingDashSize) {
            return option.dash; // Return the corresponding dash size code
        }

        if (option.thread_type == fittingThread && option.pipe_od == pipeOD && option.thread == fittingDashSize && option.metric_type == metricType) {
            return option.dsc_code
        }
    }
    // If no matching option is found, return a default value or handle error as needed
    return "Not";
}

// Function to get fitting DESCRIPTION size based on fitting thread and size
function getNutFittingDashdscSize(fittingThread, fittingDashSize, metricType, pipeOD) {
    // Match fitting thread type with dash size options
    for (const option of nutFittingDashSize) {
        if (option.thread_type == fittingThread && option.thread == fittingDashSize) {
            return option.dsc_code; // Return the corresponding dash size code
        }

        if (option.thread_type == fittingThread && option.pipe_od == pipeOD && option.thread == fittingDashSize && option.metric_type == metricType) {
            return option.dsc_code
        }
    }
    // If no matching option is found, return a default value or handle error as needed
    return "Not";
}

// Function to get Fitting Code dash size based on fitting thread and size
function getNutFittingDashSize(fittingThread, fittingDashSize, metricType, pipeOD) {

    // Match fitting thread type with dash size options
    for (const option of fittingDashSizeOptions) {
        if (option.thread_type == fittingThread && option.thread == fittingDashSize) {
            return option.dash; // Return the corresponding dash size code
        }
        if (option.thread_type == fittingThread && option.pipe_od == pipeOD && option.thread == fittingDashSize && option.metric_type == metricType) {
            return option.dash
        }
    }
    // If no matching option is found, return a default value or handle error as needed
    return "N/A";
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

//parts - Nut
// Create maps for quick lookup
const createNutMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.code;
    return map;
}, {});

// Create dsc maps for quick lookup
const createNutDscMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.dsc_code;
    return map;
}, {});

//parts - Nipple
// Create maps for quick lookup
const createNippleMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.code;
    return map;
}, {});

// Create dsc maps for quick lookup
const createNippleDscMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.dsc_code;
    return map;
}, {});

//parts - Cap
// Create maps for quick lookup
const createCapMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.code;
    return map;
}, {});

// Create dsc maps for quick lookup
const createCapDscMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.dsc_code;
    return map;
}, {});

//Hose Pipe
// Create dsc maps for quick lookup
const createHosePipeDscMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.dsc_code;
    return map;
}, {});
const createHosePipeFittingCodeMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.code;
    return map;
}, {});

const createOringFittingThreadDscMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.dsc_code;
    return map;
}, {});
const createoRingSizeDscMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.dsc_code;
    return map;
}, {});
const createdustCapFittingThreadDscMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.dsc_code;
    return map;
}, {});

const createSpringDscMap = (options) => options.reduce((map, option) => {
    map[option.value] = option.dsc_code;
    return map;
}, {});



///End Fittings - Fitting and Description option mapping with data
//DESCRIPTION -> End Fitting
const fittingThreadDscMap = createDscMap(fittingThreadOptions);
const fittingTypeDscMap = createDscMap(fittingTypeOptions);
const hoseDashSizeDscMap = createDscMap(hoseDashSizeOptions);
const straightBendangleDscMap = createDscMap(straightBendangleOptions);
const skiveTypDsceMap = createDscMap(skiveTypeOptions);
const wireTypeDscMap = createDscMap(wireTypeOptions);
const withFerruleDscMap = createDscMap(CapWithoutCapOptions)
//FITTING CODE -> End Fitting
const fittingThreadMap = createMap(fittingThreadOptions);
const fittingTypeMap = createMap(fittingTypeOptions);
const straightBendangleMap = createMap(straightBendangleOptions);
const wireTypeMap = createMap(wireTypeOptions);
const fittingPieceMap = createMap(fittingPieceOptions);
const skiveTypeMap = createMap(skiveTypeOptions);
const hoseDashSizeMap = createMap(hoseDashSizeOptions);
const designMap = createMap(designOption);
const withFerruleMap = createMap(CapWithoutCapOptions);

///Part - Nut Fitting and Description option mapping with data
const nutfittingThreadDscMap = createNutDscMap(nutFittingThreadOptions);
const nutfittingThreadMap = createNutMap(nutFittingThreadOptions);
//Part - Nipple Fitting and Description option mapping with data
const nippplefittingThreadDscMap = createNippleDscMap(nippleFittingThreadOptions);
const nippplefittingThreadMap = createNippleMap(nutFittingThreadOptions);
//Part - Cap Fitting and Description option mapping with data
const wireTypeCapDscMap = createCapDscMap(wireTypeCapOptions);
const wireTypeCapMap = createCapMap(wireTypeCapOptions);

//Hose Pipe Description and Fitting code option mapping with data
//Description
const hosePipemfcDescriptionMap = createHosePipeDscMap(MFCOptions);
const brandLayLineDescriptionMap = createHosePipeDscMap(BrandLayLineOptions);
const hoseTypeDescriptionMap = createHosePipeDscMap(HoseTypeOptions)
//Fitting code
const hosePipemfcFittingCodeMap = createHosePipeFittingCodeMap(MFCOptions);
const brandLayLineFittingCodeMap = createHosePipeFittingCodeMap(BrandLayLineOptions);
const hoseTypeOptionsFittingCodeMap = createHosePipeFittingCodeMap(HoseTypeOptions);

//O-Ring 
const oRingfititngThreadDscMap = createOringFittingThreadDscMap(oRingThreadTypeOption);
// const oRingSizeDscMap = createoRingSizeDscMap()

//Dust Cap
const dustCapfititngThreadDscMap = createdustCapFittingThreadDscMap(dustCapThreadType)

//Spring
const springTypeDscMap = createSpringDscMap(springTypeOption)



//
const partNutBulkImport = async (sheetData, partValues) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.part)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.part } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const parts = sheetData.map((row) => {
            const part = row["part"] || "";
            const design = row["design"] || "";
            const fittingThread = row["fitting_thread"] || "";
            const fitting_dash_size = row["fitting_dash_size"] || "";
            const nut_hex = row["nut_hex"] || "";
            const nut_length = row["nut_length"] || "";
            const additional = row["additional"] || "";


            //For Product Code
            if (!categoryCodeMap[part]) {
                throw new Error(`part series code not found for part type: ${part}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[part] += 1;
            const product_code = categoryCodeMap[part];

            //Nut Fitting Code
            const nutFittingThreadCode = nutfittingThreadMap[fittingThread] || "";
            const nutFittingdashSizeCode = getNutFittingDashSize(fittingThread, fitting_dash_size);

            //Nut DESCRIPTION
            const nutFittingThreadDscCode = nutfittingThreadDscMap[fittingThread] || "";
            const nutFittingdashSizeDscCode = getNutFittingDashdscSize(fittingThread, fitting_dash_size);


            const desc_Code = `${nutFittingThreadDscCode
                ? nutFittingThreadDscCode
                : ""
                }${nutFittingdashSizeDscCode
                    ? " " + nutFittingdashSizeDscCode + " NUT"
                    : ""
                }${nut_hex ? " (" + nut_hex + "X" : ""}${nut_length ? nut_length + ")" : ""
                }`;

            const fitting_Code = `${design ? "NUT-" + design : ""}${nutFittingdashSizeCode
                ? nutFittingdashSizeCode
                : ""
                }${nutFittingThreadCode
                    ? "-" + nutFittingThreadCode + "-"
                    : ""
                }${nut_hex ? +nut_hex + "X" : ""}${nut_length ? nut_length : ""
                }`;

            return {
                ...row,
                product_code,
                desc_Code,
                fitting_Code,
            };
        });
        await Products.insertMany(parts);
        //update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            partValues?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[partValues] } }
                )
            )
        );
        console.log("Products---------------->", parts)
        return parts?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};
const partNippleBulkImport = async (sheetData, partValues) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.part)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.part } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const parts = sheetData.map((row) => {
            const part = row["part"] || "";
            const design = row["design"] || "";
            const wireType = row["wire_type"] || "";
            const skiveType = row["skive_type"] || "";
            const hoseDashSize = row["hose_dash_size"] || "";
            const fittingThread = row["fitting_thread"] || "";
            const fitting_dash_size = row["fitting_dash_size"] || "";
            const nut_hex = row["nut_hex"] || "";
            const nut_length = row["nut_length"] || "";
            const additional = row["additional"] || "";


            //For Product Code
            if (!categoryCodeMap[part]) {
                throw new Error(`part series code not found for part type: ${part}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[part] += 1;
            const product_code = categoryCodeMap[part];

            //Fitting Code
            const nippleFittingThreadCode = nippplefittingThreadMap[fittingThread] || "";
            const skiveTypeCode = skiveTypeMap[skiveType] || "";
            const hoseDashSizeCode = hoseDashSizeMap[hoseDashSize] || "";
            const wireTypeCode = wireTypeMap[wireType] || "";


            //DESCRIPTION
            const nippleFittingThreadDscCode = nippplefittingThreadDscMap[fittingThread] || "";
            const hoseDashSizedscCode = hoseDashSizeDscMap[hoseDashSize] || "";
            const skiveTypeDscCode = skiveTypDsceMap[skiveType] || "";
            const wireTypeDscCode = wireTypeDscMap[wireType] || "";

            // console.log("description", hoseDashSizedscCode, nippleFittingThreadDscCode, skiveTypeDscCode, wireTypeDscCode, design)
            // console.log("fitting code", nippleFittingThreadCode, design, skiveTypeCode, hoseDashSizeCode, wireTypeCode)


            const desc_Code = `${nippleFittingThreadDscCode
                ? nippleFittingThreadDscCode + " "
                : ""
                }${hoseDashSizedscCode ? hoseDashSizedscCode : ""
                }${wireTypeDscCode
                    ? " " + (wireTypeDscCode).toUpperCase()
                    : ""
                }${skiveTypeDscCode
                    ? " " + "NIPPLE" + " " + skiveTypeDscCode
                    : ""
                }`;

            const fitting_Code = `${design ? "Nipple-" + design : ""}${wireTypeCode || ""
                }${skiveTypeCode ? "-" + skiveTypeCode : ""
                }${nippleFittingThreadCode
                    ? "-" + nippleFittingThreadCode + "-"
                    : ""
                }${hoseDashSizeCode ? hoseDashSizeCode : ""}`;



            return {
                ...row,
                product_code,
                desc_Code,
                fitting_Code,
            };
        });
        await Products.insertMany(parts);
        // update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            partValues?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[partValues] } }
                )
            )
        );
        console.log("Products---------------->", parts)
        return parts?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};
const partCapBulkImport = async (sheetData, partValues) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.part)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.part } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const parts = sheetData.map((row) => {
            const part = row["part"] || "";
            const design = row["design"] || "";
            const wireType = row["wire_type"] || "";
            const skiveType = row["skive_type"] || "";
            const hoseDashSize = row["cap_size"] || "";
            const big_bore = row["big_bore"] || "";
            const length = row["length"] || "";
            const od = row["od"] || "";
            const additional = row["additional"] || "";


            //For Product Code
            if (!categoryCodeMap[part]) {
                throw new Error(`part series code not found for part type: ${part}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[part] += 1;
            const product_code = categoryCodeMap[part];

            //Fitting Code
            const skiveTypeCode = skiveTypeMap[skiveType] || "";
            const hoseDashSizeCode = hoseDashSizeMap[hoseDashSize] || "";
            const wireTypeCode = wireTypeCapMap[wireType] || "";


            //DESCRIPTION
            const capDashSizedscCode = hoseDashSizeDscMap[hoseDashSize] || "";
            const skiveTypeDscCode = skiveTypDsceMap[skiveType] || "";
            const wireTypeDscCode = wireTypeCapDscMap[wireType] || "";

            console.log("Cap Description", capDashSizedscCode, skiveTypeDscCode, wireTypeDscCode, big_bore, length, od, additional, design)
            console.log("Fitting Code", wireTypeCode, hoseDashSizeCode, skiveTypeCode, big_bore, length, od, additional, design)





            const fitting_Code = `${"Cap-" + design || ""}${wireTypeCode || ""
                }${hoseDashSizeCode ? hoseDashSizeCode : ""}${skiveTypeCode
                    ? "-" + skiveTypeCode + "-"
                    : ""
                }${od ? od : ""}${length ? "X" + length : ""
                }${big_bore ? "-" + big_bore + "B" : ""}${additional
                    ? "-" + (additional).replace(/(\d+)\s*wire/i, "$1W")
                    : ""
                }`;

            const desc_Code = `${
                //.match(/^.*?(?=\s\()/)?.[0] + " "
                capDashSizedscCode
                    ? "Cap " + (capDashSizedscCode)
                    : ""
                }${od ? "(" + od + " " : ""}${length ? "X" + length + ")" : ""
                }${wireTypeDscCode
                    ? " " + (wireTypeDscCode).toUpperCase()
                    : ""
                }${skiveTypeDscCode
                    ? " " + skiveTypeDscCode + " "
                    : ""
                }${big_bore ? "BIGBORE-" + big_bore : ""}${additional ? " " + additional?.replace(/\s+/g, '').toUpperCase() : ""
                }`;



            return {
                ...row,
                product_code,
                desc_Code,
                fitting_Code,
            };
        });
        await Products.insertMany(parts);
        // update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            partValues?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[partValues] } }
                )
            )
        );
        console.log("Products---------------->", parts)
        return parts?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};
const hosePipeBulkImport = async (sheetData, productType) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.product_type)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.product_type } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const productData = sheetData.map((row) => {
            const productType = row["product_type"] || "";
            const hose_pipe_mfc = row["hose_pipe_mfc"] || "";
            const brand_lay_line = row["brand_lay_line"] || "";
            const hose_type = row["hose_type"] || "";
            const hoseDashSize = row["hose_dash_size"] || "";
            const additional = row["additional"] || "";

            //For Product Code
            if (!categoryCodeMap[productType]) {
                throw new Error(`part series code not found for part type: ${productType}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[productType] += 1;
            const product_code = categoryCodeMap[productType];

            //Fitting Code
            const hoseDashSizeCode = hoseDashSizeMap[hoseDashSize] || "";
            const hosePipemfcfittingCode = hosePipemfcFittingCodeMap[hose_pipe_mfc] || "";
            const brandLayLainefittingCode = brandLayLineFittingCodeMap[brand_lay_line] || "";
            const hoseTypefittingCode = hoseTypeOptionsFittingCodeMap[hose_type] || "";

            //DESCRIPTION
            const hoseDashSizeDescrption = hoseDashSizeDscMap[hoseDashSize] || "";
            const hosePipemfcDescription = hosePipemfcDescriptionMap[hose_pipe_mfc] || "";
            const brandLayLineDescription = brandLayLineDescriptionMap[brand_lay_line] || "";
            const hoseTypeDescription = hoseTypeDescriptionMap[hose_type] || "";

            const fitting_Code = `${hoseDashSizeCode ? hoseDashSizeCode : ""
                }${hoseTypefittingCode
                    ? "-" + hoseTypefittingCode + " "
                    : ""
                }${brandLayLainefittingCode ? brandLayLainefittingCode : ""
                }${hosePipemfcfittingCode
                    ? " " + hosePipemfcfittingCode
                    : ""
                }`;

            const desc_Code = `${hoseDashSizeDescrption
                ? hoseDashSizeDescrption
                : ""
                }${hoseTypeDescription
                    ? " " + hoseTypeDescription + " "
                    : ""
                }${brandLayLineDescription ? brandLayLineDescription : ""
                }${hosePipemfcDescription
                    ? " " + hosePipemfcDescription
                    : ""
                }`;

            return {
                ...row,
                product_code,
                desc_Code,
                fitting_Code,
            };
        });
        await Products.insertMany(productData);
        // update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            productType?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[productType] } }
                )
            )
        );
        console.log("prodict which is goes to db ---------->", productData)
        return productData?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};
const tubeFittingsBulkImport = async (sheetData, productType) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.product_type)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.product_type } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const productData = sheetData.map((row) => {
            const productType = row["product_type"] || "";
            const tube_fitting_thread = row["tube_fitting_thread"] || ""; //dropdown match
            const tube_fitting_category = row["tube_fitting_category"] || ""; //dropdown match
            const part_code = row["part_code"] || "";
            const part_description = row["part_description"] || "";


            //For Product Code
            if (!categoryCodeMap[productType]) {
                throw new Error(`part series code not found for part type: ${productType}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[productType] += 1;
            const product_code = categoryCodeMap[productType];

            // //Fitting Code
            // const hoseDashSizeCode = hoseDashSizeMap[hoseDashSize] || "";
            // const hosePipemfcfittingCode = hosePipemfcFittingCodeMap[hose_pipe_mfc] || "";
            // const brandLayLainefittingCode = brandLayLineFittingCodeMap[brand_lay_line] || "";
            // const hoseTypefittingCode = hoseTypeOptionsFittingCodeMap[hose_type] || "";

            // //DESCRIPTION
            // const hoseDashSizeDescrption = hoseDashSizeDscMap[hoseDashSize] || "";
            // const hosePipemfcDescription = hosePipemfcDescriptionMap[hose_pipe_mfc] || "";
            // const brandLayLineDescription = brandLayLineDescriptionMap[brand_lay_line] || "";
            // const hoseTypeDescription = hoseTypeDescriptionMap[hose_type] || "";

            // const fitting_Code = `${hoseDashSizeCode ? hoseDashSizeCode : ""
            //     }${hoseTypefittingCode
            //         ? "-" + hoseTypefittingCode + " "
            //         : ""
            //     }${brandLayLainefittingCode ? brandLayLainefittingCode : ""
            //     }${hosePipemfcfittingCode
            //         ? " " + hosePipemfcfittingCode
            //         : ""
            //     }`;

            // const desc_Code = `${hoseDashSizeDescrption
            //     ? hoseDashSizeDescrption
            //     : ""
            //     }${hoseTypeDescription
            //         ? " " + hoseTypeDescription + " "
            //         : ""
            //     }${brandLayLineDescription ? brandLayLineDescription : ""
            //     }${hosePipemfcDescription
            //         ? " " + hosePipemfcDescription
            //         : ""
            //     }`;

            return {
                ...row,
                product_code,
                // desc_Code,
                // fitting_Code,
            };
        });
        await Products.insertMany(productData);
        // update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            productType?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[productType] } }
                )
            )
        );
        console.log("prodict which is goes to db ---------->", productData)
        return productData?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};
const OringBulkImport = async (sheetData, productType) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.product_type)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.product_type } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const productData = sheetData.map((row) => {
            const productType = row["product_type"] || "";
            const fittingThread = row["fitting_thread"] || ""; //dropdown match
            const fittingDashSize = row["size"] || ""; //dropdown match
            const inner_diameter = row["inner_diameter"] || "";
            const thickness = row["thickness"] || "";
            const hardness = row["hardness"] || "";


            //For Product Code
            if (!categoryCodeMap[productType]) {
                throw new Error(`part series code not found for part type: ${productType}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[productType] += 1;
            const product_code = categoryCodeMap[productType];
            //DESCRIPTION
            const fittingThreadDescription = oRingfititngThreadDscMap[fittingThread] || "";
            // const oringSizeDescription = oRingSizeDscMap[size] || ""
            const oringSizeDescription = getFittingDashOringdscSize(fittingThread, fittingDashSize);


            console.log("Description: ", fittingThreadDescription, oringSizeDescription, inner_diameter, thickness, hardness)

            const desc_Code = `${(oringSizeDescription && fittingThread != "METRIC") ? (oringSizeDescription ? "O-RING-" + oringSizeDescription : "") : ((fittingThread === "METRIC") ? "O-RING-" + oringSizeDescription + " POD " : "")
                }${fittingThreadDescription ? " " + fittingThreadDescription + " " : ""}${(inner_diameter && thickness) ? "(" + inner_diameter + "X" + thickness + ")" : ""}`.trim();


            return {
                ...row,
                product_code,
                desc_Code,
            };
        });
        await Products.insertMany(productData);
        // update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            productType?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[productType] } }
                )
            )
        );
        console.log("prodict which is goes to db ---------->", productData)
        return productData?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};
const dustCapBulkImport = async (sheetData, productType) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.product_type)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.product_type } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const productData = sheetData.map((row) => {
            const productType = row["product_type"] || "";
            const fittingThread = row["fitting_thread"] || ""; //dropdown match
            const fittingDashSize = row["size"] || ""; //dropdown match
            const dustcap_color = row["dustcap_color"] || "";
            const male_female_type = row["male_female_type"] || "";

            

            //For Product Code
            if (!categoryCodeMap[productType]) {
                throw new Error(`part series code not found for part type: ${productType}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[productType] += 1;
            const product_code = categoryCodeMap[productType];
            //DESCRIPTION
            const fittingThreadDescription = dustCapfititngThreadDscMap[fittingThread] || "";
            // const oringSizeDescription = oRingSizeDscMap[size] || ""
            // const oringSizeDescription = getFittingDashOringdscSize(fittingThread, fittingDashSize);


            console.log("Description: ", fittingThread, fittingDashSize, dustcap_color, male_female_type)

            const desc_Code = `${fittingDashSize ? (fittingDashSize ? "DUST CAP-" + fittingDashSize : "") : (fittingDashSize ? "DUST CAP-" + fittingDashSize : "")
            }${fittingThreadDescription && fittingThreadDescription !== "METRIC"
              ? " " + fittingThreadDescription + " "
              : ""}${male_female_type ? male_female_type : ""}`.trim();


            return {
                ...row,
                product_code,
                desc_Code,
            };
        });
        await Products.insertMany(productData);
        // update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            productType?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[productType] } }
                )
            )
        );
        console.log("prodict which is goes to db ---------->", productData)
        return productData?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};
const springBulkImport = async (sheetData, productType) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.product_type)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.product_type } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const productData = sheetData.map((row) => {
            const productType = row["product_type"] || "";
            const hoseDashSize = row["hose_size"] || "";
            const inner_diameter = row["inner_diameter"] || "";
            const spring_length = row["spring_length"] || "";
            const spring_type = row["spring_type"] || "";

            


            //For Product Code
            if (!categoryCodeMap[productType]) {
                throw new Error(`part series code not found for part type: ${productType}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[productType] += 1;
            const product_code = categoryCodeMap[productType];
            //DESCRIPTION
            const springTypeDescription = springTypeDscMap[spring_type] || "";
            const hoseDashSizeCode = hoseDashSizeDscMap[hoseDashSize] || "";
            // const oringSizeDescription = oRingSizeDscMap[size] || ""
            // const oringSizeDescription = getFittingDashOringdscSize(fittingThread, fittingDashSize);


            const desc_Code = `${hoseDashSizeCode ? "Spring-" + hoseDashSizeCode : ""
            }${springTypeDescription ? " " + (springTypeDescription).toUpperCase() + " " : ""}${spring_length ? "(" + spring_length + "mm" + ")" : ""}`.trim();
    
    
            console.log("Description: ", springTypeDescription, hoseDashSizeCode,inner_diameter,spring_length)

            
            return {
                ...row,
                product_code,
                desc_Code,
            };
        });
        await Products.insertMany(productData);
        // update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            productType?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[productType] } }
                )
            )
        );
        console.log("prodict which is goes to db ---------->", productData)
        return productData?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};
const sleeveBulkImport = async (sheetData, productType) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.product_type)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.product_type } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const productData = sheetData.map((row) => {
            const productType = row["product_type"] || "";
            const size = row["size"] || "";
            const inner_diameter = row["inner_diameter"] || "";
            const outer_diameter = row["outer_diameter"] || "";
            

            


            //For Product Code
            if (!categoryCodeMap[productType]) {
                throw new Error(`part series code not found for part type: ${productType}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[productType] += 1;
            const product_code = categoryCodeMap[productType];
            //DESCRIPTION
     

            
            const desc_Code = `${size ? (size ? size : "") : (size ? size : "")
            }${(inner_diameter  && outer_diameter) ? " SLEEVE " + "(" + inner_diameter + "X" + outer_diameter + ")" : ""}`.trim();
    
          

            
            return {
                ...row,
                product_code,
                desc_Code,
            };
        });
        await Products.insertMany(productData);
        // update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            productType?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[productType] } }
                )
            )
        );
        console.log("prodict which is goes to db ---------->", productData)
        return productData?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};
const vinylCoverBulkImport = async (sheetData, productType) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.product_type)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.product_type } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const productData = sheetData.map((row) => {
            const productType = row["product_type"] || "";
            const size = row["size"] || "";
            const inner_diameter = row["inner_diameter"] || "";
            const outer_diameter = row["outer_diameter"] || "";
            const thickness = row["thickness"] || "";
            

            


            //For Product Code
            if (!categoryCodeMap[productType]) {
                throw new Error(`part series code not found for part type: ${productType}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[productType] += 1;
            const product_code = categoryCodeMap[productType];
            //DESCRIPTION
     

            const desc_Code = `${size ? size : ""}${(inner_diameter && outer_diameter) ? " VC " + "(" + inner_diameter + "X" + outer_diameter + ")" : ""}`.trim();
    

            
            return {
                ...row,
                product_code,
                desc_Code,
            };
        });
        await Products.insertMany(productData);
        // update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            productType?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[productType] } }
                )
            )
        );
        console.log("prodict which is goes to db ---------->", productData)
        return productData?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};
const packingBulkImport = async (sheetData, productType) => {
    try {
        console.log("sheetData---------------->", sheetData, sheetData[0]?.product_type)
        //Step 1 Extract category: 'Nut'
        const productCounters = await ProductCodeCounter.find({ category: { $in: sheetData[0]?.product_type } });
        console.log("productCounters---------------->", productCounters)
        // Setp 2 Extract Last Assigned product code for that product like { Nut: 60006 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        console.log("categoryCodeMap---------------->", categoryCodeMap)
        //Step 3 Save Each individual product
        const productData = sheetData.map((row) => {
            const productType = row["product_type"] || "";
            const item_name = row["item_name"] || "";
            

            


            //For Product Code
            if (!categoryCodeMap[productType]) {
                throw new Error(`part series code not found for part type: ${productType}`);
            }
            // Increment the last assigned product code for this category
            categoryCodeMap[productType] += 1;
            const product_code = categoryCodeMap[productType];
            //DESCRIPTION
     

            const desc_Code = `${item_name ? item_name : ""}`.trim();
    

            
            return {
                ...row,
                product_code,
                desc_Code,
            };
        });
        await Products.insertMany(productData);
        // update prodcut part counter
        // Update productCounter table with the last assigned product codes
        await Promise.all(
            productType?.map(category =>
                ProductCodeCounter.updateOne(
                    { category },
                    { $set: { last_assigned_product_code: categoryCodeMap[productType] } }
                )
            )
        );
        console.log("prodict which is goes to db ---------->", productData)
        return productData?.length;
    } catch (error) {
        console.error("Error in partBulkImport:", error);
        throw error;
    }
};





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

        const partValues = [...new Set(sheetData.map(row => row["part"]))];

        const productType = [...new Set(sheetData.map(row => row["product_type"]))];

        console.log("inside parent", productType);

        // 👉 If 'part-Nut' column exists and has values, redirect to part-specific bulk import
        if (partValues.length && partValues[0] !== undefined && partValues[0] !== "" && partValues[0] === "Nut") {
            return await partNutBulkImport(sheetData, partValues);
        }
        // 👉 If 'part-Nipple' column exists and has values, redirect to part-specific bulk import
        if (partValues.length && partValues[0] !== undefined && partValues[0] !== "" && partValues[0] === "Nipple") {
            return await partNippleBulkImport(sheetData, partValues);
        }
        // 👉 If 'part-Cap' column exists and has values, redirect to part-specific bulk import
        if (partValues.length && partValues[0] !== undefined && partValues[0] !== "" && partValues[0] === "Cap") {
            return await partCapBulkImport(sheetData, partValues);
        }
        // 👉 If 'Hose Pipe' column exists and has values, redirect to HP specific bulk import
        if (productType.length && productType[0] !== undefined && productType[0] !== "" && productType[0] === "Hose Pipe") {
            return await hosePipeBulkImport(sheetData, productType);
        }
        // 👉 If 'Tube Fittings' column exists and has values, redirect to TF specific bulk import
        if (productType.length && productType[0] !== undefined && productType[0] !== "" && productType[0] === "Tube Fittings") {
            return await tubeFittingsBulkImport(sheetData, productType);
        }
        // 👉 If 'O-ring' column exists and has values, redirect to O-ring specific bulk import
        if (productType.length && productType[0] !== undefined && productType[0] !== "" && productType[0] === "O-ring") {
            return await OringBulkImport(sheetData, productType);
        }
         // 👉 If 'DustCap' column exists and has values, redirect to O-ring specific bulk import
         if (productType.length && productType[0] !== undefined && productType[0] !== "" && productType[0] === "Dust Cap") {
            return await dustCapBulkImport(sheetData, productType);
        }
        // 👉 If 'Spring' column exists and has values, redirect to Spring specific bulk import
        if (productType.length && productType[0] !== undefined && productType[0] !== "" && productType[0] === "Spring") {
            return await springBulkImport(sheetData, productType);
        }
           // 👉 If 'Spring' column exists and has values, redirect to Spring specific bulk import
           if (productType.length && productType[0] !== undefined && productType[0] !== "" && productType[0] === "Sleeve") {
            return await sleeveBulkImport(sheetData, productType);
        }
         // 👉 If 'Spring' column exists and has values, redirect to Spring specific bulk import
         if (productType.length && productType[0] !== undefined && productType[0] !== "" && productType[0] === "Vinyl Cover") {
            return await vinylCoverBulkImport(sheetData, productType);
        }
         // 👉 If 'Spring' column exists and has values, redirect to Spring specific bulk import
         if (productType.length && productType[0] !== undefined && productType[0] !== "" && productType[0] === "Packing") {
            return await packingBulkImport(sheetData, productType);
        }




        //Step 1 Extract category: 'Braided'
        const productCounters = await ProductCodeCounter.find({ category: { $in: categories } });
        // Setp 2 Extract Last Assigned product code for that product like { Braided: 40001 }
        const categoryCodeMap = {};
        for (const counter of productCounters) {
            categoryCodeMap[counter.category] = counter.last_assigned_product_code;
        }
        //Step 3 Process and save each product
        const products = sheetData.map((row) => {
            const design = row["design"] || "";
            const fittingThread = row["fitting_thread"] || "";
            const fittingType = row["fitting_type"] || "";
            const straightBendAngle = row["straight_bend_angle"] || "";
            const wireType = row["wire_type"] || "";
            const withCap = row["with_cap"] || "";
            const fittingPiece = row["fitting_piece"] || "";
            const skiveType = row["skive_type"] || "";
            const hoseDashSize = row["hose_dash_size"] || "";
            const fittingDashSize = row["fitting_dash_size"] || row["od"] || "";
            const dropLength = row["drop_length"] || "";
            const metricType = row["metric_type"] || "";
            const pipeOD = row['pipe_od'] || "";


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



            const desc_Code = `${wireTypeDscCode}-${fittingThreadDscCode} ${hoseDashSizedscCode}X${fittingdashSizeDscCode} ${fittingTypeDscCode} ${straightBendAngleDscCode} ${skiveTypeDscCode} ${dropLength ? "DL-" + dropLength : ""} ${withCapDscCode}`.trim();

            const fitting_Code = `${row["design"] || ""}${wireTypeCode}${fittingPieceCode}-${skiveTypeCode}-${hoseDashSizeCode}${fittingdashSizeCode}${fittingThreadCode ? "-" + fittingThreadCode : ''}${fittingTypeCode ? "-" + fittingTypeCode : ""}${straightBendAngleCode}${dropLength ? "-" + dropLength : ""}${withCapCode ? '-' + withCapCode : ""}`.trim();


            return {
                ...row,
                product_code,
                desc_Code,
                fitting_Code,
            };
        });

        //Step 4: Create Products in db
        await Products.insertMany(products);

        //Step 5 Update productCounter table with the last assigned product codes
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
