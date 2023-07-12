import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:4000/api/' // Replace with your base URL
});
// Set default headers
instance.defaults.headers.common['Content-Type'] = 'application/json';

// Get token from local storage
const token = localStorage.getItem('token');
if (token) {
	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const updateInstanceToken = (token) => {
	if (token) {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete instance.defaults.headers.common['Authorization'];
	}
};

export const fetchCountries = async () => {
	try {
		const response = await instance.get('/location');
		return response.data;
	} catch (error) {
		console.error('Error fetching countries:', error);
	}
};



export const updateCountry = async (updatedCountry) => {
	try {
		await instance.put(`/location/${updatedCountry.id}`, updatedCountry);
	} catch (error) {
		console.error('Error updating country:', error);
	}
};

export const createCountry = async (countryName) => {
	try {
		const response = await instance.post('/location', { name: countryName });
		return response.data;
	} catch (error) {
		console.error('Error creating country:', error);
	}
};


export default instance;
