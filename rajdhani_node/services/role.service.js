const { adminRoles } = require("../models");

const createRole = async (roleData) => {
  try {
    const role = await adminRoles.create({ ...roleData });
    return { message: "Role created successfully", role };
  } catch (error) {
    console.error("Error adding role:", error);
    throw error;
  }
};

const getRole = async () => {
  try {
    const roels = await adminRoles.find().populate('sidebarMenus');
    return roels;
  } catch (error) {
    console.error("Error getting Category :", error);
    throw error;
  }
};

const getRoleById = async (Id) => {
  try {
    const roleById = await adminRoles.findById(Id);
    if (!roleById) {
      throw new Error("Role not found");
    }
    return roleById;
  } catch (error) {
    console.error("Error getting Role by ID:", error);
    throw error;
  }
};

const updatRole = async (Id, updatedData) => {
  try {
    const editRole = await adminRoles.findByIdAndUpdate(
      Id,
      {
        name: updatedData.name,
      },
      { new: true }
    );

    if (!editRole) {
      throw new Error("Role not found");
    }

    return editRole;
  } catch (error) {
    throw error;
  }
};

const deleteRole = async (Id) => {
  try {
    const updatedRole = await adminRoles.findByIdAndUpdate(
      Id,
      { deleted: true },
      { new: true }
    );
    if (!updatedRole) {
      throw new Error("Role not found");
    }
    return updatedRole;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRole,
  getRole,
  updatRole,
  getRoleById,
  deleteRole,
};
