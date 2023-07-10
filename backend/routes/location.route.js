const { Router } = require('express');
const { Categories } = require('../config');
const categoryRouter = Router();

// Create a route to fetch the countries data
locationRouter.get('/', async (req, res) => {
	try {
		const countriesSnapshot = await Countries.get();
		const countriesData = countriesSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		res.json(countriesData);
	} catch (error) {
		console.error('Error fetching countries:', error);
		res.status(500).json({ error: 'Error fetching countries' });
	}
});



module.exports = locationRouter;