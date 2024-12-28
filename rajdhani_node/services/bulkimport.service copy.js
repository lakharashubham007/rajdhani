const XLSX = require("xlsx");
const { Products } = require("../models");

const fittingThreadOptions = [
  { value: "BSP", code: "B" },
  { value: "BSP O", code: "BO" },
  { value: "JIC", code: "J" },
  { value: "ORFS", code: "O" },
  { value: "KOMATSU", code: "K" },
  { value: "METRIC", code: "M" },
  { value: "NPT", code: "NPT" },
  { value: "JIS", code: "BJ" },
  { value: "SAE 61", code: "3" },
  { value: "SAE 62", code: "6" },
  { value: "BANJO WITHOUT O", code: "BJ" },
  { value: "BANJO WITH O", code: "BJO" },
  { value: "METRIC THREAD ORFS", code: "MO" }
];

const fittingTypeOptions = [
  { value: "Female", code: "F" },
  { value: "Male", code: "M" },
  { value: "Flange", code: "FL" },
  { value: "CAT Flange", code: "FLC" }
];

const straightBendangleOptions = [
  { value: "Straight", code: "S" },
  { value: "BEND 90", code: "BEND 90" },
  { value: "BEND 75", code: "BEND 75" },
  { value: "BEND 67.5", code: "BEND 67.5" },
  { value: "BEND 45", code: "BEND 45" },
  { value: "BEND 30", code: "BEND 30" },
  { value: "BEND 22.5", code: "BEND 22.5" },
  { value: "BEND 15", code: "BEND 15" },
  { value: "BEND 135", code: "BEND 135" }
];

// Additional options
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

// Create maps for quick lookup
const fittingThreadMap = fittingThreadOptions.reduce((map, option) => {
  map[option.value] = option.code;
  return map;
}, {});

const fittingTypeMap = fittingTypeOptions.reduce((map, option) => {
  map[option.value] = option.code;
  return map;
}, {});

const straightBendangleMap = straightBendangleOptions.reduce((map, option) => {
  map[option.value] = option.code;
  return map;
}, {});

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

      const fittingThreadCode = fittingThreadMap[fittingThread] || ""; // Assign fitting thread code or blank
      const fittingTypeCode = fittingTypeMap[fittingType] || ""; // Assign fitting type code or blank
      const straightBendAngleCode = straightBendangleMap[straightBendAngle] || ""; // Assign straight bend angle code or blank

      const desc_Code = `${row["wire_type"]?.split("-")[0]}-${fittingThread} ${row["hose_dash_size"]}X${row["fitting_dash_size"]} ${fittingType.toUpperCase()} ${straightBendAngle.toUpperCase()} ${row["skive_type"]?.toUpperCase()}`.trim();

      const fitting_Code = `${row["design"] || ""}${row["wire_type"]?.split("-")[1]?.trim() || ""}${row["fitting_piece"]?.split("-")[0]}-${row["skive_type"]?.split(" ")[0]}-${row["hose_dash_size"]}${row["fitting_dash_size"]}-${fittingThreadCode}-${fittingTypeCode}${straightBendAngleCode}`.trim();

      console.log(
        fittingThreadCode, // Add fitting thread code
        fittingTypeCode, // Add fitting type code
        straightBendAngleCode, // Add straight bend angle code
      )
      return {
        ...row,
       
        desc_Code,
        fitting_Code
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
  bulkimport
};



// // services/productService.js
// const XLSX = require("xlsx");
// const { Products } = require("../models");

// // Import products from an Excel file
// const bulkimport = async (filePath) => {
//     try {
//         const workbook = XLSX.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

//         if (!sheetData.length) {
//             throw new Error("No data found in the uploaded file");
//         }

//         // Process and save each product
//         const products = sheetData.map((row) => {
//             const desc_Code = `${row["wire_type"]?.split("-")[0]}-${row["fitting_thread"] || ""} ${row["hose_dash_size"]}X${row["fitting_dash_size"]} ${row["fitting_type"]?.toUpperCase()} ${row["straight_bend_angle"]?.toUpperCase()} ${row["skive_type"]?.toUpperCase()}`.trim();

//             const fitting_Code = `${row["design"] || ""}${row["wire_type"]?.split("-")[1]?.trim() || ""}${row["fitting_piece"]?.split("-")[0]}-${row["skive_type"]?.split(" ")[0]}-${row["hose_dash_size"]}${row["fitting_dash_size"]}-${row["fitting_thread"]}-${row["fitting_type"]?.substring(0, 1)}${row["straight_bend_angle"]?.substring(0, 1)}`.trim();

//             return {
//                 ...row,
//                 desc_Code,
//                 fitting_Code
//             };
//         });

//         await Products.insertMany(products);
//         return products.length;
//     } catch (error) {
//         console.error("Error importing products:", error);
//         throw error;
//     }
// };

// module.exports = {
//     bulkimport
// };