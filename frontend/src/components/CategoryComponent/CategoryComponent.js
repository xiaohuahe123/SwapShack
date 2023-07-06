import React, { useState } from 'react';
import './CategoryComponent.css';

const CategoryComponent = ({
	collectionName,
	itemNameField,
	items,
	selectedItem,
	selectItem,
	updateItem,
	createItem, // New prop for creating an item
	clearSelection,
	
    })=>{
    const [searchText, setSearchText] = useState('');
    const [newItemName, setNewItemName] = useState(''); // State for new item name
     
	//filtering the items based on the search text
    const filterItems = (searchText) => {
		const filteredItems = items.filter((item) => item[itemNameField].toLowerCase().includes(searchText.toLowerCase()));
		return filteredItems;
	};
  //dynamicallly update based on search text
	const filteredItems = filterItems(searchText);

    const handleCreateItem = () => {
		if (newItemName) {
			createItem(newItemName); // Call the createItem prop with the new item name
			setNewItemName(''); // Reset the new item name input
		}
	};

	const handleUpdate = () => {
		if (selectedItem && selectedItem[itemNameField]) {
			updateItem(selectedItem);
		}
	};
	
    return(
        <div className="category-component">
			
            <h2>{collectionName}</h2>
			<input type="text" placeholder={`Search ${collectionName}...`} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
			<ul>
				{/* the filtered list of items and 'selected' CSS class is applied*/}
				{filteredItems.map((item) => (
					
					<li key={item.id} className={selectedItem && selectedItem.id === item.id ? 'selected' : ''} onClick={() => selectItem(item)}>
						{item[itemNameField]}
					</li>
				))}
			</ul>

			{/* if selectedItem have value then render below div */}

			{selectedItem && (
				<div>
					<h3>Edit {collectionName}</h3>
					<input type="text" value={selectedItem[itemNameField]} onChange={(e) => selectItem({ ...selectedItem, [itemNameField]: e.target.value })} className="edit-input" />
					<button onClick={handleUpdate}>Update</button>
					<button onClick={clearSelection}>Cancel</button>
				</div>
			)}
			
            {/* New item creation */}
			<div>
				<h3>Create New {collectionName}</h3>
				<input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="edit-input" />
				<button onClick={handleCreateItem}>Create</button>
			</div>
        </div>
    )
    };


export default CategoryComponent;