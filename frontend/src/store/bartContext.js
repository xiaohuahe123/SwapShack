import { createContext } from 'react';

const BartContext = createContext({

	logout: () => {},
	showLogout: false,
	isLoggedIn: false,
	login: (token,email) => {}
});

export default BartContext;
