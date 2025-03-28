export const validateFormComponent = (formData) => {
  const newErrors = {};

  if (!formData.product_type)
    newErrors.product_type = "Product type is required.";

  if (!formData.price)
    newErrors.price = "Price is required.";

  if (!formData.gst)
    newErrors.gst = "GST is required.";

  if (!formData.weight)
    newErrors.weight = "Weight is required.";

  if (!formData.uom)
    newErrors.uom = "Unit of Measurement is required.";

  if (formData.product_type === "End Fittings") {
    if (!formData.design) newErrors.design = "Design is required.";
    if (!formData.wire_type) newErrors.wire_type = "Wire type is required.";
    if (!formData.ferrule) newErrors.ferrule = "Ferrule is required.";
    if (!formData.fitting_piece) newErrors.fitting_piece = "Fitting piece is required.";
    if (!formData.skive_type) newErrors.skive_type = "Skive type is required.";
    if (!formData.hose_dash_size) newErrors.hose_dash_size = "Hose dash size is required.";

    if (formData.fitting_thread !== "SAE 61" && formData.fitting_thread !== "SAE 62") {
      if (!formData.fitting_dash_size) newErrors.fitting_dash_size = "Fitting dash size is required.";
    } else {
      if (!formData.OD) newErrors.OD = "OD is required.";
    }

    if (formData.fitting_thread == "METRIC") {
      if (!formData.pipeOD) newErrors.pipeOD = "Pipe OD is required.";
      if (!formData.metric_type) newErrors.metric_type = "Metric Type is required.";
      // if (!formData.fitting_dash_size) newErrors.fitting_dash_size = "Fitting dash size is required.";
    } else {
      if (!formData.variant) newErrors.variant = "Variant is required.";
    }

    if (!formData.fitting_thread) newErrors.fitting_thread = "Fitting thread is required.";
    if (!formData.fitting_type) newErrors.fitting_type = "Fitting type is required.";
    if (!formData.straight_bend_angle) newErrors.straight_bend_angle = "Straight bend angle is required.";
    if (formData.straight_bend_angle !== "Straight") {
      if (!formData.drop_length) newErrors.drop_length = "Drop length is required.";
    }
    if (!formData.neck_length) newErrors.neck_length = "Neck length is required.";

  } else if (formData.product_type === "Hose Pipe") {
    // if (!formData.brand) newErrors.brand = "Brand is required.";
    if (!formData.brand_lay_line) newErrors.brand_lay_line = "Brand Lay Line is required.";
    if (!formData.hose_pipe_mfc) newErrors.hose_pipe_mfc = "MFC is required.";
    if (!formData.hose_dash_size) newErrors.hose_dash_size = "Hose Dash Size is required.";
    if (!formData.hose_type) newErrors.hose_type = "Hose Type is required.";
  } else if (formData.product_type === "Hose Assembly") {
    if (!formData.hoseBrand) newErrors.hoseBrand = "Hose Brand is required.";
    if (!formData.hoseType) newErrors.hoseType = "Hose Type is required.";
    if (!formData.fittingA) newErrors.fittingA = "Fitting A is required.";
    if (!formData.fittingB) newErrors.fittingB = "Fitting B is required.";
    if (!formData.assemblyLength) newErrors.assemblyLength = "Assembly Length is required.";
    if (!formData.fittingLength) newErrors.fittingLength = "Fitting Length is required.";
    if (!formData.cutLength) newErrors.cutLength = "Cut Length is required.";
    if (!formData.orientationAngle) newErrors.orientationAngle = "Orientation Angle is required.";
    if (!formData.hoseProtection) newErrors.hoseProtection = "Hose Protection is required.";
  } else if (formData.product_type === "Spring") {
    if (!formData.inner_diameter) newErrors.inner_diameter = "Inner Diameter is required.";
    if (!formData.spring_length) newErrors.spring_length = "Spring Length is required.";
    if (!formData.spring_type) newErrors.spring_type = "Spring Type is required.";
    if (!formData.hose_size) newErrors.hose_size = "Hose Size is required.";
  } else if (formData.product_type === "O-ring") {
    if (!formData.size) newErrors.size = "Size is required.";
    if (!formData.innerDiameter) newErrors.innerDiameter = "Inner Diameter is required.";
    if (!formData.thickness) newErrors.thickness = "Thickness is required.";
    if (!formData.hardness) newErrors.hardness = "Hardness is required.";
    if (!formData.thread) newErrors.thread = "Thread is required.";
  } else if (formData.product_type === "Dust Cap") {
    if (!formData.threadType) newErrors.threadType = "Thread Type is required.";
    if (!formData.size) newErrors.size = "Size is required.";
    if (!formData.color) newErrors.color = "Color is required.";
    if (!formData.gender) newErrors.gender = "Gender (Male/Female) is required.";
    if (!formData.threadType) newErrors.threadType = "Thread Type is required.";
    if (!formData.threadSize) newErrors.threadSize = "Thread Size is required.";
  } else if (formData.product_type === "Sleeve") {
    if (!formData.size) newErrors.size = "Size is required.";
    if (!formData.innerDiameter) newErrors.innerDiameter = "Inner Diameter is required.";
    if (!formData.outerDiameter) newErrors.outerDiameter = "Outer Diameter is required.";
    if (!formData.length) newErrors.length = "Length is required.";
  } else if (formData.product_type === "Vinyl Cover") {
    if (!formData.innerDiameter) newErrors.innerDiameter = "Inner Diameter is required.";
    if (!formData.length) newErrors.length = "Length is required.";
    if (!formData.thickness) newErrors.thickness = "Thickness is required.";
  } else if (formData.product_type === "Packing") {
    if (!formData.item_name) newErrors.item_name = "Item Name is required.";
    if (!formData.color) newErrors.color = "Color is required.";
    if (!formData.dimensions) newErrors.dimensions = "Dimensions are required.";
  } else if (formData.product_type === "Tube Fittings") {
    if (!formData.fitting_type) newErrors.fitting_type = "Fitting Type is required.";
    if (!formData.shape) newErrors.shape = "Shape is required.";
    if (!formData.end) newErrors.end = "End is required.";
    if (!formData.tube_size) newErrors.tube_size = "Size is required.";
    if (!formData.material) newErrors.material = "Material is required.";
    if (!formData.additionalProcess) newErrors.additionalProcess = "Additional Process is required.";
    if (!formData.supply) newErrors.supply = "Supply is required.";
  }
  return newErrors;
};
