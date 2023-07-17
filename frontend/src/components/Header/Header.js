import React, { useState, useEffect, useContext } from 'react';
import './Header.css';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { NavLink } from 'react-router-dom';
import BartContext from '../../store/bartContext';
import { ADMIN_EMAIL } from '../../utils/Constants';

const Header = ({ setIsPane }) => {
	const { isLoggedIn, logout, user } = useContext(BartContext);
	useEffect(() => {}, [user]);
	return (
		<div className="header">
			<div className="header__Container">
				<div className="header__Left">
					<div className="header__Icon">
						<h3 className="header__title" style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize:"70px"}}>
							<NavLink style={{ textDecoration: 'none' }} to="/">
								SwapShack
							</NavLink>
						</h3>
					</div>
				</div>
				<div className="hedaer__Right">
					<div style={{ display: 'flex', alignItems: 'center' }} className="header__Links">
						<div className="header__singleLink">
							<NavLink style={{ textDecoration: 'none' }} to="/">
								<p className="header__singleLinkText">HOME</p>
							</NavLink>
						</div>
						<div className="header__singleLink">
							<NavLink style={{ textDecoration: 'none' }} to="/about">
								<p className="header__singleLinkText" style={{ fontFamily: 'Montserrat' }}>
									ABOUT US
								</p>
							</NavLink>
						</div>
						{user.email === ADMIN_EMAIL && (
							<div className="header__singleLink">
								<NavLink style={{ textDecoration: 'none' }} to="/admin">
									<p className="header__singleLinkText" style={{ fontFamily: 'Montserrat' }}>
										Admin
									</p>
								</NavLink>
							</div>
						)}
						<div className="header__icons">
							<div className="header__singleIcon">
								<NavLink to="/profile">
									<PersonOutlinedIcon className="header__icons" />
								</NavLink>
							</div>
						</div>
						{isLoggedIn && (
							<div className="header__icons">
								<div className="header__singleIcon" onClick={logout}>
									<NavLink to="/">
										LogOut
									</NavLink>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
