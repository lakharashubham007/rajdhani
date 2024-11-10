const mongoose = require("mongoose");

const admin_roles = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        sidebarMenus: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "SideBarMenu",
            required: true
        }],
        deleted: { type: Boolean, default: false },
        permissions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission",
            required: true
        }],
        status: {
            type: Boolean,
            default: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const adminRoles = mongoose.model("adminRoles", admin_roles);

module.exports.adminRoles = adminRoles;