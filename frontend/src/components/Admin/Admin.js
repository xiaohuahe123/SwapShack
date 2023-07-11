import React, {useEffect,useState} from "react";
import CategoryComponent from '../CategoryComponent/CategoryComponent';

const AdminPage = () => {
	const [selectedType, setSelectedType] = useState('');
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [states, setStates] = useState([]);
	const [selectedState, setSelectedState] = useState(null);
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState(null);
    
	useEffect(() => {
		fetchCountries();
	}, []);
	const createCountry = async (countryName) => {
		try {
			const response = await fetch('/location', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: countryName })
			});

			const newCountry = await response.json();
			setCountries((prevCountries) => [...prevCountries, newCountry]);
		} catch (error) {
			console.error('Error creating country:', error);
		}
	};
	const updateCountry = async (updatedCountry) => {
		try {
			await fetch(`/location/${updatedCountry.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updatedCountry)
			});

			// Optionally, you can refetch the countries data after updating
			fetchCountries();
		} catch (error) {
			console.error('Error updating country:', error);
		}
	};
	const fetchCountries = async () => {
		try {
			const response = await fetch('/location');
			const countriesData = await response.json();
			setCountries(countriesData);
		} catch (error) {
			console.error('Error fetching countries:', error);
		}
	};
	const clearCountrySelection = () => {
		setSelectedCountry(null);
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
						updateItem={updateCountry}
						createItem={createCountry}
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
			</div>}
        </div>
		
    );
}

export default AdminPage;