const { zones } = require('../models');

const createZone = async (data) => {
  try {
    const newZone = await zones.create({...data});
    console.log("data is here", data)
    return newZone;
  } catch (error) {
    console.error('Error creating zone:', error);
    throw error;
  }
};

const getZones = async () => {
  try {
    const zonesList = await zones.find({});
    return zonesList;
  } catch (error) {
    console.error('Error fetching zones:', error);
    throw error;
  }
};

module.exports = {
  createZone,
  getZones,
};
