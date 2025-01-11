import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryMenu = ({ categories, cards, selectedCategory, onSelectCategory }) => {
  const [openedCategory, setOpenedCategory] = useState(null);

  const handleToggleCategory = (category) => {
    setOpenedCategory(prev => prev === category ? null : category);
    onSelectCategory(category);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="mb-8">
          <h1 className="text-2xl text-red-400 mb-2">GSR COUNTER</h1>
          <p className="text-gray-500">Menu list for world flavours</p>
        </div>
      {categories.map((category) => (
        <motion.div
          key={category}
          className="border rounded-lg shadow-sm overflow-hidden bg-white"
          initial={false}
        >
          <button
            onClick={() => handleToggleCategory(category)}
            className={`block w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${
              openedCategory === category ? 'bg-gray-50 text-red-400' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">{category}</span>
              <motion.div
                initial={false}
                animate={{ rotate: openedCategory === category ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {openedCategory === category && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.3, delay: 0.1 }
                  }
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2 }
                  }
                }}
                className="overflow-hidden border-t border-gray-100"
              >
                <motion.div
                  className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {cards[category]?.map((card, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { 
                          opacity: 0,
                          y: 20
                        },
                        visible: { 
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.3
                          }
                        }
                      }}
                    >
                      {card}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryMenu;