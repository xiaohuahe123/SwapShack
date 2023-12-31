import React, { useState,  Suspense } from 'react';
import './App.css';
import Header from './components/Header/Header';
import BartProvider from './store/BartProvider';
import { Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import PostCreate from './components/PostCreate/PostCreate';
import Profile from './components/Profile/Profile';
import PostList from './components/Posts/PostList';
import ViewPost from './components/Posts/PostView';

import Home from './components/Home/Home';


//fetch data asynchronously using the React.lazy Inside the Suspense boundary
const Login = React.lazy(() => import('./components/Login/Login'));
const SignUp = React.lazy(() => import('./components/SignUp/SignUp'));
const AdminComponent = React.lazy(() => import('./components/Admin/Admin'));
function App() {
	const [isMove, setIsMove] = useState(false);

	return (
		<Suspense
			fallback={
				<div style={{ display: 'flex', justifyContent: 'center', alignItem: 'center', paddingTop: '300px' }}>
					<CircularProgress color="primary" size={100} />
				</div>
			}>
			<BartProvider>
				<div className="app">
					<Header setIsPane={setIsMove} />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/create-post" element={<PostCreate />} />
						<Route path="/edit-post/:postId" element={<PostCreate />} />
						<Route path="/view-post/:postId" element={<ViewPost />} />
						<Route path="/admin" element={<AdminComponent />} />
				        <Route path="/login" element={<Login />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</div>
			</BartProvider>
		</Suspense>
	);
}

export default App;
