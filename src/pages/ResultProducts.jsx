import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as Anchor } from 'react-router-dom';

export default function ResultProducts() {
  const read_products = useSelector((store) => store.products.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadedColumns, setLoadedColumns] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerColumn = 24;
  const totalColumns = Math.ceil(filteredProducts.length / itemsPerColumn);
  const numero=localStorage.getItem('searchResultsCount')
  useEffect(() => {
    // Obtener IDs de productos guardados en "search"
    const savedSearch = localStorage.getItem('search');
    const savedSearchTerm = localStorage.getItem('searchTerm');

    if (savedSearch) {
      const parsedMatchingProductIds = JSON.parse(savedSearch);
      setSearchQuery(savedSearchTerm);

      // Filtrar los productos a mostrar en los resultados de búsqueda
      const productsToShow = read_products.filter(product => parsedMatchingProductIds.includes(product._id));
      setFilteredProducts(productsToShow);
      localStorage.setItem('searchResultsCount', productsToShow.length);
    }
  }, [read_products, filteredProducts]);

  const loadMoreColumns = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoadedColumns(prevColumns => Math.min(prevColumns + 1, totalColumns));
    }, 2000);
  };

  return (
    <main className='bg-[#f1f1f1] w-full min-h-[43.5vh]'>
      <div className='flex justify-center'>
        <div className='w-[80%]'>
          <h2 className='text-[1.5rem] ml-[2rem] mt-[2rem]'>Search Results for: {searchQuery} ({numero})</h2>
          {numero === '0' ? (
            <div className='flex justify-center p-4 h-[66.2vh]'>
              <img src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/media/8b4662f8023e4e2295f865106b5d3aa7.gif" alt="" />
            </div>
            ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-[5rem]'>
          {filteredProducts.slice(0, loadedColumns * itemsPerColumn).map((product) => (
              <div key={product._id} className='bg-white rounded-lg shadow-md p-4'>
                <Anchor to={`/products/${product._id}`}>
                  <img src={product.cover_photo[0]} alt={product.title} className='w-full h-40 object-contain mb-2' />
                  <h3 className='text-gray-800 text-lg font-semibold mb-1'>{product.brand}</h3>
                  <p className='text-gray-500 mb-1'>{product.title}</p>
                  <p className='text-gray-800 text-lg mb-2'>USD$ {product.price}</p>
                  <p className='text-[#5ea85e]'>Withdraw it NOW!</p>
                </Anchor>
              </div>
            ))}
          </div>
            )}
            {loadedColumns < totalColumns && (
            <div className='flex justify-center my-4'>
              <button onClick={loadMoreColumns} className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
            </div>
      </div>
    </main>
  );
}
/* sdfghgfdsfghfghfd */