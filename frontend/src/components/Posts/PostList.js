import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BartContext from '../../store/bartContext';
import { getAllPosts } from '../../restClient/api';
import './PostList.css';

const PostList = () => {
	const { isLoggedIn, user } = useContext(BartContext);
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			const allPosts = await getAllPosts();
			setPosts([...allPosts]);
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	const handleEditClick = (postId) => {
		// Logic to handle the edit button click
		// For example:
		navigate(`/edit-post/${postId}`);
	};

	return (
		<div className="post-list">
			<h2>Post List</h2>
			{posts.map((post) => (
				<div key={post.id} className="post-list__item">
					<h3 className="post-list__title">{post.name}</h3>
					<p className="post-list__description">{post.description}</p>
					{isLoggedIn && post.userId === user.id && (
						<button className="post-list__edit-button" onClick={() => handleEditClick(post.id)}>
							Edit
						</button>
					)}
					{/* <Link to={`/view-post/${post.id}`} className="post-list__view-link">
						View
					</Link>
					<hr className="post-list__divider" /> */}
				</div>
			))}
		</div>
	);
};

export default PostList;
