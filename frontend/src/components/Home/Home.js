import React, { useContext, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import BartContext from '../../store/bartContext';
import PostList from '../Posts/PostList';
import SubSection from '../SubSection/SubSection';

const Home = () => {
	const { isLoggedIn } = useContext(BartContext);
	useEffect(() => {}, []);

	return (
		<div className="login__container">
			<div className="login__subContainer">
				<SubSection section="HOME" />
				<div className="home__container2">
					<div className="home__btnContainer">
						<Link to="/create-post">
							<button className="home__btn2">Create Post</button>
						</Link>
					</div>
					<br />
					<PostList />
				</div>
				<div className="home__btnContainer">
					<Link to="/#">
						<button className="home__btn2">Home</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
