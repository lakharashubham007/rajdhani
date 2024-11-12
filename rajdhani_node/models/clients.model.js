const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            maxlength: 100,
            default: null, // Nullable in SQL
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 100,
            default: null, // Nullable in SQL
        },
        phone: {
            type: String,
            trim: true,
            maxlength: 20,
            default: null, // Nullable in SQL
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true, // Ensures email uniqueness
            maxlength: 100,
            index: true,
        },
        companyName: {
            type: String,
            trim: true,
            maxlength: 150,
            default: null, // Nullable for companies with no name specified
        },
        address: {
            type: String,
            trim: true,
            maxlength: 250,
            default: null, // Nullable if address is not provided
        },
        image: {
            type: String,
            trim: true,
            maxlength: 100,
            default: null,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        status: {
            type: Boolean,
            default: true, // Active status by default
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

// Static method to check if an email is taken
clientSchema.statics.isEmailTaken = async function (email) {
    const client = await this.findOne({ email });
    return !!client;
};

// Instance method to compare password
clientSchema.methods.isPasswordMatch = async function (password) {
    const client = this;
    return await bcrypt.compare(password, client.password);
};

// Hash password before saving
clientSchema.pre('save', async function (next) {
    const client = this;
    if (client.isModified('password')) {
        client.password = await bcrypt.hash(client.password, 8);
    }
    next();
});

const Clients = mongoose.model("Clients", clientSchema);

module.exports.Clients = Clients;
