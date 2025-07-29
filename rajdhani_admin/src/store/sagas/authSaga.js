// sagas/authSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginAction,
  loginConfirmedAction,
  loginFailedAction
} from '../actions/AuthActions';

import {
  formatError,
  saveTokenInLocalStorage,
  signUp,
  login,
  
} from '../../services/AuthService';

import { Toaster } from '../../jsx/components/Toaster/Toster';


// function* handleLogin() {
//       const { email, password, navigate } = action.payload;
//       try {
//          const response = yield call(login, email, password);
//       } catch (error) {
        
//       }

// }

function* handleLogin(action) {
  const { email, password, navigate } = action.payload;
  try {
    const response = yield call(login, email, password);
    const user = response.data?.user;
    const token = response.data?.tokens?.token;

    saveTokenInLocalStorage(response.data);

    // const roleData = yield call(getRolePermissions, user?.role_id);

    // const payload = {
    //   ...response.data,
    //   role: roleData?.data?.roleById?.name || '',
    //   permissions: roleData?.data?.roleById?.permissions || [],
    // };

    // yield put(loginConfirmedAction(payload));
    navigate('/dashboard');
  } catch (error) {
    const message = formatError(error);
    Toaster.error(error?.response?.data?.message || message);
    yield put(loginFailedAction(error?.response?.data?.message || message));
  }
}

// function* handleSignup(action) {
//   const { email, password, navigate } = action.payload;
//   try {
//     const response = yield call(signUp, email, password);
//     saveTokenInLocalStorage(response.data);
//     yield put(confirmedSignupAction(response.data));
//     navigate('/dashboard');
//   } catch (error) {
//     const message = formatError(error.response?.data);
//     yield put(signupFailedAction(message));
//   }
// }

export function* watchAuthActions() {
//   yield takeLatest(loginAction, handleLogin);
//   yield takeLatest(SIGNUP_REQUEST, handleSignup);
}
