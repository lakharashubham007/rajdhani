
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
  { value: "Tube Fittings", label: "Tube Fittings" }
];

const PartOptions = [
  { name: "Nut" },
  { name: "Nipple" },
  { name: "Cap" },
];





const WireTypeOptions = [
  { value: "Braided", label: "BRAIDED (BR) - B", code: "B", dsc_code: "BR" },
  { value: "Spiral", label: "SPIRAL (SP) - S", code: "S", dsc_code: "SP" },
  { value: "Teflon", label: "TEFLON (TF) - T", code: "T", dsc_code: "TF" }
];

const springWireTypeOption = [
  { value: "Braided", label: "BRAIDED (BR) - B", code: "B", dsc_code: "BR" },
  { value: "Spiral", label: "SPIRAL (SP) - S", code: "S", dsc_code: "SP" },
]



//added new options
const CapWithoutCapOptions = [
  { value: "With Ferrule", label: "With Ferrule", code: "", dsc_code: "" },
  { value: "Without Ferrule", label: "Without Ferrule", code: "WF", dsc_code: "Without Ferrule" },
];

const fittingPieceOptions = [
  { value: "One Piece", label: "ONE PIECE - 1", code: "1" },
  { value: "Two Piece", label: "TWO PIECE - 2", code: "2" },
  { value: "Three Piece", label: "THREE PIECE - 3", code: "3" },
];

const skiveTypeOptions = [
  { value: "Skive", label: "SKIVE (SK)", code: "SK", dsc_code: "(SKIVE)" },
  { value: "Non-Skive", label: "NON-SKIVE (NS)", code: "NS", dsc_code: "(NON-SKIVE)" },
  { value: "Inner-Skive", label: "INNER-SKIVE (IS)", code: "IS", dsc_code: "(INNER-SKIVE)" },
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
  { value: "3/16\" (03)", label: "3/16\" (03)", code: "03", dsc_code: "3/16\"", dash: "03" },
  { value: "1/4\" (04)", label: "1/4\" (04)", code: "04", dsc_code: "1/4\"", dash: "04" },
  { value: "5/16\" (05)", label: "5/16\" (05)", code: "05", dsc_code: "5/16\"", dash: "05" },
  { value: "3/8\" (06)", label: "3/8\" (06)", code: "06", dsc_code: "3/8\"", dash: "06" },
  { value: "1/2\" (08)", label: "1/2\" (08)", code: "08", dsc_code: "1/2\"", dash: "08" },
  { value: "5/8\" (10)", label: "5/8\" (10)", code: "10", dsc_code: "5/8\"", dash: "10" },
  { value: "3/4\" (12)", label: "3/4\" (12)", code: "12", dsc_code: "3/4\"", dash: "12" },
  { value: "1\" (16)", label: "1\" (16)", code: "16", dsc_code: "1\"", dash: "16" },
  { value: "1-1/4\" (20)", label: "1-1/4\" (20)", code: "20", dsc_code: "1-1/4\"", dash: "20" },
  { value: "1-1/2\" (24)", label: "1-1/2\" (24)", code: "24", dsc_code: "1-1/2\"", dash: "24" },
  { value: "2\" (32)", label: "2\" (32)", code: "32", dsc_code: "2\"", dash: "32" },
  { value: "2-1/2\" (40)", label: "2-1/2\" (40)", code: "40", dsc_code: "2-1/2\"", dash: "40" },
  { value: "3\" (48)", label: "3\" (48)", code: "48", dsc_code: "3\"", dash: "48" },
  { value: "3-1/2\" (56)", label: "3-1/2\" (56)", code: "56", dsc_code: "3-1/2\"", dash: "56" },
  { value: "4\" (64)", label: "4\" (64)", code: "64", dsc_code: "4\"", dash: "64" },
  { value: "4-1/2\" (72)", label: "4-1/2\" (72)", code: "72", dsc_code: "4-1/2\"", dash: "72" },
  { value: "5\" (80)", label: "5\" (80)", code: "80", dsc_code: "5\"", dash: "80" },
  { value: "13/32\" ", label: "13/32\" ", code: "13/32\"", dsc_code: "13/32\"" },
  { value: "7/8\" ", label: "7/8\" ", code: "7/8\"", dsc_code: "7/8\"" },
  { value: "1-1/8\" ", label: "1-1/8\" ", code: "1-1/8\"", dsc_code: "1-1/8\"" },
  { value: "1-3/8\" ", label: "1-3/8\" ", code: "1-3/8\"", dsc_code: "1-3/8\"" },
  { value: "1-13/16\" ", label: "1-13/16\" ", code: "1-13/16\"", dsc_code: "1-13/16\"" },
  { value: "2-3/8\" ", label: "2-3/8\" ", code: "2-3/8\"", dsc_code: "2-3/8\"" }
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
  { value: "NPT", label: "NPT (NPT)", code: "N", dsc_code: "NPT" },
  { value: "JIS", label: "JIS (BSP C-TYPE) (BJ)", code: "BJ", dsc_code: "JIS" },
  { value: "SAE 61", label: "FLG CODE 61- 3000 PSI (3)", code: "", dsc_code: "", dsc: '61-(3)' },
  { value: "SAE 62", label: "FLG CODE 62- 6000 PSI (6)", code: "", dsc_code: "", dsc: '62-(6)' },
  // { value: "SAE 62", label: "CAT FLANGE", code: "FLC", dsc_code: "CAT FLANGE" ,dsc: '62-(6)'},
  { value: "BANJO WITHOUT O", label: "BANJO WITHOUT O (BJ)", code: "BJ", dsc_code: "BANJO-WO" },
  { value: "BANJO WITH O", label: "BANJO WITH O (BJO)", code: "BJO", dsc_code: "BANJO" },
  { value: "METRIC THREAD ORFS", label: "METRIC THREAD ORFS (MO)", code: "MO", dsc_code: "M Flat Face" }
];


