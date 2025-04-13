import { Toaster } from '../../jsx/components/Toaster/Toster';
import {
    formatError,
    runLogoutTimer,    
    signUp,
    // login,saveTokenInLocalStorage 
} from '../../services/AuthService';
import {getRolePermissions, login,loginRestaurant,saveTokenInLocalStorage } from '../../services/apis/AuthService';
import Swal from "sweetalert2";

export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';  
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';
export const NAVTOGGLE = 'NAVTOGGLE';



export function signupAction(email, password, navigate) {
    return (dispatch) => {
        signUp(email, password)
        .then((response) => {
            saveTokenInLocalStorage(response.data);
            runLogoutTimer(
                dispatch,
                response.data.expiresIn * 1000,
                //history,
            );
            dispatch(confirmedSignupAction(response.data));
            navigate('/dashboard');
			//history.push('/dashboard');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function Logout(navigate) {
	localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    navigate('/login');
    
	return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, navigate) {
    return (dispatch) => {
         login(email, password)
            .then(async (response) => {
                console.log("resonse is here",response)

                const user = response.data?.user;
            const token = response.data?.tokens?.token;
            const expiresIn = response.data?.tokens?.expires;

                saveTokenInLocalStorage(response.data);
                // runLogoutTimer(
                //     dispatch,
                //     response.data.expiresIn * 1000,
                //     navigate,
                // );
                 // Fetch role and permissions using role_id
            const roleData = await getRolePermissions(user.role_id);

            const payload = {
                ...response.data,
                role: roleData?.data?.roleById?.name || '',
                permissions: roleData?.data?.roleById?.permissions || [],
            };
            dispatch(loginConfirmedAction(payload));
            //    dispatch(loginConfirmedAction(response.data));			              
			   navigate('/dashboard');  
               dispatch(loginFailedAction(""));              
            })
            .catch((error) => {				
                const errorMessage = formatError(error);
                // console.log("errorMessage",error?.response?.data?.message)
        		Toaster.error(error?.response?.data?.message);

                dispatch(loginFailedAction(error?.response?.data?.message));
            });
    };
}

export function loginRestaurantAction(email, password, navigate) {
    return (dispatch) => {
        loginRestaurant(email, password)
            .then((response) => {
                saveTokenInLocalStorage(response.data);
                // runLogoutTimer(
                //     dispatch,
                //     response.data.expiresIn * 1000,
                //     navigate,
                // );
               dispatch(loginConfirmedAction(response.data));			              
			   navigate('/dashboard');                
            })
            .catch((error) => {				
                const errorMessage = formatError(error);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}


export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
export const navtoggle = () => {    
    return {        
      type: 'NAVTOGGLE',
    };
};

// export function formatError(errorResponse) {
//     switch (errorResponse.message) {
//         case 'EMAIL_NOT_FOUND':
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops',
//                 text: 'Email not found',
//             });
//             break;
//         case 'INVALID_PASSWORD':
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops',
//                 text: 'Invalid Password',
//             });
//             break;
//         case 'USER_DISABLED':
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops',
//                 text: 'User Disabled',
//             });
//             break;
//         default:
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops',
//                 text: 'An error occurred. Please try again.',
//             });
//             break;
//     }
// }
