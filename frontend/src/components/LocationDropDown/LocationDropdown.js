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

	