import axios from 'axios';
// import swal from "sweetalert";
import Swal from "sweetalert2";
import {
    loginConfirmedAction,
    Logout,
} from '../store/actions/AuthActions';
import { getRolePermissions } from './apis/AuthService';

export function signUp(email, password) {
    //axios call
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        postData,
    );
}

export function login(email, password) {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        postData,
    );
}

export function formatError(errorResponse) {
    switch (errorResponse.message) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            // swal("Oops", "Email already exists", "error");
              Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Email already exists',                        
              })
            break;
        case 'EMAIL_NOT_FOUND':
             Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Email not found',                        
              })
            //return 'Email not found';
                //swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            // swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Invalid Password',                        
            })
            break;
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    // console.log(tokenDetails,"token details is here");
    tokenDetails.expireDate = new Date(
        new Date().getTime() + tokenDetails.expiresIn * 1000,
    );
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));

}

export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        //dispatch(Logout(history));
        dispatch(Logout(navigate));
    }, timer);
}

export async function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('tokens');
    // console.log("tokenDetailsString", tokenDetailsString);

    if (!tokenDetailsString) {
        // dispatch(Logout(navigate));
        return;
    }

    let tokenDetails;
    try {
        tokenDetails = JSON.parse(tokenDetailsString); // Parse token details
    } catch (error) {
        // console.error("Failed to parse token details:", error);
        dispatch(Logout(navigate));
        return;
    }

    const expireDate = new Date(tokenDetails.expires);
    const todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(Logout(navigate));
        return;
    }

    const roleData = await getRolePermissions(tokenDetails?.user?.role_id);

        const payload = {
            ...tokenDetails,
            role: roleData?.data?.roleById?.name || '',
            permissions: roleData?.data?.roleById?.permissions || [],
        };

        dispatch(loginConfirmedAction(payload));


    // dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, navigate);
}

