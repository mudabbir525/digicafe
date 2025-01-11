import React from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  return (
    <button 
      onClick={() => window.scrollTo(0, 0)}
      className="fixed bottom-4 right-4 bg-red-400 p-2 rounded-full text-white hover:bg-red-500"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTop;