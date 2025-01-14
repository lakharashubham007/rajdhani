const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // General fields applicable to all products
    name: { type: String, trim: true }, // Optional field for product name
    description: { type: String, trim: true },
    mfc: { type: String, trim: true }, // Manufacturer or supplier code
    product_type: { type: String, trim: true }, 
    part: { type: String, trim: true }, 


    // End Fitting
    design: { type: String, trim: true },
    wire_type: { type: String, trim: true },
    with_cap: { type: String, trim: true},
    ferrule: { type: String, trim: true},
    fitting_piece: { type: String, trim: true },
    skive_type: { type: String, trim: true },
    hose_dash_size: { type: String, trim: true },
    fitting_dash_size: { type: String, trim: true },
    fitting_thread: { type: String, trim: true },
    fitting_type: { type: String, trim: true },
    straight_bend_angle: { type: String, trim: true },
    drop_length: { type: String, trim: true },
    neck_length: { type: String, trim: true },
    desc_Code: { type: String, trim: true },
    fitting_Code: { type: String, trim: true },
    OD: { type: String, trim: true },
    pipeOD: { type: String, trim: true },
    variant: { type: String, trim: true },

    //Part
    nut_hex: { type: String, trim: true }, 
    nut_length: { type: String, trim: true },
    cap_size: { type: String, trim: true },
    big_bore: { type: String, trim: true },
    length: { type: String, trim: true },
    od: { type: String, trim: true },
    additional: { type: String, trim: true },

    // Ferrule (Part of End Fittings)
    ferrule_design: { type: String, trim: true },
    ferrule_wire_type: { type: String, trim: true },
    ferrule_hose_dash_size: { type: String, trim: true },

    // Hose Pipe
    brand: { type: String, trim: true },

    // Hose Assembly
    hose_brand: { type: String, trim: true },
    hose_type: { type: String, trim: true },
    fitting_a: { type: String, trim: true },
    fitting_b: { type: String, trim: true },
    assembly_length: { type: String, trim: true },
    fitting_length: { type: String, trim: true },
    cut_length: { type: String, trim: true },
    orientation_angle: { type: String, trim: true },
    hose_protection: { type: String, trim: true },
    brand_lay_line: { type: String, trim: true },

    // Spring
    inner_diameter: { type: String, trim: true },
    spring_length: { type: String, trim: true },
    spring_type: { type: String, trim: true },
    hose_size: { type: String, trim: true },

    // O-ring
    size: { type: String, trim: true },
    o_ring_inner_diameter: { type: String, trim: true },
    thickness: { type: String, trim: true },
    hardness: { type: String, trim: true },

    // Dust Cap
    thread_type: { type: String, trim: true },
    colour: { type: String, trim: true },
    male_female: { type: String, enum: ["Male", "Female"] },

    // Sleeve
    sleeve_size: { type: String, trim: true },
    sleeve_inner_diameter: { type: String, trim: true },
    sleeve_outer_diameter: { type: String, trim: true },
    sleeve_length: { type: String, trim: true },

    // Vinyl Cover
    vinyl_inner_diameter: { type: String, trim: true },
    vinyl_length: { type: String, trim: true },
    vinyl_thickness: { type: String, trim: true },

    // Packing
    item_name: { type: String, trim: true },

    // Tube Fitting
    fitting_type: { type: String, trim: true },
    shape: { type: String, trim: true },
    end: { type: String, trim: true },
    tube_size: { type: String, trim: true },
    material: { type: String, trim: true },
    additional_process: { type: String, trim: true },
    supply_colour: { type: String, trim: true },
    dimensions: { type: String, trim: true },

    // Common optional fields
    part_no: { type: String, trim: true },
    status: { type: Boolean, default: true }, // Active status

    //image 
    image: {
        type: String,
        trim: true,
        default: 'default-product-image.png', // Default image if none provided
    },
    gallery: [
        {
            type: String,
            trim: true,
        }
    ],
  },
         
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Automatically adds createdAt and updatedAt fields
  }
);

const Products = mongoose.model("Products", productSchema);

module.exports.Products = Products;

