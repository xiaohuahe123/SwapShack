const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

// Verify JWT middleware
const verifyToken = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(403).json({ message: 'Token not provided' });
	}

	jwt.verify(token, 'secretKey', (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Invalid token' });
		}

		req.user = decoded;
		next();
	});
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'Missing token' });
	}

	jwt.verify(token, 'secretKey', (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid token' });
		}

		req.userId = decoded.userId;
		next();
	});
};

module.exports = { authenticateToken, verifyToken };