const fittingDashSizeOptions = [
  // BSP
  { thread_type: "BSP", dash: "04", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
  { thread_type: "BSP", dash: "05", inch: "5/16\"", thread: "5/16\"", dsc_code: "5/16\"", variant: "Standard" },
  { thread_type: "BSP", dash: "06", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
  { thread_type: "BSP", dash: "08", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
  { thread_type: "BSP", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8\"", variant: "Standard" },
  { thread_type: "BSP", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
  { thread_type: "BSP", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
  { thread_type: "BSP", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
  { thread_type: "BSP", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
  { thread_type: "BSP", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },

  // BSP O
  { thread_type: "BSP O", dash: "04", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
  { thread_type: "BSP O", dash: "05", inch: "5/16\"", thread: "5/16\"", dsc_code: "5/16\"", variant: "Standard" },
  { thread_type: "BSP O", dash: "06", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
  { thread_type: "BSP O", dash: "08", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
  { thread_type: "BSP O", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8\"", variant: "Standard" },
  { thread_type: "BSP O", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
  { thread_type: "BSP O", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
  { thread_type: "BSP O", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
  { thread_type: "BSP O", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
  { thread_type: "BSP O", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },

  // JIC
  { thread_type: "JIC", dash: "04", inch: "1/4\"", thread: "7/16\"", dsc_code: "7/16\"", variant: "Standard" },
  { thread_type: "JIC", dash: "05", inch: "5/16\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
  { thread_type: "JIC", dash: "06", inch: "3/8\"", thread: "9/16\"", dsc_code: "9/16\"", variant: "Standard" },
  { thread_type: "JIC", dash: "08", inch: "1/2\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
  { thread_type: "JIC", dash: "10", inch: "5/8\"", thread: "7/8\"", dsc_code: "7/8\"", variant: "Standard" },
  { thread_type: "JIC", dash: "12", inch: "3/4\"", thread: "1-1/16\"", dsc_code: "1-1/16\"", variant: "Standard" },
  { thread_type: "JIC", dash: "16", inch: "1\"", thread: "1-5/16\"", dsc_code: "1-5/16\"", variant: "Standard" },
  { thread_type: "JIC", dash: "20", inch: "1-1/4\"", thread: "1-5/8\"", dsc_code: "1-5/8\"", variant: "Standard" },
  { thread_type: "JIC", dash: "24", inch: "1-1/2\"", thread: "1-7/8\"", dsc_code: "1-7/8\"", variant: "Standard" },
  { thread_type: "JIC", dash: "32", inch: "2\"", thread: "2-1/2\"", dsc_code: "2-1/2\"", variant: "Standard" },

  // NPT
  { thread_type: "NPT", dash: "04", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
  { thread_type: "NPT", dash: "05", inch: "5/16\"", thread: null, dsc_code: null, variant: "Standard" },
  { thread_type: "NPT", dash: "06", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
  { thread_type: "NPT", dash: "08", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
  { thread_type: "NPT", dash: "10", inch: "5/8\"", thread: null, dsc_code: null, variant: "Standard" },
  { thread_type: "NPT", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
  { thread_type: "NPT", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
  { thread_type: "NPT", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
  { thread_type: "NPT", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
  { thread_type: "NPT", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },

  // Updated dataset with dsc_code added

  // JIS
  { thread_type: "JIS", dash: "04", inch: "1/4\"", thread: "1/4\"", variant: "Standard", dsc_code: "1/4\"" },
  { thread_type: "JIS", dash: "05", inch: "5/16\"", thread: null, variant: "Standard", dsc_code: "5/16\"" },
  { thread_type: "JIS", dash: "06", inch: "3/8\"", thread: "3/8\"", variant: "Standard", dsc_code: "3/8\"" },
  { thread_type: "JIS", dash: "08", inch: "1/2\"", thread: "1/2\"", variant: "Standard", dsc_code: "1/2\"" },
  { thread_type: "JIS", dash: "10", inch: "5/8\"", thread: "5/8\"", variant: "Standard", dsc_code: "5/8\"" },
  { thread_type: "JIS", dash: "12", inch: "3/4\"", thread: "3/4\"", variant: "Standard", dsc_code: "3/4\"" },
  { thread_type: "JIS", dash: "16", inch: "1\"", thread: "1\"", variant: "Standard", dsc_code: "1\"" },
  { thread_type: "JIS", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", variant: "Standard", dsc_code: "1-1/4\"" },
  { thread_type: "JIS", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", variant: "Standard", dsc_code: "1-1/2\"" },
  { thread_type: "JIS", dash: "32", inch: "2\"", thread: "2\"", variant: "Standard", dsc_code: "2\"" },

  // ORFS
  { thread_type: "ORFS", dash: "04", inch: "1/4\"", thread: "9/16\"", variant: "Standard", dsc_code: "9/16\"" },
  // { thread_type: "ORFS", dash: "05", inch: "5/16\"", thread: null, variant: "Standard", dsc_code: "5/16\"" },
  { thread_type: "ORFS", dash: "06", inch: "3/8\"", thread: "11/16\"", variant: "Standard", dsc_code: "11/16\"" },
  { thread_type: "ORFS", dash: "08", inch: "1/2\"", thread: "13/16\"", variant: "Standard", dsc_code: "13/16\"" },
  { thread_type: "ORFS", dash: "10", inch: "5/8\"", thread: "1\"", variant: "Standard", dsc_code: "1\"" },
  { thread_type: "ORFS", dash: "12", inch: "3/4\"", thread: "1-3/16\"", variant: "Standard", dsc_code: "1-3/16\"" },
  { thread_type: "ORFS", dash: "16", inch: "1\"", thread: "1-7/16\"", variant: "Standard", dsc_code: "1-7/16\"" },
  { thread_type: "ORFS", dash: "20", inch: "1-1/4\"", thread: "1-11/16\"", variant: "Standard", dsc_code: "1-11/16\"" },
  { thread_type: "ORFS", dash: "24", inch: "1-1/2\"", thread: "2\"", variant: "Standard", dsc_code: "2\"" },
  // { thread_type: "ORFS", dash: "32", inch: "2\"", thread: null, variant: "Standard", dsc_code: "2\"" },

  // KOMATSU
  { thread_type: "KOMATSU", dash: "04", inch: "1/4\"", thread: "14X1.5", variant: "Standard", dsc_code: "14X1.5" },
  { thread_type: "KOMATSU", dash: "05", inch: "5/16\"", thread: null, variant: "Standard", dsc_code: "5/16" },
  { thread_type: "KOMATSU", dash: "06", inch: "3/8\"", thread: "18X1.5", variant: "Standard", dsc_code: "18X1.5" },
  { thread_type: "KOMATSU", dash: "08", inch: "1/2\"", thread: "22X1.5", variant: "Standard", dsc_code: "22X1.5" },
  { thread_type: "KOMATSU", dash: "10", inch: "5/8\"", thread: "24X1.5", variant: "Standard", dsc_code: "24X1.5" },
  { thread_type: "KOMATSU", dash: "12", inch: "3/4\"", thread: "30X1.5", variant: "Standard", dsc_code: "30X1.5" },
  { thread_type: "KOMATSU", dash: "16", inch: "1\"", thread: "33X1.5", variant: "Standard", dsc_code: "33X1.5" },
  { thread_type: "KOMATSU", dash: "20", inch: "1-1/4\"", thread: "36X1.5", variant: "Standard", dsc_code: "36X1.5" },
  { thread_type: "KOMATSU", dash: "24", inch: "1-1/2\"", thread: "42X1.5", variant: "Standard", dsc_code: "42X1.5" },
  { thread_type: "KOMATSU", dash: "32", inch: "2\"", thread: null, variant: "Standard", dsc_code: "2" },

  // SAE 61
  { thread_type: "SAE 61", dash: "08", thread: "30.3", variant: "Standard", dsc_code: "30.3" },
  { thread_type: "SAE 61", dash: "12", thread: "38.1", variant: "Standard", dsc_code: "38.1" },
  { thread_type: "SAE 61", dash: "16", thread: "44.4", variant: "Standard", dsc_code: "44.4" },
  { thread_type: "SAE 61", dash: "20", thread: "50.8", variant: "Standard", dsc_code: "50.8" },
  { thread_type: "SAE 61", dash: "24", thread: "60.3", variant: "Standard", dsc_code: "60.3" },
  { thread_type: "SAE 61", dash: "32", thread: "71", variant: "Standard", dsc_code: "71" },

  // SAE 62
  { thread_type: "SAE 62", dash: "08", thread: "32", variant: "Standard", dsc_code: "32" },
  { thread_type: "SAE 62", dash: "10", thread: "34", variant: "Standard", dsc_code: "34" },
  { thread_type: "SAE 62", dash: "12", thread: "41.4", variant: "Standard", dsc_code: "41.4" },
  { thread_type: "SAE 62", dash: "16", thread: "47.4", variant: "Standard", dsc_code: "47.4" },
  { thread_type: "SAE 62", dash: "20", thread: "54", variant: "Standard", dsc_code: "54" },
  { thread_type: "SAE 62", dash: "24", thread: "63.5", variant: "Standard", dsc_code: "63.5" },
  { thread_type: "SAE 62", dash: "32", thread: "79.6", variant: "Standard", dsc_code: "79.6" },

  // BANJO WITHOUT O 
  { thread_type: "BANJO WITHOUT O", dash: "10", thread: "10", variant: "Standard", dsc_code: "10" },
  { thread_type: "BANJO WITHOUT O", dash: "12", thread: "12", variant: "Standard", dsc_code: "12" },
  { thread_type: "BANJO WITHOUT O", dash: "14", thread: "14", variant: "Standard", dsc_code: "14" },
  { thread_type: "BANJO WITHOUT O", dash: "16", thread: "16", variant: "Standard", dsc_code: "16" },
  { thread_type: "BANJO WITHOUT O", dash: "18", thread: "18", variant: "Standard", dsc_code: "18" },
  { thread_type: "BANJO WITHOUT O", dash: "22", thread: "22", variant: "Standard", dsc_code: "22" },

  // BANJO WITH O 
  { thread_type: "BANJO WITH O", dash: "10", thread: "10", variant: "Standard", dsc_code: "10" },
  { thread_type: "BANJO WITH O", dash: "12", thread: "12", variant: "Standard", dsc_code: "12" },
  { thread_type: "BANJO WITH O", dash: "14", thread: "14", variant: "Standard", dsc_code: "14" },
  { thread_type: "BANJO WITH O", dash: "16", thread: "16", variant: "Standard", dsc_code: "16" },
  { thread_type: "BANJO WITH O", dash: "18", thread: "18", variant: "Standard", dsc_code: "18" },
  { thread_type: "BANJO WITH O", dash: "22", thread: "22", variant: "Standard", dsc_code: "22" },


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
  { metric_type: "Heavy", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

  //metricThreadOrfs
  { thread_type: "METRIC THREAD ORFS", dash: "08", inch: "1/2\"", thread: "M22X1.5", dsc_code: "22X1.5" },
  { thread_type: "METRIC THREAD ORFS", dash: "08", inch: "1/2\"", thread: "M26X1.5", dsc_code: "26X1.5" },
  { thread_type: "METRIC THREAD ORFS", dash: "10", inch: "5/8\"", thread: "M27X1.5", dsc_code: "27X1.5" },
  { thread_type: "METRIC THREAD ORFS", dash: "10", inch: "5/8\"", thread: "M26X1.5", dsc_code: "26X1.5" },
  { thread_type: "METRIC THREAD ORFS", dash: "12", inch: "3/4\"", thread: "M27X1.5", dsc_code: "27X1.5" },
  { thread_type: "METRIC THREAD ORFS", dash: "12", inch: "3/4\"", thread: "M26X1.5", dsc_code: "26X1.5" },
  { thread_type: "METRIC THREAD ORFS", dash: "12", inch: "3/4\"", thread: "M38X1.5", dsc_code: "38X1.5" },
  { thread_type: "METRIC THREAD ORFS", dash: "16", inch: "1\"", thread: "M39X2", dsc_code: "39X2" },
  { thread_type: "METRIC THREAD ORFS", dash: "16", inch: "1\"", thread: "M36X2.0", dsc_code: "36X2.0" },
  { thread_type: "METRIC THREAD ORFS", dash: "16", inch: "1\"", thread: "M38X1.5", dsc_code: "38X1.5" },
  { thread_type: "METRIC THREAD ORFS", dash: "16", inch: "1\"", thread: "M42X2", dsc_code: "42X2" },
  { thread_type: "METRIC THREAD ORFS", dash: "20", inch: "1-1/4\"", thread: "M42X2", dsc_code: "42X2" },
  { thread_type: "METRIC THREAD ORFS", dash: "20", inch: "1-1/4\"", thread: "M45X2", dsc_code: "45X2" },
  { thread_type: "METRIC THREAD ORFS", dash: "20", inch: "1-1/4\"", thread: "M52X2", dsc_code: "52X2" },
  { thread_type: "METRIC THREAD ORFS", dash: "24", inch: "1-1/2\"", thread: "M52X2", dsc_code: "52X2" }




];

const variantsOption = [
  { value: "Standard", label: "Standard" },
  { value: "Manual", label: "Manual" },
  // { value: "Lower Jump", label: "Lower Jump" },
];


const designOption = [
  { value: "R", label: "R" },
  { value: "S", label: "S" },
  { value: "K", label: "K" },
  { value: "P", label: "P" },
  { value: "H", label: "H" },
  { value: "Y", label: "Y" },
];

const fittingTypeOptions = [
  { value: "Female", label: "Female", code: "F", dsc_code: "Female", fitting_thread: "normal" },
  { value: "Male", label: "Male", code: "M", dsc_code: "Male", fitting_thread: "normal" },
  // { value: "Flange", label: "Flange", code: "", dsc_code: "", fitting_thread: "SAE 61" },
  // { value: "CAT Flange", label: "CAT Flange", code: "", dsc_code: "",fitting_thread: "SAE" }
  { value: "Flange", label: "Flange", code: "FL", dsc_code: "Flange", fitting_thread: "SAE 61" },
  { value: "Flange1", label: "Flange", code: "FLH", dsc_code: "Flange", fitting_thread: "SAE" },
  { value: "CAT Flange", label: "CAT Flange", code: "FLC", dsc_code: "CAT Flange", fitting_thread: "SAE" }
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
  { value: "28", label: "28" },
  { value: "30", label: "30" },
  { value: "35", label: "35" },
  { value: "38", label: "38" },
  { value: "42", label: "42" },
];


const malefemaleOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const MFCOptions = [
  { value: "MFC", label: "MFC", code: "MFC", dsc_code: "MFC" },
  { value: "IBL", label: "IBL", code: "IBL", dsc_code: "IBL" },
  { value: "BPL", label: "BPL", code: "BPL", dsc_code: "BPL" },
  { value: "BSR", label: "BSR", code: "BSR", dsc_code: "BSR" },
  { value: "IBN", label: "IBN", code: "IBN", dsc_code: "IBN" },
  { value: "BIN", label: "BIN", code: "BIN", dsc_code: "BIN" },
  { value: "ILT", label: "ILT", code: "ILT", dsc_code: "ILT" },
  { value: "None", label: "None", code: "", dsc_code: "" }
];

const BrandLayLineOptions = [
  { value: "ADVANCE", label: "ADVANCE" },
  { value: "RAJDHANI", label: "RAJDHANI" },
  { value: "PRO", label: "PRO" },
  { value: "MINEXPERT", label: "MINEXPERT" },
  { value: "R PARTS", label: "R PARTS" },
  { value: "ADVANCE SHIELD", label: "ADVANCE SHIELD" },
  { value: "BCS174", label: "BCS174" },
  { value: "EATON", label: "EATON" },
  { value: "EUROFLEX", label: "EUROFLEX" },
  { value: "MANULI", label: "MANULI" },
  { value: "SB FLEX", label: "SB FLEX" },
  { value: "SB PARTS", label: "SB PARTS" },
  { value: "SEMPRIT", label: "SEMPRIT" },
  { value: "INDO", label: "INDO" }
];

const HoseTypeOptions = [
  { value: "R1", label: "R1", code: "R1", dsc_code: "R1" },
  { value: "R2", label: "R2", code: "R2", dsc_code: "R2" },
  { value: "R3", label: "R3", code: "R3", dsc_code: "R3" },
  { value: "R4", label: "R4", code: "R4", dsc_code: "R4" },
  { value: "R6", label: "R6", code: "R6", dsc_code: "R6" },
  { value: "4XP", label: "4XP", code: "4XP", dsc_code: "4XP" },
  { value: "4XH", label: "4XH", code: "4XH", dsc_code: "4XH" },
  { value: "R15", label: "R15", code: "R15", dsc_code: "R15" },
  { value: "TEFLON", label: "TEFLON", code: "R14", dsc_code: "TEFLON" },
  { value: "R5", label: "R5", code: "R5", dsc_code: "R5" },
  { value: "R5R", label: "R5R", code: "R5R", dsc_code: "R5R" },
  { value: "R1(HT)", label: "R1(HT)", code: "R1(HT)", dsc_code: "R1(HT)" },
  { value: "R2(HT)", label: "R2(HT)", code: "R2(HT)", dsc_code: "R2(HT)" },
  { value: "EC(640)", label: "EC(640)", code: "EC(640)", dsc_code: "EC(640)" },
  { value: "Rockdrill", label: "Rockdrill", code: "RD", dsc_code: "Rockdrill" },
  { value: "Airdrill", label: "Airdrill", code: "AD", dsc_code: "Airdrill" },
  { value: "Pneumatic", label: "Pneumatic", code: "PU", dsc_code: "Pneumatic" },
  { value: "Chemical", label: "Chemical", code: "CH", dsc_code: "Chemical" },
  { value: "Airwater", label: "Airwater", code: "AW", dsc_code: "Airwater" },
  { value: "Steam", label: "Steam", code: "ST", dsc_code: "Steam" }
];

const springTypeOption = [
  { value: "Compress", label: "Compress", dsc_code: "Compress" },
  { value: "Normal", label: "Normal", dsc_code: "" }
];

const dustCapColorsOption = [
  { value: "Red", label: "Red", dsc_code: "Red" },
  { value: "Blue", label: "Blue", dsc_code: "Blue" },
  { value: "Green", label: "Green", dsc_code: "Green" },
  { value: "Yellow", label: "Yellow", dsc_code: "Yellow" },
  { value: "Orange", label: "Orange", dsc_code: "Orange" },
  { value: "Purple", label: "Purple", dsc_code: "Purple" },
  { value: "Black", label: "Black", dsc_code: "Black" },
  { value: "White", label: "White", dsc_code: "White" },
  { value: "Brown", label: "Brown", dsc_code: "Brown" },
  { value: "Gray", label: "Gray", dsc_code: "Gray" },
  { value: "Pink", label: "Pink", dsc_code: "Pink" }
];

const sleeveSizesOption = [
  { value: "3/16", label: "3/16\"", dsc_code: "3/16\"" },
  { value: "1/4", label: "1/4\"", dsc_code: "1/4\"" },
  { value: "5/16", label: "5/16\"", dsc_code: "5/16\"" },
  { value: "3/8", label: "3/8\"", dsc_code: "3/8\"" },
  { value: "1/2", label: "1/2\"", dsc_code: "1/2\"" },
  { value: "5/8", label: "5/8\"", dsc_code: "5/8\"" },
  { value: "3/4", label: "3/4\"", dsc_code: "3/4\"" },
  { value: "1", label: "1\"", dsc_code: "1\"" },
  { value: "1-1/4", label: "1-1/4\"", dsc_code: "1-1/4\"" },
  { value: "1-1/2", label: "1-1/2\"", dsc_code: "1-1/2\"" },
  { value: "2", label: "2\"", dsc_code: "2\"" },
  { value: "2-1/2", label: "2-1/2\"", dsc_code: "2-1/2\"" },
  { value: "3", label: "3\"", dsc_code: "3\"" },
  { value: "3-1/2", label: "3-1/2\"", dsc_code: "3-1/2\"" },
  { value: "4", label: "4\"", dsc_code: "4\"" },
  { value: "4-1/2", label: "4-1/2\"", dsc_code: "4-1/2\"" },
  { value: "5", label: "5\"", dsc_code: "5\"" },
  { value: "13/32", label: "13/32\"", dsc_code: "13/32\"" },
  { value: "7/8", label: "7/8\"", dsc_code: "7/8\"" },
  { value: "1-1/8", label: "1-1/8\"", dsc_code: "1-1/8\"" },
  { value: "1-3/8", label: "1-3/8\"", dsc_code: "1-3/8\"" },
  { value: "1-13/16", label: "1-13/16\"", dsc_code: "1-13/16\"" },
  { value: "2-3/8", label: "2-3/8\"", dsc_code: "2-3/8\"" }
];

const vcSizesOption = [
  { value: "3/16", label: "3/16\"", dsc_code: "3/16\"" },
  { value: "1/4", label: "1/4\"", dsc_code: "1/4\"" },
  { value: "5/16", label: "5/16\"", dsc_code: "5/16\"" },
  { value: "3/8", label: "3/8\"", dsc_code: "3/8\"" },
  { value: "1/2", label: "1/2\"", dsc_code: "1/2\"" },
  { value: "5/8", label: "5/8\"", dsc_code: "5/8\"" },
  { value: "3/4", label: "3/4\"", dsc_code: "3/4\"" },
  { value: "1", label: "1\"", dsc_code: "1\"" },
  { value: "1-1/4", label: "1-1/4\"", dsc_code: "1-1/4\"" },
  { value: "1-1/2", label: "1-1/2\"", dsc_code: "1-1/2\"" },
  { value: "2", label: "2\"", dsc_code: "2\"" },
  { value: "2-1/2", label: "2-1/2\"", dsc_code: "2-1/2\"" },
  { value: "3", label: "3\"", dsc_code: "3\"" },
  { value: "3-1/2", label: "3-1/2\"", dsc_code: "3-1/2\"" },
  { value: "4", label: "4\"", dsc_code: "4\"" },
  { value: "4-1/2", label: "4-1/2\"", dsc_code: "4-1/2\"" },
  { value: "5", label: "5\"", dsc_code: "5\"" },
  { value: "13/32", label: "13/32\"", dsc_code: "13/32\"" },
  { value: "7/8", label: "7/8\"", dsc_code: "7/8\"" },
  { value: "1-1/8", label: "1-1/8\"", dsc_code: "1-1/8\"" },
  { value: "1-3/8", label: "1-3/8\"", dsc_code: "1-3/8\"" },
  { value: "1-13/16", label: "1-13/16\"", dsc_code: "1-13/16\"" },
  { value: "2-3/8", label: "2-3/8\"", dsc_code: "2-3/8\"" }
];

const dustCapThreadType = [
  { value: "BSP", label: "BSP", code: "B", dsc_code: "B" },
  { value: "UNF", label: "UNF", code: "UNF", dsc_code: "UNF" },
  { value: "Metric", label: "METRIC", code: "M", dsc_code: "M" },
  { value: "Flange", label: "Flange", code: "Flange", dsc_code: "Flange" },
];

const oRingThreadTypeOption = [
  { value: "BSP", label: "BSP", code: "B", dsc_code: "BSP" },
  { value: "ORFS", label: "ORFS", code: "O", dsc_code: "ORFS" },
  { value: "METRIC", label: "METRIC", code: "M", dsc_code: "" },
  { value: "Flange", label: "Flange", code: "Flange", dsc_code: "Flange" },
];

const dustCapMatricOption = [
  { thread_type: "METRIC", thread: "10X1", dsc_code: "10X1" },
  { thread_type: "METRIC", thread: "12X1.5", dsc_code: "12X1.5" },
  { thread_type: "METRIC", thread: "14X1.5", dsc_code: "14X1.5" },
  { thread_type: "METRIC", thread: "16X1.5", dsc_code: "16X1.5" },
  { thread_type: "METRIC", thread: "18X1.5", dsc_code: "18X1.5" },
  { thread_type: "METRIC", thread: "20X1.5", dsc_code: "20X1.5" },
  { thread_type: "METRIC", thread: "22X1.5", dsc_code: "22X1.5" },
  { thread_type: "METRIC", thread: "24X1.5", dsc_code: "24X1.5" },
  { thread_type: "METRIC", thread: "26X1.5", dsc_code: "26X1.5" },
  { thread_type: "METRIC", thread: "30X1.5", dsc_code: "30X1.5" },
  { thread_type: "METRIC", thread: "30X2", dsc_code: "30X2" },
  { thread_type: "METRIC", thread: "33X1.5", dsc_code: "33X1.5" },
  { thread_type: "METRIC", thread: "36X1.5", dsc_code: "36X1.5" },
  { thread_type: "METRIC", thread: "36X2", dsc_code: "36X2" },
  { thread_type: "METRIC", thread: "38X1.5", dsc_code: "38X1.5" },
  { thread_type: "METRIC", thread: "42X1.5", dsc_code: "42X1.5" },
  { thread_type: "METRIC", thread: "42X2", dsc_code: "42X2" },
  { thread_type: "METRIC", thread: "45X1.5", dsc_code: "45X1.5" },
  { thread_type: "METRIC", thread: "45X2", dsc_code: "45X2" },
  { thread_type: "METRIC", thread: "52X1.5", dsc_code: "52X1.5" },
  { thread_type: "METRIC", thread: "52X2", dsc_code: "52X2" },
  { thread_type: "METRIC", thread: "65X2", dsc_code: "65X2" }
];

const TuebeFittingsThreads = [
  { name: "DIN" },
  { name: "Double Ferrule Compression Fitting" },
  { name: "JIC Fitting" },
  { name: "Oring Face Seal Fitting" }
]

const TubeFittingsCategory = [

  //Din
  { thread: "DIN", category: "Nut-N" },
  { thread: "DIN", category: "Ferrule-F" },
  { thread: "DIN", category: "Equal Straight Coupling-G" },
  { thread: "DIN", category: "Equal Elbow Union-W" },
  { thread: "DIN", category: "Equal Tee Union-T" },
  { thread: "DIN", category: "Bulkhead Str. Coupling-SV" },
  { thread: "DIN", category: "Bulkhead Union Elbow-WSV" },
  { thread: "DIN", category: "Welding Connector-AS" },
  { thread: "DIN", category: "Parallel Male Stud Coupling-GE-R" },
  { thread: "DIN", category: "Parallel Male Stud Coupling-GE-M" },
  { thread: "DIN", category: "Parallel Male Stud Coupling-GE-R-ED" },
  { thread: "DIN", category: "Parallel Male Stud Coupling-GE-M-ED" },
  { thread: "DIN", category: "Parallel Female Coupling-GAI-R" },
  { thread: "DIN", category: "Parallel Female Coupling-GAI-M" },
  { thread: "DIN", category: "Male Stud Elbow-WE-R" },
  { thread: "DIN", category: "Swivel Elbow-EVW" },
  { thread: "DIN", category: "Swivel Branch Tee-EVT" },
  { thread: "DIN", category: "Swivel Run Tee-EVL" },
  { thread: "DIN", category: "Swivel Nut Elbow-EW" },
  { thread: "DIN", category: "Swivel Nut Branch Tee-ET" },
  { thread: "DIN", category: "Swivel Nut Run Tee-EL" },
  { thread: "DIN", category: "Swivel Connector-EGE-R" },
  { thread: "DIN", category: "Swivel Connector-EGE-M" },
  { thread: "DIN", category: "Stand Pipe Adaptor-EVGE-R" },
  { thread: "DIN", category: "Stand Pipe Adaptor-EVGE-M" },
  { thread: "DIN", category: "Stand Pipe Adaptor-EVGE-R-ED" },
  { thread: "DIN", category: "Stand Pipe Adaptor-EVGE-M-ED" },
  { thread: "DIN", category: "Hollow Hex Plug-VSTI-R" },
  { thread: "DIN", category: "Hollow Hex Plug-VSTI-M" },
  { thread: "DIN", category: "Blind Plugs-VKA" },
  { thread: "DIN", category: "WELD NIPPLE-WN" },
  { thread: "DIN", category: "Adjustable Elbow-WEE" },
  { thread: "DIN", category: "BSPP-BSPP NIPPLE-HT9022 Series" },
  { thread: "DIN", category: "BSPP-BSPP ELBOW-HT9222 Series" },
  { thread: "DIN", category: "BSPP-BSPP TEE-HT9322 Series" },
  { thread: "DIN", category: "Manometer Coupling-MAV" },
  { thread: "DIN", category: "BSPED REDUCER-RI-ED" },
  { thread: "DIN", category: "SAE SPLIT FLANGE-S205 3000 PSI" },
  { thread: "DIN", category: "SAE SPLIT FLANGE-S206 6000 PSI" },
  { thread: "DIN", category: "Banjo Coupling-S172" },

  //Double Ferrule Compression Fitting
  { thread: "Double Ferrule Compression Fitting", category: "Nut" },
  { thread: "Double Ferrule Compression Fitting", category: "Back Ferrule" },
  { thread: "Double Ferrule Compression Fitting", category: "Front Ferrule" },
  { thread: "Double Ferrule Compression Fitting", category: "Union" },
  { thread: "Double Ferrule Compression Fitting", category: "Male Connector" },
  { thread: "Double Ferrule Compression Fitting", category: "Female Connector" },
  { thread: "Double Ferrule Compression Fitting", category: "Reducer" },
  { thread: "Double Ferrule Compression Fitting", category: "Union Elbow" },
  { thread: "Double Ferrule Compression Fitting", category: "Male Elbow" },
  { thread: "Double Ferrule Compression Fitting", category: "Female Elbow" },
  { thread: "Double Ferrule Compression Fitting", category: "Union Tee" },
  { thread: "Double Ferrule Compression Fitting", category: "Male Run Tee" },
  { thread: "Double Ferrule Compression Fitting", category: "Female Run Tee" },
  { thread: "Double Ferrule Compression Fitting", category: "Bulkhead Union" },

  //JIC Fitting
  { thread: "JIC Fitting", category: "Cap Nut- HT0304-C" },
  { thread: "JIC Fitting", category: "BHLN Nut- HT0306" },
  { thread: "JIC Fitting", category: "Tube Nut- HT0318" },
  { thread: "JIC Fitting", category: "Tube Sleeve- HT0319" },
  { thread: "JIC Fitting", category: "Bore-MJ Straight- HT0403" },
  { thread: "JIC Fitting", category: "MP-FPS Straight- HT1404" },
  { thread: "JIC Fitting", category: "FP-FPS Straight- HT1405" },
  { thread: "JIC Fitting", category: "MP-FPS 90° Elbow- HT1501" },
  { thread: "JIC Fitting", category: "MP-FPS 90° Elbow- HT1502" },
  { thread: "JIC Fitting", category: "MP-FPS 45° Elbow- HT1503" },
  { thread: "JIC Fitting", category: "MP-FPS-FPS Tee- HT1601" },
  { thread: "JIC Fitting", category: "FPS-FPS-FPS Tee- HT1603" },
  { thread: "JIC Fitting", category: "MJ-MJ Straight- HT2403" },
  { thread: "JIC Fitting", category: "MJ-MP Straight- HT2404" },
  { thread: "JIC Fitting", category: "MJ-FP Straight- HT2405" },
  { thread: "JIC Fitting", category: "FJ-MJ Straight Reducer- HT2406" },
  { thread: "JIC Fitting", category: "MJ Plug- HT2408" },
  { thread: "JIC Fitting", category: "MJ-MJ 90° Elbow- HT2500" },
  { thread: "JIC Fitting", category: "MJ-MP 90° Elbow- HT2501" },
  { thread: "JIC Fitting", category: "MJ-FP 90° Elbow- HT2502" },
  { thread: "JIC Fitting", category: "MJ-MP 45° Elbow- HT2503" },
  { thread: "JIC Fitting", category: "MJ-MJ-MP Tee- HT2601" },
  { thread: "JIC Fitting", category: "MJ-MJ-MJ Tee- HT2603" },
  { thread: "JIC Fitting", category: "MJ-MJ Bulkhead- HT2700" },
  { thread: "JIC Fitting", category: "MJ-MJ Bulkhead 90° Elbow- HT2701" },
  { thread: "JIC Fitting", category: "MJ-MJ Bulkhead 45° Elbow- HT2702" },
  { thread: "JIC Fitting", category: "MJ-MJ-MJ Bulkhead Branch Tee- HT2703" },
  { thread: "JIC Fitting", category: "MJ-MJ-MJ Bulkhead Run Tee- HT2704" },
  { thread: "JIC Fitting", category: "MP-MJ Bulkhead Straight- HT2706" },
  { thread: "JIC Fitting", category: "HB-MAORB 90° Elbow- HT4601-NW0" },
  { thread: "JIC Fitting", category: "HB-MAORB Straight- HT4604-0" },
  { thread: "JIC Fitting", category: "FP-FP Straight- HT5000" },
  { thread: "JIC Fitting", category: "MP-MP Straight- HT5404" },
  { thread: "JIC Fitting", category: "MP-FP Straight Exp.- HT5405" },
  { thread: "JIC Fitting", category: "MP-FP Reducer Bushing- HT5406" },
  { thread: "JIC Fitting", category: "External HEX Pipe Plug- HT5406-P" },
  { thread: "JIC Fitting", category: "MP-MP 90° Elbow- HT5500" },
  { thread: "JIC Fitting", category: "MP-MP 45° Elbow- HT5501" },
  { thread: "JIC Fitting", category: "MP-FP 90° Street Elbow- HT5502" },
  { thread: "JIC Fitting", category: "MP-FP 45° Street Elbow- HT5503" },
  { thread: "JIC Fitting", category: "FP-FP 90° Street Elbow- HT5504" },
  { thread: "JIC Fitting", category: "FP-FP 45° Street Elbow- HT5505" },
  { thread: "JIC Fitting", category: "MP-MP-MP Tee- HT5600" },
  { thread: "JIC Fitting", category: "MP-FP-FP Street Tee- HT5602" },
  { thread: "JIC Fitting", category: "MP-FP-MP Tee- HT5603" },
  { thread: "JIC Fitting", category: "FP-FP-MP Branch Tee- HT5604" },
  { thread: "JIC Fitting", category: "FP-FP-FP Tee- HT5605" },
  { thread: "JIC Fitting", category: "FP-FP-FP-FP Cross- HT5652" },
  { thread: "JIC Fitting", category: "MJ-MORB Straight- HT6400-O" },
  { thread: "JIC Fitting", category: "MJ-MORB Straight Long- HT6400-L-O" },
  { thread: "JIC Fitting", category: "MORB-MP Straight- HT6401-O" },
  { thread: "JIC Fitting", category: "MORB-FJS Straight- HT6402" },
  { thread: "JIC Fitting", category: "FORB-MP Straight- HT6404" },
  { thread: "JIC Fitting", category: "FORB-FP Straight- HT6405" },
  { thread: "JIC Fitting", category: "MORB Externalhex Plug- HT6408-O" },
  { thread: "JIC Fitting", category: "MORB Hollow HEX Plug- HT6408-H-O" },
  { thread: "JIC Fitting", category: "MORB-FORB Straight Reducer- HT6410" },
  { thread: "JIC Fitting", category: "FORB-FORB Straight- HT6425" },
  { thread: "JIC Fitting", category: "MJ-FJS 90° Elbow- HT6500" },
  { thread: "JIC Fitting", category: "MP-FJS 90° Elbow- HT6501" },
  { thread: "JIC Fitting", category: "MJ-FJS 45° Elbow- HT6502" },
  { thread: "JIC Fitting", category: "MP-FJS Straight- HT6505" },
  { thread: "JIC Fitting", category: "FP-FJS Straight- HT6506" },
  { thread: "JIC Fitting", category: "FJS-FJS Straight- HT6565" },
  { thread: "JIC Fitting", category: "MJ-MJ-FJS Tee- HT6600" },
  { thread: "JIC Fitting", category: "MJ-FJS-MJ Tee- HT6602" },
  { thread: "JIC Fitting", category: "FJS-FJS-FJS Tee- HT6606" },
  { thread: "JIC Fitting", category: "MJ-MAORB 90° Elbow- HT6801" },
  { thread: "JIC Fitting", category: "MJ-MAORB 90° Long- HT6801-L" },
  { thread: "JIC Fitting", category: "MJ-MAORB 90° X-Long- HT6801-LL" },
  { thread: "JIC Fitting", category: "MJ-MAORB 45° Elbow- HT6802" },
  { thread: "JIC Fitting", category: "MJ-MJ-MAORB Branch Tee- HT6803" },
  { thread: "JIC Fitting", category: "MJ-MAORB-MJ Run Tee- HT6804" },
  { thread: "JIC Fitting", category: "MAORB-FP 90° Elbow- HT6805" },
  { thread: "JIC Fitting", category: "MAORB-MP 90° Elbow- HT6806" },
  { thread: "JIC Fitting", category: "MAORB-MAORB 90° Elbow- HT6807" },
  { thread: "JIC Fitting", category: "MAORB-FJS 90° Elbow- HT6809" },
  { thread: "JIC Fitting", category: "MAORB-FORB 90° Elbow- HT6815" },
  { thread: "JIC Fitting", category: "FORB-FORB-MORB Tee- HT6835" },
  { thread: "JIC Fitting", category: "MORB-FPS Straight- HT6900" },
  { thread: "JIC Fitting", category: "MORB-FPS 90° Elbow- HT6901" },
  { thread: "JIC Fitting", category: "Pipe Cap- HT5406-C" },
  { thread: "JIC Fitting", category: "Ferrule- HTC0319" },
  

  //"Oring Face Seal Fitting
  { thread: "Oring Face Seal Fitting", category: "Cap Assembly Insert- HTFS0304-C" },
  { thread: "Oring Face Seal Fitting", category: "Bulkhead Lock Nut- HTFS0306" },
  { thread: "Oring Face Seal Fitting", category: "Tube Nut- HTFS0318" },
  { thread: "Oring Face Seal Fitting", category: "Tube Sleeve- HTFS0319" },
  { thread: "Oring Face Seal Fitting", category: "Bore-MFS Straight- HTFS0403" },
  { thread: "Oring Face Seal Fitting", category: "Bore-MFS Bulkhead- HTFS0406" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MFS Straight- HTFS2403" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MP Straight- HTFS2404" },
  { thread: "Oring Face Seal Fitting", category: "MFS-FP Straight- HTFS2405" },
  { thread: "Oring Face Seal Fitting", category: "FFS-MFS Tube End Reducer- HTFS2406" },
  { thread: "Oring Face Seal Fitting", category: "MFS Plug- HTFS2408" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MFS 90° Elbow- HTFS2500" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MP 90° Elbow- HTFS2501" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MP 45° Elbow- HTFS2503" },
  { thread: "Oring Face Seal Fitting", category: "MFS--MFS-MP Tee- HTFS2601" },
  { thread: "Oring Face Seal Fitting", category: "MFS--MFS-MFS Tee- HTFS2603" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MP-MFS Tee- HTFS2605" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MFS-MFS-MFS Cross- HTFS2650" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MFS Bulkhead Union- HTFS2700" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MFS Bulkhead 90°- HTFS2701" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MFS Bulkhead 45°- HTFS2702" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MFS-MFS Bulkhead Tee- HTFS2703" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MFS-MFS Bulkhead Tee- HTFS2704" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MORB Bulkhead Straight- HTFS2764" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MORB Straight- HTFS6400-O" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MORB Straight Long- HTFS6400-L-O" },
  { thread: "Oring Face Seal Fitting", category: "MFS-FJS Straight- HTFS6402" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MJ Straight- HTFS6403" },
  { thread: "Oring Face Seal Fitting", category: "FORB-MFS Straight- HTFS6410" },
  { thread: "Oring Face Seal Fitting", category: "MFS-FFSS 90°- HTFS6500" },
  { thread: "Oring Face Seal Fitting", category: "MFS-FFSS 45°- HTFS6502" },
  { thread: "Oring Face Seal Fitting", category: "FP-FFSS 90°- HTFS6503" },
  { thread: "Oring Face Seal Fitting", category: "FFSS-MJ Straight- HTFS6504" },
  { thread: "Oring Face Seal Fitting", category: "MP-FFSS Straight- HTFS6505" },
  { thread: "Oring Face Seal Fitting", category: "FFSS-MORB Straight- HTFS6540" },
  { thread: "Oring Face Seal Fitting", category: "FFSS-FFSS Straight- HTFS6565" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MFS-FFSS Branch Tee- HTFS6600" },
  { thread: "Oring Face Seal Fitting", category: "MFS-FFSS-MFS Run Tee- HTFS6602" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MAORB 90° Elbow- HTFS6801-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MAORB 90° Long Elbow- HTFS6801-L-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MAORB 90° X-Long- HTFS6801-LL-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MAORB 45° Elbow- HTFS6802-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS--MFS-MAORB Tee- HTFS6803-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MAORB-MFS Tee- HTFS6804-NWO" },
  { thread: "Oring Face Seal Fitting", category: "FFSS-MAORB-MFS 90° Elbow- HTFS6809-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MABSPP 90° Elbow- HTFS7202-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MMAORB 90° Elbow- HTFS7205-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MFS-MMAORB Tee- HTFS7210-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MMAORB-MFS Tee- HTFS7215-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MMAORB 45° Elbow- HTFS7300-NWO" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MMORB Straight- HTFS7640-O" },
  { thread: "Oring Face Seal Fitting", category: "MFS-MMED Straight- HTFS7701" }
];


const uomOptions = [
  { value: "pcs", label: "Pieces (pcs)" },
  { value: "inch", label: "Inches (inch)" },
  { value: "meter", label: "Meters (m)" },
  { value: "pairs", label: "Pairs" },
  { value: "Numbers", label: "NOS" },
  { value: "set", label: "Sets" },
];


const gstOption = [
  // { value: '', label: 'Select GST Rate' },
  { value: "0", label: "0%" },
  { value: "5", label: "5%" },
  { value: "12", label: "12%" },
  { value: "18", label: "18%" },
  { value: "28", label: "28%" },
];


const nutFittingThreadOptions = [
  { value: "BSP", label: "BSP (B)", code: "B", dsc_code: "BSP" },
  { value: "NPT", label: "NPT (N)", code: "N", dsc_code: "NPT" },
  { value: "JIC", label: "JIC (J)", code: "J", dsc_code: "JIC" },
  { value: "ORFS", label: "ORFS (O)", code: "O", dsc_code: "ORFS" },
  { value: "METRIC KOMATSU", label: "METRIC KOMATSU (MK)", code: "MK", dsc_code: "METRIC KOMATSU" },
  { value: "METRIC LIGHT", label: "METRIC(LIGHT) (DL)", code: "DL", dsc_code: "METRIC LIGHT" },
  { value: "METRIC HEAVY", label: "METRIC(HEAVY) (DH)", code: "DH", dsc_code: "METRIC HEAVY" },
  { value: "JIS", label: "JIS (BSP C-TYPE) (BJ)", code: "JIS", dsc_code: "JIS" }
];

const nutFittingDashSize = [
// BSP
{ thread_type: "BSP", dash: "04", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
{ thread_type: "BSP", dash: "05", inch: "5/16\"", thread: "5/16\"", dsc_code: "5/16\"", variant: "Standard" },
{ thread_type: "BSP", dash: "06", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
{ thread_type: "BSP", dash: "08", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
{ thread_type: "BSP", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8\"", variant: "Standard" },
{ thread_type: "BSP", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
{ thread_type: "BSP", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
{ thread_type: "BSP", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
{ thread_type: "BSP", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
{ thread_type: "BSP", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },


 // JIC
 { thread_type: "JIC", dash: "04", inch: "1/4\"", thread: "7/16\"", dsc_code: "7/16\"", variant: "Standard" },
 { thread_type: "JIC", dash: "05", inch: "5/16\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
 { thread_type: "JIC", dash: "06", inch: "3/8\"", thread: "9/16\"", dsc_code: "9/16\"", variant: "Standard" },
 { thread_type: "JIC", dash: "08", inch: "1/2\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
 { thread_type: "JIC", dash: "10", inch: "5/8\"", thread: "7/8\"", dsc_code: "7/8\"", variant: "Standard" },
 { thread_type: "JIC", dash: "12", inch: "3/4\"", thread: "1-1/16\"", dsc_code: "1-1/16\"", variant: "Standard" },
 { thread_type: "JIC", dash: "16", inch: "1\"", thread: "1-5/16\"", dsc_code: "1-5/16\"", variant: "Standard" },
 { thread_type: "JIC", dash: "20", inch: "1-1/4\"", thread: "1-5/8\"", dsc_code: "1-5/8\"", variant: "Standard" },
 { thread_type: "JIC", dash: "24", inch: "1-1/2\"", thread: "1-7/8\"", dsc_code: "1-7/8\"", variant: "Standard" },
 { thread_type: "JIC", dash: "32", inch: "2\"", thread: "2-1/2\"", dsc_code: "2-1/2\"", variant: "Standard" },

 // NPT
 { thread_type: "NPT", dash: "04", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
//  { thread_type: "NPT", dash: "05", inch: "5/16\"", thread: "", dsc_code: "", variant: "Standard" },
 { thread_type: "NPT", dash: "06", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
 { thread_type: "NPT", dash: "08", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
//  { thread_type: "NPT", dash: "10", inch: "5/8\"", thread: "", dsc_code: "", variant: "Standard" },
 { thread_type: "NPT", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
 { thread_type: "NPT", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
 { thread_type: "NPT", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
 { thread_type: "NPT", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
 { thread_type: "NPT", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },

 // JIS
 { thread_type: "JIS", dash: "04", inch: "1/4\"", thread: "1/4\"", dsc_code: "1/4\"", variant: "Standard" },
//  { thread_type: "JIS", dash: "05", inch: "5/16\"", thread: "", dsc_code: "", variant: "Standard" },
 { thread_type: "JIS", dash: "06", inch: "3/8\"", thread: "3/8\"", dsc_code: "3/8\"", variant: "Standard" },
 { thread_type: "JIS", dash: "08", inch: "1/2\"", thread: "1/2\"", dsc_code: "1/2\"", variant: "Standard" },
 { thread_type: "JIS", dash: "10", inch: "5/8\"", thread: "5/8\"", dsc_code: "5/8\"", variant: "Standard" },
 { thread_type: "JIS", dash: "12", inch: "3/4\"", thread: "3/4\"", dsc_code: "3/4\"", variant: "Standard" },
 { thread_type: "JIS", dash: "16", inch: "1\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
 { thread_type: "JIS", dash: "20", inch: "1-1/4\"", thread: "1-1/4\"", dsc_code: "1-1/4\"", variant: "Standard" },
 { thread_type: "JIS", dash: "24", inch: "1-1/2\"", thread: "1-1/2\"", dsc_code: "1-1/2\"", variant: "Standard" },
 { thread_type: "JIS", dash: "32", inch: "2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },

 // ORFS
 { thread_type: "ORFS", dash: "04", inch: "1/4\"", thread: "9/16\"", dsc_code: "9/16\"", variant: "Standard" },
//  { thread_type: "ORFS", dash: "05", inch: "5/16\"", thread: "", dsc_code: "", variant: "Standard" },
 { thread_type: "ORFS", dash: "06", inch: "3/8\"", thread: "11/16\"", dsc_code: "11/16\"", variant: "Standard" },
 { thread_type: "ORFS", dash: "08", inch: "1/2\"", thread: "13/16\"", dsc_code: "13/16\"", variant: "Standard" },
 { thread_type: "ORFS", dash: "10", inch: "5/8\"", thread: "1\"", dsc_code: "1\"", variant: "Standard" },
 { thread_type: "ORFS", dash: "12", inch: "3/4\"", thread: "1-3/16\"", dsc_code: "1-3/16\"", variant: "Standard" },
 { thread_type: "ORFS", dash: "16", inch: "1\"", thread: "1-7/16\"", dsc_code: "1-7/16\"", variant: "Standard" },
 { thread_type: "ORFS", dash: "20", inch: "1-1/4\"", thread: "1-11/16\"", dsc_code: "1-11/16\"", variant: "Standard" },
 { thread_type: "ORFS", dash: "24", inch: "1-1/2\"", thread: "2\"", dsc_code: "2\"", variant: "Standard" },
//  { thread_type: "ORFS", dash: "32", inch: "2\"", thread: "", dsc_code: "", variant: "Standard" },

// KOMATSU
{ thread_type: "METRIC KOMATSU", dash: "04", inch: "1/4\"", thread: "14X1.5", dsc_code: "14X1.5", variant: "Standard" },
// { thread_type: "KOMATSU", dash: "05", inch: "5/16\"", thread: "", dsc_code: "", variant: "Standard" },
{ thread_type: "METRIC KOMATSU", dash: "06", inch: "3/8\"", thread: "18X1.5", dsc_code: "18X1.5", variant: "Standard" },
{ thread_type: "METRIC KOMATSU", dash: "08", inch: "1/2\"", thread: "22X1.5", dsc_code: "22X1.5", variant: "Standard" },
{ thread_type: "METRIC KOMATSU", dash: "10", inch: "5/8\"", thread: "24X1.5", dsc_code: "24X1.5", variant: "Standard" },
{ thread_type: "METRIC KOMATSU", dash: "12", inch: "3/4\"", thread: "30X1.5", dsc_code: "30X1.5", variant: "Standard" },
{ thread_type: "METRIC KOMATSU", dash: "16", inch: "1\"", thread: "33X1.5", dsc_code: "33X1.5", variant: "Standard" },
{ thread_type: "METRIC KOMATSU", dash: "20", inch: "1-1/4\"", thread: "36X1.5", dsc_code: "36X1.5", variant: "Standard" },
{ thread_type: "METRIC KOMATSU", dash: "24", inch: "1-1/2\"", thread: "42X1.5", dsc_code: "42X1.5", variant: "Standard" },
// { thread_type: "KOMATSU", dash: "32", inch: "2\"", thread: "", dsc_code: "", variant: "Standard" },

// Metric Light
{ thread_type: "METRIC LIGHT", dash: "06", pipe_od: "06", thread: "M12X1.5", variant: null, dsc_code: "M12X1.5" },
{ thread_type: "METRIC LIGHT", dash: "08", pipe_od: "08", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
{ thread_type: "METRIC LIGHT", dash: "10", pipe_od: "10", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
{ thread_type: "METRIC LIGHT", dash: "12", pipe_od: "12", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
{ thread_type: "METRIC LIGHT", dash: "15", pipe_od: "15", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
{ thread_type: "METRIC LIGHT", dash: "18", pipe_od: "18", thread: "M26X1.5", variant: null, dsc_code: "M26X1.5" },
{ thread_type: "METRIC LIGHT", dash: "22", pipe_od: "22", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
{ thread_type: "METRIC LIGHT", dash: "28", pipe_od: "28", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
{ thread_type: "METRIC LIGHT", dash: "35", pipe_od: "35", thread: "M45X2.0", variant: null, dsc_code: "M45X2.0" },
{ thread_type: "METRIC LIGHT", dash: "42", pipe_od: "42", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

// Metric Heavy
{ thread_type: "METRIC HEAVY", dash: "06", pipe_od: "06", thread: "M14X1.5", variant: null, dsc_code: "M14X1.5" },
{ thread_type: "METRIC HEAVY", dash: "08", pipe_od: "08", thread: "M16X1.5", variant: null, dsc_code: "M16X1.5" },
{ thread_type: "METRIC HEAVY", dash: "10", pipe_od: "10", thread: "M18X1.5", variant: null, dsc_code: "M18X1.5" },
{ thread_type: "METRIC HEAVY", dash: "12", pipe_od: "12", thread: "M20X1.5", variant: null, dsc_code: "M20X1.5" },
{ thread_type: "METRIC HEAVY", dash: "14", pipe_od: "14", thread: "M22X1.5", variant: null, dsc_code: "M22X1.5" },
{ thread_type: "METRIC HEAVY", dash: "16", pipe_od: "16", thread: "M24X1.5", variant: null, dsc_code: "M24X1.5" },
{ thread_type: "METRIC HEAVY", dash: "20", pipe_od: "20", thread: "M30X2.0", variant: null, dsc_code: "M30X2.0" },
{ thread_type: "METRIC HEAVY", dash: "25", pipe_od: "25", thread: "M36X2.0", variant: null, dsc_code: "M36X2.0" },
{ thread_type: "METRIC HEAVY", dash: "30", pipe_od: "30", thread: "M42X2.0", variant: null, dsc_code: "M42X2.0" },
{ thread_type: "METRIC HEAVY", dash: "38", pipe_od: "38", thread: "M52X2.0", variant: null, dsc_code: "M52X2.0" },

];

const nippleFittingThreadOptions = [
  { value: "BSP", label: "BSP (B)", code: "B", dsc_code: "BSP" },
  { value: "BSP ORING", label: "BSP ORING (BO)", code: "BO", dsc_code: "BSP ORING" },
  { value: "JIC", label: "JIC (J)", code: "J", dsc_code: "JIC" },
  { value: "ORFS", label: "ORFS (O)", code: "O", dsc_code: "ORFS" },
  { value: "METRIC KOMATSU", label: "METRIC KOMATSU (MK)", code: "MK", dsc_code: "METRIC KOMATSU" },
  { value: "METRIC LIGHT", label: "METRIC(LIGHT) (DL)", code: "DL", dsc_code: "METRIC LIGHT" },
  { value: "METRIC LIGHT WITH O", label: "METRIC(LIGHT) WITH O (DLO)", code: "DLO", dsc_code: "METRIC LIGHT WITH O" },
  { value: "METRIC HEAVY", label: "METRIC(HEAVY) (DH)", code: "DH", dsc_code: "METRIC HEAVY" },
  { value: "METRIC HEAVY WITH O", label: "METRIC(HEAVY) WITH O (DHO)", code: "DHO", dsc_code: "METRIC HEAVY WITH O" },
  { value: "JIS", label: "JIS (BSP C-TYPE) (BJ)", code: "JIS", dsc_code: "JIS" },
  { value: "METRIC THREAD ORFS", label: "METRIC THREAD ORFS (MO)", code: "MO", dsc_code: "METRIC THREAD ORFS" }
];






module.exports = {
  ProductOptions,
  springTypeOptions,
  WireTypeOptions,
  CapWithoutCapOptions,
  metricTypeOptions,
  straightBendangleOptions,
  pipeODOptions,
  fittingTypeOptions,
  dropLengthOptions,
  malefemaleOptions,
  variantsOption,
  fittingDashSizeOptions,
  fittingThreadOptions,
  hoseDashSizeOptions,
  skiveTypeOptions,
  fittingPieceOptions,
  designOption,
  PartOptions,
  MFCOptions,
  BrandLayLineOptions,
  HoseTypeOptions,
  springTypeOption,
  dustCapColorsOption,
  sleeveSizesOption,
  vcSizesOption,
  dustCapThreadType,
  oRingThreadTypeOption,
  dustCapMatricOption,
  TuebeFittingsThreads,
  TubeFittingsCategory,
  uomOptions,
  gstOption,
  nutFittingThreadOptions,
  nutFittingDashSize,
  nippleFittingThreadOptions,
  springWireTypeOption

};
