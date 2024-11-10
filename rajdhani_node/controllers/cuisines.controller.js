
const { cuisineService } = require("../services");

const createCuisine = async (req, res) => {
    try {
        const cuisines = await cuisineService.createCuisines(req.body,req.files?.image[0]?.originalname);
        res.json({ success: true, cuisine: cuisines, message: 'Cuisine added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getCuisines = async (req, res) => {
    try {
        const cuisines = await cuisineService.getCuisines();
        res.json({ success: true, cuisines: cuisines });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createCuisine,
    getCuisines
};