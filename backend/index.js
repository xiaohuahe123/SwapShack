const express = require('express');
const cors = require('cors');
const User = require('./config');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000

app.get('/', async (req, res) => {
	const snapshot = await User.get();
	const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	res.send(list);
});

app.post('/create', async (req, res) => {
	const data = req.body;
	await User.add({ data });
	res.send({ msg: 'User Added' });
});

app.listen(PORT, () => console.log(`Up & RUnning at http://localhost:${PORT}`));
