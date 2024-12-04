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
    const [quotation, setQuotation] = useState([]);
    const [quotationNumber] = useState(`RMTS-${Math.floor(Math.random() * 100000)}`);
<<<<<<< HEAD
=======
    

    const [quotation, setQuotation] = useState([]);
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
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
<<<<<<< HEAD
=======

>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
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
<<<<<<< HEAD
=======
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
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
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

<<<<<<< HEAD
=======
    const handleDeleteQuotationItem = (itemNumber) => {
        setQuotation((prev) => prev.filter((item) => item.itemNumber !== itemNumber));
    };

>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
    const handleDeleteQuotation = () => {
        setQuotation([]);
    };

    const handleCustomerDetails = () => {
        navigate('/customer-details');
    };

    const handleFinalView = () => {
<<<<<<< HEAD
        navigate('/final-view');
    };

=======
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
    
    

>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
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
<<<<<<< HEAD
                            <img src={item.images[0] ? `uploads/${item.images[0]}` : '/placeholder.png'} alt={item.itemName} className="item-image" />
                            <button onClick={() => handleAddToQuotation(item)}>{item.itemName}</button>
=======
                            <img src={`http://localhost:5000/api/assemble/image/${item._id}`} alt="item" className="item-image" />
                            <p>{item.itemName}</p>
                            <button onClick={() => handleViewItem(item)}>View</button>
                            <button onClick={() => handleEditItem(item)}>Edit</button>
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
                            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                            <button onClick={() => handleAddToQuotation(item)}>+</button>
                        </div>
                    ))}
                </div>
<<<<<<< HEAD
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
=======
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
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
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