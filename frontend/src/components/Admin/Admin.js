import React, {useEffect,useState} from "react";
import CategoryComponent from '../CategoryComponent/CategoryComponent';

import {
	fetchCountries,
	
	updateCountry,
	
	createCountry,
	
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

	const getCountries = async () => {
		const countriesData = await fetchCountries();
		setCountries(countriesData);
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

	const createCountryData = async (countryName) => {
		try {
			const newCountry = await createCountry(countryName);
			setCountries((prevCountries) => [...prevCountries, newCountry]);
		} catch (error) {
			console.error('Error creating country:', error);
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
				{/* {selectedCountry && (
						<CategoryComponent
							collectionName="states"
							itemNameField="name"
							items={states}
							selectedItem={selectedState}
							selectItem={setSelectedState}
							updateItem={updateState}
							createItem={createState}
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
							updateItem={updateCity}
							createItem={createCity}
							clearSelection={clearCitySelection}
						/>
				)}
			 */}
			</div>}
        </div>
		
    );
}

export default AdminPage;