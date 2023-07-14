import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BartContext from '../../store/bartContext';
import SubSection from '../SubSection/SubSection';
import './PostCreate.css';
import api, { createPost, updatePost } from '../../restClient/api';
import CreatePost from './CreatePost';

const PostCreate = () => {
	const { isLoggedIn, user } = useContext(BartContext);
	// const [post, setPost] = useState({});
	const navigate = useNavigate();
	const { postId } = useParams();

	useEffect(() => {}, [postId]);

	useEffect(() => {
		if (isLoggedIn !== true) {
			return navigate('/login');
		}
	}, [isLoggedIn]);

	const handleCreatePost = async (newPost) => {
		try {
			const postId = await createPost({...newPost, userId: user.id});
			// Handle successful post creation
			console.log('Post created with ID:', postId);
		} catch (error) {
			// Handle error during post creation
			console.error('Error creating post:', error);
		}
	};

	const handleEditPost = async (postId, updatedPost) => {
		try {
			await updatePost(postId, updatedPost);
			// Handle successful post update
			console.log('Post updated successfully');
		} catch (error) {
			// Handle error during post update
			console.error('Error updating post:', error);
		}
	};

	return (
		<div>
			<SubSection section="Post" />
			<div className="profile__container">
				<div className="profile__subContainer">
					<CreatePost id={postId} createPost={handleCreatePost} editPost={handleEditPost} />
					<p></p>
					<p></p>
					<p></p>
				</div>
			</div>
		</div>
	);
};

export default PostCreate;
