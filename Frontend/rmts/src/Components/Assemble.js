import React, { useState } from 'react';
import '../css/Assemble.css';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios'; // Import axios

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
    const [quotation, setQuotation] = useState([]);
    const [quotationNumber] = useState(`RMTS-${Math.floor(Math.random() * 100000)}`);

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
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Item saved to database:', response.data);
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

        const newItem = {
            ...formData,
            quantity: 1, // Default quantity to 1 for quotation
            total: formData.price,
        };

        const savedItem = await saveItemToDatabase(newItem); // Save item to the database
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
                    {items.map((item, index) => (
                        <div key={index} className="added-item">
                            <button onClick={() => handleAddToQuotation(item)}>
                                {item.itemName}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="right-side">
                <h2>Quotation</h2>
                <p>Quotation No: <span style={{color: 'grey'}}>{quotationNumber}</span></p>
                <QRCodeCanvas value={quotationNumber} size={128} />
                {quotation.length === 0 ? (
                    <p style={{color: 'grey'}}>No items added to quotation.</p>
                ) : (
                    <div>
                        {quotation.map((item, index) => (
                            <div key={index} className="quotation-item">
                                <p>{item.itemName} - {item.quantity} x {item.price} = {item.total}</p>
                            </div>
                        ))}
                        <p><strong>Total: {quotation.reduce((acc, item) => acc + item.total, 0)}</strong></p>
                    </div>
                )}
                <div className="quotation-buttons">
                    <button>Apply Discount</button>
                    <button>Delete Quotation</button>
                    <button>Customer Details</button>
                </div>
            </div>
        </div>
    );
};

export default Assemble;
