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


export const updateCategory = async (updatedCategory) => {
	try {
		await instance.put(`/category/${updatedCategory.id}`, updatedCategory);
	} catch (error) {
		console.error('Error updating subcategory:', error);
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

// Create a new post
export const createPost = async (postData) => {
	try {
		const response = await instance.post(`/post/posts`, postData);
		return response.data.id;
	} catch (error) {
		console.error('Error creating post:', error);
		throw error;
	}
};

// Update an existing post
export const updatePost = async (id, postData) => {
	try {
		await instance.put(`/post/posts/${id}`, postData);
	} catch (error) {
		console.error(`Error updating post with ID ${id}:`, error);
		throw error;
	}
};

// Delete a post by ID
export const deletePost = async (id) => {
	try {
		await instance.delete(`/post/posts/${id}`);
	} catch (error) {
		console.error(`Error deleting post with ID ${id}:`, error);
		throw error;
	}
};

// Add a post to a user's favorites
export const addPostToFavorites = async (userId, postId) => {
	try {
		await instance.put(`/users/${userId}/favorites`, { postId });
	} catch (error) {
		console.error(`Error adding post ${postId} to favorites of user ${userId}:`, error);
		throw error;
	}
};

// Remove a post from a user's favorites
export const removePostFromFavorites = async (userId, postId) => {
	try {
		await instance.delete(`/users/${userId}/favorites/${postId}`);
	} catch (error) {
		console.error(`Error removing post ${postId} from favorites of user ${userId}:`, error);
		throw error;
	}
};



export default instance;
