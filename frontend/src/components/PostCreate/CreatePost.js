import React, { useState, useEffect } from 'react';
import LocationDropdown from '../LocationDropDown/LocationDropDown';
import { CATEGORY, LOCATION } from '../../utils/Constants';
import { getPostById } from '../../restClient/api';
// import LocationDropdown from './LocationDropdown';

const CreatePost = ({ id, createPost, editPost }) => {
	const isEditMode = !!id; // Check if an id prop is provided
	const [post, setPost] = useState({
		name: '',
		description: '',
		active: true,
		categoryId: '',
		userId: '',
		barted: false,
		stateId: '',
		subCategoryId: '',
		countryId: '',
		cityId: '',
		price: 0,
		condition: '',
		location: ''
	});
