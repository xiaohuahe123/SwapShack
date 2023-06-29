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

module.exports = getAllPosts;