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
    const [showLogout, setShowLogout] = useState(false);
    const logout = () => {
		setShowLogout(false);
	};
    let bartValue = {
		logout: logout,
		setShowLogout: setShowLogout
	};
    
    return <BartContext.Provider value={bartValue}>{props.children}</BartContext.Provider>;
};
export default BartProvider;