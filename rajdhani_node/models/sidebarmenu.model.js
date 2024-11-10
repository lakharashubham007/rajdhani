const mongoose = require('mongoose');

// Define the schema for the submenu content
const SubmenuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    to: { type: String },
    hasMenu: { type: Boolean, default: false },
    content: [
        {
            title: { type: String },
            to: { type: String },
        }
    ]
});

// Define the schema for the main menu items
const SideBarMenuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    classsChange: { type: String, default: '' },
    extraclass: { type: String, default: '' },
    iconStyle: { type: String, default: '' },
    to: { type: String },
    hasMenu: { type: Boolean, default: false },
    content: [SubmenuSchema]  // Array of submenu items
});

// Create the model for the collection
const SideBarMenu = mongoose.model('SideBarMenu', SideBarMenuSchema);

module.exports.SideBarMenu = SideBarMenu;
