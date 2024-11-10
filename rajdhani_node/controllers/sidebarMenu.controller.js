const { User } = require('../models');
const { sidebarMenuService } = require('../services');

const getSidebarMenus = async (req, res) => {
  try {
    const userId = req.user.sub;
    const sidebarMenus = await sidebarMenuService.getUserSidebarMenus(userId);
    // const formattedSidebarMenus = sidebarMenuService.formatSidebarMenus(sidebarMenus);
    // const filteredSidebarMenus = sidebarMenuService.filterMainMenus(formattedSidebarMenus);
    res.json({ success: true, MenuList: sidebarMenus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getAllSidebarMenus = async (req, res) => {
  try {
    const sidebarMenus = await sidebarMenuService.getSidebarMenus();
    res.json({ success: true, sidebarMenus: sidebarMenus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


module.exports = {
  getSidebarMenus,
  getAllSidebarMenus
};