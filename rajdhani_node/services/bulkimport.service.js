const XLSX = require("xlsx");
const { Products } = require("../models");

// options
const fittingThreadOptions = [
    { value: "BSP", code: "B", dsc_code: "BSP" },
    { value: "BSP O", code: "BO", dsc_code: "BSPO" },
    { value: "JIC", code: "J", dsc_code: "JIC" },
    { value: "ORFS", code: "O", dsc_code: "ORFS" },
    { value: "KOMATSU", code: "K", dsc_code: "KOMATSU" },
    { value: "METRIC", code: "M", dsc_code: "M" },
    { value: "NPT", code: "NPT", dsc_code: "NPT" },
    { value: "JIS", code: "BJ", dsc_code: "JIS" },
    { value: "SAE 61", code: "3", dsc_code: "SAE61" },
    { value: "SAE 62", code: "6", dsc_code: "SAE62" },
    { value: "BANJO WITHOUT O", code: "BJ", dsc_code: "BANJO_WO" },
    { value: "BANJO WITH O", code: "BJO", dsc_code: "BANJO_W" },
    { value: "METRIC THREAD ORFS", code: "MO", dsc_code: "METRIC_ORFS" },
];

const fittingTypeOptions = [
    { value: "Female", code: "F", dsc_code: "Female" },
    { value: "Male", code: "M", dsc_code: "Male" },
    { value: "Flange", code: "FL", dsc_code: "Flange" },
    { value: "CAT Flange", code: "FLC", dsc_code: "CAT Flange" },
];


const straightBendangleOptions = [
    { value: "Straight", code: "S", dsc_code: "Straight" },
    { value: "BEND 90", code: "90", dsc_code: "BEND 90" },
    { value: "BEND 75", code: "75", dsc_code: "BEND 75" },
    { value: "BEND 67.5", code: "67.5", dsc_code: "BEND 67.5" },
    { value: "BEND 45", code: "45", dsc_code: "BEND 45" },
    { value: "BEND 30", code: "30", dsc_code: "BEND 30" },
    { value: "BEND 22.5", code: "22.5", dsc_code: "BEND 22.5" },
    { value: "BEND 15", code: "15", dsc_code: "BEND 15" },
    { value: "BEND 135", code: "135", dsc_code: "BEND 135" },
];

const wireTypeOptions = [
    { value: "BRAIDED (BR) - B", code: "B", dsc_code: "BR" },
    { value: "SPIRAL (SP) - S", code: "S", dsc_code: "SP" },
    { value: "TEFLON (TF) - T", code: "T", dsc_code: "TF" },
];

const fittingPieceOptions = [
    { value: "ONE PIECE - 1", code: "1" },
    { value: "TWO PIECE - 2", code: "2" },
    { value: "THREE PIECE - 3", code: "3" },
];

const skiveTypeOptions = [
    { value: "SKIVE (SK)", code: "SK", dsc_code: "(SKIVE)" },
    { value: "NON-SKIVE (NS)", code: "NS", dsc_code: "(NON-SKIVE)" },
    { value: "INNER-SKIVE (IS)", code: "IS", dsc_code: "(INNER-SKIVE)" },
];

const hoseDashSizeOptions = [
    { value: "3/16\" (03)", code: "O3", dsc_code: "3/16" },
    { value: "1/4\" (04)", code: "O4", dsc_code: "1/4" },
    { value: "5/16\" (05)", code: "O5", dsc_code: "5/16" },
    { value: "3/8\" (06)", code: "O6", dsc_code: "3/8" },
    { value: "1/2\" (08)", code: "O8", dsc_code: "1/2" },
    { value: "5/8\" (10)", code: "10", dsc_code: "5/8" },
    { value: "3/4\" (12)", code: "12", dsc_code: "3/4" },
    { value: "1\" (16)", code: "16", dsc_code: "1" },
    { value: "1-1/4\" (20)", code: "20", dsc_code: "1-1/4" },
    { value: "1-1/2\" (24)", code: "24", dsc_code: "1-1/2" },
    { value: "2\" (32)", code: "32", dsc_code: "2" },
    { value: "2-1/2\" (40)", code: "40", dsc_code: "2-1/2" },
    { value: "3\" (48)", code: "48", dsc_code: "3" },
    { value: "3-1/2\" (56)", code: "56", dsc_code: "3-1/2" },
    { value: "4\" (64)", code: "64", dsc_code: "4" },
    { value: "4-1/2\" (72)", code: "72", dsc_code: "4-1/2" },
    { value: "5\" (80)", code: "80", dsc_code: "5" },
    { value: "13/32\" ", code: "", dsc_code: "13/32" },
    { value: "7/8\" ", code: "", dsc_code: "7/8" },
    { value: "1-1/8\" ", code: "", dsc_code: "1-1/8" },
    { value: "1-3/8\" ", code: "", dsc_code: "1-3/8" },
    { value: "1-13/16\" ", code: "", dsc_code: "1-13/16" },
    { value: "2-3/8\" ", code: "", dsc_code: "2-3/8" },
];

