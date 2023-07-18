const { Router } = require('express');
const posts = require('./posts');
const postRouter = Router();

// Get all posts
postRouter.get('/posts', async (req, res) => {
	try {
		const allPosts = await posts.getAllPosts();
		res.json(allPosts);
	} catch (error) {
		res.status(500).send(error.message);
	}
}); 

// Get a single post by ID
postRouter.get('/posts/:id', async (req, res) => {
	try {
		const postId = req.params.id;
		const post = await posts.getPostById(postId);
		if (post) {
			res.json(post);
		} else {
			res.status(404).send('Post not found');
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

// Create a new post
postRouter.post('/posts', async (req, res) => {
	try {
		const postId = await posts.createPost(req.body);
		res.json({ id: postId });
	} catch (error) {
		res.status(500).send(error);
	}
});

// Update an existing post
postRouter.put('/posts/:id', async (req, res) => {
	try {
		const postId = req.params.id;
		await posts.updatePost(postId, req.body);
		res.sendStatus(200);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Delete a post
postRouter.delete('/posts/:id', async (req, res) => {
	try {
		const postId = req.params.id;
		await posts.deletePost(postId);
		res.sendStatus(200);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = postRouter;