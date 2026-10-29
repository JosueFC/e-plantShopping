import React, { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function App() {
  // 'landing' | 'products' | 'cart'
  const [page, setPage] = useState('landing');

  const navigate = (next) => {
    setPage(next);
    window.scrollTo(0, 0);
  };

  if (page === 'products') return <ProductList navigate={navigate} />;
  if (page === 'cart') return <CartItem navigate={navigate} />;

  // Landing page
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Paradise Nursery</h1>
        <AboutUs />
        <button className="get-started-btn" onClick={() => navigate('products')}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
