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

// Update an existing post
async function updatePost(id, postData) {
	const postRef = Posts.doc(id);
	await postRef.update(postData);
}

// Delete a post by ID
async function deletePost(id) {
	await Posts.doc(id).delete();
}

// Add a post to a user's favorites
async function addPostToFavorites(userId, postId) {
	const userRef = Users.doc(userId);
	await userRef.update({
		favorites: db.FieldValue.arrayUnion(postId)
	});
}

// Remove a post from a user's favorites
async function removePostFromFavorites(userId, postId) {
	const userRef = Users.doc(userId);
	await userRef.update({
		favorites: db.FieldValue.arrayRemove(postId)
	});
}

module.exports = {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
	addPostToFavorites,
	removePostFromFavorites
};