const fittingDashSizeOptions = [
    // BSP
    { thread_type: "BSP", dash: "O4", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4", variant: "Standard" },
    { thread_type: "BSP", dash: "O5", inch: "5/16\"", thread: "5/16\"", dsc_code: "5/16", variant: "Lower Jump" },
    { thread_type: "BSP", dash: "O6", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8", variant: null },
    { thread_type: "BSP", dash: "O8", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2", variant: null },
    { thread_type: "BSP", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8", variant: null },
    { thread_type: "BSP", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4", variant: null },
    { thread_type: "BSP", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1", variant: null },
    { thread_type: "BSP", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4", variant: "Upper Jump" },
    { thread_type: "BSP", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2", variant: "Upper Jump" },
    { thread_type: "BSP", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2", variant: "Upper Jump" },

    // BSP O
    { thread_type: "BSP O", dash: "O4", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4", variant: "Standard" },
    { thread_type: "BSP O", dash: "O5", inch: "5/16\"", thread: "5/16\"", dsc_code: "5/16", variant: "Lower Jump" },
    { thread_type: "BSP O", dash: "O6", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8", variant: null },
    { thread_type: "BSP O", dash: "O8", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2", variant: null },
    { thread_type: "BSP O", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8", variant: null },
    { thread_type: "BSP O", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4", variant: null },
    { thread_type: "BSP O", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1", variant: null },
    { thread_type: "BSP O", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4", variant: "Upper Jump" },
    { thread_type: "BSP O", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2", variant: "Upper Jump" },
    { thread_type: "BSP O", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2", variant: "Upper Jump" },

    // JIC
    { thread_type: "JIC", dash: "O4", inch: "1/4\"", thread: "7/16\"", dsc_code: "7/16", variant: "Standard" },
    { thread_type: "JIC", dash: "O5", inch: "5/16\"", thread: "1/2\"", dsc_code: "1/2", variant: "Lower Jump" },
    { thread_type: "JIC", dash: "O6", inch: "3/8\"", thread: "9/16\"", dsc_code: "9/16", variant: null },
    { thread_type: "JIC", dash: "O8", inch: "1/2\"", thread: "3/4\"", dsc_code: "3/4", variant: null },
    { thread_type: "JIC", dash: "10", inch: "5/8\"", thread: "7/8\"", dsc_code: "7/8", variant: null },
    { thread_type: "JIC", dash: "12", inch: "3/4\"", thread: "1-1/16\"", dsc_code: "1-1/16", variant: null },
    { thread_type: "JIC", dash: "16", inch: "1\"", thread: "1-5/16\"", dsc_code: "1-5/16", variant: null },
    { thread_type: "JIC", dash: "20", inch: "1-1/4\"", thread: "1-5/8\"", dsc_code: "1-5/8", variant: null },
    { thread_type: "JIC", dash: "24", inch: "1-1/2\"", thread: "1-7/8\"", dsc_code: "1-7/8", variant: null },
    { thread_type: "JIC", dash: "32", inch: "2\"", thread: "2-1/2\"", dsc_code: "2-1/2", variant: "Upper Jump" },

    // NPT
    { thread_type: "NPT", dash: "O4", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4", variant: "Standard" },
    { thread_type: "NPT", dash: "O5", inch: "5/16\"", thread: null, dsc_code: null, variant: "Lower Jump" },
    { thread_type: "NPT", dash: "O6", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8", variant: null },
    { thread_type: "NPT", dash: "O8", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2", variant: null },
    { thread_type: "NPT", dash: "10", inch: "5/8\"", thread: null, dsc_code: null, variant: null },
    { thread_type: "NPT", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4", variant: null },
    { thread_type: "NPT", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1", variant: null },
    { thread_type: "NPT", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4", variant: null },
    { thread_type: "NPT", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2", variant: "Upper Jump" },
    { thread_type: "NPT", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2", variant: "Upper Jump" },

    // Updated dataset with dsc_code added

    // JIS
    { thread_type: "JIS", dash: "O4", inch: "1/4\"", thread: "1/4\"", variant: "Standard", dsc_code: "1/4" },
    { thread_type: "JIS", dash: "O5", inch: "5/16\"", thread: null, variant: null, dsc_code: "5/16" },
    { thread_type: "JIS", dash: "O6", inch: "3/8\"", thread: "3/8\"", variant: "Lower Jump", dsc_code: "3/8" },
    { thread_type: "JIS", dash: "O8", inch: "1/2\"", thread: "1/2\"", variant: null, dsc_code: "1/2" },
    { thread_type: "JIS", dash: "10", inch: "5/8\"", thread: "5/8\"", variant: null, dsc_code: "5/8" },
    { thread_type: "JIS", dash: "12", inch: "3/4\"", thread: "3/4\"", variant: null, dsc_code: "3/4" },
    { thread_type: "JIS", dash: "16", inch: "1\"", thread: "1\"", variant: null, dsc_code: "1" },
    { thread_type: "JIS", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", variant: "Upper Jump", dsc_code: "1-1/4" },
    { thread_type: "JIS", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", variant: null, dsc_code: "1-1/2" },
    { thread_type: "JIS", dash: "32", inch: "2\"", thread: "2\"", variant: "Upper Jump", dsc_code: "2" },

    // ORFS
    { thread_type: "ORFS", dash: "O4", inch: "1/4\"", thread: "9/16\"", variant: "Standard", dsc_code: "9/16" },
    { thread_type: "ORFS", dash: "O5", inch: "5/16\"", thread: null, variant: null, dsc_code: "5/16" },
    { thread_type: "ORFS", dash: "O6", inch: "3/8\"", thread: "11/16\"", variant: "Lower Jump", dsc_code: "11/16" },
    { thread_type: "ORFS", dash: "O8", inch: "1/2\"", thread: "13/16\"", variant: null, dsc_code: "13/16" },
    { thread_type: "ORFS", dash: "10", inch: "5/8\"", thread: "1\"", variant: null, dsc_code: "1" },
    { thread_type: "ORFS", dash: "12", inch: "3/4\"", thread: "1-3/16\"", variant: null, dsc_code: "1-3/16" },
    { thread_type: "ORFS", dash: "16", inch: "1\"", thread: "1-7/16\"", variant: null, dsc_code: "1-7/16" },
    { thread_type: "ORFS", dash: "20", inch: "1-1/4\"", thread: "1-11/16\"", variant: "Upper Jump", dsc_code: "1-11/16" },
    { thread_type: "ORFS", dash: "24", inch: "1-1/2\"", thread: "2\"", variant: "Upper Jump", dsc_code: "2" },
    { thread_type: "ORFS", dash: "32", inch: "2\"", thread: null, variant: "Upper Jump", dsc_code: "2" },

    // KOMATSU
    { thread_type: "KOMATSU", dash: "O4", inch: "1/4\"", thread: "14X1.5", variant: "Standard", dsc_code: "14X1.5" },
    { thread_type: "KOMATSU", dash: "O5", inch: "5/16\"", thread: null, variant: null, dsc_code: "5/16" },
    { thread_type: "KOMATSU", dash: "O6", inch: "3/8\"", thread: "18X1.5", variant: "Lower Jump", dsc_code: "18X1.5" },
    { thread_type: "KOMATSU", dash: "O8", inch: "1/2\"", thread: "22X1.5", variant: null, dsc_code: "22X1.5" },
    { thread_type: "KOMATSU", dash: "10", inch: "5/8\"", thread: "24X1.5", variant: null, dsc_code: "24X1.5" },
    { thread_type: "KOMATSU", dash: "12", inch: "3/4\"", thread: "30X1.5", variant: null, dsc_code: "30X1.5" },
    { thread_type: "KOMATSU", dash: "16", inch: "1\"", thread: "33X1.5", variant: null, dsc_code: "33X1.5" },
    { thread_type: "KOMATSU", dash: "20", inch: "1-1/4\"", thread: "36X1.5", variant: "Upper Jump", dsc_code: "36X1.5" },
    { thread_type: "KOMATSU", dash: "24", inch: "1-1/2\"", thread: "42X1.5", variant: "Upper Jump", dsc_code: "42X1.5" },
    { thread_type: "KOMATSU", dash: "32", inch: "2\"", thread: null, variant: "Upper Jump", dsc_code: "2" },

    // SAE 61
    { thread_type: "SAE 61", dash: "08", thread: "30.3", variant: "Standard", dsc_code: "30.3" },
    { thread_type: "SAE 61", dash: "12", thread: "38.1", variant: null, dsc_code: "38.1" },
    { thread_type: "SAE 61", dash: "16", thread: "44.4", variant: null, dsc_code: "44.4" },
    { thread_type: "SAE 61", dash: "20", thread: "50.8", variant: null, dsc_code: "50.8" },
    { thread_type: "SAE 61", dash: "24", thread: "60.3", variant: null, dsc_code: "60.3" },
    { thread_type: "SAE 61", dash: "32", thread: "71", variant: null, dsc_code: "71" },

    // SAE 62
    { thread_type: "SAE 62", dash: "08", thread: "32", variant: "Standard", dsc_code: "32" },
    { thread_type: "SAE 62", dash: "10", thread: "34", variant: null, dsc_code: "34" },
    { thread_type: "SAE 62", dash: "12", thread: "41.4", variant: null, dsc_code: "41.4" },
    { thread_type: "SAE 62", dash: "16", thread: "47.4", variant: null, dsc_code: "47.4" },
    { thread_type: "SAE 62", dash: "20", thread: "54", variant: null, dsc_code: "54" },
    { thread_type: "SAE 62", dash: "24", thread: "63.5", variant: null, dsc_code: "63.5" },
    { thread_type: "SAE 62", dash: "32", thread: "79.6", variant: null, dsc_code: "79.6" },

    // Metric Light
    { metric_type: "Light", dash: "06", pipe_od: "06", thread: "M12X1.5", variant: null, dsc_code: "M12X1.5" },
    { metric_type: "Light", dash: "08", pipe_od: "08", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { metric_type: "Light", dash: "10", pipe_od: "10", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { metric_type: "Light", dash: "12", pipe_od: "12", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { metric_type: "Light", dash: "15", pipe_od: "15", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { metric_type: "Light", dash: "18", pipe_od: "18", thread: "M26X1.5", variant: null, dsc_code: "M26X1.5" },
    { metric_type: "Light", dash: "22", pipe_od: "22", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { metric_type: "Light", dash: "28", pipe_od: "28", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { metric_type: "Light", dash: "35", pipe_od: "35", thread: "M45X2.0", variant: null, dsc_code: "M45X2.0" },
    { metric_type: "Light", dash: "42", pipe_od: "42", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

    // Metric Heavy
    { metric_type: "Heavy", dash: "06", pipe_od: "06", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { metric_type: "Heavy", dash: "08", pipe_od: "08", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { metric_type: "Heavy", dash: "10", pipe_od: "10", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { metric_type: "Heavy", dash: "12", pipe_od: "12", thread: "M20X1.5", variant: null, dsc_code: "M20X1.5" },
    { metric_type: "Heavy", dash: "14", pipe_od: "14", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { metric_type: "Heavy", dash: "16", pipe_od: "16", thread: "M24X1.5", variant: null, dsc_code: "M24X1.5" },
    { metric_type: "Heavy", dash: "20", pipe_od: "20", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { metric_type: "Heavy", dash: "25", pipe_od: "25", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { metric_type: "Heavy", dash: "30", pipe_od: "30", thread: "M42X2.0", variant: null, dsc_code: "M42X2.0" },
    { metric_type: "Heavy", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" }


];


// Function to get fitting dash size based on fitting thread and size
function getFittingDashSize(fittingThread, fittingDashSize) {
    // Match fitting thread type with dash size options
    for (const option of fittingDashSizeOptions) {
        if (option.thread_type === fittingThread && option.inch === fittingDashSize) {
            return option.dash; // Return the corresponding dash size code
        }
    }
    // If no matching option is found, return a default value or handle error as needed
    return "Not";
}

// Function to get fitting DESCRIPTION size based on fitting thread and size
function getFittingDashdscSize(fittingThread, fittingDashSize) {
    // Match fitting thread type with dash size options
    for (const option of fittingDashSizeOptions) {
        if (option.thread_type === fittingThread && option.inch === fittingDashSize) {
            return option.dsc_code; // Return the corresponding dash size code
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


//FITTING CODE
const fittingThreadMap = createMap(fittingThreadOptions);
const fittingTypeMap = createMap(fittingTypeOptions);
const straightBendangleMap = createMap(straightBendangleOptions);
const wireTypeMap = createMap(wireTypeOptions);
const fittingPieceMap = createMap(fittingPieceOptions);
const skiveTypeMap = createMap(skiveTypeOptions);
const hoseDashSizeMap = createMap(hoseDashSizeOptions);


// Import products from an Excel file
const bulkimport = async (filePath) => {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (!sheetData.length) {
            throw new Error("No data found in the uploaded file");
        }

        // Process and save each product
        const products = sheetData.map((row) => {
            const fittingThread = row["fitting_thread"] || "";
            const fittingType = row["fitting_type"] || "";
            const straightBendAngle = row["straight_bend_angle"] || "";
            const wireType = row["wire_type"] || "";
            const fittingPiece = row["fitting_piece"] || "";
            const skiveType = row["skive_type"] || "";
            const hoseDashSize = row["hose_dash_size"] || "";
            const fittingDashSize = row["fitting_dash_size"] || "";

            //code
            const fittingThreadCode = fittingThreadMap[fittingThread] || "";
            const fittingTypeCode = fittingTypeMap[fittingType] || "";
            const straightBendAngleCode = straightBendangleMap[straightBendAngle] || "";
            const wireTypeCode = wireTypeMap[wireType] || "";
            const fittingPieceCode = fittingPieceMap[fittingPiece] || "";
            const skiveTypeCode = skiveTypeMap[skiveType] || "";
            const hoseDashSizeCode = hoseDashSizeMap[hoseDashSize] || "";
            // Get the corresponding dash size
            const fittingdashSizeCode = getFittingDashSize(fittingThread, fittingDashSize);

            //DESCRIPTION
            const fittingThreadDscCode = fittingThreadDscMap[fittingThread] || "";
            const fittingTypeDscCode = fittingTypeDscMap[fittingType] || "";
            const hoseDashSizedscCode = hoseDashSizeDscMap[hoseDashSize] || "";
            const straightBendAngleDscCode = straightBendangleDscMap[straightBendAngle] || "";
            const skiveTypeDscCode = skiveTypDsceMap[skiveType] || "";
            const wireTypeDscCode = wireTypeDscMap[wireType] || "";
            const fittingdashSizeDscCode = getFittingDashdscSize(fittingThread, fittingDashSize);


            const desc_Code = `${wireTypeDscCode}-${fittingThreadDscCode} ${hoseDashSizedscCode}X${fittingdashSizeDscCode} ${fittingTypeDscCode} ${straightBendAngleDscCode} ${skiveTypeDscCode}`.trim();

            const fitting_Code = `${row["design"] || ""}${wireTypeCode}${fittingPieceCode}-${skiveTypeCode}-${hoseDashSizeCode}${fittingdashSizeCode}-${fittingThreadCode}-${fittingTypeCode}${straightBendAngleCode}`.trim();

            return {
                ...row,
                desc_Code,
                fitting_Code,
            };
        });

        await Products.insertMany(products);
        return products.length;
    } catch (error) {
        console.error("Error importing products:", error);
        throw error;
    }
};

module.exports = {
    bulkimport,
};
