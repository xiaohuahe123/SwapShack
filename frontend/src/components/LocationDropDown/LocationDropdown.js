import React, { useEffect, useState } from 'react';
import { fetchCountries, fetchStates, fetchCities, fetchCategories, fetchSubCategories } from '../../restClient/api';
import { CATEGORY, LOCATION } from '../../utils/Constants';
import { isEmpty } from '../../utils/utils';
import './LocationDropDown.css';

const LocationDropdown = ({ onSelectionChange, selectedCountryId, selectedStateId, selectedCityId, selectedCategoryId, selectedSubCategoryId, type }) => {
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedState, setSelectedState] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedSubCategory, setSelectedSubCategory] = useState('');

	useEffect(() => {
		getCountries();
		getCategories();
	}, []);

	useEffect(() => {
		setSelectedCountry(selectedCountryId || '');
		setSelectedState(selectedStateId || '');
		setSelectedCity(selectedCityId || '');
		setSelectedCategory(selectedCategoryId || '');
		setSelectedSubCategory(selectedSubCategoryId || '');
	}, [selectedCountryId, selectedStateId, selectedCityId, selectedCategoryId, selectedSubCategoryId]);

	useEffect(() => {
		if (selectedCountryId) {
			getStates(selectedCountryId);
		}
	}, [selectedCountryId]);

	useEffect(() => {
		if (selectedStateId) {
			getCities(selectedStateId);
		}
	}, [selectedStateId]);

	useEffect(() => {
		if (selectedCategoryId) {
			getSubCategories(selectedCategoryId);
		}
	}, [selectedCategoryId]);

	const getCountries = async () => {
		try {
			const countriesData = await fetchCountries();
			setCountries(countriesData);
		} catch (error) {
			console.error('Error fetching countries:', error);
		}
	};

	const getStates = async (country) => {
		try {
			const statesData = await fetchStates(country);
			setStates(statesData);
		} catch (error) {
			console.error('Error fetching states:', error);
		}
	};

	const getCities = async (state) => {
		if (isEmpty(state)) return;
		try {
			const citiesData = await fetchCities(selectedCountry, state);
			if (!isEmpty(citiesData)) setCities(citiesData);
		} catch (error) {
			console.error('Error fetching cities:', error);
		}
	};

	const getCategories = async () => {
		try {
			const categoriesData = await fetchCategories();
			setCategories(categoriesData);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};

    const getSubCategories = async (category) => {
		if (isEmpty(category)) return;
		try {
			const subCategoriesData = await fetchSubCategories(category);
			setSubCategories(subCategoriesData);
		} catch (error) {
			console.error('Error fetching subcategories:', error);
		}
	};

    const handleCountryChange = async (e) => {
		const selectedCountry = e.target.value;
		setSelectedCountry(selectedCountry);
		setSelectedState('');
		setSelectedCity('');
		setSelectedCategory('');
		setSelectedSubCategory('');

		if (selectedCountry) {
			await getStates(selectedCountry);
		}

		const selection = {
			countryId: selectedCountry,
			stateId: '',
			cityId: ''
		};

		onSelectionChange(selection);
	};

    const handleStateChange = async (e) => {
		const selectedState = e.target.value;
		setSelectedState(selectedState);
		setSelectedCity('');
		setSelectedCategory('');
		setSelectedSubCategory('');

		if (selectedState) {
			await getCities(selectedState);
		}

		const selection = {
			countryId: selectedCountry,
			stateId: selectedState,
			cityId: ''
		};

		onSelectionChange(selection);
	};

	const handleCityChange = (e) => {
		const selectedCity = e.target.value;
		setSelectedCity(selectedCity);
		setSelectedCategory('');
		setSelectedSubCategory('');

		const selection = {
			countryId: selectedCountry,
			stateId: selectedState,
			cityId: selectedCity
		};

		onSelectionChange(selection);
	};

    const handleCategoryChange = async (e) => {
		const selectedCategory = e.target.value;
		setSelectedCategory(selectedCategory);
		setSelectedSubCategory('');

		if (selectedCategory) {
			await getSubCategories(selectedCategory);
		}

		const selection = {
			categoryId: selectedCategory,
			subCategoryId: ''
		};

		onSelectionChange(selection);
	};

	const handleSubCategoryChange = (e) => {
		const selectedSubCategory = e.target.value;
		setSelectedSubCategory(selectedSubCategory);

		const selection = {
			categoryId: selectedCategory,
			subCategoryId: selectedSubCategory
		};

		onSelectionChange(selection);
	};

	return (
		<div className="location-dropdown-container">
			{type === LOCATION && (
				<div className="location-dropdown">
					<label htmlFor="country" className="label">
						Country:
					</label>
					<select id="country" className="dropdown" value={selectedCountry} onChange={handleCountryChange}>
						<option value="">Select Country</option>
						{countries.map((country) => (
							<option key={country.id} value={country.id}>
								{country.name}
							</option>
						))}
					</select>

					<label htmlFor="state" className="label">
						State:
					</label>
					<select id="state" className="dropdown" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
						<option value="">Select State</option>
						{states.map((state) => (
							<option key={state.id} value={state.id}>
								{state.name}
							</option>
						))}
					</select>

					<label htmlFor="city" className="label">
						City:
					</label>
					<select id="city" className="dropdown" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
						<option value="">Select City</option>
						{cities.map((city) => (
							<option key={city.id} value={city.id}>
								{city.name}
							</option>
						))}
					</select>
				</div>
			)}

			{type === CATEGORY && (
				<div className="category-dropdown">
					<label htmlFor="category" className="label">
						Category:
					</label>
					<select id="category" className="dropdown" value={selectedCategory} onChange={handleCategoryChange}>
						<option value="">Select Category</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>

					<label htmlFor="subcategory" className="label">
						Subcategory:
					</label>
					<select id="subcategory" className="dropdown" value={selectedSubCategory} onChange={handleSubCategoryChange} disabled={!selectedCategory}>
						<option value="">Select Subcategory</option>
						{subCategories.map((subCategory) => (
							<option key={subCategory.id} value={subCategory.id}>
								{subCategory.name}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	);
};

export default LocationDropdown;
