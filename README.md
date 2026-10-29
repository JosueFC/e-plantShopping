# Paradise Nursery

Paradise Nursery is a houseplant shopping app built with **React**, **Redux Toolkit** and plain **CSS** (Vite).

Visitors land on a welcome page with the company name and a short "About Us" paragraph, click **Get Started** to browse plants, add them to a shopping cart, and manage the cart (quantities, delete, totals).

## Features

- **Landing page** – background image, company name, About Us paragraph and a **Get Started** button.
- **Product listing** – 18 unique houseplants in 3 categories (Succulents, Ferns, Ficus), 6 per category, each with thumbnail, name and price.
- **Add to cart** – the button becomes disabled ("Added to Cart") once a plant is in the cart.
- **Navbar** – on the Plants and Cart pages, with links to Home, Plants and Cart. The cart icon shows the total number of items.
- **Shopping cart** – thumbnail, name, unit price, per-plant total, total plants and total cost; **+** / **−** quantity buttons (pressing **−** at quantity 1 removes the plant), **Delete** button, **Checkout** ("Coming Soon") and **Continue Shopping**.
- **Redux** – cart state lives in a Redux Toolkit slice (`CartSlice.jsx`) with `addItem`, `removeItem`, `increaseQuantity` and `decreaseQuantity` actions.

## Project structure

```
index.html
package.json
vite.config.js
src/
  main.jsx        # entry point, wraps <App /> in the Redux <Provider>
  App.jsx         # landing page + page switching
  AboutUs.jsx     # company description
  ProductList.jsx # product listing page + Navbar
  CartItem.jsx    # shopping cart page
  CartSlice.jsx   # Redux slice for the cart
  store.js        # Redux store
  App.css         # all styles, including the landing page background image
```

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build in /dist
npm run preview  # preview the production build
```

## Deployment

`vite.config.js` uses `base: './'`, so the contents of `dist/` can be hosted on GitHub Pages, Netlify or Vercel.

## Images

Some plant photos are hot-linked from Unsplash. If an image fails to load, the app shows a green leaf placeholder with the plant's name. To use your own photos, edit the `image` values in `src/ProductList.jsx`.
