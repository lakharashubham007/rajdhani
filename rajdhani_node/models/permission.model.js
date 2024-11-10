const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  permission_name: {
    type: String,
    required: true,
  },
  description: String,
  route: String,
  module:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module"
  },
});

const Permission = mongoose.model("Permission", permissionSchema);

module.exports.Permission = Permission;
