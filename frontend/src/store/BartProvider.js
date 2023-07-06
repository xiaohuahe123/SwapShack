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
	
    const [showLogout, setShowLogout] = useState(false);  // State variable to manage the visibility of logout button
    const logout = () => { // Function to handle the logout action
		setToken(null);// Clear the token
		setIsLoggedIn(false);  // Set isLoggedIn to false
		setShowLogout(false); // Hide the logout button
		localStorage.removeItem('tokenId'); // Remove the token from localStorage
		localStorage.removeItem('user'); // Remove the user from localStorage
	};
    
	const [isLoggedIn, setIsLoggedIn] = useState(() => { // State variable to manage the login status
		if (localStorage.getItem('tokenId')) {
			return true; // If tokenId is present in localStorage, the user is logged in
		} else {
			return false; // Otherwise, the user is not logged in
		}
	});
	const [token, setToken] = useState(() => { // State variable to store the token
		return localStorage.getItem('tokenId') || null; // Retrieve the token from localStorage or set it to null if not present
	});
	const [email, setEmail] = useState(() => { // State variable to store the email
		if (localStorage.getItem('userEmail')) {
			return localStorage.getItem('userEmail'); // Retrieve the email from localStorage
		} else {
			return ''; // Set the email to an empty string if not present in localStorage
		}
	});
	const login = (token, email) => { // Function to handle the login action
		setToken(token); // Set the token
		setEmail(email);  // Set the email
		setIsLoggedIn(true);	// Set isLoggedIn to true
	};

	let bartValue = {
		logout: logout,
		setShowLogout: setShowLogout,
		token: token,
		isLoggedIn: isLoggedIn,
		email: email,
		showLogout: showLogout,
		login:login
	};
	
    
    return <BartContext.Provider value={bartValue}>{props.children}</BartContext.Provider>;
};
export default BartProvider;