import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Karuzela = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    // Function to show the next image
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    // Function to show the previous image
    const prevImage = () => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    };
  
    return (
      <div className="relative w-full h-full">
        {/* Image */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={`https://localhost:7093/Zdjecia/${images[currentImageIndex]}`}
            alt={`Image ${currentImageIndex + 1}`}
            className="w-full h-64 object-cover"
          />
        </div>
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full border-white border-2 hover:bg-opacity-75"
        >
          &#8592;
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full border-white border-2 hover:bg-opacity-75"
        >
          &#8594;
        </button>
      </div>
    );
};
export default Karuzela