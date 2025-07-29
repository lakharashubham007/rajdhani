// Action Types
export const GET_PRODUCTION_PROCESS_REQUEST = 'GET_PRODUCTION_PROCESS_REQUEST';
export const GET_PRODUCTION_PROCESS_SUCCESS = 'GET_PRODUCTION_PROCESS_SUCCESS';
export const GET_PRODUCTION_PROCESS_FAILURE = 'GET_PRODUCTION_PROCESS_FAILURE';
export const GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_REQUEST = 'GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_REQUEST';
export const GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_SUCCESS = 'GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_SUCCESS';
export const GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_FAILURE = 'GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_FAILURE';
// Add these to your existing list GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_REQUEST
export const GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_REQUEST = 'GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_REQUEST';
export const GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_SUCCESS = 'GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_SUCCESS';
export const GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_FAILURE = 'GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_FAILURE';



//Actions
export const getProductionProcessRequest = () => ({
  type: GET_PRODUCTION_PROCESS_REQUEST,
});

export const getProductionProcessSuccess = (data) => ({
  type: GET_PRODUCTION_PROCESS_SUCCESS,
  payload: data,
});

export const getProductionProcessFailure = (error) => ({
  type: GET_PRODUCTION_PROCESS_FAILURE,
  payload: error,
});

// Action for extract production process details 
export const getProductionProcessDetailsBySheetIDRequest = (sheetId) => ({
  type: GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_REQUEST,
  payload: sheetId,
});

export const getProductionProcessDetailsBySheetIDSuccess = (data) => {
  // console.log("✅ Action: Data received in getProductionProcessDetailsBySheetIDSuccess:", data);
  return {
    type: GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_SUCCESS,
    payload: data,
  };
};

export const getProductionProcessDetailsBySheetIDFailure = (error) => ({
  type: GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_FAILURE,
  payload: error,
});

//Actions for extract produciton process items 
export const getProductionProcessItemsByProductionIDRequest = (data) => ({
  type: GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_REQUEST,
  payload: data,
});

export const getProductionProcessItemsByProductionIDSuccess = (items) => ({
  type: GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_SUCCESS,
  payload: items,
});

export const getProductionProcessItemsByProductionIDFailure = (error) => ({
  type: GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_FAILURE,
  payload: error,
});
