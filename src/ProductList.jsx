import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Generates a simple leaf-on-green thumbnail. Used when a plant has no photo URL
// or when a photo fails to load, so a thumbnail is always visible.
export const makePlaceholder = (name = 'Plant', color = '#2f7a4f') => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>` +
    `<rect width='100%' height='100%' fill='${color}'/>` +
    `<text x='50%' y='48%' font-size='110' text-anchor='middle'>🌿</text>` +
    `<text x='50%' y='72%' font-size='30' fill='white' text-anchor='middle' font-family='sans-serif'>${name}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Swap a broken image for the placeholder (guarded so it can't loop).
export const handleImageError = (e, name) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = makePlaceholder(name);
};

const unsplash = (photoId) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=400&q=80`;

// ---------------------------------------------------------------------------
// Data: 3 categories x 6 plants.
// To use your own photos, replace any `image` value with a URL or a path such as
// '/images/aloe-vera.jpg' (files placed in /public/images).
// ---------------------------------------------------------------------------
export const plantsArray = [
  {
    category: 'Succulents',
    color: '#4f8f5b',
    plants: [
      { id: 1, name: 'Aloe Vera', price: 15, description: 'Healing and low maintenance.', image: unsplash('photo-1596547609652-9fc5d8d428ae') },
      { id: 2, name: 'Snake Plant', price: 20, description: 'Perfect for purifying indoor air.', image: unsplash('photo-1593482892290-f54927ae1ebb') },
      { id: 7, name: 'Jade Plant', price: 18, description: 'A symbol of good luck with thick, glossy leaves.' },
      { id: 8, name: 'Echeveria', price: 12, description: 'Rosette-shaped beauty in soft blue-green tones.' },
      { id: 9, name: 'Haworthia', price: 14, description: 'Compact, striped, and happy on a desk.' },
      { id: 10, name: "Burro's Tail", price: 19, description: 'Trailing stems that look great in hanging pots.' },
    ],
  },
  {
    category: 'Ferns',
    color: '#3f7f6b',
    plants: [
      { id: 3, name: 'Boston Fern', price: 18, description: 'Lush, feathery fronds for high humidity.', image: unsplash('photo-1614594975525-e45190c55d0b') },
      { id: 4, name: 'Maidenhair Fern', price: 22, description: 'Delicate foliage for bright, indirect light.', image: unsplash('photo-1632207691143-643e2a9a9361') },
      { id: 11, name: "Bird's Nest Fern", price: 24, description: 'Wavy, apple-green fronds that grow in a tidy rosette.' },
      { id: 12, name: 'Staghorn Fern', price: 32, description: 'A sculptural fern that can be mounted on a board.' },
      { id: 13, name: 'Button Fern', price: 16, description: 'Tough, compact fern with round, button-like leaflets.' },
      { id: 14, name: "Rabbit's Foot Fern", price: 26, description: 'Fuzzy rhizomes creep over the pot edge.' },
    ],
  },
  {
    category: 'Ficus',
    color: '#5a8a3c',
    plants: [
      { id: 5, name: 'Fiddle Leaf Fig', price: 35, description: 'A bold statement plant with large leaves.', image: unsplash('photo-1574911855683-162e24749f7f') },
      { id: 6, name: 'Rubber Plant', price: 25, description: 'Sturdy, glossy leaves and easy to care for.', image: unsplash('photo-1613739118925-cde1e8f5d65b') },
      { id: 15, name: 'Weeping Fig', price: 30, description: 'Graceful, arching branches with small shiny leaves.' },
      { id: 16, name: 'Ficus Audrey', price: 34, description: 'Velvety, broad leaves with pale veining.' },
      { id: 17, name: 'Creeping Fig', price: 13, description: 'A trailing vine that softens shelves and sills.' },
      { id: 18, name: 'Ficus Ginseng', price: 28, description: 'Bonsai-style trunk with a lush green canopy.' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Navbar (shown on the Plants page and the Cart page)
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

export function Navbar({ navigate }) {
  // Total number of items in the cart (sum of all quantities)
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <button className="nav-brand" onClick={() => navigate('landing')}>
        <LeafIcon />
        <span>Paradise Nursery</span>
      </button>
      <div className="nav-links">
        <button className="nav-link" onClick={() => navigate('landing')}>
          <HomeIcon />
          <span className="nav-label">Home</span>
        </button>
        <button className="nav-link" onClick={() => navigate('products')}>
          <LeafIcon />
          <span className="nav-label">Plants</span>
        </button>
        <button
          className="nav-link cart-link"
          onClick={() => navigate('cart')}
          aria-label={`Cart, ${cartCount} items`}
        >
          <CartIcon />
          <span className="nav-label">Cart</span>
          <span className="cart-badge" data-testid="cart-count">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Product listing page
// ---------------------------------------------------------------------------
function ProductList({ navigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const handleAddToCart = (plant, category, color) => {
    dispatch(
      addItem({
        id: plant.id,
        name: plant.name,
        price: plant.price,
        category,
        image: plant.image || makePlaceholder(plant.name, color),
      })
    );
  };

  return (
    <div className="page">
      <Navbar navigate={navigate} />

      <main className="product-page">
        <h2 className="page-title">Our Plant Collection</h2>

        {plantsArray.map(({ category, color, plants }) => (
          <section key={category} className="category-section">
            <h3 className="category-title">{category}</h3>
            <div className="product-grid">
              {plants.map((plant) => {
                const added = isInCart(plant.id);
                const src = plant.image || makePlaceholder(plant.name, color);
                return (
                  <div key={plant.id} className="product-card">
                    <img
                      className="product-image"
                      src={src}
                      alt={plant.name}
                      loading="lazy"
                      onError={(e) => handleImageError(e, plant.name)}
                    />
                    <div className="product-info">
                      <h4 className="product-name">{plant.name}</h4>
                      <p className="product-price">${plant.price}</p>
                      <p className="product-description">{plant.description}</p>
                      <button
                        className="add-btn"
                        onClick={() => handleAddToCart(plant, category, color)}
                        disabled={added}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
