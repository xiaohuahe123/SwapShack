const { Posts, Users } = require('../config');

// Get all posts
async function getAllPosts() {
	const postsSnapshot = await Posts.get();
	const posts = [];
	postsSnapshot.forEach((doc) => {
		posts.push({ id: doc.id, ...doc.data() });
	});
	return posts;
}

// Get a single post by ID
async function getPostById(id) {
	const postDoc = await Posts.doc(id).get();
	if (postDoc.exists) {
		return { id: postDoc.id, ...postDoc.data() };
	}
	return null;
}

// Create a new post
async function createPost(postData) {
	const postRef = await Posts.add(postData);
	return postRef.id;
}

module.exports = {
	getAllPosts,
	getPostById,
	createPost
};