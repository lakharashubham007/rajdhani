const logTypeMap = {
  PROCESS_START: {
    log_template: 'Production process started by {created_by}.',
    stage: 'Start',
    status: 'Started'
  },
  PROCESS_PAUSED: {
    log_template: 'Production process paused by {created_by}.',
    stage: 'Paused',
    status: 'On Hold'
  },

  PROCESS_RESUMED: {
    log_template: 'Production process resumed by {created_by}.',
    stage: 'Resume',
    status: 'In Progress'
  },

  PROCESS_STOPPED: {
    log_template: 'Production process stopped by {created_by}.',
    stage: 'Stopped',
    status: 'Completed'
  },

  // ✅ cutting
  PROCESS_HOSE_CUTTING_START: {
    log_template: 'Hose Cutting Stage started by {created_by}.',
    stage: 'Hose Cutting',
    status: 'Started'
  },
  PROCESS_HOSE_CUTTING_END: {
    log_template: 'Hose Cutting Stage Finalize by {created_by}.',
    stage: 'Hose Cutting',
    status: 'Completed'
  },
  PROCESS_HOSE_CUTTING_QUANTITY_UPDATE: {
    log_template: 'Total {totalItems} item and {quantity} quantity updated in {stage} stage.',
    stage: 'Hose Cutting',
    status: 'Updated'
  },
  // ✅ skiving
  //PROCESS_SKIVING_START
  PROCESS_SKIVING_START: {
    log_template: 'Skiving Stage started by {created_by}.',
    stage: 'Skiving',
    status: 'Started'
  },
  PROCESS_SKIVING_END: {
    log_template: 'Skiving Stage Finalize by {created_by}.',
    stage: 'Skiving',
    status: 'Completed'
  },
  PROCESS_SKIVING_QUANTITY_UPDATE: {
    log_template: 'Total {totalItems} item and {quantity} quantity updated in {stage} stage.',
    stage: 'Skiving',
    status: 'Updated'
  },

  // ✅ Pre-assembly
  PROCESS_PRE_ASSEMBLY_START: {
    log_template: 'Pre-assembly Stage started by {created_by}.',
    stage: 'Pre-assembly',
    status: 'Started'
  },
  PROCESS_PRE_ASSEMBLY_END: {
    log_template: 'Pre-assembly Stage finalized by {created_by}.',
    stage: 'Pre-assembly',
    status: 'Completed'
  },
  PROCESS_PRE_ASSEMBLY_QUANTITY_UPDATE: {
    log_template: 'Total {totalItems} item(s) and {quantity} quantity updated in Pre-assembly stage.',
    stage: 'Pre-assembly',
    status: 'Updated'
  },

  // ✅ Crimping
  PROCESS_CRIMPING_START: {
    log_template: 'Crimping Stage started by {created_by}.',
    stage: 'Crimping',
    status: 'Started'
  },
  PROCESS_CRIMPING_END: {
    log_template: 'Crimping Stage finalized by {created_by}.',
    stage: 'Crimping',
    status: 'Completed'
  },
  PROCESS_CRIMPING_QUANTITY_UPDATE: {
    log_template: 'Total {totalItems} item(s) and {quantity} quantity updated in Crimping stage.',
    stage: 'Crimping',
    status: 'Updated'
  },

  // ✅ Testing
  PROCESS_TESTING_START: {
    log_template: 'Testing Stage started by {created_by}.',
    stage: 'Testing',
    status: 'Started'
  },
  PROCESS_TESTING_END: {
    log_template: 'Testing Stage finalized by {created_by}.',
    stage: 'Testing',
    status: 'Completed'
  },
  PROCESS_TESTING_QUANTITY_UPDATE: {
    log_template: 'Total {totalItems} item(s) and {quantity} quantity updated in Testing stage.',
    stage: 'Testing',
    status: 'Updated'
  },

  // ✅ Packing
  PROCESS_PACKING_START: {
    log_template: 'Packing Stage started by {created_by}.',
    stage: 'Packing',
    status: 'Started'
  },
  PROCESS_PACKING_END: {
    log_template: 'Packing Stage finalized by {created_by}.',
    stage: 'Packing',
    status: 'Completed'
  },
  PROCESS_PACKING_QUANTITY_UPDATE: {
    log_template: 'Total {totalItems} item(s) and {quantity} quantity updated in Packing stage.',
    stage: 'Packing',
    status: 'Updated'
  }

  // You can add more templates like this...
};

module.exports = logTypeMap;