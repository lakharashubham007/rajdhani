import {
    GET_PRODUCTION_PROCESS_REQUEST,
    GET_PRODUCTION_PROCESS_SUCCESS,
    GET_PRODUCTION_PROCESS_FAILURE,
    GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID,
    GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_FAILURE,
    GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_SUCCESS,
    GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_REQUEST,
    GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_REQUEST,
    GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_SUCCESS,
    GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_FAILURE,
} from '../actions/ProductionProcessAction';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const productionProcessReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTION_PROCESS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_PRODUCTION_PROCESS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case GET_PRODUCTION_PROCESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_SUCCESS:
            // console.log("✅ Reducer: Data received in GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_SUCCESS", action.payload);
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        // case GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_SUCCESS:
        //     return { ...state, loading: false, data: action.payload };
        case GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_FAILURE:
            return { ...state, loading: false, error: action.payload, data: null };
        //Extracted Items
        case GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            };

        case GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                items: null,
            };
        default:
            return state;
    }
};
