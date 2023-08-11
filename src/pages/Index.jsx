import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsActions from '../redux/actions/productsActions.js';
import { Link as Anchor } from 'react-router-dom';
export default function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.read_products());
    window.scrollTo(0, 0)
  }, [dispatch]);

  const read_products = useSelector((store) => store.products.products);
  const moreViews = read_products?.filter((elemento) => elemento.Moreview === true);
  const [currentSlideCarousel1, setCurrentSlideCarousel1] = useState(0);
  const [currentSlideCarousel2, setCurrentSlideCarousel2] = useState(0);
  const [currentSlideCarousel3, setCurrentSlideCarousel3] = useState(0);
  const [currentSlideCarousel4, setCurrentSlideCarousel4] = useState(0);
  const [currentSlideCarousel5, setCurrentSlideCarousel5] = useState(0);
  const [currentSlideCarousel6, setCurrentSlideCarousel6] = useState(0);

  const imagesPorSlide = 4;
  
  const prevSlideCarousel2 = () => {
    const prevSlide = currentSlideCarousel2 - imagesPorSlide;
    setCurrentSlideCarousel2(prevSlide < 0 ? imagesPhones.length - imagesPorSlide : prevSlide);
  };
  const nextSlideCarousel2 = () => {
    const nextSlide = currentSlideCarousel2 + imagesPorSlide;
    if (nextSlide >= imagesPhones.length) {
        setCurrentSlideCarousel2(0);
    } else {
      setCurrentSlideCarousel2(nextSlide);
    }
  };
  const prevSlideCarousel3 = () => {
    const prevSlide = currentSlideCarousel3 - imagesPorSlide;
    setCurrentSlideCarousel3(prevSlide < 0 ? imagesDesktop.length - imagesPorSlide : prevSlide);
  };
  const nextSlideCarousel3 = () => {
    const nextSlide = currentSlideCarousel3 + imagesPorSlide;
    if (nextSlide >= imagesDesktop.length) {
        setCurrentSlideCarousel3(0);
    } else {
      setCurrentSlideCarousel3(nextSlide);
    }
  };
  const prevSlideCarousel4 = () => {
    const prevSlide = currentSlideCarousel4 - imagesPorSlide;
    setCurrentSlideCarousel4(prevSlide < 0 ? imagesDesktop.length - imagesPorSlide : prevSlide);
  };
  const nextSlideCarousel4 = () => {
    const nextSlide = currentSlideCarousel4 + imagesPorSlide;
    if (nextSlide >= imagesDesktop.length) {
        setCurrentSlideCarousel4(0);
    } else {
      setCurrentSlideCarousel4(nextSlide);
    }
  };
  const prevSlideCarousel5 = () => {
    const prevSlide = currentSlideCarousel5 - imagesPorSlide;
    setCurrentSlideCarousel5(prevSlide < 0 ? imagesAudio.length - imagesPorSlide : prevSlide);
  };
  const nextSlideCarousel5= () => {
    const nextSlide = currentSlideCarousel5 + imagesPorSlide;
    if (nextSlide >= imagesAudio.length) {
        setCurrentSlideCarousel5(0);
    } else {
      setCurrentSlideCarousel5(nextSlide);
    }
  };
  const prevSlideCarousel6= () => {
    const prevSlide = currentSlideCarousel6 - imagesPorSlide;
    setCurrentSlideCarousel6(prevSlide < 0 ? imagesElectro.length - imagesPorSlide : prevSlide);
  };
  const nextSlideCarousel6= () => {
    const nextSlide = currentSlideCarousel6 + imagesPorSlide;
    if (nextSlide >= imagesElectro.length) {
        setCurrentSlideCarousel6(0);
    } else {
      setCurrentSlideCarousel6(nextSlide);
    }
  };
  
  const images = [

    '/banner3.png',
    '/applebanner.png',
    '/bannertv.png',
    '/bannerAppliances.png'
    // Agrega aquí tus imágenes con sus nombres de archivos
 ];
 
