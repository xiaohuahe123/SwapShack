import React, { useState, useEffect } from 'react';
import LocationDropdown from '../LocationDropDown/LocationDropDown';
import { CATEGORY, LOCATION } from '../../utils/Constants';
import { getPostById } from '../../restClient/api';
// import LocationDropdown from './LocationDropdown';

const CreatePost = ({ id, createPost, editPost }) => {
	const isEditMode = !!id; 
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
	 quantity: 0,
		condition: '',
		location: ''
	});

   
	useEffect(() => {
		if (isEditMode) {
			
			getPostById(id).then((data) => setPost({ ...data }));
		}
	}, [id, isEditMode]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setPost((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSelectionChange = (obj) => {
		setPost((prevState) => ({ ...prevState, ...obj }));
	};

	const handleCreatePost = () => {
		createPost(post);
	};

	const handleEditPost = () => {
		editPost(id, post);
	};

	return (
		<div className="create-post">
			<h2>{isEditMode ? 'Edit Post' : 'Create Post'}</h2>
			<input type="text" name="name" value={post.name} onChange={handleInputChange} placeholder="Name" className="create-post__input" />
			<textarea name="description" value={post.description} onChange={handleInputChange} placeholder="Description" className="create-post__textarea" />
			<input type="text" name="price" value={post.price} onChange={handleInputChange} placeholder="Price" className="create-post__input" />
			<input type="text" name="condition" value={post.condition} onChange={handleInputChange} placeholder="Condition" className="create-post__input" />
			<LocationDropdown onSelectionChange={handleSelectionChange} selectedCountryId={post.countryId} selectedStateId={post.stateId} selectedCityId={post.cityId} type={LOCATION} />
			<LocationDropdown onSelectionChange={handleSelectionChange} selectedCategoryId={post.categoryId} selectedSubCategoryId={post.subCategoryId} type={CATEGORY} />
			{isEditMode ? (
				<button onClick={handleEditPost} className="create-post__button">
					Save Changes
				</button>
			) : (
				<button onClick={handleCreatePost} className="create-post__button">
					Create
				</button>
			)}
		</div>
	);
};

export default CreatePost;
