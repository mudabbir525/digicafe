import React, { useState } from 'react';
import { ShoppingCart,Search, MapPin, ChevronDown, Building2, Home, User } from 'lucide-react';

const Header = ({ cartItems = [], onCartClick, activePage = 'home' }) => {
  const [selectedLocation, setSelectedLocation] = useState('HITEC City');
  const [showLocations, setShowLocations] = useState(false);

  const locations = [
    { name: 'HITEC City', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Banjara Hills', icon: <Building2 className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-white shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold">DIGI CAFE</div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowLocations(!showLocations)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{selectedLocation}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showLocations && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    {locations.map((location) => (
                      <button
                        key={location.name}
                        className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setSelectedLocation(location.name);
                          setShowLocations(false);
                        }}
                      >
                        {location.icon}
                        <span>{location.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for stalls..."
                  className="pl-10 pr-4 py-2 border rounded-md w-72 focus:outline-none focus:ring-2 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <button 
                onClick={onCartClick}
                className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <button className="text-blue-600">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="bg-white shadow-sm md:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold">DIGI CAFE</div>
          <button 
            onClick={() => setShowLocations(!showLocations)}
            className="flex items-center space-x-1"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{selectedLocation}</span>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
        <div className="flex items-center justify-around py-3">
          <button className={`flex flex-col items-center px-6 py-2 rounded-lg ${
            activePage === 'home' ? 'bg-orange-500' : ''
          }`}>
            <Home className={`w-6 h-6 ${
              activePage === 'home' ? 'text-white' : ''
            }`} />
            <span className={`text-xs mt-1 ${
              activePage === 'home' ? 'text-white' : ''
            }`}>Home</span>
          </button>

          <button onClick={onCartClick} className="flex flex-col items-center relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
            <span className="text-xs mt-1">Cart</span>
          </button>

          <button className="flex flex-col items-center">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;