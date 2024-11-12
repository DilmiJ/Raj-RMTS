import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Assemble = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);

    // Fetch items from the backend
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    // Open the Update form with the selected item details
    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsUpdateMode(true);
    };

    // Open the View details with the selected item
    const handleView = (item) => {
        setSelectedItem(item);
        setIsViewMode(true);
    };

    // Close Update or View form
    const handleClose = () => {
        setIsUpdateMode(false);
        setIsViewMode(false);
        setSelectedItem(null);
    };

    // Update item handler
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/items/${selectedItem.id}`, selectedItem);
            const updatedItems = items.map((item) =>
                item.id === selectedItem.id ? selectedItem : item
            );
            setItems(updatedItems);
            handleClose();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    // Update selected item fields as they are edited
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Assemble Items</h1>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => handleView(item)}>View</button>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => /* handleDelete logic here */}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isUpdateMode && selectedItem && (
                <div className="update-form">
                    <h2>Update Item</h2>
                    <button onClick={handleClose}>Close Form</button>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            name="name"
                            value={selectedItem.name}
                            onChange={handleInputChange}
                            placeholder="Item Name"
                        />
                        <input
                            type="text"
                            name="itemNumber"
                            value={selectedItem.itemNumber}
                            onChange={handleInputChange}
                            placeholder="Item Number"
                        />
                        <input
                            type="text"
                            name="stockAvailable"
                            value={selectedItem.stockAvailable}
                            onChange={handleInputChange}
                            placeholder="Stock Available"
                        />
                        <input
                            type="text"
                            name="pricePerUnit"
                            value={selectedItem.pricePerUnit}
                            onChange={handleInputChange}
                            placeholder="Price per Unit"
                        />
                        <input
                            type="text"
                            name="specification"
                            value={selectedItem.specification}
                            onChange={handleInputChange}
                            placeholder="Specification"
                        />
                        <button type="submit">Update Item</button>
                        <button type="button" onClick={handleClose}>Cancel</button>
                    </form>
<<<<<<< HEAD
<<<<<<< HEAD
                )}
                <div className="added-items">
                    {items.map((item) => (
                        <div key={item._id} className="added-item">
                            <img
                                src={item.images[0] ? `uploads/${item.images[0]}` : '/placeholder.png'}
                                alt={item.itemName}
                                className="item-image"
                            />
                            <button onClick={() => handleAddToQuotation(item)}>
                                {item.itemName}
                            </button>
                            <button onClick={() => handleEditItem(item)}>Update</button>
                            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                            <button onClick={() => setShowDetails(item)}>View</button>
                            
                            {showDetails && showDetails._id === item._id && (
                                <div className="item-details">
                                    <h3>Details:</h3>
                                    <p><strong>Item Name:</strong> {item.itemName}</p>
                                    <p><strong>Item Number:</strong> {item.itemNumber}</p>
                                    <p><strong>Stock Available:</strong> {item.stockAvailable}</p>
                                    <p><strong>Price:</strong> ${item.price}</p>
                                    <p><strong>Specification:</strong> {item.specification}</p>
                                    <div className="images-gallery">
                                        {item.images.map((img, index) => (
                                            <img key={index} src={`uploads/${img}`} alt={`Image ${index + 1}`} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="right-side">
                <h2>Quotation</h2>
                <div className="quotation-header">
                    <h3>Quotation No: {quotationNumber}</h3>
                    <QRCodeCanvas value={quotationNumber} size={50} />
                </div>
                <div className="quotation-items" Name="quotation-items">
                    {quotation.map((item) => (
                        <div key={item.itemNumber} className="quotation-item">
                            <h3>{item.itemName}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ${item.total.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleDeleteQuotation}>Clear Quotation</button>
                <button onClick={handleCustomerDetails}>Add Customer Details</button>
                <button onClick={handleFinalView}>View Final Quotation</button>
=======
                </div>
            )}

            {isViewMode && selectedItem && (
                <div className="view-details">
                    <h2>Item Details</h2>
                    <p>Name: {selectedItem.name}</p>
                    <p>Item Number: {selectedItem.itemNumber}</p>
                    <p>Stock Available: {selectedItem.stockAvailable}</p>
                    <p>Price: {selectedItem.pricePerUnit}</p>
                    <p>Specification: {selectedItem.specification}</p>
                    <button onClick={handleClose}>Close Details</button>
                </div>
            )}

            {/* Quotation Section */}
            <div className="quotation-section">
                <h2>Quotation</h2>
                <button>Generate Quotation</button>
                <button>Save Quotation</button>
                <button>Print Quotation</button>
>>>>>>> db1221439145c328535cda26fd0b0047df4cfa1b
=======
                </div>
            )}

            {isViewMode && selectedItem && (
                <div className="view-details">
                    <h2>Item Details</h2>
                    <p>Name: {selectedItem.name}</p>
                    <p>Item Number: {selectedItem.itemNumber}</p>
                    <p>Stock Available: {selectedItem.stockAvailable}</p>
                    <p>Price: {selectedItem.pricePerUnit}</p>
                    <p>Specification: {selectedItem.specification}</p>
                    <button onClick={handleClose}>Close Details</button>
                </div>
            )}

            {/* Quotation Section */}
            <div className="quotation-section">
                <h2>Quotation</h2>
                <button>Generate Quotation</button>
                <button>Save Quotation</button>
                <button>Print Quotation</button>
>>>>>>> db1221439145c328535cda26fd0b0047df4cfa1b
            </div>
        </div>
    );
};

export default Assemble;
