import React, { useState } from 'react';

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '/banner1.png',
    '/aire.png',
    '/pc.jpg',
    '/electronics.png',
    // Agrega aquí tus imágenes con sus nombres de archivo
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  return (
    <main className='bg-[white] w-full h-[80vh]'>
      <div className="relative w-full h-[60vh] bg-[#e6e6e6]">
        <img
          src={images[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-[60vh] object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center py-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 mx-2 rounded-full transition duration-300 ${
                index === currentSlide ? 'bg-gray-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
