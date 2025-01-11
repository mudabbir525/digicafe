import React, { useState } from 'react';
import { X, Plus, Minus, Loader } from 'lucide-react';

const Checkout = ({
  items,
  onClose,
  onClear,
  isLoggedIn = false,
  onUpdateQuantity,
  onNavigateToLogin
}) => {
  const [showPaymentLoader, setShowPaymentLoader] = useState(false);

  const handlePayment = () => {
    if (!isLoggedIn) {
      onNavigateToLogin?.();
      return;
    }
    setShowPaymentLoader(true);
    setTimeout(() => {
      setShowPaymentLoader(false);
      onClear?.();
    }, 3000);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityUpdate = (itemId, newQuantity) => {
    // If new quantity is 0, remove the item
    if (newQuantity === 0) {
      onUpdateQuantity?.(itemId, 0);
      return;
    }
  
    // Update the quantity for the specific item
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    onUpdateQuantity?.(itemId, updatedItems);
  };
  

  if (showPaymentLoader) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-red-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700">Processing Payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-auto z-40">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 hover:text-red-400" />
          </button>
          <h2 className="text-xl font-bold ml-2">Checkout</h2>
        </div>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="text-red-400 hover:text-red-500 transition-colors text-sm"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.itemQuantity}</p>
                  </div>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">₹{item.price} × {item.quantity}</span>
                  <div className="flex items-center border rounded-lg bg-white">
                    <button
                      className="p-1 hover:bg-gray-50 text-red-400 rounded-l-lg"
                      onClick={() => handleQuantityUpdate(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-1 min-w-[2.5rem] text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="p-1 hover:bg-gray-50 text-red-400 rounded-r-lg"
                      onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Bill Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>To Pay</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-red-400 text-white py-3 rounded-lg mt-6 hover:bg-red-500 transition-colors font-medium"
            >
              {isLoggedIn ? `Pay ₹${calculateTotal()}` : 'Login to Continue'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;