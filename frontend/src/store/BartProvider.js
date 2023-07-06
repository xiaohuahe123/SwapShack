/*
Author:XiaohuaHe
Function:
BartProvider component is a custom context provider that wraps the entire application.
It provides the context and state management for the BartContext.By wrapping the entire application
 with the BartProvider component in the App.js file, data and functionality provided by the BartProvider available 
 to all components within the application.
*/
import React, { useState } from 'react';
import BartContext from './bartContext';

const BartProvider = (props) => {
	const [token, setToken] = useState(() => {
		return localStorage.getItem('tokenId') || null;
	});
	
	const [headers, setHeaders] = useState(() => {
		return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
	});
	const [user, setUser] = useState(() => {
		const u = localStorage.getItem('user');
		return u ? JSON.parse(u) : {};
	});

	const updateUser = (user) => {
		localStorage.setItem('user', JSON.stringify(user));
	};
    const [showLogout, setShowLogout] = useState(false);
    const logout = () => {
		setToken(null);
		setIsLoggedIn(false);
		setShowLogout(false);
		localStorage.removeItem('tokenId');
		localStorage.removeItem('user');
	};
    
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		if (localStorage.getItem('tokenId')) {
			return true;
		} else {
			return false;
		}
	});
	
	const login = (token, user) => {
		localStorage.setItem('tokenId', token);
		localStorage.setItem('user', JSON.stringify(user));
		setToken(token);
		setIsLoggedIn(true);
	};

	let bartValue = {
		logout: logout,
		setShowLogout: setShowLogout,
		token: token,
		isLoggedIn: isLoggedIn,
		showLogout: showLogout,
		login:login,
		headers,
		user: user,
		setUser: updateUser
	};
	
    
    return <BartContext.Provider value={bartValue}>{props.children}</BartContext.Provider>;
};
export default BartProvider;