const { Router } = require('express');
const { Categories } = require('../config');
const categoryRouter = Router();

// Create a route to fetch the categories data
categoryRouter.get('/', async (req, res) => {
	try {
		const categoriesSnapshot = await Categories.get();
		const categoriesData = categoriesSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		res.json(categoriesData);
	} catch (error) {
		console.error('Error fetching categories:', error);
		res.status(500).json({ error: 'Error fetching categories' });
	}
});

// Create a route to fetch the subCategories data based on the selected category
categoryRouter.get('/:categoryId/subCategories', async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const subCategoriesSnapshot = await Categories.doc(categoryId).collection('subCategories').get();
		const subCategoriesData = subCategoriesSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		res.json(subCategoriesData);
	} catch (error) {
		console.error('Error fetching subCategories:', error);
		res.status(500).json({ error: 'Error fetching subCategories' });
	}
});

// Create a route to create a category
categoryRouter.post('/', async (req, res) => {
	try {
		const { name } = req.body;

		const categoryRef = await Categories.add({ name });
		const newCategory = { id: categoryRef.id, name };

		res.json(newCategory);
	} catch (error) {
		console.error('Error creating category:', error);
		res.status(500).json({ error: 'Error creating category' });
	}
});

// Create a route to create a subCategory
categoryRouter.post('/:categoryId/subCategories', async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const { name } = req.body;

		const subCategoryRef = await Categories.doc(categoryId).collection('subCategories').add({ name });
		const newSubCategory = { id: subCategoryRef.id, name };

		res.json(newSubCategory);
	} catch (error) {
		console.error('Error creating subCategory:', error);
		res.status(500).json({ error: 'Error creating subCategory' });
	}
});

// Create a route to update a category
categoryRouter.put('/:categoryId', async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const { name } = req.body;

		await Categories.doc(categoryId).update({ name });

		res.json({ success: true });
	} catch (error) {
		console.error('Error updating category:', error);
		res.status(500).json({ error: 'Error updating category' });
	}
});

// Create a route to update a subCategory
categoryRouter.put('/:categoryId/subCategories/:subCategoryId', async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const subCategoryId = req.params.subCategoryId;
		const { name } = req.body;

		await Categories.doc(categoryId).collection('subCategories').doc(subCategoryId).update({ name });

		res.json({ success: true });
	} catch (error) {
		console.error('Error updating subCategory:', error);
		res.status(500).json({ error: 'Error updating subCategory' });
	}
});

module.exports = categoryRouter;