const { Router } = require('express');
const { Categories } = require('../config');
const categoryRouter = Router();

// Create a route to fetch the categories data
categoryRouter.get('/', async (req, res) => {
	try {
		const categoriesSnapshot = await Categories.get();
		const categoriesData = categoriesSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		res.json(categoriesData);
	} catch (error) {
		console.error('Error fetching categories:', error);
		res.status(500).json({ error: 'Error fetching categories' });
	}
});



module.exports = categoryRouter;