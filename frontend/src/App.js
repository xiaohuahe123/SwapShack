import React, { useState,  Suspense } from 'react';
import './App.css';
import BartProvider from './store/BartProvider';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Header from './components/Header/Header';


function App() {
	const [isMove, setIsMove] = useState(false);
	return (		
			<BartProvider>
				<div className="app">
					<Header setIsPane={setIsMove} />
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</div>
			</BartProvider>	
	);
}
export default App;
