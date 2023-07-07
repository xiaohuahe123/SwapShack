import React, { useState, useContext, useEffect, useReducer } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BartContext from '../../store/bartContext';
import SubSection from '../SubSection/SubSection';
import { app  as firebase} from '../../firebase/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, isLoggedIn, showLogout, setShowLogout } = useContext(BartContext);
	const navigate = useNavigate();
    useEffect(() => {
		if (isLoggedIn === true) {
			navigate('/home');
			setShowLogout(true);
		}
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// const data = {
			// 	email: email,
			// 	password: password,
			// 	returnSecureToken: true
			// };
			// const auth = getAuth();
			// //Use Firebase Auth to authenticate the user with email and password
			// const userCredential = await signInWithEmailAndPassword(auth,email, password);
			// const { user } = userCredential;
			// console.log(userCredential);			
			// login(user.idToken, user.email);
			const response = await fetch('/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			const data = await response.json();
			if (data.token) {
				alert('Login successful');
				console.log('Login successful');
				login(data.token, data.user);
				navigate('/home');
				console.log(isLoggedIn);
			} else if (data.error) {
				throw data.error;
			}
		} catch (err) {
			console.log(err);
			alert(err.message);
		}

		
	};

	return (
		<div className="login">
			<SubSection section="Login" />
			<div className="login__container">
				<div className="login__subContainer">
					<form onSubmit={handleSubmit}>
						<h2>Login</h2>
						<div className="login__inputContainer">
							<h3 className="login__subTitle">Email</h3>
							<input className="login__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className="login__inputContainer">
							<h3 className="login__subTitle">Password</h3>
							<input className="login__input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
						<button className="login__button">LOG IN</button>
					</form>
					<div className="login__link">
						<Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }} to="/sign-up">
							{' '}
							<h3 style={{ cursor: 'pointer', fontSize: '13px', textDecoration: 'none' }}>Create new account?</h3>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
