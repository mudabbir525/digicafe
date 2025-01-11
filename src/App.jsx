import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import CategoryMenu from './components/CategoryMenu';
import MenuItemCard from './components/MenuItem';
import Checkout from './components/Checkout';
import ScrollToTop from './components/ScrollToTop';
import MainContent from './components/MainContent';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStall, setSelectedStall] = useState(null);
  const [isLoggedIn] = useState(true);

  const menuItems = {
    BREAKFAST: [
      { id: 1, name: "Pancakes", price: 199, quantity: "2 pieces", isVeg: true },
      { id: 2, name: "Eggs Benedict", price: 249, quantity: "1 serving", isVeg: false },
    ],
    LUNCH: [
      { id: 3, name: "Caesar Salad", price: 299, quantity: "1 bowl", isVeg: true },
      { id: 4, name: "Chicken Curry", price: 399, quantity: "1 plate", isVeg: false },
    ],
    DINNER: [
      { id: 5, name: "Pasta Alfredo", price: 349, quantity: "1 plate", isVeg: true },
      { id: 6, name: "Grilled Fish", price: 499, quantity: "200g", isVeg: false },
    ],
  };

  const categories = Object.keys(menuItems);

  const handleAddToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleStallSelect = (stall) => {
    setSelectedStall(stall);
  };

  const handleBackToStalls = () => {
    setSelectedStall(null);
    setSelectedCategory(null);
  };

  const categoryCards = {};
  categories.forEach(category => {
    categoryCards[category] = menuItems[category].map((item, index) => (
      <MenuItemCard
        key={item.id}
        {...item}
        onAddToCart={handleAddToCart}
        isLoggedIn={isLoggedIn}
        onNavigateToLogin={() => console.log('Navigate to login')}
      />
    ));
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItems={cartItems}
        onCartClick={() => setShowCheckout(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedStall ? (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MainContent onStallSelect={handleStallSelect} />
            </motion.div>
          ) : (
            <motion.div
              key="category-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={handleBackToStalls}
                className="mb-4 flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
              >
                ← Back to Stalls
              </button>
              <CategoryMenu
                categories={categories}
                cards={categoryCards}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {showCheckout && (
          <Checkout
            items={cartItems}
            onClose={() => setShowCheckout(false)}
            onClear={() => setCartItems([])}
          />
        )}
      </main>
      
      <ScrollToTop />
    </div>
  );
};

export default App;