import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsActions from '../redux/actions/productsActions.js';
import { Link as Anchor } from 'react-router-dom';

export default function HomeAppliances() {
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem('currentPageAppliances')) || 1 //le digo que mi estado inicial sea 1 o que sea el numero almacenado en el local storage
  );
 const appliances = useSelector((store) => store.products.appliances);
  
  const datos= appliances.products;
  console.log(appliances);
const Tv=useRef()
const Fridges=useRef()
let Laundry=useRef()
let Blenders=useRef()
let Cooks=useRef()
let AirConditioners=useRef()

  const dispatch= useDispatch()
  const page=currentPage //page va a ser el estado dinamico del current page para hacer referencia a que pagina vamos a navegar
  useEffect(() => {
  localStorage.setItem('currentPageAppliances', currentPage);
  dispatch(productsActions.read_pag_appliances(page)) //le vamos a dar un parametro que indica la pagina (page)
  },[page ]);

function handleNext(){
    setCurrentPage(currentPage + 1)
   }
function handlePrev(){
  setCurrentPage(currentPage - 1)
}
  const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
      return `USD $${amount.toFixed(0)}`;
    } else {
      return '';
    }
  };
 
  return (
    <div className='flex'>
    <div className='flex flex-col bg-[#e2e1e1] py-[2rem]  items-center'>
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
<div className='flex justify-center  bg-[#f1f1f1] gap-8 items-center'>
        <button
        className=' px-4 py-2 bg-blue-500 text-white rounded disabled:bg-[gray]'
        onClick={handlePrev}
        disabled={appliances.prevPage === null}
        >
          Prev page
        </button>
        <p className='text-[1.3rem] text-[#575656]'>Page: {currentPage}</p>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-[gray]'
          onClick={handleNext}
          disabled={ appliances.nextPage === null}
        >
          Next page
        </button>
      </div>     
        
</div>
    </div>
  );
}