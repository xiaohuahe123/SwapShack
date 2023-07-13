import React, { useState } from 'react';
import BartContext from './bartContext';
import { updateInstanceToken } from '../restClient/api';

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
		setUser({ ...user });
	};

	const [data, setData] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		if (localStorage.getItem('tokenId')) {
			return true;
		} else {
			return false;
		}
	});

	const [showLogout, setShowLogout] = useState(false);

	const login = (token, user) => {
		localStorage.setItem('tokenId', token);
		setToken(token);
		updateInstanceToken(token);
		updateUser(user)
		setIsLoggedIn(true);
	};

	const logout = () => {
		setToken(null);
		setIsLoggedIn(false);
		setShowLogout(false);
		localStorage.removeItem('tokenId');
		localStorage.removeItem('user');
		setUser({});
		setToken(null);
	};

	let bartValue = {
		token: token,
		headers,
		isLoggedIn: isLoggedIn,
		login: login,
		user: user,
		setUser: updateUser,
		data: data,
		setData: setData,
		logout: logout,
		showLogout: showLogout,
		setShowLogout: setShowLogout
	};
	return <BartContext.Provider value={bartValue}>{props.children}</BartContext.Provider>;
};

export default BartProvider;
