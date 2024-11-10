import React, { useState, useEffect } from 'react';
import '../css/Assemble.css';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Assemble = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        itemName: '',
        itemNumber: '',
        stockAvailable: '',
        price: '',
        specification: '',
        images: [],
    });
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(null);
    const [quotation, setQuotation] = useState([]);
    const [quotationNumber] = useState(`RMTS-${Math.floor(Math.random() * 100000)}`);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/assemble');
                if (Array.isArray(response.data)) {
                    setItems(response.data);
                } else {
                    console.error('Received data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching items from database:', error);
            }
        };
        fetchItems();
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validImages = files.filter(file =>
            file.type === 'image/png' || file.type === 'image/jpeg'
        );

        if (validImages.length > 0) {
            setFormData((prev) => ({ ...prev, images: validImages }));
        } else {
            alert('Please upload at least one PNG or JPEG image.');
        }
    };

    const saveItemToDatabase = async (item) => {
        try {
            const formDataToSend = new FormData();
            Object.keys(item).forEach(key => {
                if (key !== 'images') {
                    formDataToSend.append(key, item[key]);
                } else {
                    item.images.forEach(image => {
                        formDataToSend.append('images', image);
                    });
                }
            });

            const response = await axios.post('http://localhost:5000/api/assemble', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            return response.data;
        } catch (error) {
            console.error('Error saving item to database:', error);
            alert('Error saving item to database: ' + (error.response?.data.message || error.message));
        }
    };

    const updateItemInDatabase = async (id, updatedItem) => {
        try {
            const formDataToSend = new FormData();
            Object.keys(updatedItem).forEach(key => {
                if (key !== 'images') {
                    formDataToSend.append(key, updatedItem[key]);
                } else {
                    updatedItem.images.forEach(image => {
                        formDataToSend.append('images', image);
                    });
                }
            });

            const response = await axios.put(`http://localhost:5000/api/assemble/${id}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            return response.data;
        } catch (error) {
            console.error('Error updating item in database:', error);
            alert('Error updating item: ' + (error.response?.data.message || error.message));
        }
    };

    const handleAddItem = async () => {
        const { itemName, itemNumber, stockAvailable, price, specification } = formData;
        if (!itemName || !itemNumber || !stockAvailable || !price || !specification) {
            alert('Please fill in all fields');
            return;
        }

        const newItem = { ...formData, quantity: 1, total: formData.price };
        const savedItem = await saveItemToDatabase(newItem);
        if (savedItem) {
            setItems((prev) => [...prev, savedItem]);
            resetForm();
        }
    };

    const resetForm = () => {
        setFormData({
            itemName: '',
            itemNumber: '',
            stockAvailable: '',
            price: '',
            specification: '',
            images: [],
        });
        setShowForm(false);
    };

    const handleAddToQuotation = (item) => {
        setQuotation((prev) => [...prev, item]);
    };

    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/assemble/${id}`);
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item: ' + (error.response?.data.message || error.message));
        }
    };

    const handleUpdateItem = async () => {
        const updatedItem = { ...formData, quantity: 1, total: formData.price };
        if (!updatedItem.itemName || !updatedItem.itemNumber || !updatedItem.stockAvailable || !updatedItem.price || !updatedItem.specification) {
            alert('Please fill in all fields');
            return;
        }

        const savedItem = await updateItemInDatabase(showDetails._id, updatedItem);
        if (savedItem) {
            setItems((prev) => prev.map(item => item._id === showDetails._id ? savedItem : item));
            setShowDetails(null); // Close the details modal
            resetForm(); // Reset the form
        }
    };

    const handleEditItem = (item) => {
        setFormData({
            itemName: item.itemName,
            itemNumber: item.itemNumber,
            stockAvailable: item.stockAvailable,
            price: item.price,
            specification: item.specification,
            images: item.images || [],
        });
        setShowForm(true);
        setShowDetails(item);
    };

    // Delete all items from quotation
    const handleDeleteQuotation = () => {
        setQuotation([]);
    };

    // Navigate to the customer details page
    const handleCustomerDetails = () => {
        navigate('/customer-details');
    };

    // Navigate to the Monitor View page
    const handleFinalView = () => {
        navigate('/monitor-view');
    };

    return (
        <div className="assemble-container">
            <div className="left-side">
                <h2>Add Custom Item</h2>
                <button onClick={() => setShowForm(!showForm)}>Add Item</button>
                {showForm && (
                    <form className="custom-item-form">
                        <input
                            type="text"
                            name="itemName"
                            value={formData.itemName}
                            onChange={handleFormChange}
                            placeholder="Item Name"
                            required
                        />
                        <input
                            type="text"
                            name="itemNumber"
                            value={formData.itemNumber}
                            onChange={handleFormChange}
                            placeholder="Item Number"
                            required
                        />
                        <input
                            type="text"
                            name="stockAvailable"
                            value={formData.stockAvailable}
                            onChange={handleFormChange}
                            placeholder="Stock Available"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleFormChange}
                            placeholder="Price per Unit"
                            required
                        />
                        <input
                            type="text"
                            name="specification"
                            value={formData.specification}
                            onChange={handleFormChange}
                            placeholder="Specification"
                            required
                        />
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            multiple
                            onChange={handleImageChange}
                        />
                        <button type="button" onClick={handleAddItem}>Add Item</button>
                        <button type="button" onClick={resetForm}>Cancel</button>
                    </form>
                )}
                <div className="added-items">
                    {items.map((item) => (
                        <div key={item._id} className="added-item">
                            <button onClick={() => handleAddToQuotation(item)}>
                                {item.itemName}
                            </button>
                            <button onClick={() => setShowDetails(item)}>View Details</button>
                            <button onClick={() => handleEditItem(item)}>Update</button>
                            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="right-side">
                <h2>Quotation</h2>
                <p>Quotation No: <span style={{ color: 'grey' }}>{quotationNumber}</span></p>
                <QRCodeCanvas value={quotationNumber} size={128} />
                {quotation.length === 0 ? (
                    <p style={{ color: 'grey' }}>No items added to quotation.</p>
                ) : (
                    <div>
                        {quotation.map((item, index) => (
                            <div key={index} className="quotation-item">
                                <p>{item.itemName} - {item.quantity} x {item.price} = {item.total}</p>
                            </div>
                        ))}
                        <button onClick={handleDeleteQuotation}>Delete All Items</button>
                    </div>
                )}
                <button onClick={handleCustomerDetails}>Proceed to Customer Details</button>
                <button onClick={handleFinalView}>Proceed to Final View</button>
            </div>
        </div>
    );
};

export default Assemble;
