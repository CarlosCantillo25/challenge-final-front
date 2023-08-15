import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsActions from '../redux/actions/productsActions.js';
import { Link as Anchor } from 'react-router-dom';
export default function gamersPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [datos, setDatos] = useState([]);
  const gamers = useSelector((store) => store.products.gamers);
console.log(gamers);
  const handlePrevPage = () => {
    if (gamers.prevPage) {
      setCurrentPage(gamers.prevPage);
    }
  };

  const handleNextPage = () => {
    if (gamers.nextPage) {
      setCurrentPage(gamers.nextPage);
    }
  };

  useEffect(() => {
    dispatch(productsActions.read_pag_gamers(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (gamers.currentPage) {
      setCurrentPage(gamers.currentPage);
      setDatos(gamers.products);
    }
  }, [gamers.currentPage]);

  const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
      return `USD $${amount.toFixed(0)}`;
    } else {
      return '';
    }
  };

  
  return (
    <div className='flex'>
    <div className='flex flex-col bg-[#e2e1e1] py-[2rem] items-center'>
    <div className="flex flex-wrap justify-center py-[2rem] bg-[#e2e1e1] w-[80%]">
      {datos?.map((element) =>  (
          <Anchor to={`/products/${element._id}`}>
      <div className="flex flex-col justify-center text-center p-8 items-center m-2 bg-white h-[300px] lg:h-[25rem] rounded-2xl drop-shadow-xl hover:border-4 w-[300px]">
    <img className="mb-4 h-[100px] lg:h-[10.8rem]" key={element._id} src={element.cover_photo[0]} alt="jg"  />
  <p className="text-[18px] mb-2 " >{element.title}</p>
  <p className="font-semibold md:text-[22px] mb-2">{formatCurrency(element.price)}</p>
  <p className="font-semibold text-lime-700 md:text-[18px] mb-2">Withdraw it NOW!</p>
  </div>
</Anchor>
))}
</div>
<div className='flex justify-center  bg-[#e2e1e1]'>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className='mr-4 px-4 py-2 bg-blue-500 text-white rounded'
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === gamers.totalPages}
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Next
        </button>
      </div>     
</div>
    </div>
  );
}