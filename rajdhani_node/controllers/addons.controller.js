const { addonService } = require("../services"); // Assuming you have addonService in services

const createAddon = async (req, res) => {
    try {
        const addon = await addonService.createAddon(req.body); // Assuming file handling is not needed for addons
        res.json({ success: true, addon , message: 'Addons created successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getAddons = async (req, res) => {
    try {
        const addons = await addonService.getAddons();
        res.json({ success: true, addons });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    createAddon,
    getAddons
};
