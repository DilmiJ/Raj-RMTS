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
  const [activeButton, setActiveButton] = useState(null);
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

  const navigate = useNavigate();
  const invoiceNumberRef = useRef(uuidv4().slice(0, 8));

  const handleAddItem = (item) => {
    const newItems = [...quotationItems, item];
    setQuotationItems(newItems);
    const newTotal = totalAmount + item.price * item.quantity;
    setTotalAmount(newTotal);
    setNetAmount(newTotal - (newTotal * discount) / 100);
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

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(activeButton === buttonNumber ? null : buttonNumber);
  };

  const subButtons = {
    1: [
      { name: 'Item 1.1', price: 50, quantity: 1 },
      { name: 'Item 1.2', price: 75, quantity: 1 },
      { name: 'Item 1.3', price: 100, quantity: 1 },
    ],
    2: [
      { name: 'Item 2.1', price: 60, quantity: 1 },
      { name: 'Item 2.2', price: 80, quantity: 1 },
      { name: 'Item 2.3', price: 110, quantity: 1 },
    ],
    3: [
      { name: 'Item 3.1', price: 70, quantity: 1 },
      { name: 'Item 3.2', price: 90, quantity: 1 },
      { name: 'Item 3.3', price: 120, quantity: 1 },
    ],
    4: [
      { name: 'Item 4.1', price: 65, quantity: 1 },
      { name: 'Item 4.2', price: 85, quantity: 1 },
      { name: 'Item 4.3', price: 130, quantity: 1 },
    ],
    5: [
      { name: 'Item 5.1', price: 55, quantity: 1 },
      { name: 'Item 5.2', price: 95, quantity: 1 },
      { name: 'Item 5.3', price: 125, quantity: 1 },
    ],
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

    // Validation for required fields
    if (!formData.itemName || !formData.itemNumber || !formData.stockAvailable || !formData.specification || formData.images.length === 0) {
      alert('Please fill in all fields and upload at least one image.');
      return;
    }

    const customItem = {
      name: formData.itemName,
      price: 0, // Set default price for custom item
      quantity: formData.quantity,
      specifications: formData.specification,
      stockAvailable: formData.stockAvailable,
      images: formData.images,
    };
    handleAddItem(customItem);

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

  return (
    <div className="assemble-container">
      <div className="content">
        <div className="button-panel">
          <div className="button-group">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index + 1}>
                <button onClick={() => handleButtonClick(index + 1)}>
                  <i className="fas fa-plug"></i> No {index + 1}
                </button>
                {activeButton === index + 1 && (
                  <div className="sub-button-group">
                    {subButtons[index + 1] && subButtons[index + 1].map((item, subIndex) => (
                      <button key={subIndex} onClick={() => handleAddItem(item)}>
                        <i className="fas fa-cog"></i> {item.name} - ${item.price}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div>
              <button onClick={() => setShowCustomForm(true)}>
                <i className="fas fa-plus"></i> +
              </button>
            </div>
          </div>
        </div>

        <div className="quotation-panel">
          <div className="quotation-header">
            <h3>Quotation</h3>
            <div className="invoice-number">Invoice: {invoiceNumberRef.current}</div>
          </div>
          <div className="invoice-section">
            <QRCodeCanvas value={generateQRCodeValue()} size={128} className="qr-code" />
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotationItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrementQuantity(index)}>-</button>
                      {item.quantity}
                      <button onClick={() => handleIncrementQuantity(index)}>+</button>
                    </div>
                  </td>
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
          <div className="totals">
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            {isPasswordCorrect && (
              <div>
                <p>Discount: {discount}%</p>
                <p>Net Amount: ${netAmount.toFixed(2)}</p>
              </div>
            )}
          </div>
          <div className="quotation-actions">
            <button onClick={handleApplyDiscount}>
              Apply Discount
            </button>
            <button onClick={handleDeleteQuotation}>
              Clear Quotation
            </button>
          </div>
        </div>

        {showCustomForm && (
          <div className="custom-form">
            <h3>Add Custom Item</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Item Name:
                <input type="text" name="itemName" value={formData.itemName} onChange={handleFormChange} required />
              </label>
              <label>
                Item Number:
                <input type="text" name="itemNumber" value={formData.itemNumber} onChange={handleFormChange} required />
              </label>
              <label>
                Stock Available:
                <input type="number" name="stockAvailable" value={formData.stockAvailable} onChange={handleFormChange} required />
              </label>
              <label>
                Specifications:
                <textarea name="specification" value={formData.specification} onChange={handleFormChange} required />
              </label>
              <label>
                Quantity:
                <input type="number" name="quantity" value={formData.quantity} onChange={handleFormChange} min="1" required />
              </label>
              <label>
                Images:
                <input type="file" multiple accept="image/png, image/jpeg" onChange={handleImageChange} required />
              </label>
              <button type="submit">Add Item</button>
              <button type="button" onClick={() => setShowCustomForm(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assemble;
