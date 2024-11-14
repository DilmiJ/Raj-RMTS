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
<<<<<<< HEAD
    const [quotation, setQuotation] = useState([]);
    const [quotationNumber] = useState(`RMTS-${Math.floor(Math.random() * 100000)}`);
    const navigate = useNavigate();
=======
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [quotationNumber] = useState(`RMTS-${Math.floor(Math.random() * 100000)}`);
>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/assemble');
<<<<<<< HEAD
                if (Array.isArray(response.data)) {
                    setItems(response.data);
                } else {
                    console.error('Received data is not an array:', response.data);
                }
=======
                setItems(response.data);
>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a
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
<<<<<<< HEAD
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

    const handleAddItem = async () => {
        const { itemName, itemNumber, stockAvailable, price, specification } = formData;
        if (!itemName || !itemNumber || !stockAvailable || !price || !specification) {
            alert('Please fill in all fields');
            return;
            
        }

=======
        setFormData((prev) => ({ ...prev, images: files }));
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

            formDataToSend.forEach((value, key) => {
                console.log(key, value);
            });

            const response = await axios.post('http://localhost:5000/api/assemble', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            return response.data;
        } catch (error) {
            console.error('Error saving item to database:', error);
            alert('Error saving item to database');
        }
    };

    const handleAddItem = async () => {
>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a
        const newItem = { ...formData, quantity: 1, total: formData.price };
        const savedItem = await saveItemToDatabase(newItem);
        if (savedItem) {
            setItems((prev) => [...prev, savedItem]);
            resetForm();
        }
    };

<<<<<<< HEAD
=======
    const handleUpdateItem = async () => {
        const updatedItem = { ...formData, quantity: 1, total: formData.price };
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

            const response = await axios.put(`http://localhost:5000/api/assemble/${selectedItemId}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setItems((prev) => prev.map((item) => (item._id === selectedItemId ? response.data : item)));
            resetForm();
        } catch (error) {
            console.error('Error updating item in database:', error);
            alert('Error updating item');
        }
    };

>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a
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
<<<<<<< HEAD
    };

    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/assemble/${id}`);
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item: ' + (error.response?.data.message || error.message));
        }
=======
        setIsEditing(false);
        setSelectedItemId(null);
>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a
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
<<<<<<< HEAD
        setShowDetails(item);
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

    const handleUpdateItem = async () => {
        const updatedItem = { ...formData, quantity: 1, total: formData.price };
        const savedItem = await updateItemInDatabase(showDetails._id, updatedItem);
        if (savedItem) {
            setItems((prev) => prev.map(item => item._id === showDetails._id ? savedItem : item));
            setShowDetails(null);
            resetForm();
        }
    };

    const handleAddToQuotation = (item) => {
        const existingItem = quotation.find((q) => q.itemNumber === item.itemNumber);
        if (existingItem) {
            setQuotation((prev) =>
                prev.map((q) =>
                    q.itemNumber === item.itemNumber ? { ...q, quantity: q.quantity + 1, total: q.total + item.price } : q
                )
            );
        } else {
            setQuotation((prev) => [...prev, { ...item, quantity: 1, total: item.price }]);
        }
    };

    const handleDeleteQuotation = () => {
        setQuotation([]);
    };

    const handleCustomerDetails = () => {
        navigate('/customer-details');
    };

    const handleFinalView = () => {
        navigate('/final-view');
=======
        setIsEditing(true);
        setSelectedItemId(item._id);
    };

    const handleViewItem = (item) => {
        setShowDetails(item);
    };

    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/assemble/${id}`);
            setItems((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item');
        }
>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a
    };

    return (
        <div className="assemble-container">
            <div className="left-side">
<<<<<<< HEAD
                <h2>Add Custom Item</h2>
                <button onClick={() => setShowForm(!showForm)}>Add Item</button>
=======
                <h2>{isEditing ? "Update Item" : "Add Custom Item"}</h2>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Close Form" : "Add Item"}
                </button>
>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a
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
<<<<<<< HEAD
                        <button type="button" onClick={handleAddItem}>Add Item</button>
=======
                        <button
                            type="button"
                            onClick={isEditing ? handleUpdateItem : handleAddItem}
                        >
                            {isEditing ? "Update Item" : "Add Item"}
                        </button>
>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a
                        <button type="button" onClick={resetForm}>Cancel</button>
                    </form>
                )}
                <div className="added-items">
                    {items.map((item) => (
                        <div key={item._id} className="added-item">
<<<<<<< HEAD
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
                                </div>
                            )}
=======
                            <p>{item.itemName}</p>
                            <button onClick={() => handleViewItem(item)}>View</button>
                            <button onClick={() => handleEditItem(item)}>Edit</button>
                            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a
                        </div>
                    ))}
                </div>
            </div>
<<<<<<< HEAD

            <div className="right-side">
                <h2>Quotation</h2>
                <div className="quotation-number">
                    <p>Quotation Number:</p>
                    <QRCodeCanvas value={quotationNumber} />
                    <p>{quotationNumber}</p>
                </div>
                <div className="quotation-items">
                    {quotation.map((item, index) => (
                        <div key={index} className="quotation-item">
                            <span>{item.itemName}</span>
                            <span>Qty: {item.quantity}</span>
                            <span>Total: ${item.total}</span>
                        </div>
                    ))}
                </div>
                <button onClick={handleDeleteQuotation}>Delete Quotation</button>
                <button onClick={handleCustomerDetails}>Customer Details</button>
                <button onClick={handleFinalView}>View Final Quotation</button>
=======
            <div className="right-side">
                {showDetails ? (
                    <div>
                        <h3>Item Details</h3>
                        <p>Name: {showDetails.itemName}</p>
                        <p>Item Number: {showDetails.itemNumber}</p>
                        <p>Stock Available: {showDetails.stockAvailable}</p>
                        <p>Price: {showDetails.price}</p>
                        <p>Specification: {showDetails.specification}</p>
                        <div>
                            {showDetails.images.map((img, idx) => (
                                <img key={idx} src={`http://localhost:5000/api/assemble/image/${showDetails._id}`} alt="item" />
                            ))}
                        </div>
                        <button onClick={() => setShowDetails(null)}>Close Details</button>
                    </div>
                ) : (
                    <div>
                        <h2>Quotation</h2>
                        <p>Quotation No: <span style={{ color: 'grey' }}>{quotationNumber}</span></p>
                        <QRCodeCanvas value={quotationNumber} size={128} />
                    </div>
                )}
>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a
            </div>
        </div>
    );
};

export default Assemble;
