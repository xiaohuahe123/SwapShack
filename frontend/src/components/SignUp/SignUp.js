import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BartContext from '../../store/bartContext';
import SubSection from '../SubSection/SubSection';
import './SignUp.css';
const SignUp = () => {

	// State variables to store user input
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// Navigation hook for redirecting
	const navigate = useNavigate();

	// Accessing the BartContext to check if the user is already logged in
	const { isLoggedIn } = useContext(BartContext);

	// Check if the user is already logged in and redirect to home if true
	useEffect(() => {
		if (isLoggedIn === true) {
			navigate('/home');
		}
	}, []);

	// Handle sign up form submission
	const handleSignUp = async (e) => {
		e.preventDefault();
		try {

			// Create a data object with user's email, password, and returnSecureToken flag
			const data = {
				email: email,
				password: password,
				returnSecureToken: true
			};

			// Make a POST request to the signup endpoint using axios
			const response = await axios.post('http://localhost:4000/signup', data, {
				headers: { 'Content-Type': 'application/json' }
			});

			// After successful signup, navigate to the homepage
			if (response && response.error) alert(response.error);
			if (response && response.data.message) navigate('/');
		} catch (err) {
			console.log(err);
			alert(err);
		}
	};

	// JSX rendering, (JavaScript XML) representing structure of signup form and its related elements such as input fields, buttons and links.
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

//Exporting the component to make it available for other files to import and use.
export default SignUp;
