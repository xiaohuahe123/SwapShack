import React, { useState,  Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';

import React, { useState,  Suspense } from 'react';
import './App.css';
import BartProvider from './store/BartProvider';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Header from './components/Header/Header';

function App() {
	return (		
			<BartProvider>
				<div className="app">
				    <Header/>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</div>
			</BartProvider>	
	);
}
