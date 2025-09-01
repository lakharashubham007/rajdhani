export const validateFormComponent = (formData, permissions) => {
  console.log("permissions", permissions)


  const hasPermission = (module, type) => {
    return permissions?.some(
      (perm) =>
        perm.module_name.toLowerCase() === module.toLowerCase() &&
        perm.type.toLowerCase() === type.toLowerCase()
    );
  };

  const hasCreateProductPrice_TaxPermission = hasPermission('Product', 'Create Price&Tax');

  console.log("hasCreateProductPrice_TaxPermission ------->   ", hasCreateProductPrice_TaxPermission)

  const newErrors = {};

  if (!formData.product_type)
    newErrors.product_type = "Product type is required.";

  if (hasCreateProductPrice_TaxPermission) {
    if (!formData.price)
      newErrors.price = "Price is required.";

    if (!formData.gst)
      newErrors.gst = "GST is required.";
  }

  if (!formData.weight)
    newErrors.weight = "Weight is required.";

  if (!formData.uom)
    newErrors.uom = "Unit of Measurement is required.";

  if (((formData?.product_type === "End Fittings") && (formData?.part === ''))) {
    if (!formData.design) newErrors.design = "Design is required.";
    if (!formData.wire_type) newErrors.wire_type = "Wire type is required.";
    if (!formData.ferrule) newErrors.ferrule = "Ferrule is required.";
    if (!formData.fitting_piece) newErrors.fitting_piece = "Fitting piece is required.";
    if (!formData.skive_type) newErrors.skive_type = "Skive type is required.";
    if (!formData.hose_dash_size) newErrors.hose_dash_size = "Hose dash size is required.";
    // if (!formData.fitting_dash_size) newErrors.fitting_dash_size = "Fitting dash size is required.";

    if (formData.fitting_thread !== "SAE 61" && formData.fitting_thread !== "SAE 62" && formData.fitting_thread !== "METRIC THREAD ORFS"
      && formData.fitting_thread !== "BANJO WITHOUT O" && formData.fitting_thread !== "BANJO WITH O" && formData.fitting_thread !== "BANJO WITH O"
      // && formData?.fitting_thread !== "METRIC"
    ) {
      if (!formData.fitting_dash_size) newErrors.fitting_dash_size = "Fitting dash size is required.";
    } else {
      if (!formData.OD) newErrors.OD = "OD is required.";
    }

    if (formData.fitting_thread == "METRIC") {
      if (!formData.pipeOD) newErrors.pipeOD = "Pipe OD is required.";
      if (!formData.metric_type) newErrors.metric_type = "Metric Type is required.";
      // if (!formData.fitting_dash_size) newErrors.fitting_dash_size = "Fitting dash size is required.";
    } else {
      // if (!formData.variant) newErrors.variant = "Variant is required.";
    }

    if (!formData.fitting_thread) newErrors.fitting_thread = "Fitting thread is required.";
    if (
      !formData.fitting_type &&
      formData.fitting_thread !== "BANJO WITH O" &&
      formData.fitting_thread !== "BANJO WITHOUT O"
    ) {
      newErrors.fitting_type = "Fitting type is required.";
    }
    // if (!formData.fitting_type) newErrors.fitting_type = "Fitting type is required.";
    if (!formData.straight_bend_angle) newErrors.straight_bend_angle = "Straight bend angle is required.";
    if (formData.straight_bend_angle !== "Straight") {
      // if (!formData.drop_length) newErrors.drop_length = "Drop length is required.";
    }
    // if (!formData.neck_length) newErrors.neck_length = "Neck length is required.";

  }
  //Parts Validation NUT
  else if (((formData?.product_type === "End Fittings") && (formData?.part === 'Nut'))) {
    if (!formData.part) newErrors.design = "Nut is required.";
    if (!formData.design) newErrors.design = "Design is required.";
    if (!formData.fitting_thread) newErrors.fitting_thread = "Fitting thread is required.";
    if (!formData.fitting_dash_size) newErrors.fitting_dash_size = "Fitting dash size is required.";
    if (!formData?.nut_hex) newErrors.nut_hex = "Nut Hex is required.";
    if (!formData?.nut_length) newErrors.nut_length = "Nut Length is required.";


  } else if (formData.product_type === "Hose Pipe") {
    // if (!formData.brand) newErrors.brand = "Brand is required.";
    if (!formData.brand_lay_line) newErrors.brand_lay_line = "Brand Lay Line is required.";
    if (!formData.hose_pipe_mfc) newErrors.hose_pipe_mfc = "MFC is required.";
    if (!formData.hose_dash_size) newErrors.hose_dash_size = "Hose Dash Size is required.";
    if (!formData.hose_type) newErrors.hose_type = "Hose Type is required.";
  } else if (formData.product_type === "Hose Assembly") {
    if (!formData?.part_no) newErrors.part_no = "Part no. is required."
    if (!formData.hose) newErrors.hose = "Hose Pipe is required.";
    if (!formData.fitting_a_description) newErrors.fitting_a_description = "Fitting A is required.";
    if (!formData.fitting_b_description) newErrors.fitting_b_description = "Fitting B is required.";
    if (!formData.assembly_length) newErrors.assembly_length = "Assembly Length is required.";
    if (!formData.fitting_length) newErrors.fitting_length = "Fitting Length is required.";
    if (!formData.cutting_length) newErrors.cutting_length = "Cut Length is required.";
    // if (!formData.guard_type) newErrors.guard_type = "Guard Type is required.";
    // if (!formData.guard) newErrors.guard = "Hose Protection is required.";
  } else if (formData.product_type === "Spring") {
    if (!formData.inner_diameter) newErrors.inner_diameter = "Inner Diameter is required.";
    if (!formData.spring_length) newErrors.spring_length = "Spring Length is required.";
    if (!formData.spring_type) newErrors.spring_type = "Spring Type is required.";
    if (!formData.hose_size) newErrors.hose_size = "Hose Size is required.";
  } else if (formData.product_type === "O-ring") {
    if (!formData.size) newErrors.size = "Size is required.";
    if (!formData.inner_diameter) newErrors.inner_diameter = "Inner Diameter is required.";
    if (!formData.thickness) newErrors.thickness = "Thickness is required.";
    if (!formData.hardness) newErrors.hardness = "Hardness is required.";
    if (!formData.fitting_thread) newErrors.fitting_thread = "Thread is required.";
  } else if (formData.product_type === "Dust Cap") {
    if (!formData.fitting_thread) newErrors.fitting_thread = "fitting Thread  is required.";
    if (!formData.size) newErrors.size = "Size is required.";
    if (!formData.dustcap_color) newErrors.dustcap_color = "Color is required.";
    if (!formData.male_female_type) newErrors.male_female_type = "(Male/Female) is required.";
  } else if (formData?.product_type === "Sleeve") {
    if (!formData?.size) newErrors.size = "Size is required.";
    if (!formData?.inner_diameter) newErrors.inner_diameter = "Inner Diameter is required.";
    if (!formData?.outer_diameter) newErrors.outer_diameter = "Outer Diameter is required.";
    // if (!formData.length) newErrors.length = "Length is required.";
  } else if (formData?.product_type === "Vinyl Cover") {
    if (!formData?.size) newErrors.size = "Size is required.";
    if (!formData?.inner_diameter) newErrors.inner_diameter = "Inner Diameter is required.";
    if (!formData?.outer_diameter) newErrors.outer_diameter = "Outer Diameter is required.";
    // if (!formData?.length) newErrors.length = "inner_diameter is required.";
    if (!formData?.thickness) newErrors.thickness = "Thickness is required.";
  } else if (formData.product_type === "Packing") {
    if (!formData.item_name) newErrors.item_name = "Item Name is required.";
  } else if (formData.product_type === "Tube Fittings") {
    if (!formData.tube_fitting_thread) newErrors.tube_fitting_thread = "Tube Fitting Thread  is required.";
    if (!formData.tube_fitting_category) newErrors.tube_fitting_category = "Tube Fitting Category is required.";
    if (!formData.part_description) newErrors.part_description = "Part Description is required.";
    if (!formData.part_code) newErrors.part_code = "Part Code is required.";

  }
  return newErrors;
};