const imagesPhones = moreViews.filter(item => item.type === "Phones" || item.type === "Tabs");
  const currentPhones = imagesPhones.slice(currentSlideCarousel2, currentSlideCarousel2 + imagesPorSlide);
  const imagesDesktop = moreViews.filter(item => item.type === "NOTEBOOK" || item.type === "DESKTOP");
  const currentDesktop = imagesDesktop.slice(currentSlideCarousel3, currentSlideCarousel3 + imagesPorSlide);
  const imagesGamers = moreViews.filter(item => item.type === "pc" || item.type === "Chair" || item.type === "Mouse");
  const currentGamers = imagesGamers.slice(currentSlideCarousel4, currentSlideCarousel4 + imagesPorSlide);
  const imagesAudio = moreViews.filter(item => item.type === "TV" || item.type === "SPEAKERS" || item.type === "HEADPHONES" || item.type === "MICROPHONE" || item.type === "CAMERAS");
  const currentAudio = imagesAudio.slice(currentSlideCarousel5, currentSlideCarousel5 + imagesPorSlide);
  const imagesElectro = moreViews.filter(item => item.type === "Fridge" || item.type === "Air" || item.type === "Kitchen" || item.type === "Blender" || item.type === "Laundry");
  const currentElectro= imagesElectro.slice(currentSlideCarousel6, currentSlideCarousel6 + imagesPorSlide);
  const autoplayInterval = 3000; // 3 segundos

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlideCarousel1((prevIndex) =>
        prevIndex + 1 < images.length ? prevIndex + 1 : 0
      );
    }, autoplayInterval);

    // Clean up interval when component unmounts or when currentSlideCarousel1 changes
    return () => clearInterval(intervalId);
  }, [currentSlideCarousel1]);
  
  return (
    <main className='bg-[white] w-full h-auto'>
    <div className="relative w-full h-[60vh] bg-[#e6e6e6] ">
        <img
          src={images[currentSlideCarousel1]}
          alt={`Slide ${currentSlideCarousel1 + 1}`}
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center py-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideCarousel1(index)}
              className={`w-4 h-4 mx-2 rounded-full transition duration-300 ${
                index === currentSlideCarousel1 ? 'bg-gray-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
{/* ESTA ES LA SECCION 2 DONDE VAN LOS CARROUSEL MULTIPLES*/}
      <div className="relative w-full  flex px-[2rem] py-[1rem] flex-col justify-center  bg-[#e6e6e6]">
{/* AQUI VA EL PRIMER CARROUSEL MULTIPLE*/}        
      <div className='py-[1rem] px-[3.5rem] mt-[2rem]'>
        <p className='text-[1.5rem]'>More views on Phones & tabs</p>
      </div>
      <div className="carousel-container flex justify-around w-full items-center">
  <svg
    onClick={prevSlideCarousel2}
    className="w-7 h-7 text-gray-800 cursor-pointer bg-[white] rounded-[50px] p-[0.3rem]"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
  </svg>
  {currentPhones.map((item, index) => (
  <div key={item._id} className="carousel-item bg-[white] h-[30rem] w-[20rem] rounded-[10px] p-[1rem]">
    <Anchor to={`/products/${item._id}`}>
      <img
        src={item.cover_photo[0]}
        alt={`Slide ${currentSlideCarousel2 + index + 1}`}
        className="mx-auto w-[20rem] h-[20rem] object-contain py-[1rem]"
      />  
      </Anchor>
      <h3 className="text-center text-gray-800">{item.brand}</h3>
      <h4 className="text-center text-gray-800">{item.title}</h4>
      <p className="text-center text-gray-500 text-[1.2rem]">USD$ {item.price}</p>
      <p className="text-center text-[#5ea85e]">Withdraw it NOW!</p>
    </div>
  ))}
  <svg
    onClick={nextSlideCarousel2}
    className="w-7 h-7 text-gray-800 cursor-pointer bg-[white] rounded-[50px] p-[0.3rem]"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>
</div>

{/* AQUI VA EL SEGUNDO CARROUSEL MULTIPLE*/} 
<div className='py-[1rem] px-[3.5rem] mt-[2rem]'>
        <p className='text-[1.5rem]'>More views on Desktops & Notebooks</p>
      </div>
      <div className="carousel-container flex justify-around w-full items-center">
  <svg
    onClick={prevSlideCarousel3}
    className="w-7 h-7 text-gray-800 cursor-pointer bg-[white] rounded-[50px] p-[0.3rem] "
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
  </svg>
  {currentDesktop.map((item, index) => (
    <div key={item._id} className="carousel-item bg-[white] h-[30rem] w-[20rem] rounded-[10px] p-[1rem]">

      <Anchor to={`/products/${item._id}`}>
      <img
        src={item.cover_photo[0]}
        alt={`Slide ${currentSlideCarousel3 + index + 1}`}
        className="mx-auto w-[20rem] h-[20rem] object-contain py-[1rem]"
      />  
      </Anchor>
      <h3 className="text-center text-gray-800">{item.brand}</h3>
      <h4 className="text-center text-gray-800">{item.title}</h4>
      <p className="text-center text-gray-500 text-[1.2rem]">USD$ {item.price}</p>
      <p className="text-center text-[#5ea85e]">Withdraw it NOW!</p>
    </div>
  ))}
  <svg
    onClick={nextSlideCarousel3}
    className="w-7 h-7 text-gray-800 cursor-pointer bg-[white] rounded-[50px] p-[0.3rem]"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>
</div>
{/* AQUI VA EL TERCER CARROUSEL MULTIPLE*/} 
<div className='py-[1rem] px-[3.5rem] mt-[2rem]'>
        <p className='text-[1.5rem]'>More views on Gamers</p>
      </div>
      <div className="carousel-container flex justify-around w-full items-center">
  <svg
    onClick={prevSlideCarousel4}
    className="w-7 h-7 text-gray-800 cursor-pointer bg-[white] rounded-[50px] p-[0.3rem] "
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
  </svg>
  {currentGamers.map((item, index) => (
    <div key={item._id} className="carousel-item bg-[white] w-[20rem] h-[30rem] rounded-[10px] p-[1rem]">
      <Anchor to={`/products/${item._id}`} >
      <img
        src={item.cover_photo[0]}
        alt={`Slide ${currentSlideCarousel4 + index + 1}`}
        className="mx-auto w-[20rem] h-[20rem] object-contain py-[1rem]"
      />  
      </Anchor>
      <h3 className="text-center text-gray-800">{item.brand}</h3>
      <h4 className="text-center text-gray-800">{item.title}</h4>
      <p className="text-center text-gray-500 text-[1.2rem]">USD$ {item.price}</p>
      <p className="text-center text-[#5ea85e]">Withdraw it NOW!</p>
    </div>
  ))}
  <svg
    onClick={nextSlideCarousel4}
    className="w-7 h-7 text-gray-800 cursor-pointer bg-[white] rounded-[50px] p-[0.3rem]"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>
</div> 
{/* AQUI VA EL CUARTO CARROUSEL MULTIPLE*/}  
<div className='py-[1rem] px-[3.5rem] mt-[2rem]'>
        <p className='text-[1.5rem]'>More views on Audio & Video</p>
      </div>
      <div className="carousel-container flex justify-around w-full items-center">
  <svg
    onClick={prevSlideCarousel5}
    className="w-7 h-7 text-gray-800 cursor-pointer bg-[white] rounded-[50px] p-[0.3rem] "
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
  </svg>

  {currentAudio.map((item, index) => (
    <div key={item._id} className="carousel-item bg-[white] w-[20rem] h-[30rem] rounded-[10px] p-[1rem]">

      <Anchor to={`/products/${item._id}`}>
      <img
        src={item.cover_photo[0]}
        alt={`Slide ${currentSlideCarousel5 + index + 1}`}
        className="mx-auto w-[20rem] h-[20rem] object-contain py-[1rem]"
      />  
      </Anchor>
      <h3 className="text-center text-gray-800">{item.brand}</h3>
      <h4 className="text-center text-gray-800">{item.title}</h4>
      <p className="text-center text-gray-500 text-[1.2rem]">USD$ {item.price}</p>
      <p className="text-center text-[#5ea85e]">Withdraw it NOW!</p>
    </div>
  ))}
  <svg
    onClick={nextSlideCarousel5}
    className="w-7 h-7 text-gray-800 cursor-pointer bg-[white] rounded-[50px] p-[0.3rem]"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>
</div>
{/* AQUI VA EL QUINTO CARROUSEL MULTIPLE*/}  
<div className='py-[1rem] px-[3.5rem] mt-[2rem]'>
        <p className='text-[1.5rem]'>More views on Appliances</p>
      </div>
      <div className="carousel-container flex justify-around w-full items-center">
  <svg
    onClick={prevSlideCarousel6}
    className="w-7 h-7 text-gray-800 cursor-pointer bg-[white] rounded-[50px] p-[0.3rem] "
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
  </svg>

  {currentElectro.map((item, index) => (
    <div key={item._id} className="carousel-item bg-[white] w-[20rem] h-[30rem] rounded-[10px] p-[1rem]">

      <Anchor to={`/products/${item._id}`}>
      <img
        src={item.cover_photo[0]}
        alt={`Slide ${currentSlideCarousel6 + index + 1}`}
        className="mx-auto w-[20rem] h-[20rem] object-contain py-[1rem]"
      /> 
      </Anchor>
      <h3 className="text-center text-gray-800">{item.brand}</h3>
      <h4 className="text-center text-gray-800">{item.title}</h4>
      <p className="text-center text-gray-500 text-[1.2rem]">USD$ {item.price}</p>
      <p className="text-center text-[#5ea85e]">Withdraw it NOW!</p>
    </div>
  ))}
  <svg
    onClick={nextSlideCarousel6}
    className="w-7 h-7 text-gray-800 cursor-pointer bg-[white] rounded-[50px] p-[0.3rem]"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>
</div>
    </div>
    </main>
  );
}
