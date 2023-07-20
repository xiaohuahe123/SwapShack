import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BartContext from '../../store/bartContext';
import SubSection from '../SubSection/SubSection';
import './Profile.css';
import api from '../../restClient/api';

const Profile = () => {
	// Extract necessary data from the BartContext using the useContext hook
	const { isLoggedIn, user, token, setUser } = useContext(BartContext);

	// State variables to manage the profile data
	const [profile, setProfile] = useState(user);

	// useNavigate hook from react-router-dom to handle navigation
	const navigate = useNavigate();
	
	useEffect(function () {
		// Check if the user is logged in
		if (isLoggedIn !== true) {

			// Redirect the user to the login page if not logged in
			return navigate('/login');
		}

		
		try {
			// Fetch the user's profile data from the server using the API
			api.get(`/profile/${user.id}`, { headers }).then((res) => {
				if (res.data) {

						// Update both the user and profile states with the fetched data
					setUser({...res.data});
					setProfile({...res.data});
				}
			});
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	}, [isLoggedIn]);

	const handleInputChange = (event) => {

		// Destructure the name and value from the input event target
		const { name, value } = event.target;

		// Update the state by merging the updated value with the existing state
		setProfile((prevObject) => ({
			...prevObject,
			[name]: value
		}));
	};
	const handleProfileUpdate = async (e) => {
		e.preventDefault();
		try {

			

			// Send a PUT request to update the user's profile data
			const response = await api.put(`/profile/${user.id}`, profile, { headers });

			if (response && response.error) alert(response.error);
			if (response && response.data) setUser(response.data);
			alert('update profile successful');
		} catch (err) {
			console.log(err);
			alert(err);
		}
	};
	return (
		<div>
			<SubSection section="Profile" />
			<div className="profile__container">
				<div className="profile__subContainer">
					<form onSubmit={handleProfileUpdate}>
						<div className="profile__inputContainer">
							<h3 className="profile__subTitle">Full Name</h3>
							<input className="profile__input" name="fullName" value={user.fullName} onChange={handleInputChange} />
						</div>
						<div className="profile__inputContainer">
							<h3 className="profile__subTitle">Phone</h3>
							<input className="profile__input" name="phone" value={user.phone} onChange={handleInputChange} />
						</div>
						<div className="profile__inputContainer">
							<h3 className="profile__subTitle">City</h3>
							<input className="profile__input" name="city" value={user.city} onChange={handleInputChange} />
						</div>
						<div className="profile__inputContainer">
							<h3 className="profile__subTitle">State/Province</h3>
							<input className="profile__input" name="state" value={user.state} onChange={handleInputChange} />
						</div>
						<div className="profile__inputContainer">
							<h3 className="profile__subTitle">Country</h3>
							<input className="profile__input" name="country" value={user.country} onChange={handleInputChange} />
						</div>
						<div className="profile__inputContainer">
							<h3 className="profile__subTitle">Email</h3>
							<input disabled={true} className="profile__input" name="email" value={user.email} onChange={handleInputChange} />
						</div>

						<button className="profile__button">UPDATE</button>
					</form>
					<p></p>
					<p></p>
					<p></p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
