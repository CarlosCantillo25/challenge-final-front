import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsActions from '../redux/actions/productsActions';
import Swal from 'sweetalert2';

function ModifyProduct() {
  const dispatch = useDispatch();
  const { update_product } = productsActions
  const read_products = useSelector((store) => store.products.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [randomProducts, setRandomProducts] = useState([]);

  const performSearch = () => {
    if (searchTerm === '') {
      setShowSearchResults(false)
    } else {
      const filtered = read_products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    }
  };

    const handleSearchClick = () => {
      if (searchTerm) {
        closeModal();
        performSearch();
        saveSearchResultsToLocalStorage();
        navigate('/ResultProducts');
      }
    };
    
    const handleEnterKey = (event) => {
      if (event.key === 'Enter' && searchTerm) {
        closeModal();
        performSearch();
        saveSearchResultsToLocalStorage();
        navigate('/ResultProducts');
      }
    };
    
    const handleInputBlur = () => {
      setIsModalOpen(false);
    };

    const handleProductClick = (product) => {
      setSelectedProduct(product);
      setShowSearchResults(false);

    };

    const handleSaveChanges = async () => {
      try {
        await dispatch(update_product(selectedProduct));
        setSelectedProduct(null);
        
        Swal.fire({
          icon: "success",
          title: "Update Succesfull!",
        });

        performSearch()
      } catch (error) {
        console.log(error);
      }
    };

    const handleCancelEdit = () => {
      setSelectedProduct(null);
    };

    useEffect(() => {
        dispatch(productsActions.read_products());
    }, [dispatch]);


    useEffect(() => {
      performSearch();
    }, [searchTerm]);

    useEffect(() => {
      const randomSubset = read_products
        .filter(product => product.Moreview)
        .sort(() => Math.random() - 0.5)
        .slice(0, 20); 
      setRandomProducts(randomSubset);
    }, []);

    return (
      <div className='flex flex-col mt-10 items-center mb-10' >
        <div className="w-[40%] flex flex-col justify-center" >
          <div className='flex justify-center'>
            <input type="text" placeholder="Search product.." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="md:w-[20rem] lg:w-[30rem] h-[2.5rem] rounded-[5px] pl-[1rem] pr-[3rem] bg-white border-[#007BFF] border-2 focus:ring-[#007BFF] focus:shadow-[#007BFF] outline-none"/>
          </div>
          {showSearchResults && (
            <div>
              {searchResults.slice(0, 3).map((product) => (
                <div key={product._id} className="bg-white flex">
                  <div className='flex items-center justify-start ms-[10%]'>
                    <img src={product.cover_photo[0]} className='w-[100px] h-[80px] object-contain'/>
                    <div className='flex'>
                      <p>{product.title}</p>
                    </div>
                  </div>
                  <button className='text-blue-500 font-semibold ms-5' onClick={() => handleProductClick(product)}>EDIT</button>
                </div>
              ))}
              {searchResults.length > 5 && (
                <div className="text-center mt-3">
                  <p className="text-blue-500"> Please specify more details </p>
                </div>
              )}
            </div>
          )}
        </div>
        {selectedProduct && (
          <div className="mt-10 flex flex-col justify-center">
            <div className='m-2 flex'>
            <label className='font-semibold text-lg w-[250px] flex justify-start items-center'>Product Name:</label>
            <input type="text" className='border-2 ms-2 p-2 rounded' value={selectedProduct.title} onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value, }) } />
            </div>
            <div className='m-2 flex'>
            <label className='font-semibold text-lg w-[250px] flex justify-start items-center'>Product Brand:</label>
            <input type="text" className='border-2 ms-2 p-2 rounded' value={selectedProduct.brand} onChange={(e) => setSelectedProduct({ ...selectedProduct, brand: e.target.value, }) } />
            </div> 
            <div className='m-2 flex'>
            <label className='font-semibold text-lg w-[250px] flex justify-start items-center'>Product Price:</label>
            <input type="text" className='border-2 ms-2 p-2 rounded' value={selectedProduct.price} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value, }) } />
            </div> 
            <div className='m-2 flex'>
            <label className='font-semibold text-lg w-[250px] flex justify-start items-center'>Product Moreview:</label>
            <select className='border-2 ms-2 p-2 rounded' value={selectedProduct.Moreview} onChange={(e) => setSelectedProduct({ ...selectedProduct, Moreview: e.target.value === 'true', }) } >
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
            </div> 
            <div className='m-2 flex'>
            <label className='font-semibold text-lg w-[250px] flex justify-start items-center'>Available:</label>
            <input type="text" className='border-2 ms-2 p-2 rounded' value={selectedProduct.available} onChange={(e) => setSelectedProduct({ ...selectedProduct, available: e.target.value, }) } />
            </div> 
            <div className='flex justify-around mt-5'>
            <button onClick={handleSaveChanges} className='p-2 rounded bg-[#86d377bd]'>Save Changes</button>
            <button onClick={handleCancelEdit} className='p-2 rounded bg-[#ee3131b3]'>Cancel</button>
            </div>
          </div>
        )}
        {!searchTerm && !showSearchResults && !selectedProduct && (
          <div className="mt-10 p-6 w-full justify-center">
            <h2 className="text-lg font-semibold mb-2 ms-20">Random products..</h2>
            <div className='flex flex-wrap justify-center'>
              {randomProducts.map((product) => (
                <div key={product._id} className="flex flex-col items-center justify-center mb-6 mx-2 bg-white w-[300px] h-[300px] lg:h-[450px] rounded-2xl shadow-xl hover:border-4">
                  <img src={product.cover_photo[0]} alt={product.title} className='mb-4 h-[100px] lg:h-[250px]'/>
                  <p className='text-[18px] mb-2 text-center w-[80%]'>{product.title}</p>
                  <button className='text-blue-500 font-semibold' onClick={() => setSelectedProduct(product)}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

export default ModifyProduct;
