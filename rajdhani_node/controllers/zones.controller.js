const { zonesService } = require("../services");

const createZone = async (req, res) => {
    try {
        const zoneData = req.body;
        console.log(zoneData, "zone data is here");
        const zone = await zonesService.createZone(zoneData);
        res.json({ success: true, zone: zone ,message: 'Zone Created Successfully!!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getZones = async (req, res) => {
    try {
        const zones = await zonesService.getZones();
        res.json({ success: true, zones: zones });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createZone,
    getZones,
};
