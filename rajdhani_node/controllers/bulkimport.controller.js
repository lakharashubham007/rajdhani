// controllers/productController.js
const { bulkimportservice } = require("../services");
const path = require("path");

// Bulk import products
const bulkImport = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const filePath = path.resolve(req.file.path);
        const result = await bulkimportservice.bulkimport(filePath);

        res.json({
            success: true,
            message: `${result.insertedCount} products imported successfully!`,
            errors: result.errors
        });
    } catch (error) {
        console.error("Error in bulk import:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//Last working version
// Bulk import products
// const bulkImport = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "No file uploaded" });
//         }

//         const filePath = path.resolve(req.file.path);
//         const result = await bulkimportservice.bulkimport(filePath);

//         res.json({ success: true, message: `${result} products imported successfully!` });
//     } catch (error) {
//         console.error("Error in bulk import:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

module.exports = {
    bulkImport
};