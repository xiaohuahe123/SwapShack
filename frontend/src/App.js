import React, { useState,  Suspense } from 'react';
import './App.css';
import BartProvider from './store/BartProvider';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';


function App() {
	return (		
			<BartProvider>
				<div className="app">
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</div>
			</BartProvider>	
	);
}
export default App;
