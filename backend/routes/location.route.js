const { Router } = require('express');
const { Categories } = require('../config');
const locationRouter = Router();

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

// Create a route to create a country
locationRouter.post('/', async (req, res) => {
	try {
		const { name } = req.body;

		const countryRef = await Countries.add({ name });
		const newCountry = { id: countryRef.id, name };

		res.json(newCountry);
	} catch (error) {
		console.error('Error creating country:', error);
		res.status(500).json({ error: 'Error creating country' });
	}
});

// Create a route to update a country
locationRouter.put('/:countryId', async (req, res) => {
	try {
		const countryId = req.params.countryId;
		const { name } = req.body;

		await Countries.doc(countryId).update({ name });

		res.json({ success: true });
	} catch (error) {
		console.error('Error updating country:', error);
		res.status(500).json({ error: 'Error updating country' });
	}
});

// Create a route to fetch the states data based on the selected country
locationRouter.get('/:countryId/states', async (req, res) => {
	try {
		const countryId = req.params.countryId;
		const statesSnapshot = await Countries.doc(countryId).collection('states').get();
		const statesData = statesSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		res.json(statesData);
	} catch (error) {
		console.error('Error fetching states:', error);
		res.status(500).json({ error: 'Error fetching states' });
	}
});

// Create a route to create a state
locationRouter.post('/:countryId/states', async (req, res) => {
	try {
		const countryId = req.params.countryId;
		const { name } = req.body;

		const stateRef = await Countries.doc(countryId).collection('states').add({ name });
		const newState = { id: stateRef.id, name };

		res.json(newState);
	} catch (error) {
		console.error('Error creating state:', error);
		res.status(500).json({ error: 'Error creating state' });
	}
});

// Create a route to update a state
locationRouter.put('/:countryId/states/:stateId', async (req, res) => {
	try {
		const countryId = req.params.countryId;
		const stateId = req.params.stateId;
		const { name } = req.body;

		await Countries.doc(countryId).collection('states').doc(stateId).update({ name });

		res.json({ success: true });
	} catch (error) {
		console.error('Error updating state:', error);
		res.status(500).json({ error: 'Error updating state' });
	}
});

// Create a route to fetch the cities data based on the selected state
locationRouter.get('/:countryId/states/:stateId/cities', async (req, res) => {
	try {
		const countryId = req.params.countryId;
		const stateId = req.params.stateId;
		const citiesSnapshot = await Countries.doc(countryId).collection('states').doc(stateId).collection('cities').get();
		const citiesData = citiesSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		res.json(citiesData);
	} catch (error) {
		console.error('Error fetching cities:', error);
		res.status(500).json({ error: 'Error fetching cities' });
	}
});

// Create a route to create a city
locationRouter.post('/:countryId/states/:stateId/cities', async (req, res) => {
	try {
		const countryId = req.params.countryId;
		const stateId = req.params.stateId;
		const { name } = req.body;

		const cityRef = await Countries.doc(countryId).collection('states').doc(stateId).collection('cities').add({ name });
		const newCity = { id: cityRef.id, name };

		res.json(newCity);
	} catch (error) {
		console.error('Error creating city:', error);
		res.status(500).json({ error: 'Error creating city' });
	}
});

// Create a route to update a city
locationRouter.put('/:countryId/states/:stateId/cities/:cityId', async (req, res) => {
	try {
		const countryId = req.params.countryId;
		const stateId = req.params.stateId;
		const cityId = req.params.cityId;
		const { name } = req.body;

		await Countries.doc(countryId).collection('states').doc(stateId).collection('cities').doc(cityId).update({ name });

		res.json({ success: true });
	} catch (error) {
		console.error('Error updating city:', error);
		res.status(500).json({ error: 'Error updating city' });
	}
});

module.exports = locationRouter;