import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyDMGHEt4JLYfx8YLllqRy0XbGtYqnmNMX4",
	authDomain: "bartersystem-c310d.firebaseapp.com",
	projectId: "bartersystem-c310d",
	storageBucket: "bartersystem-c310d.appspot.com",
	messagingSenderId: "881708396099",
	appId: "1:881708396099:web:095cf4858112bb2cdeaef6",
	measurementId: "G-JQ4G4CZB2T"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);