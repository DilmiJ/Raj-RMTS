import React, { useState } from 'react';
import '../css/Assemble.css';
import { v4 as uuidv4 } from 'uuid'; // For generating unique invoice numbers
import { QRCodeCanvas } from 'qrcode.react'; // Use QRCodeCanvas instead of QRCode

const Assemble = () => {
  const [quotationItems, setQuotationItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  // Generate unique invoice number
  const invoiceNumber = uuidv4().slice(0, 8); // Example invoice number (8 characters)

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
    setDiscount(0); // Reset discount as well
    setIsPasswordCorrect(false); // Reset password check
  };

  const handleApplyDiscount = () => {
    const enteredPassword = prompt('Enter the discount password:');
    if (enteredPassword === '12345') {
      setIsPasswordCorrect(true);
      const discountValue = prompt('Enter the discount percentage:');
      const discountPercentage = parseFloat(discountValue) || 0; // Ensure it's a number
      setDiscount(discountPercentage);

      // Update net amount after discount is applied
      const newNetAmount = totalAmount - (totalAmount * discountPercentage) / 100;
      setNetAmount(newNetAmount);
    } else {
      alert('Invalid password! Please try again.');
      setIsPasswordCorrect(false); // Reset if the password is incorrect
    }
  };

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(activeButton === buttonNumber ? null : buttonNumber);
  };

  // Sub-buttons for each of the main buttons (No1 to No5)
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

  return (
    <div className="assemble-container">
      <div className="content">
        {/* Button panel on the left side */}
        <div className="button-panel">
          <div className="button-group">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index + 1}>
                {/* Main buttons No1 to No5 with icons */}
                <button onClick={() => handleButtonClick(index + 1)}>
                  <i className="fas fa-plug"></i> No {index + 1}
                </button>
                {activeButton === index + 1 && (
                  <div className="sub-button-group">
                    {/* Sub-buttons for each main button with icons */}
                    {subButtons[index + 1].map((item, subIndex) => (
                      <button key={subIndex} onClick={() => handleAddItem(item)}>
                        <i className="fas fa-cog"></i> {item.name} - ${item.price}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quotation panel on the right side */}
        <div className="quotation-panel">
          <div className="quotation-header">
            <h3>Quotation</h3>
            <div className="invoice-number">Invoice: {invoiceNumber}</div>
          </div>
          <div className="invoice-section">
            {/* QR code displaying the invoice number */}
            <QRCodeCanvas value={invoiceNumber} size={64} className="qr-code" />
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
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleDecrementQuantity(index)}>-</button>
                    <button onClick={() => handleIncrementQuantity(index)}>+</button>
                    <button onClick={() => handleDeleteItem(index)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: ${totalAmount}</h3>
          {/* Show the discount amount below total if password is correct */}
          {isPasswordCorrect && <h3>Discount: {discount}%</h3>}
          <h3>Net Amount: ${netAmount}</h3>
          
          {/* Apply Discount and Delete buttons below Net Amount */}
          <div className="actions">
            <button onClick={handleApplyDiscount}>% Apply Discount</button>
            <button className="delete-button" onClick={handleDeleteQuotation}>
              🗑️ Delete All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assemble;
