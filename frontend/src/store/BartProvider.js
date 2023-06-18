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