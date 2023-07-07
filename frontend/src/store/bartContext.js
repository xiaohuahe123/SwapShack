import { createContext } from 'react';

const BartContext = createContext({

	logout: () => {},
	showLogout: false,
	isLoggedIn: false,
	login: (token, user) => {},
	headers:{},
	user: {},
	setUser: () => {},
	
});

export default BartContext;