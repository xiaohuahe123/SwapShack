import React, {useEffect,useState} from "react";
import CategoryComponent from '../CategoryComponent/CategoryComponent';

import {
	fetchCountries,
	fetchStates,
	fetchCities,
	
	updateCountry,
	updateState,
	updateCity,

	createCountry,
	createState,
	createCity
	
} from '../../restClient/api';
const AdminPage = () => {
	const [selectedType, setSelectedType] = useState('');
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [states, setStates] = useState([]);
	const [selectedState, setSelectedState] = useState(null);
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState(null);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [subCategories, setSubCategories] = useState([]);
	const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    
	useEffect(() => {
		getCountries();
	}, []);

	// whenever the selectedCountry value is updated, the getStates is triggered
	useEffect(() => {
		getStates();
	}, [selectedCountry]);

	useEffect(() => {
		getCities();
	}, [selectedState]);

	const getCountries = async () => {
		const countriesData = await fetchCountries();
		setCountries(countriesData);
	};
	const getCities = async () => {
		if (!selectedState) return setCities([]);

		const citiesData = await fetchCities(selectedCountry.id, selectedState.id);
		setCities(citiesData);
	};
	const getStates = async () => {
		if (!selectedCountry) return setStates([]);

		const statesData = await fetchStates(selectedCountry.id);
		setStates(statesData);
	};

	const updateCountryData = async (updatedCountry) => {
		try {
			await updateCountry(updatedCountry);

			// Optionally, you can refetch the countries data after updating
			const countriesData = await fetchCountries();
			setCountries(countriesData);
		} catch (error) {
			console.error('Error updating country:', error);
		}
	};

	const clearCountrySelection = () => {
		setSelectedCountry(null);
	};

	const updateStateData = async (updatedState) => {
		try {
			await updateState(selectedCountry.id, updatedState);

			// Optionally, you can refetch the states data after updating
			const statesData = await fetchStates(selectedCountry.id);
			setStates(statesData);
		} catch (error) {
			console.error('Error updating state:', error);
		}
	};

	const clearStateSelection = () => {
		setSelectedState(null);
	};

	const updateCityData = async (updatedCity) => {
		try {
			await updateCity(selectedCountry.id, selectedState.id, updatedCity);

			// Optionally, you can refetch the cities data after updating
			const citiesData = await fetchCities(selectedCountry.id, selectedState.id);
			setCities(citiesData);
		} catch (error) {
			console.error('Error updating city:', error);
		}
	};

	const clearCitySelection = () => {
		setSelectedCity(null);
	};

	const createCountryData = async (countryName) => {
		try {
			const newCountry = await createCountry(countryName);
			setCountries((prevCountries) => [...prevCountries, newCountry]);
		} catch (error) {
			console.error('Error creating country:', error);
		}
	};

	const createStateData = async (stateName) => {
		try {
			const newState = await createState(selectedCountry.id, stateName);
			setStates((prevStates) => [...prevStates, newState]);
		} catch (error) {
			console.error('Error creating state:', error);
		}
	};

	const createCityData = async (cityName) => {
		try {
			const newCity = await createCity(selectedCountry.id, selectedState.id, cityName);
			setCities((prevCities) => [...prevCities, newCity]);
		} catch (error) {
			console.error('Error creating city:', error);
		}
	};


    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<h4>Select Type:</h4>
			<select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
				<option value="">Select Type</option>
				{['Category', 'Location'].map((type) => (
					<option key={type} value={type}>
						{type}
					</option>
				))}
			</select>

			{selectedType === 'Location' && (
				<div style={{ display: 'flex' }}>
					<CategoryComponent
							collectionName="countries"
							itemNameField="name"
							items={countries}
							selectedItem={selectedCountry}
							selectItem={setSelectedCountry}
							updateItem={updateCountryData}
							createItem={createCountryData}
							clearSelection={clearCountrySelection}
					/>
				{selectedCountry && (
						<CategoryComponent
							collectionName="states"
							itemNameField="name"
							items={states}
							selectedItem={selectedState}
							selectItem={setSelectedState}
							updateItem={updateStateData}
							createItem={createStateData}
							clearSelection={clearStateSelection}
						/>
					)}

					{selectedState && (
						<CategoryComponent
							collectionName="cities"
							itemNameField="name"
							items={cities}
							selectedItem={selectedCity}
							selectItem={setSelectedCity}
							updateItem={updateCityData}
							createItem={createCityData}
							clearSelection={clearCitySelection}
						/>
					)}
				</div>
			)}

			{selectedType === 'Category' && 
			<div style={{ display: 'flex' }}>
				<CategoryComponent
						collectionName="countries"
						itemNameField="name"
						items={countries}
						selectedItem={selectedCountry}
						selectItem={setSelectedCountry}
						updateItem={updateCountry}
						createItem={createCountry}
						clearSelection={clearCountrySelection}
					/>
				
			</div>}
        </div>
		
    );
}

export default AdminPage;