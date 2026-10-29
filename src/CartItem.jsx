import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import { handleImageError } from './plantImages.js';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Total number of plants in the cart
  const calculateTotalQuantity = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total cost of everything in the cart
  const calculateTotalAmount = () =>
    cart.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  // Total cost for a single plant type (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // At quantity 1 the "-" button removes the plant from the cart
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <main className="cart-page cart-container">
      <h2 className="page-title">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is feeling a bit empty!</p>
          <button className="primary-btn get-started-button" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.name} className="cart-row cart-item">
                <img
                  className="cart-thumb cart-item-image"
                  src={item.image}
                  alt={item.name}
                  onError={(e) => handleImageError(e, item.name)}
                />

                <div className="cart-details cart-item-details">
                  <h4 className="cart-name cart-item-name">{item.name}</h4>
                  <p className="cart-unit-price cart-item-cost">${item.cost} each</p>
                </div>

                <div className="qty-controls cart-item-quantity">
                  <button
                    className="qty-btn cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    −
                  </button>
                  <span className="qty-value cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="qty-btn cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <div className="cart-line-total">
                  <span className="line-total cart-item-total">${calculateTotalCost(item)}</span>
                  <button
                    className="delete-btn cart-item-delete"
                    onClick={() => handleRemove(item)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Total Plants</span>
              <strong data-testid="total-plants">{calculateTotalQuantity()}</strong>
            </div>
            <div className="summary-row total">
              <span>Total Cart Amount</span>
              <strong className="total_cart_amount" data-testid="total-cost">
                ${calculateTotalAmount()}
              </strong>
            </div>
            <button className="primary-btn get-started-button1" onClick={handleCheckoutShopping}>
              Checkout
            </button>
            <button className="secondary-btn get-started-button" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartItem;
