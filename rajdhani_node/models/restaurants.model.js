const mongoose = require("mongoose");

const restaurantsSchema = new mongoose.Schema(
    {
        restaurantName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        restaurantAddress: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        vat: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        deliveryTime: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        cuisine: [
                        {
                            type: String,
                            trim: true,
                            maxlength: 100,
                        },
                    ],
        zone: {
            type: String,
            trim: true,
        },
        latitude: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        longitude: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        firstName: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        tags: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxlength: 255,
        },
        password: {
            type: String,
            // required: true,
            trim: true,
            minlength: 6,
        },
        vendor_id: {
            // type: String,
            type: mongoose.Schema.Types.ObjectId, // Refers to ObjectId, as it maps to bigint(20)
            // // required: true,
            ref: 'Vendors', // Assuming you have a Restaurant model
          },
        // confirmPassword: {
        //     type: String,
        //     required: true,
        //     trim: true,
        //     minlength: 6,
        //     validate: {
        //         validator: function () {
        //             return this.password === this.confirmPassword;
        //         },
        //         message: "Passwords do not match",
        //     },
        // },
        phone: {
            type: String,
            // required: true,
            trim: true,
            maxlength: 15,
        },
        logo: {
            type: String, // Path to the logo file
            trim: true,
        },
        cover: {
            type: String, // Path to the cover image file
            trim: true,
        },
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

const Restaurants = mongoose.model("Restaurants", restaurantsSchema);

module.exports.Restaurants = Restaurants;

// const mongoose = require("mongoose");

// const restaurantsSchema = new mongoose.Schema(
//     {
//         firstName: {
//             type: String,
//             required: true,
//             trim: true,
//             maxlength: 100,
//         },
//         lastName: {
//             type: String,
//             required: true,
//             trim: true,
//             maxlength: 100,
//         },
//         phone: {
//             type: String,
//             required: true,
//             trim: true,
//             maxlength: 15,
//         },
//         email: {
//             type: String,
//             required: true,
//             trim: true,
//             unique: true,
//             maxlength: 255,
//         },
//         password: {
//             type: String,
//             required: true,
//             trim: true,
//             minlength: 6,
//         },
//         zone: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "zones", // Assuming there is a "zones" schema that this refers to
//             // required: true,
//         },
//         cuisine: [
//             {
//                 type: String,
//                 trim: true,
//                 maxlength: 100,
//             },
//         ],
//         logo: {
//             type: String, // Path to the logo file (since files are typically stored in file systems, only the path is stored in the DB)
//             trim: true,
//             // maxlength: 255,
//             // required: true,
//         },
//         cover: {
//             type: String, // Path to the cover image file
//             trim: true,
//             // maxlength: 255,
//             // required: true,
//         },
//         status: {
//             type: Boolean,
//             default: true,
//         },
//         created_at: {
//             type: Date,
//             default: Date.now,
//         },
//         updated_at: {
//             type: Date,
//             default: Date.now,
//         },
//     },
//     {
//         timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
//     }
// );

// const Restaurants = mongoose.model("Restaurants", restaurantsSchema);

// module.exports.Restaurants = Restaurants;



