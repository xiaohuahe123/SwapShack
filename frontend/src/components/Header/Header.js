import React, {  } from 'react';
import './Header.css';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { NavLink } from 'react-router-dom';

const Header = ({ setIsPane }) => {
	return (
		<div className="header">
			<div className="header__Container">
				<div className="header__Left">
					<div className="header__Icon">
						<h3 className="header__title" style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize:"50px"}}>
							SwapShack
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
						<div className="header__icons">
							<div className="header__singleIcon">
								<NavLink to="/login">
									<PersonOutlinedIcon className="header__icons" />
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
