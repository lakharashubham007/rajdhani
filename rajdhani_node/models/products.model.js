const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // General fields applicable to all products
    name: { type: String, trim: true }, // Optional field for product name
    description: { type: String, trim: true },
    mfc: { type: String, trim: true }, // Manufacturer or supplier code
    product_type: { type: String, trim: true },
    product_code: { type: String, trim: true },
    product_unit: { type: String, trim: true },
    uom: { type: String, trim: true },
    weight: { type: String, trim: true },
    part: { type: String, trim: true },
    price: { type: String, trim: true },
    gst: { type: String, trim: true },


    // End Fitting
    design: { type: String, trim: true },
    wire_type: { type: String, trim: true },
    with_cap: { type: String, trim: true },
    ferrule: { type: String, trim: true },
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


    brand: { type: String, trim: true },

    // Hose Pipe
    brand_lay_line: { type: String, trim: true },
    hose_pipe_mfc: { type: String, trim: true },
    hose_type: { type: String, trim: true },

    // Hose Assembly
    part_no: { type: String, trim: true },
    hose: { type: String, trim: true },
    hose_product_Code: { type: String, trim: true },
    hose_fitting_Code: { type: String, trim: true },
    hose_label: { type: String, trim: true },

    fitting_a_description: { type: String, trim: true },
    fitting_a_fitting_Code: { type: String, trim: true },
    fitting_a_product_Code: { type: String, trim: true },
    fitting_a_label: { type: String, trim: true },

    fitting_b_description: { type: String, trim: true },
    fitting_b_fitting_Code: { type: String, trim: true },
    fitting_b_product_Code: { type: String, trim: true },
    fitting_b_label: { type: String, trim: true },

    assembly_length: { type: String, trim: true },
    fitting_length: { type: String, trim: true },
    cutting_length: { type: String, trim: true },
    oa: { type: String, trim: true },
    guard_type: { type: String, trim: true },
    guard: { type: String, trim: true },
    guard_prodcut_code: { type: String, trim: true },
    guard_label: { type: String, trim: true },
    
    orientation_angle: { type: String, trim: true },
    hose_protection: { type: String, trim: true },


   

    // Spring
    inner_diameter: { type: String, trim: true },
    spring_length: { type: String, trim: true },
    spring_type: { type: String, trim: true },
    hose_size: { type: String, trim: true },
    spring_dsc: { type: String, trim: true },


    // O-ring
    inner_diameter: { type: String, trim: true },
    thickness: { type: String, trim: true },
    size: { type: String, trim: true },
    hardness: { type: String, trim: true },

    // Dust Cap
    thread_type: { type: String, trim: true },
    cap_type: { type: String, trim: true },
    male_female_type: { type: String, trim: true },
    dustcap_color: { type: String, trim: true },

    // Sleeve
    sleeve_size: { type: String, trim: true },
    sleeve_inner_diameter: { type: String, trim: true },
    outer_diameter: { type: String, trim: true },
    sleeve_length: { type: String, trim: true },

    // Vinyl Cover
    vinyl_inner_diameter: { type: String, trim: true },
    vinyl_length: { type: String, trim: true },
    vinyl_thickness: { type: String, trim: true },

    // Packing
    item_name: { type: String, trim: true },

    // Tube Fitting
    tube_fitting_thread: { type: String, trim: true },
    tube_fitting_category: { type: String, trim: true },
    part_code: { type: String, trim: true },
    part_description: { type: String, trim: true },
    

    // Common optional fields
    part_no: { type: String, trim: true },
    status: { type: Boolean, default: true }, // Active status


    note: {type: String, trim: true },
    location: {type: String, trim: true },
    additional:{type: String, trim: true },

    //image 
    image: {
      type: String,
      trim: true,
      default: 'rajdhani_product.jpg', // Default image if none provided
    },
    gallery: [
      {
        type: String,
        trim: true,
      }
    ],
    qr_code: {
      type: String,
      trim: true,
      default: '', // Empty by default, will be updated when product is created
    },
    qr_url: {
      type: String,
      trim: true,
      default: '', // Empty by default, will be updated when product is created
    },

    isDeleted: {
      type: Boolean,
      default: false, // Marks the product as active by default
    },
  },

  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Automatically adds createdAt and updatedAt fields
  }
);

const Products = mongoose.model("Products", productSchema);

module.exports.Products = Products;

