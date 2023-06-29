const express = require('express');
const cors = require('cors');
const User = require('./config');
const routes = require('./routes/routes');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000

app.use('/api', routes);

//GET user info
app.get('/', async (req, res) => {
	const snapshot = await User.get();
	const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	res.send(list);
});

//CREATE new users
app.post('/create', async (req, res) => {
	const data = req.body;
	await User.add({ data });
	res.send({ msg: 'User Added' }); 
});

//UPDATE existing user info
app.post('/update', async (req, res) => {
	const id = req.body.id;
	delete req.body.id;
	const data = req.body;
	await User.doc(id).update(data);
	res.send({ msg: 'Updated' });
});

//DELETE existing user
app.post('/delete', async (req, res) => {
	const id = req.body.id;
	await User.doc(id).delete();
	res.send({ msg: 'Deleted' }); 
});

app.listen(PORT, () => console.log(`Up & RUnning at http://localhost:${PORT}`));
