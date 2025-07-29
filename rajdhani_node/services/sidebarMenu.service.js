// const { Admins, SidebarMenu} = require('../models');
const {Admins, SideBarMenu} = require('../models')

const getUserSidebarMenus = async (userId) => {
  try {
    const userdetails = await Admins.findById(userId).populate('role_id');
    const userCopy = JSON.parse(JSON.stringify(userdetails));
    // console.log(userCopy, "usercopy is here-------")
    const sidebarMenus = await SideBarMenu.find({ _id: { $in: userCopy.role_id.sidebarMenus } });
    return sidebarMenus;
  } catch (error) {
    console.error('Error getting user sidebar menus:', error);
    throw error;
  }
};

const updateSidebarMenuCountsByTitle = async (_id, statusCount) => {

  const menu = await SideBarMenu.findById(_id);
  if (!menu) return null;

  // Loop over top-level content array and update matching titles
  menu.content = menu.content.map(item => {
    const count = statusCount[item.title]; // Match by title
    if (count !== undefined) {
      // const current = parseInt(item.update || '0', 10);
      item.update = (count).toString();
    }
    return item;
  });

  const savedMenu = await menu.save();
  return savedMenu;
};


// const getSidebarMenus = async () => {
//   try {
//     const sidebarMenus = await SidebarMenu.find();
//     return sidebarMenus;
//   } catch (error) {
//     console.error('Error getting user sidebar menus:', error);
//     throw error;
//   }
// };

// const formatSidebarMenus = (sidebarMenus) => {
//   return sidebarMenus.map(menu => {
//     const formattedMenu = {
//       _id: menu._id,
//       menu: menu.menu,
//       parentMenu: menu.parentMenu,
//       type: menu.type,
//     };

//     const subMenus = sidebarMenus.filter(subMenu => subMenu.parentMenu === menu.menu);
//     if (subMenus.length > 0) {
//       formattedMenu.subMenus = subMenus
//         .filter(subMenu => subMenu.menu !== menu.menu)
//         .map(subMenu => ({
//           _id: subMenu._id,
//           menu: subMenu.menu,
//           parentMenu: subMenu.parentMenu,
//           type: subMenu.type,
//         }));
//     }

//     return sidebarMenus;
//   });
// };

// const filterMainMenus = (formattedSidebarMenus) => {
//   return formattedSidebarMenus.filter(menu =>
//     !formattedSidebarMenus.some(subMenu => subMenu.subMenus && subMenu.subMenus.some(sub => sub.menu === menu.menu))
//   );
// };

module.exports = {
  getUserSidebarMenus,
  updateSidebarMenuCountsByTitle
};
