import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:4000/api/' // Replace with your base URL
});

export default instance;
