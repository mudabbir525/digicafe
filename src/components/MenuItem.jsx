import React, { useState } from 'react';
import { Plus, Minus, Loader } from 'lucide-react';

const MenuItemCard = ({
  id,
  name,
  price,
  quantity,
  image,
  isVeg = true,
  onAddToCart,
//   isLoggedIn,
//   onNavigateToLogin
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [itemCount, setItemCount] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    // if (!isLoggedIn) {
    //   onNavigateToLogin?.();
    //   return;
    // }
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
      setIsInCart(true);
      onAddToCart?.({
        id,
        name,
        price,
        quantity: 1,
        itemQuantity: quantity,
        type: 'ADD'
      });
    // }, 3000);
  };

  const handleIncrement = () => {
    const newCount = itemCount + 1;
    setItemCount(newCount);
    onAddToCart?.({
      id,
      name,
      price,
      quantity: newCount,
      itemQuantity: quantity,
      type: 'UPDATE'
    });
  };

  const handleDecrement = () => {
    if (itemCount > 1) {
      const newCount = itemCount - 1;
      setItemCount(newCount);
      onAddToCart?.({
        id,
        name,
        price,
        quantity: newCount,
        itemQuantity: quantity,
        type: 'UPDATE'
      });
    }
  };

//   if (isLoading) {
//     return (
//       <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="w-8 h-8 animate-spin text-red-400 mx-auto mb-2" />
//           <p className="text-gray-600">Adding to Cart...</p>
//         </div>
//       </div>
//     );
//   }


  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <span
            className={`px-3 py-1 text-sm font-medium text-white rounded-md ${
              isVeg ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>
        <div className="w-full h-56">
          <img
            src={image || "/api/placeholder/400/320"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              We Serve Quantity of: <span className="font-medium">{quantity}</span>
            </p>
          </div>
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-start">
              <span className="bg-white pr-3 text-sm text-gray-500">Price</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-green-500">₹{price}</span>
            {!isInCart ? (
              <button
                onClick={handleAddToCart}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Add to cart
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">
                  {itemCount}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;