import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BartContext from '../../store/bartContext';
import SubSection from '../SubSection/SubSection';
import './SignUp.css';

const SignUp = () => {
	// State variables to store the email and password
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// useNavigate hook from react-router-dom to handle navigation
	const navigate = useNavigate();

	// Extract isLoggedIn from the BartContext using the useContext hook
	const { isLoggedIn } = useContext(BartContext);

	useEffect(() => {
		// Redirect the user to the home page if already logged in
		if (isLoggedIn === true) {
			navigate('/home');
		}
	}, []);
	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			// Prepare the request payload
			const data = {
				email: email,
				password: password,
				returnSecureToken: true
			};

				// Send a POST request to the server to sign up the user
			const response = await axios.post('/auth/signup',{ email, password }, {
				headers: { 'Content-Type': 'application/json' }
			});
			
			if (response && response.error) alert(response.error);
			if (response && response.data.message) navigate('/');
		} catch (err) {
			console.log(err);
			alert(err.response.data.error.message);
		}
	};
	return (
		<div>
			<SubSection section="Sign up" />
			<div className="login__container">
				<div className="login__subContainer">
					<form onSubmit={handleSignUp}>
						<h2>SIGN UP</h2>
						<div className="login__inputContainer">
							<h3 className="login__subTitle">Email</h3>
							<input className="login__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className="login__inputContainer">
							<h3 className="login__subTitle">Password</h3>
							<input className="login__input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
						<button className="login__button">SIGN UP</button>
					</form>
					<div className="login__link">
						<Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }} to="/login">
							<h3 style={{ cursor: 'pointer', fontSize: '13px' }}>Login with existing account</h3>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
