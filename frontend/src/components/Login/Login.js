import React, { useState, useContext, useEffect, useReducer } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = async (e) => {
	};

	return (
		<div className="login">
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

