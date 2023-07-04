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

// Update an existing profile
profileRouter.put('/:id', authenticateToken, async (req, res) => {
	try {
		const profileId = req.params.id;
		const profileData = req.body;
		const profileRef = Users.doc(profileId);

		await profileRef.update(profileData, { merge: true });
		const updatedProfile = await profileRef.get();

		delete updatedProfile.password;
		res.json({ id: updatedProfile.id, ...updatedProfile.data() });
	} catch (error) {
		res.status(500).json({ error: 'Failed to update profile' });
	}
});



module.exports = profileRouter;