const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middlewares/verifyToken.js');
const { Users } = require('../config');
const bcrypt = require('bcrypt');

const authRouter = Router();
authRouter.post('/signup', async (req, res) => {
	const { email, password, name } = req.body;

	// Check if user with the same email already exists
	const userQuery = Users.where('email', '==', email).limit(1);
	const snapshot = await userQuery.get();

	if (!snapshot.empty) {
		return res.status(409).json({ error: { message: 'User already exists' } });
	}

	// Generate a new user ID
	const userId = uuidv4();

	// Hash the password
	bcrypt.hash(password, 10, async (err, hashedPassword) => {
		if (err) {
			return res.status(500).json({ error: { message: 'Error hashing password' } });
		}

		// Store the user in Firestore
		await Users.doc(userId).set({ id: userId, email, password: hashedPassword });

		res.status(201).json({ error: { message: 'User registered successfully' } });
	});
});

// User login
authRouter.post('/login', async (req, res) => {
	const { email, password } = req.body;

	// Find the user with the provided email
	const userQuery =  Users.where('email', '==', email).limit(1);
	const snapshot = await userQuery.get();

	if (snapshot.empty) {
		return res.status(401).json({ error: { message: 'Wrong Email or Password' } });
	}

	const user = snapshot.docs[0].data();

	// Compare the provided password with the stored hashed password
	bcrypt.compare(password, user.password, (err, result) => {
		if (err) {
			return res.status(500).json({ error: {message: 'Error comparing passwords' }});
		}

		if (!result) {
			return res.status(401).json({ error: { message: 'Wrong Email or Password' } });
		}

		// Generate a JWT token
		const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
		delete user.password;
		res.status(200).json({ token, user });
	});
});

// Private API endpoint
authRouter.get('/private', authenticateToken, (req, res) => {
	res.status(200).json({ error: { message: 'Private API accessed successfully' } });
});

module.exports = authRouter;

