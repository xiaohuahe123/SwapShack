const express = require('express');
const profileRouter = express.Router();
const { Users } = require('../config');
const { authenticateToken } = require('../middlewares/verifyToken');

// Create a new profile
profileRouter.post('/', authenticateToken, async (req, res) => {
	try {
		const profileData = req.body;
		const docRef = await Users.add(profileData);
		const profile = await docRef.get();

		res.status(201).json({ id: profile.id, ...profile.data() });
	} catch (error) {
		res.status(500).json({ error: { message: 'Failed to create profile' } });
	}
});


module.exports = profileRouter;