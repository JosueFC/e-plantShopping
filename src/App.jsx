import React, { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  // "Get Started" button: go to the product listing page
  const handleGetStartedClick = () => {
    setShowProductList(true);
    window.scrollTo(0, 0);
  };

  // Navbar "Home" link (passed down to ProductList): back to the landing page
  const handleHomeClick = () => {
    setShowProductList(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="landing-content">
            <h1 className="landing-title">Welcome to Paradise Nursery</h1>
            <AboutUs />
            <button className="get-started-btn" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={handleHomeClick} />
      )}
    </div>
  );
}

export default App;
