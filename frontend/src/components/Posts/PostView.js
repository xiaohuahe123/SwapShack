import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../restClient/api';
import SubSection from '../SubSection/SubSection';
import './ViewPost.css';

const ViewPost = () => {
	const { postId } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		if (postId) fetchPost();
	}, []);

	const fetchPost = async () => {
		try {
			const postData = await getPostById(postId);
			setPost(postData);
		} catch (error) {
			console.error('Error fetching post:', error);
		}
	};

	if (!post) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="view-post">
			<SubSection name="View" />
			<h2>View Post</h2>
			<h3 className="post-title">Title: {post.name}</h3>
			<p className="post-description">Description: {post.description}</p>
			<p className="post-author">Owner: {post.owner}</p>
			{/* Display other post details as needed */}
		</div>
	);
};

export default ViewPost;
