
const ProductOptions = [
    { value: "End Fittings", label: "End Fittings" },
    { value: "Hose Pipe", label: "Hose Pipe" },
    { value: "Hose Assembly", label: "Hose Assembly" },
    { value: "Spring", label: "Spring" },
    { value: "O-ring", label: "O-ring" },
    { value: "Dust Cap", label: "Dust Cap" },
    { value: "Sleeve", label: "Sleeve" },
    { value: "Vinyl Cover", label: "Vinyl Cover" },
    { value: "Packing", label: "Packing" },
    { value: "Tube Fittings", label: "Tube Fittings" },
  ];
  
  const WireTypeOptions = [
    { value: "BRAIDED (BR) - B", label: "BRAIDED (BR) - B", code: "B", dsc_code: "BR" },
    { value: "SPIRAL (SP) - S", label: "SPIRAL (SP) - S", code: "S", dsc_code: "SP" },
    { value: "TEFLON (TF) - T", label: "TEFLON (TF) - T", code: "T", dsc_code: "TF" }
  ];
  
  
  const CapWithoutCapOptions = [
    { value: "With Cap", label: "With Cap" },
    { value: "Without Cap", label: "Without Cap" },
  ];
  
  const fittingPieceOptions = [
    { value: "ONE PIECE - 1", label: "ONE PIECE - 1", code: "1" },
    { value: "TWO PIECE - 2", label: "TWO PIECE - 2", code: "2" },
    { value: "THREE PIECE - 3", label: "THREE PIECE - 3", code: "3" },
  ];
  
  const skiveTypeOptions = [
    { value: "SKIVE (SK)", label: "SKIVE (SK)", code: "SK", dsc_code: "(SKIVE)" },
    { value: "NON-SKIVE (NS)", label: "NON-SKIVE (NS)", code: "NS", dsc_code: "(NON-SKIVE)" },
    { value: "INNER-SKIVE (IS)", label: "INNER-SKIVE (IS)", code: "IS", dsc_code: "(INNER-SKIVE)" },
  ];
  
  // const hoseDashSizeOptions = [
  //   { value: "3/16\" (03)", label: "3/16\" (03)", code: "O3", dsc_code: "3/16" },
  //   { value: "1/4\" (04)", label: "1/4\" (04)", code: "O4", dsc_code: "1/4" },
  //   { value: "5/16\" (05)", label: "5/16\" (05)", code: "O5" },
  //   { value: "3/8\" (06)", label: "3/8\" (06)", code: "O6" },
  //   { value: "1/2\" (08)", label: "1/2\" (08)", code: "O8" },
  //   { value: "5/8\" (10)", label: "5/8\" (10)", code: "10" },
  //   { value: "3/4\" (12)", label: "3/4\" (12)", code: "12" },
  //   { value: "1\" (16)", label: "1\" (16)", code: "16" },
  //   { value: "1-1/4\" (20)", label: "1-1/4\" (20)", code: "20" },
  //   { value: "1-1/2\" (24)", label: "1-1/2\" (24)", code: "24" },
  //   { value: "2\" (32)", label: "2\" (32)", code: "32" },
  //   { value: "2-1/2\" (40)", label: "2-1/2\" (40)", code: "40" },
  //   { value: "3\" (48)", label: "3\" (48)", code: "48" },
  //   { value: "3-1/2\" (56)", label: "3-1/2\" (56)", code: "56" },
  //   { value: "4\" (64)", label: "4\" (64)", code: "64" },
  //   { value: "4-1/2\" (72)", label: "4-1/2\" (72)", code: "72" },
  //   { value: "5\" (80)", label: "5\" (80)", code: "80" },
  //   { value: "13/32\" ", label: "13/32\" ", code: "" },
  //   { value: "7/8\" ", label: "7/8\" ", code: "" },
  //   { value: "1-1/8\" ", label: "1-1/8\" ", code: "" },
  //   { value: "1-3/8\" ", label: "1-3/8\" ", code: "" },
  //   { value: "1-13/16\" ", label: "1-13/16\" ", code: "" },
  //   { value: "2-3/8\" ", label: "2-3/8\" ", code: "" }
  // ];
  
  const hoseDashSizeOptions = [
    { value: "3/16\" (03)", label: "3/16\" (03)", code: "O3", dsc_code: "3/16" },
    { value: "1/4\" (04)", label: "1/4\" (04)", code: "O4", dsc_code: "1/4" },
    { value: "5/16\" (05)", label: "5/16\" (05)", code: "O5", dsc_code: "5/16" },
    { value: "3/8\" (06)", label: "3/8\" (06)", code: "O6", dsc_code: "3/8" },
    { value: "1/2\" (08)", label: "1/2\" (08)", code: "O8", dsc_code: "1/2" },
    { value: "5/8\" (10)", label: "5/8\" (10)", code: "10", dsc_code: "5/8" },
    { value: "3/4\" (12)", label: "3/4\" (12)", code: "12", dsc_code: "3/4" },
    { value: "1\" (16)", label: "1\" (16)", code: "16", dsc_code: "1" },
    { value: "1-1/4\" (20)", label: "1-1/4\" (20)", code: "20", dsc_code: "1-1/4" },
    { value: "1-1/2\" (24)", label: "1-1/2\" (24)", code: "24", dsc_code: "1-1/2" },
    { value: "2\" (32)", label: "2\" (32)", code: "32", dsc_code: "2" },
    { value: "2-1/2\" (40)", label: "2-1/2\" (40)", code: "40", dsc_code: "2-1/2" },
    { value: "3\" (48)", label: "3\" (48)", code: "48", dsc_code: "3" },
    { value: "3-1/2\" (56)", label: "3-1/2\" (56)", code: "56", dsc_code: "3-1/2" },
    { value: "4\" (64)", label: "4\" (64)", code: "64", dsc_code: "4" },
    { value: "4-1/2\" (72)", label: "4-1/2\" (72)", code: "72", dsc_code: "4-1/2" },
    { value: "5\" (80)", label: "5\" (80)", code: "80", dsc_code: "5" },
    { value: "13/32\" ", label: "13/32\" ", code: "", dsc_code: "13/32" },
    { value: "7/8\" ", label: "7/8\" ", code: "", dsc_code: "7/8" },
    { value: "1-1/8\" ", label: "1-1/8\" ", code: "", dsc_code: "1-1/8" },
    { value: "1-3/8\" ", label: "1-3/8\" ", code: "", dsc_code: "1-3/8" },
    { value: "1-13/16\" ", label: "1-13/16\" ", code: "", dsc_code: "1-13/16" },
    { value: "2-3/8\" ", label: "2-3/8\" ", code: "", dsc_code: "2-3/8" }
  ];
  
  
  const fittingThreadOptions = [
    { value: "BSP", label: "BSP (B)", code: "B", dsc_code: "BSP" },
    { value: "BSP O", label: "BSP ORING (BO)", code: "BO", dsc_code: "BSPO" },
    { value: "JIC", label: "JIC (J)", code: "J", dsc_code: "JIC" },
    { value: "ORFS", label: "ORFS (O)", code: "O", dsc_code: "ORFS" },
    { value: "KOMATSU", label: "KOMATSU (K)", code: "K", dsc_code: "KOMATSU" },
    { value: "METRIC", label: "METRIC", code: "M", dsc_code: "M" },
    // { value: "METRIC(LIGHT)", label: "METRIC(LIGHT) (DL)", code: "DL" },
    // { value: "METRIC(LIGHT) WITH O", label: "METRIC(LIGHT) WITH O (DLO)", code: "DLO" },
    // { value: "METRIC(HEAVY)", label: "METRIC(HEAVY) (DH)", code: "DH" },
    // { value: "METRIC(HEAVY) WITH O", label: "METRIC(HEAVY) WITH O (DHO)", code: "DHO" },
    { value: "NPT", label: "NPT (NPT)", code: "NPT", dsc_code: "NPT" },
    { value: "JIS", label: "JIS (BSP C-TYPE) (BJ)", code: "BJ", dsc_code: "JIS" },
    { value: "SAE 61", label: "FLG CODE 61- 3000 PSI (3)", code: "3", dsc_code: "JIS" },
    { value: "SAE 62", label: "FLG CODE 62- 6000 PSI (6)", code: "6", dsc_code: "FLG61" },
    { value: "BANJO WITHOUT O", label: "BANJO WITHOUT O (BJ)", code: "BJ", dsc_code: "FLG62" },
    { value: "BANJO WITH O", label: "BANJO WITH O (BJO)", code: "BJO", dsc_code: "BANJO" },
    { value: "METRIC THREAD ORFS", label: "METRIC THREAD ORFS (MO)", code: "MO", dsc_code: "M-ORFS" }
  ];
  
  
  const fittingDashSizeOptions = [
    // BSP
    { thread_type: "BSP", dash: "O4", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4", variant: "Standard" },
    { thread_type: "BSP", dash: "O5", inch: "5/16\"", thread: "5/16\"", dsc_code: "5/16", variant: "Lower Jump" },
    { thread_type: "BSP", dash: "O6", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8", variant: null },
    { thread_type: "BSP", dash: "O8", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2", variant: null },
    { thread_type: "BSP", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8", variant: null },
    { thread_type: "BSP", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4", variant: null },
    { thread_type: "BSP", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1", variant: null },
    { thread_type: "BSP", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4", variant: "Upper Jump" },
    { thread_type: "BSP", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2", variant: "Upper Jump" },
    { thread_type: "BSP", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2", variant: "Upper Jump" },
  
    // BSP O
    { thread_type: "BSP O", dash: "O4", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4", variant: "Standard" },
    { thread_type: "BSP O", dash: "O5", inch: "5/16\"", thread: "5/16\"", dsc_code: "5/16", variant: "Lower Jump" },
    { thread_type: "BSP O", dash: "O6", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8", variant: null },
    { thread_type: "BSP O", dash: "O8", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2", variant: null },
    { thread_type: "BSP O", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8", variant: null },
    { thread_type: "BSP O", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4", variant: null },
    { thread_type: "BSP O", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1", variant: null },
    { thread_type: "BSP O", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4", variant: "Upper Jump" },
    { thread_type: "BSP O", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2", variant: "Upper Jump" },
    { thread_type: "BSP O", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2", variant: "Upper Jump" },
  
    // JIC
    { thread_type: "JIC", dash: "O4", inch: "1/4\"", thread: "7/16\"", dsc_code: "7/16", variant: "Standard" },
    { thread_type: "JIC", dash: "O5", inch: "5/16\"", thread: "1/2\"", dsc_code: "1/2", variant: "Lower Jump" },
    { thread_type: "JIC", dash: "O6", inch: "3/8\"", thread: "9/16\"", dsc_code: "9/16", variant: null },
    { thread_type: "JIC", dash: "O8", inch: "1/2\"", thread: "3/4\"", dsc_code: "3/4", variant: null },
    { thread_type: "JIC", dash: "10", inch: "5/8\"", thread: "7/8\"", dsc_code: "7/8", variant: null },
    { thread_type: "JIC", dash: "12", inch: "3/4\"", thread: "1-1/16\"", dsc_code: "1-1/16", variant: null },
    { thread_type: "JIC", dash: "16", inch: "1\"", thread: "1-5/16\"", dsc_code: "1-5/16", variant: null },
    { thread_type: "JIC", dash: "20", inch: "1-1/4\"", thread: "1-5/8\"", dsc_code: "1-5/8", variant: null },
    { thread_type: "JIC", dash: "24", inch: "1-1/2\"", thread: "1-7/8\"", dsc_code: "1-7/8", variant: null },
    { thread_type: "JIC", dash: "32", inch: "2\"", thread: "2-1/2\"", dsc_code: "2-1/2", variant: "Upper Jump" },
  
    // NPT
    { thread_type: "NPT", dash: "O4", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4", variant: "Standard" },
    { thread_type: "NPT", dash: "O5", inch: "5/16\"", thread: null, dsc_code: null, variant: "Lower Jump" },
    { thread_type: "NPT", dash: "O6", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8", variant: null },
    { thread_type: "NPT", dash: "O8", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2", variant: null },
    { thread_type: "NPT", dash: "10", inch: "5/8\"", thread: null, dsc_code: null, variant: null },
    { thread_type: "NPT", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4", variant: null },
    { thread_type: "NPT", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1", variant: null },
    { thread_type: "NPT", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4", variant: null },
    { thread_type: "NPT", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2", variant: "Upper Jump" },
    { thread_type: "NPT", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2", variant: "Upper Jump" },
  
    // Updated dataset with dsc_code added
  
    // JIS
    { thread_type: "JIS", dash: "O4", inch: "1/4\"", thread: "1/4\"", variant: "Standard", dsc_code: "1/4" },
    { thread_type: "JIS", dash: "O5", inch: "5/16\"", thread: null, variant: null, dsc_code: "5/16" },
    { thread_type: "JIS", dash: "O6", inch: "3/8\"", thread: "3/8\"", variant: "Lower Jump", dsc_code: "3/8" },
    { thread_type: "JIS", dash: "O8", inch: "1/2\"", thread: "1/2\"", variant: null, dsc_code: "1/2" },
    { thread_type: "JIS", dash: "10", inch: "5/8\"", thread: "5/8\"", variant: null, dsc_code: "5/8" },
    { thread_type: "JIS", dash: "12", inch: "3/4\"", thread: "3/4\"", variant: null, dsc_code: "3/4" },
    { thread_type: "JIS", dash: "16", inch: "1\"", thread: "1\"", variant: null, dsc_code: "1" },
    { thread_type: "JIS", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", variant: "Upper Jump", dsc_code: "1-1/4" },
    { thread_type: "JIS", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", variant: null, dsc_code: "1-1/2" },
    { thread_type: "JIS", dash: "32", inch: "2\"", thread: "2\"", variant: "Upper Jump", dsc_code: "2" },
  
    // ORFS
    { thread_type: "ORFS", dash: "O4", inch: "1/4\"", thread: "9/16\"", variant: "Standard", dsc_code: "9/16" },
    { thread_type: "ORFS", dash: "O5", inch: "5/16\"", thread: null, variant: null, dsc_code: "5/16" },
    { thread_type: "ORFS", dash: "O6", inch: "3/8\"", thread: "11/16\"", variant: "Lower Jump", dsc_code: "11/16" },
    { thread_type: "ORFS", dash: "O8", inch: "1/2\"", thread: "13/16\"", variant: null, dsc_code: "13/16" },
    { thread_type: "ORFS", dash: "10", inch: "5/8\"", thread: "1\"", variant: null, dsc_code: "1" },
    { thread_type: "ORFS", dash: "12", inch: "3/4\"", thread: "1-3/16\"", variant: null, dsc_code: "1-3/16" },
    { thread_type: "ORFS", dash: "16", inch: "1\"", thread: "1-7/16\"", variant: null, dsc_code: "1-7/16" },
    { thread_type: "ORFS", dash: "20", inch: "1-1/4\"", thread: "1-11/16\"", variant: "Upper Jump", dsc_code: "1-11/16" },
    { thread_type: "ORFS", dash: "24", inch: "1-1/2\"", thread: "2\"", variant: "Upper Jump", dsc_code: "2" },
    { thread_type: "ORFS", dash: "32", inch: "2\"", thread: null, variant: "Upper Jump", dsc_code: "2" },
  
    // KOMATSU
    { thread_type: "KOMATSU", dash: "O4", inch: "1/4\"", thread: "14X1.5", variant: "Standard", dsc_code: "14X1.5" },
    { thread_type: "KOMATSU", dash: "O5", inch: "5/16\"", thread: null, variant: null, dsc_code: "5/16" },
    { thread_type: "KOMATSU", dash: "O6", inch: "3/8\"", thread: "18X1.5", variant: "Lower Jump", dsc_code: "18X1.5" },
    { thread_type: "KOMATSU", dash: "O8", inch: "1/2\"", thread: "22X1.5", variant: null, dsc_code: "22X1.5" },
    { thread_type: "KOMATSU", dash: "10", inch: "5/8\"", thread: "24X1.5", variant: null, dsc_code: "24X1.5" },
    { thread_type: "KOMATSU", dash: "12", inch: "3/4\"", thread: "30X1.5", variant: null, dsc_code: "30X1.5" },
    { thread_type: "KOMATSU", dash: "16", inch: "1\"", thread: "33X1.5", variant: null, dsc_code: "33X1.5" },
    { thread_type: "KOMATSU", dash: "20", inch: "1-1/4\"", thread: "36X1.5", variant: "Upper Jump", dsc_code: "36X1.5" },
    { thread_type: "KOMATSU", dash: "24", inch: "1-1/2\"", thread: "42X1.5", variant: "Upper Jump", dsc_code: "42X1.5" },
    { thread_type: "KOMATSU", dash: "32", inch: "2\"", thread: null, variant: "Upper Jump", dsc_code: "2" },
  
    // SAE 61
    { thread_type: "SAE 61", dash: "08", thread: "30.3", variant: "Standard", dsc_code: "30.3" },
    { thread_type: "SAE 61", dash: "12", thread: "38.1", variant: null, dsc_code: "38.1" },
    { thread_type: "SAE 61", dash: "16", thread: "44.4", variant: null, dsc_code: "44.4" },
    { thread_type: "SAE 61", dash: "20", thread: "50.8", variant: null, dsc_code: "50.8" },
    { thread_type: "SAE 61", dash: "24", thread: "60.3", variant: null, dsc_code: "60.3" },
    { thread_type: "SAE 61", dash: "32", thread: "71", variant: null, dsc_code: "71" },
  
    // SAE 62
    { thread_type: "SAE 62", dash: "08", thread: "32", variant: "Standard", dsc_code: "32" },
    { thread_type: "SAE 62", dash: "10", thread: "34", variant: null, dsc_code: "34" },
    { thread_type: "SAE 62", dash: "12", thread: "41.4", variant: null, dsc_code: "41.4" },
    { thread_type: "SAE 62", dash: "16", thread: "47.4", variant: null, dsc_code: "47.4" },
    { thread_type: "SAE 62", dash: "20", thread: "54", variant: null, dsc_code: "54" },
    { thread_type: "SAE 62", dash: "24", thread: "63.5", variant: null, dsc_code: "63.5" },
    { thread_type: "SAE 62", dash: "32", thread: "79.6", variant: null, dsc_code: "79.6" },
  
    // Metric Light
    { metric_type: "Light", dash: "06", pipe_od: "06", thread: "M12X1.5", variant: null, dsc_code: "M12X1.5" },
    { metric_type: "Light", dash: "08", pipe_od: "08", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { metric_type: "Light", dash: "10", pipe_od: "10", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { metric_type: "Light", dash: "12", pipe_od: "12", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { metric_type: "Light", dash: "15", pipe_od: "15", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { metric_type: "Light", dash: "18", pipe_od: "18", thread: "M26X1.5", variant: null, dsc_code: "M26X1.5" },
    { metric_type: "Light", dash: "22", pipe_od: "22", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { metric_type: "Light", dash: "28", pipe_od: "28", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { metric_type: "Light", dash: "35", pipe_od: "35", thread: "M45X2.0", variant: null, dsc_code: "M45X2.0" },
    { metric_type: "Light", dash: "42", pipe_od: "42", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },
  
    // Metric Heavy
    { metric_type: "Heavy", dash: "06", pipe_od: "06", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
    { metric_type: "Heavy", dash: "08", pipe_od: "08", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
    { metric_type: "Heavy", dash: "10", pipe_od: "10", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
    { metric_type: "Heavy", dash: "12", pipe_od: "12", thread: "M20X1.5", variant: null, dsc_code: "M20X1.5" },
    { metric_type: "Heavy", dash: "14", pipe_od: "14", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
    { metric_type: "Heavy", dash: "16", pipe_od: "16", thread: "M24X1.5", variant: null, dsc_code: "M24X1.5" },
    { metric_type: "Heavy", dash: "20", pipe_od: "20", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
    { metric_type: "Heavy", dash: "25", pipe_od: "25", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
    { metric_type: "Heavy", dash: "30", pipe_od: "30", thread: "M42X2.0", variant: null, dsc_code: "M42X2.0" },
    { metric_type: "Heavy", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" }
  
  
  ];
  
  const variantsOption = [
    { value: "Standard", label: "Standard" },
    { value: "Upper Jump", label: "Upper Jump" },
    { value: "Lower Jump", label: "Lower Jump" },
  ];
  
  
  const fittingTypeOptions = [
    { value: "Female", label: "Female", code: "F", dsc_code: "Female" },
    { value: "Male", label: "Male", code: "M", dsc_code: "Male", },
    { value: "Flange", label: "Flange", code: "FL", dsc_code: "Flange", },
    { value: "CAT Flange", label: "CAT Flange", code: "FLC", dsc_code: "CAT Flange", }
  ];
  
  const straightBendangleOptions = [
    { value: "Straight", label: "Straight", code: "S", dsc_code: "Straight" },
    { value: "BEND 90", label: "Bend 90", code: "90", dsc_code: "BEND 90" },
    { value: "BEND 75", label: "Bend 75", code: "75", dsc_code: "BEND 75" },
    { value: "BEND 67.5", label: "Bend 67.5", code: "67.5", dsc_code: "BEND 67.5" },
    { value: "BEND 45", label: "Bend 45", code: "45", dsc_code: "BEND 45" },
    { value: "BEND 30", label: "Bend 30", code: "30", dsc_code: "BEND 30" },
    { value: "BEND 22.5", label: "Bend 22.5", code: "22.5", dsc_code: "BEND 22.5" },
    { value: "BEND 15", label: "Bend 15", code: "15", dsc_code: "BEND 15" },
    { value: "BEND 135", label: "Bend 135", code: "135", dsc_code: "BEND 135" },
  ];
  
  const dropLengthOptions = [
    { value: "15", label: "15" },
    { value: "17", label: "17" },
    { value: "20", label: "20" },
    { value: "21", label: "21" },
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
    { value: "25", label: "25" },
    { value: "26", label: "26" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "29", label: "29" },
    { value: "30", label: "30" },
    { value: "31", label: "31" },
    { value: "32", label: "32" },
    { value: "33", label: "33" },
    { value: "34", label: "34" },
    { value: "35", label: "35" },
    { value: "36", label: "36" },
    { value: "37", label: "37" },
    { value: "38", label: "38" },
    { value: "39", label: "39" },
    { value: "40", label: "40" },
    { value: "41", label: "41" },
    { value: "42", label: "42" },
    { value: "43", label: "43" },
    { value: "44", label: "44" },
    { value: "45", label: "45" },
    { value: "46", label: "46" },
    { value: "47", label: "47" },
    { value: "48", label: "48" },
    { value: "49", label: "49" },
    { value: "50", label: "50" },
    { value: "51", label: "51" },
    { value: "52", label: "52" },
    { value: "54", label: "54" },
    { value: "55", label: "55" },
    { value: "56", label: "56" },
    { value: "57", label: "57" },
    { value: "58", label: "58" },
    { value: "59", label: "59" },
    { value: "60", label: "60" },
    { value: "61", label: "61" },
    { value: "62", label: "62" },
    { value: "63", label: "63" },
    { value: "64", label: "64" },
    { value: "65", label: "65" },
    { value: "66", label: "66" },
    { value: "67", label: "67" },
    { value: "69", label: "69" },
    { value: "70", label: "70" },
    { value: "71", label: "71" },
    { value: "72", label: "72" },
    { value: "73", label: "73" },
    { value: "74", label: "74" },
    { value: "75", label: "75" },
    { value: "77", label: "77" },
    { value: "78", label: "78" },
    { value: "80", label: "80" },
    { value: "85", label: "85" },
    { value: "90", label: "90" },
    { value: "95", label: "95" },
    { value: "96", label: "96" },
    { value: "100", label: "100" },
    { value: "109", label: "109" },
    { value: "110", label: "110" },
    { value: "115", label: "115" },
    { value: "120", label: "120" },
    { value: "121", label: "121" },
    { value: "125", label: "125" },
    { value: "130", label: "130" },
    { value: "133", label: "133" },
    { value: "135", label: "135" },
    { value: "140", label: "140" },
    { value: "143", label: "143" },
    { value: "150", label: "150" },
    { value: "160", label: "160" },
    { value: "180", label: "180" },
    { value: "190", label: "190" },
    { value: "200", label: "200" },
    { value: "210", label: "210" },
  ];
  
  
  const springTypeOptions = [
    { value: "Compress", label: "Compress" },
    { value: "Normal", label: "Normal" },
  ];
  
  const metricTypeOptions = [
    { value: "Light", label: "Light" },
    { value: "Heavy", label: "Heavy" },
    { value: "Light With O", label: "Light With O" },
    { value: "Heavy With O", label: "Heavy With O" },
  ];
  
  const pipeODOptions = [
    { value: "06", label: "06" },
    { value: "08", label: "08" },
    { value: "10", label: "10" },
    { value: "12", label: "12" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "18", label: "18" },
    { value: "20", label: "20" },
    { value: "22", label: "22" },
    { value: "25", label: "25" },
    { value: "30", label: "30" },
    { value: "28", label: "28" },
    { value: "35", label: "35" },
    { value: "38", label: "38" },
    { value: "42", label: "42" },
  ];
  
  
  const malefemaleOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];