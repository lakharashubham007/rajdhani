import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {
	loadingToggleAction, loginAction,
	loginConfirmedAction,
	loginRestaurantAction,
} from '../../../store/actions/AuthActions';
import logoFull from "../../../assets/images/bhokhe.png";
import {loginRestaurant} from '../../../services/apis/AuthService'

function LoginRestaurant(props) {
	const [email, setEmail] = useState();
	let errorsObj = { email: '', password: '' };
	const [errors, setErrors] = useState(errorsObj);
	const [password, setPassword] = useState();
	const [submitted, setSubmitted] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuthenticated = useSelector((state) => state);
	console.log(isAuthenticated.auth.auth.isAuthenticated);
	
	// Validation logic
	const validateFields = () => {
		const errorObj = { email: '', password: '' };
		let isError = false;
		if (!email) {
			errorObj.email = 'Email is required';
			isError = true;
		}
		if (!password) {
			errorObj.password = 'Password is required';
			isError = true;
		}
		setErrors(errorObj);
		return isError;
	};

	// Reset the specific error when the user starts typing
	const handleInputChange = (e, field) => {
		if (field === 'email') {
			setEmail(e.target.value);
			if (submitted && errors.email) {
				setErrors(prevErrors => ({ ...prevErrors, email: '' }));
			}
		} else if (field === 'password') {
			setPassword(e.target.value);
			if (submitted && errors.password) {
				setErrors(prevErrors => ({ ...prevErrors, password: '' }));
			}
		}
	};

	function onLogin(e) {
		e.preventDefault();
		setSubmitted(true);
		// Validate fields
		if (validateFields()) {
			return;
		}
		dispatch(loadingToggleAction(true));
		dispatch(loginRestaurantAction(email, password, navigate));

		// const res = login(email, password, navigate);
		// console.log("response from login component");
		// if (res) {
		// 	navigate('/dashboard');
		// 	dispatch(loginConfirmedAction(res));

		// } else {
		// 	console.log("Login not successfully done");
		// }

	}

	return (
		<div className="fix-wrapper">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-5 col-md-6">
						<div className="card mb-0 h-auto">
							<div className="card-body">
								{/* logo */}
								<div className="text-center mb-2">
									<Link to={"/dashboard"}>
										<img src={logoFull} alt="logo" style={{ height: '80px', width: '80px' }} />
									</Link>
								</div>
								{/* Tag or intro Line */}
								<h4 className="text-center mb-4">Sign in your account as Restaurant Owner</h4>

								{props.errorMessage && (
									<div className='text-danger p-1 my-2'>
										{props.errorMessage}
									</div>
								)}

								{props.successMessage && (
									<div className='text-danger p-1 my-2'>
										{props.successMessage}
									</div>
								)}
								{/* Form */}
								<form onSubmit={onLogin}>
									<div className="mb-3">
										<label className="mb-1"><strong>Email</strong></label>
										<input type="email" className="form-control"
											value={email}
											// onChange={(e) => setEmail(e.target.value)}
											onChange={(e) => handleInputChange(e, 'email')}
											placeholder="Type Your Email Address"
										/>
										{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
									</div>
									<div className="mb-3">
										<label className="mb-1"><strong>Password</strong></label>
										<input
											type="password"
											className="form-control"
											value={password}
											placeholder="Type Your Password"

											onChange={(e) => handleInputChange(e, 'password')}
										// onChange={(e) =>
										// 	setPassword(e.target.value)
										// }
										/>
										{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
									</div>
									<div className="row d-flex justify-content-between mt-4 mb-2">
										<div className="mb-3">
											<div className="form-check custom-checkbox ms-1">
												<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
												<label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
											</div>
										</div>

									</div>
									<div className="text-center">
										<button type="submit" className="btn btn-primary btn-block">Sign Me In</button>
									</div>
								</form>
								{/* Button for signup and forgot password */}
								<div className="new-account mt-3">
									<p>Don't have an account? <Link to="/page-register" className="text-primary">Sign up</Link></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		errorMessage: state.auth.errorMessage,
		successMessage: state.auth.successMessage,
		showLoading: state.auth.showLoading,
	};
};
export default connect(mapStateToProps)(LoginRestaurant);
