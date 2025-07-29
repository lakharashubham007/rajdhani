// sagas/index.js
import { all } from 'redux-saga/effects';
import { watchProductionProcessSaga } from './productionProcessSaga';
import { watchAuthActions } from './authSaga';
import { watchSidebarMenusSaga } from './sidebarMenusSaga'

export default function* rootSaga() {
    yield all([
        watchProductionProcessSaga(),
        watchSidebarMenusSaga(),
        watchAuthActions()
    ]);
}
