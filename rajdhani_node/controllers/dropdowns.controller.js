// const {productOptions,wireTypeOptions,CapWithoutCapOptions} = require("../dropdowns/productOptions");

const {
    ProductOptions,
    springTypeOptions,
    WireTypeOptions,
    CapWithoutCapOptions,
    metricTypeOptions,
    straightBendangleOptions,
    pipeODOptions,
    variantsOption,
    fittingTypeOptions,
    dropLengthOptions,
    malefemaleOptions,
    fittingDashSizeOptions,
    fittingThreadOptions,
    hoseDashSizeOptions,
    skiveTypeOptions,
    fittingPieceOptions,
    designOption,
    PartOptions,
    MFCOptions,
    BrandLayLineOptions,
    HoseTypeOptions,
    springTypeOption,
    dustCapColorsOption,
    sleeveSizesOption,
    vcSizesOption,
    dustCapThreadType,
    oRingThreadTypeOption,
    dustCapMatricOption,
    TuebeFittingsThreads,
    TubeFittingsCategory,
    uomOptions,
    gstOption,
    nutFittingThreadOptions,
    nutFittingDashSize,
    nippleFittingThreadOptions
} = require('../dropdowns/productOptions')


// Controller to fetch dropdown options
const getallOptions = async (req, res) => {
    try {
        res.json({
            success: true, data: {
                ProductOptions,
                springTypeOptions,
                WireTypeOptions,
                CapWithoutCapOptions,
                metricTypeOptions,
                straightBendangleOptions,
                pipeODOptions,
                variantsOption,
                fittingTypeOptions,
                dropLengthOptions,
                malefemaleOptions,
                variantsOption,
                fittingDashSizeOptions,
                fittingThreadOptions,
                hoseDashSizeOptions,
                skiveTypeOptions,
                fittingPieceOptions,
                designOption,
                PartOptions,
                MFCOptions,
                BrandLayLineOptions,
                HoseTypeOptions,
                springTypeOption,
                dustCapColorsOption,
                sleeveSizesOption,
                vcSizesOption,
                dustCapThreadType,
                oRingThreadTypeOption,
                dustCapMatricOption,
                TuebeFittingsThreads,
                TubeFittingsCategory,
                uomOptions,
                gstOption,
                nutFittingThreadOptions,
                nutFittingDashSize,
                nippleFittingThreadOptions
            }
        });
    } catch (error) {
        console.error("Error fetching dropdown options:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const {
    baseAddress,
    genralbillingDetails,
    genralshippingDetails
} = require('../dropdowns/baseAddress')



// Controller to fetch dropdown options
const getBasicDetails = async (req, res) => {
    try {
        res.json({
            success: true, data: {
                baseAddress,  
                genralbillingDetails,
                genralshippingDetails
            }
        });
    } catch (error) {
        console.error("Error fetching basic details:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const { lineNumbers } = require('../dropdowns/producitonProcessLineNumber')

// Controller to fetch dropdown options
const getLineNumber = async (req, res) => {
    try {
        res.json({
            success: true, data: {
                lineNumbers
            }
        });
    } catch (error) {
        console.error("Error fetching lineNumber details:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getallOptions,
    getBasicDetails,
    getLineNumber
};