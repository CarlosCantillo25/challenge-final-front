import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../redux/actions/product.js';
import { api, apiUrl, endpoints } from '../utils/api.js';
import { Link as Anchor, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetail = () => {
  const  _id  = useParams()
  const {id} =_id
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cuota12, setCuota12] = useState(0);
  const [cuota6, setCuota6] = useState(0);
  const [cuota3, setCuota3] = useState(0);
  const [mainImage, setMainImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(true);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const inputProduct = useRef()
  const captureId=inputProduct.current?.value
  const product = useSelector((state) => state.product.product);

  function clickAddToCart() {
    if (captureId && product) {
      const currentCart = JSON.parse(localStorage.getItem('product cart')) || [];
  
      currentCart.push(captureId);
      localStorage.setItem('product cart', JSON.stringify(currentCart));
  
      // Mostrar la alerta de éxito
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your product was added to the cart',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
 
  function navigateToHomePage() {
    navigate("/");
  }

  const fetchProductDetail = async () => {
    try {
      const { data } = await api.get(apiUrl + endpoints.product + id);
      dispatch(setProduct(data.product));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const { data } = await api.get(apiUrl + endpoints.products, {
        params: {
          type: product.type,
          limit: 20
        },
      });

      if (data.response && Array.isArray(data.response)) {
        const filteredProducts = data.response.filter((item) => item.type === product.type);
        setRelatedProducts(filteredProducts.slice(0, 20));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    window.scrollTo(0, 0)
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.price) {
      setCuota12((product.price + (product.price * 52.63 / 100)) / 12);
      setCuota6((product.price + (product.price * 23.94 / 100)) / 6);
      setCuota3((product.price + (product.price * 11.55 / 100)) / 3);

      if (product.cover_photo && product.cover_photo.length > 0) {
        setMainImage(product.cover_photo[0]);
      }
    }
    fetchRelatedProducts();
  }, [product]);

  const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
      return `USD $${amount.toFixed(0)}`;
    } else {
      return '';
    }
  };

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const openTechnicalModal = () => {
    setIsTechnicalModalOpen(true);
    setIsDescriptionModalOpen(false);
  };

  const openDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
    setIsTechnicalModalOpen(false);
  };

  const ModalTechnicalCharacteristics = () => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className='w-full flex flex-col justify-center items-center'>
            <div className='lg:w-[60%] w-full mt-20'>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-lg font-semibold text-slate-600 mb-2 mt-[-40px]'>{product.brand}</p>
                <p className='text-xl font-semibold mb-4'>{product.title}</p>
              </div>
              <div className='m-6'>
                <p className='border-b-2 pb-4 mb-4 text-2xl font-semibold text-center lg:text-start'>Technical characteristics</p>
                  <div>
                  { 
                    product.type === "TV" ? (
                      <div className='flex flex-row w-full justify-center'>
                        <div className='flex flex-col justify-between w-[80%]'>
                          <p className='font-semibold text-xl'>Screen</p>
                          <div className='border-b-2 pb-4 mb-4 ms-[20%]'>
                            {Object.entries(product.description.screen).map(([key, value], index) => (
                              <div key={index} className={`flex flex-row justify-between m-4 w-full ${index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                <p className='font-semibold'>{key}</p>
                                <p className='lg:me-[20%] w-[40%]'>{value}</p>
                              </div>
                            ))}
                          </div>
                          <p className='font-semibold text-xl'>General Features</p>
                          <div className='border-b-2 pb-4 mb-4 ms-[20%]'>
                            {Object.entries(product.description.GeneralFeatures).map(([key, value], index) => (
                              <div key={index} className={`flex flex-row justify-between m-4 w-full ${index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                <p className='font-semibold'>{key}</p>
                                <p className='lg:me-[20%] w-[40%]'>{value}</p>
                              </div>
                            ))}
                          </div>
                          <p className='font-semibold text-xl'>Connectivity</p>
                          <div className='border-b-2 pb-4 mb-4 ms-[20%]'>
                            {Object.entries(product.description.Connectivity).map(([key, value], index) => (
                              <div key={index} className={`flex flex-row justify-between m-4 w-full ${index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                <p className='font-semibold'>{key}</p>
                                <p className='lg:me-[20%] w-[40%]'>{value}</p>
                              </div>
                            ))}
                          </div>
                          <p className='font-semibold text-xl'>Sound</p>
                          <div className='border-b-2 pb-4 mb-4 ms-[20%]'>
                            {Object.entries(product.description.Sound).map(([key, value], index) => (
                              <div key={index} className={`flex flex-row justify-between m-4 w-full ${index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                <p className='font-semibold'>{key}</p>
                                <p className='lg:me-[20%] w-[40%]'>{value}</p>
                              </div>
                            ))}
                          </div>
                          <p className='font-semibold text-xl'>Dimensions</p>
                          <div className='border-b-2 pb-4 mb-4 ms-[20%]'>
                            {Object.entries(product.description.Dimensions).map(([key, value], index) => (
                              <div key={index} className={`flex flex-row justify-between m-4 w-full ${index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                <p className='font-semibold'>{key}</p>
                                <p className='lg:me-[20%] w-[40%]'>{value}</p>
                              </div>
                            ))}
                          </div>
                          <div className='flex flex-row justify-between m-4 w-full'>
                          <p className='font-semibold text-xl'>Model</p>
                          <p className='lg:me-[16%] w-[40%]'>{product.description.Model}</p>
                          </div>
                          <div className='flex flex-row justify-between m-4 w-full'>
                          <p className='font-semibold text-xl'>Origin</p>
                          <p className='lg:me-[16%] w-[40%]'>{product.description.Origin}</p>
                          </div>
                        </div>
                      </div>
                    ) : ((product.category === "TV, AUDIO AND VIDEO" && product.type !== "TV") || product.category === "NOTEBOOKS AND DESKTOPS" || product.category === "CELLPHONES AND TABLETS" || product.category === "Electrodomestics") ? (
                      <div className='flex flex-row w-full justify-center'>
                        <div className='flex flex-col w-[80%]'>
                          {Object.entries(product.description)
                            .filter(([key]) => key !== "Text")
                            .map(([key, value], index) => (
                              <div key={index} className={`flex flex-row justify-between m-4 w-full ${index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                <p className='font-semibold text-xl'>{key}</p>
                                <p className='lg:me-[16%] w-[40%]'>{value}</p>
                              </div>
                            ))}
                        </div>
                    </div>
                    ) : (product.type === "Mouse" || product.type === "Chair") ? (
                      <div className='w-[60%] mt-20'>
                        <div className='flex flex-col justify-center items-center'>
                        <p className='border-b-2 pb-4 mb-4'>{product.description}</p>
                        </div>
                      </div>
                      ) : (product.type === "pc" && product.category === "gamers") ? (
                      <div className='flex flex-row w-full justify-center'>
                        <div className='flex flex-col w-[80%]'>
                          {Object.entries(product.description.features)
                            .filter(([key]) => key !== "Text")
                            .map(([key, value], index) => (
                              <div key={index} className={`flex flex-row justify-between m-4 w-full ${index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                <p className='font-semibold text-xl'>{key}</p>
                                <p className='lg:me-[16%] w-[40%]'>{value}</p>
                              </div>
                            ))}
                        </div>
                    </div>                       
                    ):(
                        <p>ERROR 500</p>
                  )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ModalDescription = () => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-[60%] mt-20'>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-lg font-semibold text-slate-600 mb-2 mt-[-40px]'>{product.brand}</p>
                <p className='text-xl font-semibold mb-4'>{product.title}</p>
              </div>
              <div className='m-6'>
                <p className='border-b-2 pb-4 mb-4'>{product.description.Text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  function navigateToCategoryPage(){
    navigate(`/${product.type}`)
  }


  return (
    <div className='flex flex-col w-full'>
      <div className='w-full flex flex-col items-center justify-center bg-white'>
        {product && (
          <div className='flex flex-row items-start text-sm md:text-md md:w-[80%] mt-4'>
            <Anchor onClick={navigateToHomePage} className='hover:text-sky-600 hover:font-semibold'>Home</Anchor><img src="/left.png" className='h-[15px] md:h-[20px] mt-[3px]'/><Anchor onClick={navigateToCategoryPage} className='hover:text-sky-600 hover:font-semibold'>{product.type}</Anchor><img src="/left.png" className='h-[15px] md:h-[20px] mt-[3px]' /><p className='hover:text-sky-600 hover:font-semibold'>{product.title}</p>
          </div>
        )}
        {product && (
          <div className='w-[80%] flex flex-row items-center justify-center'>
              <div>
                  <div className='flex justify-end w-full flex-col lg:flex-row'>
                    <div className='flex flex-col'>
                      <img src="/envios.png" className='absolute w-[80px] mt-[30px]' />
                      <img src={mainImage} alt={product.title} className='md:h-[500px] object-contain p-4'/>
                      <div className='flex'>
                        {product.cover_photo && product.cover_photo.map((image, index) => (
                            <img key={index} src={image} alt={product.title} className='w-[30%] md:w-[200px] md:h-[200px] border rounded-md me-3 cursor-pointer object-contain hover:border-sky-600 hover:border-2' onClick={() => handleImageClick(image)} />
                        ))}
                      </div>
                    </div>
                    <div className='flex flex-col border rounded-md md:p-4 lg:ms-10 mt-6 lg:mt-0'>
                        <div className='border-b-2 rounded'>
                            <p className='text-slate-500 font-bold text-[20px]'>{product.brand}</p>
                            <p className='font-bold text-xl mb-1'>{product.title}</p>
                            <p className='font-semibold text-xl mb-2'>{formatCurrency(product.price)}</p>
                            <p className='font-bold text-sm'>Our banking promotions!</p>
                            <p className='flex items-start mt-2'>Pay in 12 installments of {formatCurrency(cuota12)}</p>
                            <p className='flex items-start'>Pay in 6 installments of {formatCurrency(cuota6)}</p>
                            <p className='flex items-start mb-2'>Pay in 3 installments of{formatCurrency(cuota3)}</p>
                            <p className='text-sm text-sky-700 mb-2'>See all payment methods</p>
                        </div>
                        <div className='mt-2 border-b-2'>
                            <p className='mb-2'>You are in </p>
                        </div>
                        <div className='mt-2 border-b-2'>
                            <p className='flex flex-row items-center text-lime-700'><img src="/entrega.png" className='w-[30px] me-4'/>Delivery $$$</p>
                            <p className='flex flex-row items-center mb-2'><img src="/tienda.png" className='w-[30px] me-4'/>Withdraw FREE at our branch. <span className='font-semibold text-lime-700 ms-2'>Withdraw it NOW!</span></p>
                            <p className='text-sm text-sky-700 mb-2'>See branches</p>
                        </div>
                        <div className='flex flex-row justify-center items-center mt-4'>
                          <button ref={inputProduct} onClick={clickAddToCart}  value={id} className='border p-2 bg-[#007BFF] rounded-md w-[250px]'>
                            <p className='text-xl font-bold text-white'>Add to cart</p>
                          </button>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
        )}
      </div>
      <div className='w-[full] flex flex-col items-center bg-slate-200 mt-6'>
        {relatedProducts.length > 0 && (
          <div className='w-[80%] mt-6 flex flex-col'>
            <p className='font-semibold text-center lg:text-start text-2xl mb-4'>People interested in this product also saw</p>
            <div className='flex justify-center'>
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                relatedProduct._id !== product._id ? (
                  <div key={relatedProduct._id}>
                    <Anchor to={`/products/${relatedProduct._id}`}>
                      <div className='flex flex-col items-center justify-center mb-10 m-2 bg-white h-[300px] w-[300px] lg:h-[450px] rounded-2xl drop-shadow-xl hover:border-4'>
                        <img src={relatedProduct.cover_photo[0]} alt={relatedProduct.title} className='mb-4 h-[100px] lg:h-[250px]'/>
                        <p className='text-[18px] mb-2 text-center w-[80%]'>{relatedProduct.title}</p>
                        <p className=' font-semibold md:text-[22px] mb-2'>{formatCurrency(relatedProduct.price)}</p>
                        <p className='font-semibold text-lime-700 md:text-[18px] text-center mb-2'>Withdraw it NOW!</p>              
                      </div>
                    </Anchor>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='bg-white border-b-2 w-full flex items-center justify-center'>
        <div className='lg:w-[80%] m-6 flex items-center'>
          <button onClick={openTechnicalModal}>
            <p className='font-bold text-xl m-6 hover:border-sky-500 hover:border-b-2 focus:ring focus:ring-blue-600'>Technical specifications</p>
          </button>
          <button onClick={openDescriptionModal}>
            <p className='font-bold text-xl m-6 hover:border-sky-500 hover:border-b-2'>Description</p>
          </button>
        </div>
      </div>
      {isTechnicalModalOpen && <ModalTechnicalCharacteristics onClose={() => setIsTechnicalModalOpen(false)} />}
      {isDescriptionModalOpen && <ModalDescription onClose={() => setIsDescriptionModalOpen(false)} />}   
    </div>
  );
};

export default ProductDetail;
