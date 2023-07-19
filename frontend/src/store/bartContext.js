import { createContext } from 'react';

const BartContext = createContext({
	products: [],
	totalAmount: 0,
	numberOfProduct: 0,
	addProduct: (product) => {},
	removeProduct: (id) => {},
	removeAll: () => {},
	incrementQuantity: (id) => {},
	decrementQuantity: (id) => {},
	token: '',
	headers:{},
	isLoggedIn: false,
	login: (token, user) => {},
	user: {},
	setUser: () => {},
	getUserCart: () => {},
	data: [],
	homeData: [],
	searchProduct: '',
	searchHandler: (currLocation) => {},
	isFilter: false,
	logout: () => {},
	showLogout: false
});

export default BartContext;
