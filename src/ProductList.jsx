import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import { makePlaceholder, handleImageError } from './plantImages.js';

const unsplash = (photoId) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=400&q=80`;

// ---------------------------------------------------------------------------
// Data: 3 categories x 6 plants.
// To use your own photos, replace any `image` value with a URL or a path such as
// '/images/aloe-vera.jpg' (files placed in /public/images).
// ---------------------------------------------------------------------------
const plantsArray = [
  {
    category: 'Succulents',
    color: '#4f8f5b',
    plants: [
      { name: 'Aloe Vera', cost: 15, description: 'Healing and low maintenance.', image: unsplash('photo-1596547609652-9fc5d8d428ae') },
      { name: 'Snake Plant', cost: 20, description: 'Perfect for purifying indoor air.', image: unsplash('photo-1593482892290-f54927ae1ebb') },
      { name: 'Jade Plant', cost: 18, description: 'A symbol of good luck with thick, glossy leaves.' },
      { name: 'Echeveria', cost: 12, description: 'Rosette-shaped beauty in soft blue-green tones.' },
      { name: 'Haworthia', cost: 14, description: 'Compact, striped, and happy on a desk.' },
      { name: "Burro's Tail", cost: 19, description: 'Trailing stems that look great in hanging pots.' },
    ],
  },
  {
    category: 'Ferns',
    color: '#3f7f6b',
    plants: [
      { name: 'Boston Fern', cost: 18, description: 'Lush, feathery fronds for high humidity.', image: unsplash('photo-1614594975525-e45190c55d0b') },
      { name: 'Maidenhair Fern', cost: 22, description: 'Delicate foliage for bright, indirect light.', image: unsplash('photo-1632207691143-643e2a9a9361') },
      { name: "Bird's Nest Fern", cost: 24, description: 'Wavy, apple-green fronds that grow in a tidy rosette.' },
      { name: 'Staghorn Fern', cost: 32, description: 'A sculptural fern that can be mounted on a board.' },
      { name: 'Button Fern', cost: 16, description: 'Tough, compact fern with round, button-like leaflets.' },
      { name: "Rabbit's Foot Fern", cost: 26, description: 'Fuzzy rhizomes creep over the pot edge.' },
    ],
  },
  {
    category: 'Ficus',
    color: '#5a8a3c',
    plants: [
      { name: 'Fiddle Leaf Fig', cost: 35, description: 'A bold statement plant with large leaves.', image: unsplash('photo-1574911855683-162e24749f7f') },
      { name: 'Rubber Plant', cost: 25, description: 'Sturdy, glossy leaves and easy to care for.', image: unsplash('photo-1613739118925-cde1e8f5d65b') },
      { name: 'Weeping Fig', cost: 30, description: 'Graceful, arching branches with small shiny leaves.' },
      { name: 'Ficus Audrey', cost: 34, description: 'Velvety, broad leaves with pale veining.' },
      { name: 'Creeping Fig', cost: 13, description: 'A trailing vine that softens shelves and sills.' },
      { name: 'Ficus Ginseng', cost: 28, description: 'Bonsai-style trunk with a lush green canopy.' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z" />
    <path d="M2 21c0-3 1.9-5.6 5-7" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.5L21.5 8H6" />
  </svg>
);

// ---------------------------------------------------------------------------
// Product listing page. The navbar lives here and is shown on both the plant
// listing and the shopping cart (the cart is rendered inside this component).
// ---------------------------------------------------------------------------
function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // addedToCart[plant.name] is true when that plant is already in the cart.
  // Derived from the Redux store so the buttons stay disabled after navigating away and back.
  const addedToCart = cartItems.reduce((acc, item) => {
    acc[item.name] = true;
    return acc;
  }, {});

  // Total number of items in the cart (sum of all quantities)
  const calculateTotalQuantity = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant, category, color) => {
    dispatch(
      addItem({
        name: plant.name,
        cost: plant.cost,
        category,
        image: plant.image || makePlaceholder(plant.name, color),
      })
    );
  };

  // Navbar "Home": back to the landing page (handled in App)
  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  // Navbar "Plants": show the plant listing
  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
    window.scrollTo(0, 0);
  };

  // Navbar cart icon: show the shopping cart
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
    window.scrollTo(0, 0);
  };

  // Cart "Continue Shopping": back to the plant listing
  const handleContinueShopping = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setShowCart(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="page">
      <nav className="navbar">
        <button className="nav-brand" onClick={(e) => handleHomeClick(e)}>
          <LeafIcon />
          <span>Paradise Nursery</span>
        </button>
        <div className="nav-links">
          <button className="nav-link" onClick={(e) => handleHomeClick(e)}>
            <HomeIcon />
            <span className="nav-label">Home</span>
          </button>
          <button className="nav-link" onClick={(e) => handlePlantsClick(e)}>
            <LeafIcon />
            <span className="nav-label">Plants</span>
          </button>
          <button
            className="nav-link cart-link"
            onClick={(e) => handleCartClick(e)}
            aria-label={`Cart, ${calculateTotalQuantity()} items`}
          >
            <CartIcon />
            <span className="nav-label">Cart</span>
            <span className="cart-badge cart_quantity_count" data-testid="cart-count">{calculateTotalQuantity()}</span>
          </button>
        </div>
      </nav>

      {!showCart ? (
        <main className="product-page">
          <h2 className="page-title">Our Plant Collection</h2>

          {plantsArray.map(({ category, color, plants }) => (
            <section key={category} className="category-section">
              <h3 className="category-title">{category}</h3>
              <div className="product-list product-grid">
                {plants.map((plant) => (
                  <div key={plant.name} className="product-card">
                    <img
                      className="product-image"
                      src={plant.image || makePlaceholder(plant.name, color)}
                      alt={plant.name}
                      loading="lazy"
                      onError={(e) => handleImageError(e, plant.name)}
                    />
                    <div className="product-info">
                      <h4 className="product-name">{plant.name}</h4>
                      <p className="product-price">${plant.cost}</p>
                      <p className="product-description">{plant.description}</p>
                      <button
                        className="add-btn"
                        onClick={() => handleAddToCart(plant, category, color)}
                        disabled={addedToCart[plant.name]}
                      >
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
