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
    PartOptions
} = require('../dropdowns/productOptions')


// Controller to fetch dropdown options
const getallOptions = async (req, res) => {
    try {
        res.json({ success: true,  data: { 
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
            PartOptions 
        }  });
    } catch (error) {
        console.error("Error fetching dropdown options:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getallOptions,
};