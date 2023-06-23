const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { Users } = require('../config');

const authRouter = Router();
authRouter.post('/signup', async (req, res) => {
	const { email, password, name } = req.body;

	// Check if user with the same email already exists
	const userQuery = Users.where('email', '==', email).limit(1);
	const snapshot = await userQuery.get();

	if (!snapshot.empty) {
		return res.status(409).json({ message: 'User already exists' });
	}

	// Generate a new user ID
	const userId = uuidv4();

	// Hash the password
	bcrypt.hash(password, 10, async (err, hashedPassword) => {
		if (err) {
			return res.status(500).json({ message: 'Error hashing password' });
		}

		// Store the user in Firestore
		await Users.doc(userId).set({ id: userId, email, password: hashedPassword });

		res.status(201).json({ message: 'User registered successfully' });
	});
});


module.exports = authRouter;

