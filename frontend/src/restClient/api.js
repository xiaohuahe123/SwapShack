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

export const fetchStates = async (countryId) => {
	try {
		const response = await instance.get(`/location/${countryId}/states`);
		return response.data;
	} catch (error) {
		console.error('Error fetching states:', error);
	}
};

export const fetchCities = async (countryId, stateId) => {
	try {
		const response = await instance.get(`/location/${countryId}/states/${stateId}/cities`);
		return response.data;
	} catch (error) {
		console.error('Error fetching cities:', error);
	}
};

export const fetchCategories = async () => {
	try {
		const response = await instance.get('/category');
		return response.data;
	} catch (error) {
		console.error('Error fetching categories:', error);
	}
};

export const fetchSubCategories = async (categoryId) => {
	try {
		const response = await instance.get(`/category/${categoryId}/subCategories`);
		return response.data;
	} catch (error) {
		console.error('Error fetching subcategories:', error);
	}
};

export const updateCountry = async (updatedCountry) => {
	try {
		await instance.put(`/location/${updatedCountry.id}`, updatedCountry);
	} catch (error) {
		console.error('Error updating country:', error);
	}
};

export const updateState = async (countryId, updatedState) => {
	try {
		await instance.put(`/location/${countryId}/states/${updatedState.id}`, updatedState);
	} catch (error) {
		console.error('Error updating state:', error);
	}
};

export const updateCity = async (countryId, stateId, updatedCity) => {
	try {
		await instance.put(`/location/${countryId}/states/${stateId}/cities/${updatedCity.id}`, updatedCity);
	} catch (error) {
		console.error('Error updating city:', error);
	}
};

export const updateSubCategory = async (categoryId, updatedSubCategory) => {
	try {
		await instance.put(`/category/${categoryId}/subCategories/${updatedSubCategory.id}`, updatedSubCategory);
	} catch (error) {
		console.error('Error updating subcategory:', error);
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

export const createState = async (countryId, stateName) => {
	try {
		const response = await instance.post(`/location/${countryId}/states`, { name: stateName });
		return response.data;
	} catch (error) {
		console.error('Error creating state:', error);
	}
};

export const createCity = async (countryId, stateId, cityName) => {
	try {
		const response = await instance.post(`/location/${countryId}/states/${stateId}/cities`, { name: cityName });
		return response.data;
	} catch (error) {
		console.error('Error creating city:', error);
	}
};

export const createCategory = async (categoryName) => {
	try {
		const response = await instance.post('/category', { name: categoryName });
		return response.data;
	} catch (error) {
		console.error('Error creating category:', error);
	}
};

export const createSubCategory = async (categoryId, subCategoryName) => {
	try {
		const response = await instance.post(`/category/${categoryId}/subCategories`, { name: subCategoryName });
		return response.data;
	} catch (error) {
		console.error('Error creating subcategory:', error);
	}
};

// Get all posts
export const getAllPosts = async () => {
	try {
		const response = await instance.get(`/post/posts`);
		return response.data;
	} catch (error) {
		console.error('Error fetching posts:', error);
		throw error;
	}
};

// Get a single post by ID
export const getPostById = async (id) => {
	try {
		const response = await instance.get(`/post/posts/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching post with ID ${id}:`, error);
		throw error;
	}
};



export default instance;
