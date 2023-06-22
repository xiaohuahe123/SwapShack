// Import the Firebase module
const firebase = require('firebase');

// Configuration object containing the Firebase project details
const firebaseConfig = {
	apiKey: "AIzaSyDMGHEt4JLYfx8YLllqRy0XbGtYqnmNMX4",
	authDomain: "bartersystem-c310d.firebaseapp.com",
	projectId: "bartersystem-c310d",
	storageBucket: "bartersystem-c310d.appspot.com",
	messagingSenderId: "881708396099",
	appId: "1:881708396099:web:095cf4858112bb2cdeaef6",
	measurementId: "G-JQ4G4CZB2T"
  };

  // Initialize the Firebase app with the provided configuration
firebase.initializeApp(firebaseConfig);

// Get the Firestore database instance
const db = firebase.firestore();

// Create a reference to the 'Users' collection in the database
const User = db.collection('Users');

// Export the 'User' collection reference to be used in other parts of the code
module.exports = User;
