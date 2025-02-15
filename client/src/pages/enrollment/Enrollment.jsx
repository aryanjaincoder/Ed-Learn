import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaGoogle, FaApple } from 'react-icons/fa';
import './enrollment.css';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setPaymentSuccess(true);
  };

  return (
    <div className="payment-page">
      <h1>Complete Your Payment</h1>
      <p>Select your preferred payment method to proceed.</p>

      <div className="payment-methods">
        <button
          className={`payment-method ${paymentMethod === 'creditCard' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('creditCard')}
        >
          <FaCreditCard /> Credit Card
        </button>
        <button
          className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('paypal')}
        >
          <FaPaypal /> PayPal
        </button>
        <button
          className={`payment-method ${paymentMethod === 'googlePay' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('googlePay')}
        >
          <FaGoogle /> Google Pay
        </button>
        <button
          className={`payment-method ${paymentMethod === 'applePay' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('applePay')}
        >
          <FaApple /> Apple Pay
        </button>
      </div>

      {paymentMethod === 'creditCard' && (
        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input type="text" id="expiryDate" placeholder="MM/YY" required />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" placeholder="123" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cardHolder">Card Holder Name</label>
            <input type="text" id="cardHolder" placeholder="John Doe" required />
          </div>
          <button type="submit" className="pay-button">
            Pay $12.99
          </button>
        </form>
      )}

      {paymentMethod === 'paypal' && (
        <div className="payment-info">
          <p>You will be redirected to PayPal to complete your payment.</p>
          <button className="pay-button" onClick={handlePaymentSubmit}>
            Proceed to PayPal
          </button>
        </div>
      )}

      {paymentMethod === 'googlePay' && (
        <div className="payment-info">
          <p>You will be redirected to Google Pay to complete your payment.</p>
          <button className="pay-button" onClick={handlePaymentSubmit}>
            Proceed to Google Pay
          </button>
        </div>
      )}

      {paymentMethod === 'applePay' && (
        <div className="payment-info">
          <p>You will be redirected to Apple Pay to complete your payment.</p>
          <button className="pay-button" onClick={handlePaymentSubmit}>
            Proceed to Apple Pay
          </button>
        </div>
      )}

      {paymentSuccess && (
        <div className="success-message">
          <span role="img" aria-label="success">🎉</span> Payment Successful! Redirecting...
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
