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


const updateSidebarMenuStatusCount = async (req, res) => {
  try {
    const { _id, statusCount } = req.body;

    if (!_id || !statusCount) {
      return res.status(400).json({ success: false, message: "Missing required fields (_id or statusCount)" });
    }

    const updatedMenu = await sidebarMenuService.updateSidebarMenuCountsByTitle(_id, statusCount);

    if (!updatedMenu) {
      return res.status(404).json({ success: false, message: "Sidebar menu not found" });
    }

    res.json({ success: true, message: "Sidebar menu count updated successfully", data: updatedMenu });
  } catch (error) {
    console.error("Error in updateSidebarMenuStatusCount controller:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports = {
  getSidebarMenus,
  getAllSidebarMenus,
  updateSidebarMenuStatusCount
};