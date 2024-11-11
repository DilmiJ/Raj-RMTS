import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/JobSelectionPart.css';  // if it's in a parent directory called css

const JobSelectionPart = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [editItem, setEditItem] = useState({ id: '', name: '', price: '' });
  const [viewDetailsItem, setViewDetailsItem] = useState(null); // New state to store the details of the item

  // Fetch items from MongoDB
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items'); // Adjust this API endpoint
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle adding a new item
  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/items', newItem); // API to add an item
      setItems([...items, response.data]);
      setNewItem({ name: '', price: '' }); // Reset form
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Handle updating an existing item
  const handleUpdateItem = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/items/${editItem.id}`, editItem); // API to update an item
      const updatedItems = items.map((item) =>
        item._id === editItem.id ? response.data : item
      );
      setItems(updatedItems);
      setEditItem({ id: '', name: '', price: '' }); // Reset form
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Handle deleting an item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`); // API to delete an item
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle fetching item details when "View Details" is clicked
  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/items/${id}`); // API to get a specific item by ID
      setViewDetailsItem(response.data); // Set the details of the item to view
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  // Handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="job-selection-part">
      <h1>Job Selection Part</h1>
      <div className="button-group">
        <button
          className={`tab-button ${activeTab === 'jobDetails' ? 'active' : ''}`}
          onClick={() => handleTabClick('jobDetails')}
        >
          Job Details
        </button>
        <button
          className={`tab-button ${activeTab === 'itemDetails' ? 'active' : ''}`}
          onClick={() => handleTabClick('itemDetails')}
        >
          Item Details
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'jobDetails' && (
          <form className="job-details-form">
            <h2>Job Details</h2>
            <label>
              User ID:
              <input type="text" name="userId" />
            </label>
            <label>
              Job Number:
              <input type="text" name="jobNumber" />
            </label>
            <label>
              Duration:
              <input type="text" name="duration" />
            </label>
            <label>
              Date:
              <input type="date" name="date" />
            </label>
            <label>
              Hours:
              <input type="number" name="hours" />
            </label>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        )}

        {activeTab === 'itemDetails' && (
          <div className="item-details">
            <h2>Item Details</h2>
            <div className="item-list">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item._id} className="item">
                    <p><strong>{item.name}</strong> - ${item.price}</p>
                    <button onClick={() => handleViewDetails(item._id)}>View Details</button>
                    <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                    <button onClick={() => setEditItem({ id: item._id, name: item.name, price: item.price })}>Edit</button>
                  </div>
                ))
              ) : (
                <p>No items found.</p>
              )}
            </div>

            {/* Add new item form */}
            <div className="add-item-form">
              <h3>Add New Item</h3>
              <label>
                Name:
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
              </label>
              <button onClick={handleAddItem}>Add Item</button>
            </div>

            {/* Edit item form */}
            {editItem.id && (
              <div className="edit-item-form">
                <h3>Edit Item</h3>
                <label>
                  Name:
                  <input
                    type="text"
                    value={editItem.name}
                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    value={editItem.price}
                    onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                  />
                </label>
                <button onClick={handleUpdateItem}>Update Item</button>
              </div>
            )}

            {/* Display item details when "View Details" is clicked */}
            {viewDetailsItem && (
              <div className="view-item-details">
                <h3>Item Details</h3>
                <p><strong>Name:</strong> {viewDetailsItem.name}</p>
                <p><strong>Price:</strong> ${viewDetailsItem.price}</p>
                {/* Add other details if required */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSelectionPart;
