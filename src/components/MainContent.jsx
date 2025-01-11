import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const MainContent = ({ onStallSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('HITEC City');

  // Example stalls data
  const stalls = [
    {
      id: 1,
      name: "Bharat Financial Inclusion Limited",
      description: "is a leading player in the financial services industry offering asset and liability product solutions from IndusInd Bank.",
      image: "https://bfsi.eletsonline.com/wp-content/uploads/2021/03/Bharat-Financial-Inclusion-Ltd.jpg"
    },
    // {
    //   id: 2,
    //   name: "Global Cuisine Restaurant",
    //   description: "Experience authentic international dishes prepared by expert chefs using premium ingredients.",
    //   image: "/api/placeholder/400/300"
    // },
    // Add more stalls as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-red-500 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Stalls with online food delivery
      </motion.h1>
      <motion.p 
        className="text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Our platform allows you to experience global flavours without leaving your current location.
      </motion.p>

      {/* <motion.div 
        className="flex flex-col md:flex-row gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <button className="w-full md:w-48 px-12 py-3 text-left border rounded-lg bg-white hover:bg-gray-50 transition-colors">
            {selectedLocation}
          </button>
        </div>
        
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for stalls"
            className="w-full px-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div> */}

      <motion.button 
        className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Filter className="h-5 w-5" />
        Filter Vendors
      </motion.button>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {stalls.map((stall) => (
          <motion.div
            key={stall.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => onStallSelect(stall)}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={stall.image}
              alt={stall.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {stall.name}
              </h3>
              <p className="text-gray-600">
                {stall.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MainContent;