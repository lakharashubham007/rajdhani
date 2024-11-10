const { permissionService } = require("../services");


const getPermission = async (req, res) => {
    try {
      const permissions = await permissionService.getPermission();
      res.json({ success: true, permissions: permissions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  



module.exports = {
    getPermission,
};