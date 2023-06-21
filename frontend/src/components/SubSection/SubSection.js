import React from 'react';
import './SubSection.css';
const SubSection = ({ section }) => {
	return (
		<div className="subSection">
			<div className="sub__container1">
				<div className="container__content">
					<p className="container__section">Home/{section}</p>
					<h3 className="container__title">{section}</h3>
				</div>
			</div>
		</div>
	);
};