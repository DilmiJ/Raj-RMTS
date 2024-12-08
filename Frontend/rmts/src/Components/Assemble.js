import React, { useState, useEffect } from 'react';
import '../css/Assemble.css';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Assemble = () => {
    const [discount, setDiscount] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState(0);


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
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [quotationNumber] = useState(`RMTS-${Math.floor(Math.random() * 100000)}`);
    

    const [quotation, setQuotation] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/assemble');
                setItems(response.data);
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
        const newItem = { ...formData, quantity: 1, total: formData.price };
        const savedItem = await saveItemToDatabase(newItem);
        if (savedItem) {
            setItems((prev) => [...prev, savedItem]);
            resetForm();
        }
    };

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
        setIsEditing(false);
        setSelectedItemId(null);
        setShowDetails(null);
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

    const handleDeleteQuotationItem = (itemNumber) => {
        setQuotation((prev) => prev.filter((item) => item.itemNumber !== itemNumber));
    };

    const handleDeleteQuotation = () => {
        setQuotation([]);
    };

    const handleCustomerDetails = () => {
        navigate('/customer-details');
    };

    const handleFinalView = () => {
        navigate('/monitor-view');
    };

    const handleSaveQuotation = async () => {
        const quotationData = {
            quotationNumber,
            items: quotation,
        };
    
        try {
            const response = await axios.post('http://localhost:5000/api/quotations/save', quotationData);
            if (response.status === 200) {
                alert('Quotation saved successfully!');
            }
        } catch (error) {
            console.error('Error saving quotation:', error.response?.data || error.message);
            alert('Error saving quotation');
        }
    };
    
    

    return (
        <div className="assemble-container">
            <div className="left-side">
                <h2>{isEditing ? "Update Item" : "Add Custom Item"}</h2>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Close Form" : "Add Item"}
                </button>
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
                        <button
                            type="button"
                            onClick={isEditing ? handleUpdateItem : handleAddItem}
                        >
                            {isEditing ? "Update Item" : "Add Item"}
                        </button>
                        <button type="button" onClick={resetForm}>Cancel</button>
                    </form>
                )}
                <div className="added-items">
                    {items.map((item) => (
                        <div key={item._id} className="added-item">
                            <img src={`http://localhost:5000/api/assemble/image/${item._id}`} alt="item" className="item-image" />
                            <p>{item.itemName}</p>
                            <button onClick={() => handleViewItem(item)}>View</button>
                            <button onClick={() => handleEditItem(item)}>Edit</button>
                            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                            <button onClick={() => handleAddToQuotation(item)}>+</button>
                        </div>
                    ))}
                </div>
                {showDetails && (
                    <div className="item-details">
                        <h3>Item Details</h3>
                        <p>Name: {showDetails.itemName}</p>
                        <p>Item Number: {showDetails.itemNumber}</p>
                        <p>Stock Available: {showDetails.stockAvailable}</p>
                        <p>Price: {showDetails.price}</p>
                        <p>Specification: {showDetails.specification}</p>
                        <img src={`http://localhost:5000/api/assemble/image/${showDetails._id}`} alt="item" className="item-image" />
                    </div>
                )}
            </div>

            <div className="right-side">
    <div className="quotation">
        <h3>Quotation - {quotationNumber}</h3>

        {/* QR Code Section */}
        <div className="qr-code-section">
            <h4>QR Code</h4>
            <QRCodeCanvas
                value={JSON.stringify({
                    quotationNumber,
                    items: quotation.map(({ itemName, quantity, total }) => ({ itemName, quantity, total })),
                })}
                size={128} // QR code size
                bgColor={"#ffffff"} // Background color
                fgColor={"#000000"} // Foreground color
                level={"H"} // Error correction level
            />
        </div>

        <div className="quotation-table">
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {quotation.map((item) => (
                        <tr key={item.itemNumber}>
                            <td>{item.itemName}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.total}</td>
                            <td>
                                <button onClick={() => handleDeleteQuotationItem(item.itemNumber)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Summary Section */}
        <div className="quotation-summary">
            <h4>Total Amount: LKR {quotation.reduce((sum, item) => sum + item.total, 0)}</h4>
            <div className="discount-section">
                <label htmlFor="discount">Discount (%):</label>
                <input
                    type="number"
                    id="discount"
                    placeholder="Enter discount percentage"
                    onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                    value={discountPercentage}
                />
            </div>
            <h4>Net Amount: LKR {(quotation.reduce((sum, item) => sum + item.total, 0) * (1 - discountPercentage / 100)).toFixed(2)}</h4>
        </div>

        {/* Quotation Footer */}
        <div className="quotation-footer">
            <button onClick={handleDeleteQuotation}>Clear</button>
            <button onClick={handleSaveQuotation}>Save Quotation</button>
            <button onClick={handleCustomerDetails}>Proceed to Customer</button>
            <button onClick={handleFinalView}>Final View</button>
        </div>
    </div>
</div>



        </div>
    );
};

export default Assemble;