const express = require('express');
const profileRouter = express.Router();
const { Users } = require('../config');
const { authenticateToken } = require('../middlewares/verifyToken');

// Fetch all profiles
profileRouter.get('/', async (req, res) => {
	try {
		const profilesRef = Users;
		const snapshot = await profilesRef.get();
		const profiles = [];

		snapshot.forEach((doc) => {
			profiles.push({ id: doc.id, ...doc.data() });
		});

		res.json(profiles);
	} catch (error) {
		res.status(500).json({ error: { message: 'Failed to fetch profiles' } });
	}
});

// Fetch a specific profile
profileRouter.get('/:id', authenticateToken, async (req, res) => {
	try {
		const profileId = req.params.id;
		const profileRef = Users.doc(profileId);
		const profile = await profileRef.get();

		if (!profile.exists) {
			res.status(404).json({ error: { message: 'Profile not found' } });
		} else {
			let temp = profile.data();
			delete temp.password;
			res.json({ id: profile.id, ...temp });
		}
	} catch (error) {
		res.status(500).json({ error: { message: 'Failed to fetch profile' } });
	}
});

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
		let temp = updatedProfile.data();
		delete temp.password;
		res.json({ id: updatedProfile.id, ...temp });
	} catch (error) {
		res.status(500).json({ error: { message: 'Failed to update profile' } });
	}
});



module.exports = profileRouter;