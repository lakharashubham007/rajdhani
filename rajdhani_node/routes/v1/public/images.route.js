const express = require("express");
const router = express.Router();
const path = require("path"); 

//genral images api
router.get("/image/:filename", (req, res) => {
    const filename = req.params.filename;
    
    const filePath = path.join(__dirname, "../../..", "images", filename); //upload directory
    
    // Send the image as a response
    res.sendFile(filePath);
});

module.exports = router;
