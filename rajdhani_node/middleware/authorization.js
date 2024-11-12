const models = require("../models");

const authorization = async (req, res, next) => {
    try {
        // Step 1 - Check if role has permissions
        const user = await models.Admins.findById(req.user.sub);
        console.log(user, 'user is here');
        const role = await models.adminRoles.findById(user.role_id._id).populate('permissions');
        console.log(role, 'role is here');
        
        if (!role.permissions || role.permissions.length === 0) {
            return res.status(401).json({
                success: false,
                message: `You do not have sufficient permissions to perform this action. Please contact your administrator for permissions.`
            });
        }

        // Step 2 - Extract the route part of the URL without query parameters
        const urlPath = req.originalUrl.split('?')[0]; // Get path without query parameters
        
        // Step 3 - Get all permitted modules for the user role
        const modules = (await models.Permission.find({
            route: {
                $in: (await models.adminRoles.findById(
                    (await models.Admins.findById(req.user.sub)).role_id._id).populate('permissions')).permissions.map(permission => {
                        return permission.route;
                    })
            }
        })).map(permission => permission.route);

        console.log(modules, "modules are here...");

        // Step 4 - Check if the current route is authorized
        const segments = urlPath.split('/');
        const lastSegment = segments[segments.length - 1]; // Last part of the route path
        const secondLastSegment = segments[segments.length - 2]; // Second last part of the path
        console.log("This is secondLastSegment --->", secondLastSegment);

        if (modules.includes(lastSegment) || modules.includes(secondLastSegment)) {
            console.log("Authorization successful for route:", urlPath);
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: `You are not authorized for this action!`,
            });
        }

    } catch (error) {
        console.error('Authorization error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

module.exports = authorization;


// const models = require("../models");

// const authorization = async (req, res, next) => {

//     try {
//         // Step 1 - Check if role has permissions
//         const user = await models.Admins.findById(req.user.sub);
//         console.log(user, 'user is here');
//         const role = await models.adminRoles.findById(user.role_id._id).populate('permissions');
//         console.log(role, 'role is here');
//         if (!role.permissions || role.permissions.length === 0) {
//             return res.status(401).json({
//                 success: false,
//                 message: `You do not have sufficient permissions to perform this action. Please contact your administrator for permissions.`
//             });
//         }

//         // Step 2 - Continue with existing logic to authorize based on permissions
//         const modules = (await models.Permission.find({
//             route: {
//                 $in: (await models.adminRoles.findById(
//                     (await models.Admins.findById(req.user.sub)).role_id._id).populate('permissions')).permissions.map(permission => {
//                         return permission.route
//                     })
//             }
//         })).map(permissions => permissions.route);

//        console.log(modules, "moduels are here...");
       
//         const segments = req.originalUrl.split('/');
//         const secondLastSegment = segments[segments.length - 2];
//         console.log("This is secondLastSegment --->", secondLastSegment);

//         if (modules.indexOf(req.originalUrl.substring(req.originalUrl.lastIndexOf('/') + 1)) >= 0) {
//             console.log((modules.indexOf(req.originalUrl.substring(req.originalUrl.lastIndexOf('/') + 1)) >=0 , "I Authorized this route"))
//             next();
//         }
//         else if (modules.indexOf(secondLastSegment) >= 0) {
//             console.log(modules.indexOf(secondLastSegment), "else if --> I Authorized this route")
//             next();
//         }
//         else {
//             return res.status(401).json({
//                 success: false,
//                 message: `You are not authorized for this action!!!`,
//             });
//         }

//     } catch (error) {
//         console.error('Authorization error:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error.'
//         });

//     }
// }

// module.exports = authorization;
