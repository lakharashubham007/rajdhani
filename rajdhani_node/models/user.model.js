const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role", // Reference to the Role collection
      required: true,
    },
    userType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserType",

    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    cPassword: {
      type: String,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phonenumber: {
      type: String,
      // match: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    },
    firebasetoken: String,
    remembertoken: String,
    socialmediaUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialMediaUser",
    },
    profile_picture: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: "Invalid URL for profile picture",
      },
    },
    last_login: Date,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deleted: { type: Boolean, default: false },
    is_active: {
      type: Boolean,
      default: true,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } //Create createdAt and updatedAt fields automatically
);

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};


const User = mongoose.model("User", userSchema);

module.exports.User = User;
