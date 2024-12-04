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
        const validImages = files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg');
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
                    item.images.forEach(image => formDataToSend.append('images', image));
                }
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

    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/assemble/${id}`);
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item');
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
    };

    return (
        <div className="assemble-container">
            <div className="left-side">
                <h2>Add Custom Item</h2>
                <button onClick={() => setShowForm(!showForm)}>Add Item</button>
                {showForm && (
                    <form className="custom-item-form">
                        <input type="text" name="itemName" value={formData.itemName} onChange={handleFormChange} placeholder="Item Name" required />
                        <input type="text" name="itemNumber" value={formData.itemNumber} onChange={handleFormChange} placeholder="Item Number" required />
                        <input type="text" name="stockAvailable" value={formData.stockAvailable} onChange={handleFormChange} placeholder="Stock Available" required />
                        <input type="number" name="price" value={formData.price} onChange={handleFormChange} placeholder="Price per Unit" required />
                        <input type="text" name="specification" value={formData.specification} onChange={handleFormChange} placeholder="Specification" required />
                        <input type="file" accept="image/png, image/jpeg" multiple onChange={handleImageChange} />
                        <button type="button" onClick={handleAddItem}>Add Item</button>
                        <button type="button" onClick={resetForm}>Cancel</button>
                    </form>
                )}
                <div className="added-items">
                    {items.map((item) => (
                        <div key={item._id} className="added-item">
                            <img src={item.images[0] ? `uploads/${item.images[0]}` : '/placeholder.png'} alt={item.itemName} className="item-image" />
                            <button onClick={() => handleAddToQuotation(item)}>{item.itemName}</button>
                            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
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
            </div>
        </div>
    );
};

export default Assemble;
