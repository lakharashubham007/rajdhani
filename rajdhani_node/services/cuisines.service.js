// const { Admins, SidebarMenu} = require('../models');
const {cuisines} = require('../models')

const createCuisines = async (data,file) => {
  try {
    const newcuisine = await cuisines.create({name: data.name, image: file});
    return newcuisine;
  } catch (error) {
    console.error('Error getting user sidebar menus:', error);
    throw error;
  }
};

const getCuisines = async () => {
    try {
        const cuisinesList = await cuisines.find({});
        return cuisinesList;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createCuisines,
    getCuisines
};
