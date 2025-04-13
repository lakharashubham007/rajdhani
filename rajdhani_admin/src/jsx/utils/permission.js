// utils/permission.js
export const hasPermission = (permissions, moduleName, type) => {
    return permissions?.some(
      (perm) => perm.module_name === moduleName && perm.type === type
    );
  };
  