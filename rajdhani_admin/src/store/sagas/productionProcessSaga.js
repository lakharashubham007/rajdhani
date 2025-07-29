import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_REQUEST,
    getProductionProcessDetailsBySheetIDSuccess,
    getProductionProcessDetailsBySheetIDFailure,
    GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_REQUEST,
    getProductionProcessItemsByProductionIDSuccess,
    getProductionProcessItemsByProductionIDFailure,
    getProductionProcessItemsByProductionIDRequest,
} from '../actions/ProductionProcessAction';

import { GetProductionProcessDetailsBySheetId, GetProductionProcessItemsByProductionID } from '../../services/apis/ProductionProcessApi';


function* handleGetProductionProcessDetailsBySheetID(action) {
    try {
        const sheetId = action.payload;
        const response = yield call(GetProductionProcessDetailsBySheetId, sheetId);
        // console.log("here in saga", response)
        yield put(getProductionProcessDetailsBySheetIDSuccess(response?.data));
        // yield put(getProductionProcessDetailsBySheetIDSuccess(response?.data?.data));
        // console.log("here in saga getProductionProcessDetailsBySheetIDSuccess called successfully")

        // //Call after successfull get new update produciton process details        
        // if (response?.data?.data && response?.data?.data?._id) {
        //     yield put(getProductionProcessItemsByProductionIDRequest({
        //         productionProcessID: response?.data?.data?._id,
        //         currentPage: 1, // default or dynamic
        //         sort: 10, // page limit
        //         sortValue: { value: "created_at", type: "desc" }, // or your default
        //         searchInputValue: "" // or pass actual search term
        //     }));
        // }
    } catch (error) {
        yield put(getProductionProcessDetailsBySheetIDFailure(error.message || 'Failed to fetch process'));
    }
}

// 📦 Get process items by production ID
function* handleGetProductionProcessItemsByProductionID(action) {
    try {
        // const productionId = action.payload;
        // const response = yield call(GetProductionProcessItemsByProductionID, productionId);
        const { productionProcessID, currentPage, sort, sortValue, searchInputValue } = action.payload;
        const response = yield call(
            GetProductionProcessItemsByProductionID,
            productionProcessID,
            currentPage,
            sort,
            sortValue,
            searchInputValue
        );

        // console.log("response in saga is here --->",response)

        yield put(getProductionProcessItemsByProductionIDSuccess(response?.data));
    } catch (error) {
        yield put(getProductionProcessItemsByProductionIDFailure(error.message || 'Failed to fetch process items'));
    }
}



export function* watchProductionProcessSaga() {
    yield takeLatest(GET_PRODUCTION_PROCESS_DETAILS_BY_SHEET_ID_REQUEST, handleGetProductionProcessDetailsBySheetID)
    yield takeLatest(GET_PRODUCTION_PROCESS_ITEMS_BY_PRODUCTION_ID_REQUEST, handleGetProductionProcessItemsByProductionID);
}
