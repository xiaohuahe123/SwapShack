import React from 'react';
import './SubSection.css';
const SubSection = ({ section }) => {
	return (
		 // Main container for the SubSection component
		<div className="subSection">
			{/* Container with background for the SubSection */}
			<div className="sub__container1"> 

			{/* Container for the content */}
				<div className="container__content">

					 {/* Paragraph displaying the section path */}
					<p className="container__section">Home/{section}</p>

					          {/* Heading displaying the section title */}
					<h3 className="container__title">{section}</h3>
				</div>
			</div>
		</div>
	);
};

export default SubSection;