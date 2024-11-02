import React, { useState, useRef } from 'react';
import '../css/Assemble.css';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const Assemble = () => {
  const [quotationItems, setQuotationItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    itemNumber: '',
    stockAvailable: '',
    specification: '',
    quantity: 1,
    images: [],
  });

  const navigate = useNavigate(); // Use navigate to redirect to different routes
  const invoiceNumberRef = useRef(uuidv4().slice(0, 8));

  const handleAddItem = (item) => {
    const newItems = [...quotationItems, item];
    setQuotationItems(newItems);
    updateTotalAmount(newItems); // Update total amount after adding item
  };

  const handleDeleteQuotation = () => {
    setQuotationItems([]);
    setTotalAmount(0);
    setNetAmount(0);
    setDiscount(0);
    setIsPasswordCorrect(false);
  };

  const handleApplyDiscount = () => {
    const enteredPassword = prompt('Enter the discount password:');
    if (enteredPassword === '12345') {
      setIsPasswordCorrect(true);
      const discountValue = prompt('Enter the discount percentage:');
      const discountPercentage = parseFloat(discountValue) || 0;
      setDiscount(discountPercentage);
      const newNetAmount = totalAmount - (totalAmount * discountPercentage) / 100;
      setNetAmount(newNetAmount);
    } else {
      alert('Invalid password! Please try again.');
      setIsPasswordCorrect(false);
    }
  };

  const handleIncrementQuantity = (index) => {
    const newItems = [...quotationItems];
    newItems[index].quantity += 1;
    setQuotationItems(newItems);
    updateTotalAmount(newItems);
  };

  const handleDecrementQuantity = (index) => {
    const newItems = [...quotationItems];
    if (newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
      setQuotationItems(newItems);
      updateTotalAmount(newItems);
    }
  };

  const handleDeleteItem = (index) => {
    const newItems = quotationItems.filter((_, i) => i !== index);
    setQuotationItems(newItems);
    updateTotalAmount(newItems);
  };

  const updateTotalAmount = (items) => {
    const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(newTotal);
    setNetAmount(newTotal - (newTotal * discount) / 100);
  };

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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Custom Item Creation
    const customItem = {
      name: formData.itemName,
      price: 0, // Default price (you can modify this later based on your logic)
      quantity: formData.quantity,
      specifications: formData.specification,
      stockAvailable: formData.stockAvailable,
      images: formData.images,
    };
    handleAddItem(customItem);

    // Reset form and hide custom form
    setFormData({
      itemName: '',
      itemNumber: '',
      stockAvailable: '',
      specification: '',
      quantity: 1,
      images: [],
    });
    setShowCustomForm(false);
  };

  const generateQRCodeValue = () => {
    const data = {
      invoiceNumber: invoiceNumberRef.current,
      items: quotationItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
      totalAmount,
      discount,
      netAmount,
    };

    return JSON.stringify(data);
  };

  const navigateToCustomerDetails = () => {
    navigate('/customer-details'); // Redirect to CustomerDetails page
  };

  return (
    <div className="assemble-container">
      <div className="content">
        <div className="button-panel">
          <div className="button-group">
            <button onClick={() => setShowCustomForm(true)}>
              <i className="fas fa-plus"></i> Add Custom Item
            </button>
          </div>
        </div>

        <div className="quotation-panel">
          <h3>Quotation No: {invoiceNumberRef.current}</h3>
          <QRCodeCanvas value={generateQRCodeValue()} size={128} />

          <table className="quotation-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotationItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => handleDecrementQuantity(index)}>-</button>
                    {item.quantity}
                    <button onClick={() => handleIncrementQuantity(index)}>+</button>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleDeleteItem(index)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="totals-section">
            <p>Total: ${totalAmount.toFixed(2)}</p>
            <p>Discount: {discount}%</p>
            <p>Net Amount: ${netAmount.toFixed(2)}</p>
          </div>

          <div className="quotation-actions">
            <button onClick={handleApplyDiscount}>Apply Discount</button>
            <button onClick={handleDeleteQuotation}>Delete Quotation</button>
            <button onClick={navigateToCustomerDetails}>Customer Details</button>
          </div>
        </div>

        {showCustomForm && (
          <div className="custom-item-modal">
            <div className="custom-item-form">
              <h4>Add Custom Item</h4>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Item Name:
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <label>
                  Item Number:
                  <input
                    type="text"
                    name="itemNumber"
                    value={formData.itemNumber}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <label>
                  Stock Available:
                  <input
                    type="number"
                    name="stockAvailable"
                    value={formData.stockAvailable}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <label>
                  Specification:
                  <textarea
                    name="specification"
                    value={formData.specification}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleFormChange}
                    min="1"
                    required
                  />
                </label>
                <label>
                  Images:
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    multiple
                    required
                  />
                </label>
                <button type="submit">Add Item</button>
                <button type="button" onClick={() => setShowCustomForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assemble;
