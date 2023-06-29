const { Router } = require('express');
const posts = require('./posts');
const postRouter = Router();

postRouter.use(express.json());

// Get all posts
postRouter.get('/posts', async (req, res) => {
	try {
		const allPosts = await posts.getAllPosts();
		res.json(allPosts);
	} catch (error) {
		res.status(500).send(error.message);
	}
}); 

module.exports = postRouter;