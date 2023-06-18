import { createContext } from 'react';

const BartContext = createContext({

	logout: () => {},
	showLogout: false
});

export default BartContext;
