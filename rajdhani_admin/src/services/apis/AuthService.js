import axios from 'axios';
import Swal from "sweetalert2";
import { loginConfirmedAction, Logout } from '../../store/actions/AuthActions';
import apis from './index'
import { runLogoutTimer } from '../AuthService';

// export function login(email, password, dispatch, navigate) {
    
//     const postData = {
//         email,
//         password,
//     };

//     return axios.post(apis.auth.login, postData)
//         .then(response => {
//             if (response.data && response.data.message === "Login successfully") {
//                 console.log("My console is here ",response.data);
//                 // Save the token and user details to localStorage
//                 const tokenDetails = {
//                     token: response.data.tokens.token,
//                     user: response.data.user,
//                     expireDate: new Date(response.data.tokens.expires) // convert expiry to date object
//                 };
                
//                 saveTokenInLocalStorage(tokenDetails);

//                 // Dispatch login success action
//                 // dispatch(loginConfirmedAction(tokenDetails));

//                 // // Navigate to the desired screen after login
//                 // navigate('/home');

//                 // Run logout timer
//                 const timer = tokenDetails.expireDate.getTime() - new Date().getTime();
//                 runLogoutTimer(dispatch, timer, navigate);

//                 // Show success alert
//                 // Swal.fire({
//                 //     icon: 'success',
//                 //     title: 'Success',
//                 //     text: 'Login successful',
//                 // });
//             } else {
//                 // Handle unsuccessful login response
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops',
//                     text: 'Login failed. Please check your credentials.',
//                 });
//             }
//         })
//         .catch(error => {
//             // Format error based on response
//             formatError(error.response.data);
//         });
// }

export function login(email, password) {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(apis.auth.login, postData)
}

export function loginRestaurant(email, password) {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(apis.auth.restaurant, postData)
}

export function formatError(errorResponse) {
    switch (errorResponse.message) {
        case 'EMAIL_NOT_FOUND':
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Email not found',
            });
            break;
        case 'INVALID_PASSWORD':
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Invalid Password',
            });
            break;
        case 'USER_DISABLED':
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'User Disabled',
            });
            break;
        default:
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'An error occurred. Please try again.',
            });
            break;
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    console.log("token details", tokenDetails)
    localStorage.setItem('tokens', JSON.stringify(tokenDetails.tokens));
    localStorage.setItem('token', JSON.stringify(tokenDetails.tokens.token));
    localStorage.setItem('user', JSON.stringify(tokenDetails.user));
}
