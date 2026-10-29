import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity } from './CartSlice.jsx';
import { Navbar, handleImageError } from './ProductList.jsx';

function CartItem({ navigate }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [showCheckout, setShowCheckout] = useState(false);

  // Totals derived from the Redux store
  const totalPlants = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="page">
      <Navbar navigate={navigate} />

      <main className="cart-page">
        <h2 className="page-title">Your Shopping Cart</h2>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is feeling a bit empty!</p>
            <button className="primary-btn" onClick={() => navigate('products')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {items.map((item) => (
                <div key={item.id} className="cart-row">
                  <img
                    className="cart-thumb"
                    src={item.image}
                    alt={item.name}
                    onError={(e) => handleImageError(e, item.name)}
                  />

                  <div className="cart-details">
                    <h4 className="cart-name">{item.name}</h4>
                    <p className="cart-unit-price">${item.price} each</p>
                  </div>

                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-line-total">
                    <span className="line-total">${item.price * item.quantity}</span>
                    <button
                      className="delete-btn"
                      onClick={() => dispatch(removeItem(item.id))}
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
                <strong data-testid="total-plants">{totalPlants}</strong>
              </div>
              <div className="summary-row total">
                <span>Total Cost</span>
                <strong data-testid="total-cost">${totalCost}</strong>
              </div>
              <button className="primary-btn" onClick={() => setShowCheckout(true)}>
                Checkout
              </button>
              <button className="secondary-btn" onClick={() => navigate('products')}>
                Continue Shopping
              </button>
            </aside>
          </div>
        )}
      </main>

      {showCheckout && (
        <div className="modal-backdrop" onClick={() => setShowCheckout(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="checkout-title">Checkout</h3>
            <p>Coming Soon! Thank you for shopping with Paradise Nursery.</p>
            <button className="primary-btn" onClick={() => setShowCheckout(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
