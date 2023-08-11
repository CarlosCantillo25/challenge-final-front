import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { apiUrl, endpoints } from '../utils/api.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

export default function AddProduct() {

  const navigate = useNavigate()

  const [moreViewOption, setMoreViewOption] = useState('');
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [photoLink1, setPhotoLink1] = useState('');
  const [photoLink2, setPhotoLink2] = useState('');
  const [photoLink3, setPhotoLink3] = useState('');
  const [productAvailable, setProductAvailable] = useState('');
  const [additionalFields, setAdditionalFields] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [screenInputs, setScreenInputs] = useState([]);
  const [GeneralFeaturesInputs, setGeneralFeaturesInputs] = useState([]);
  const [ConnectivityInputs, setConnectivityInputs] = useState([]);
  const [SoundInputs, setSoundInputs] = useState([]);
  const [DimensionsInputs, setDimensionsInputs] = useState([]);
  const [DescriptionInputs, setDescriptionInputs] = useState([]);
  const [DescriptionFeaturesInputs, setDescriptionFeaturesInputs] = useState([]);

  const products = useSelector((store) => store.products.products);

  const uniqueCategories = [...new Set(products.map(product => product.category))];

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    setSelectedType('');
    setScreenInputs({});
    setGeneralFeaturesInputs([]);
    setConnectivityInputs([]);
    setSoundInputs([]);
    setDimensionsInputs([]);
    setDescriptionInputs([]);
    setDescriptionFeaturesInputs([])
  };

  const handleTypeChange = (event) => {
    const selectedProductType = event.target.value;
    setSelectedType(selectedProductType);

    if (selectedProductType === 'TV') {
      const selectedProduct = products.find(product => product.type === selectedProductType);
      if (typeof selectedProduct.description.screen === 'object' && selectedProduct.description.screen !== null) {
        const screenDescription = selectedProduct.description.screen;
        const inputs = Object.keys(screenDescription).map((key, index) => ({ label: key, value: screenDescription[key], }));
        setScreenInputs(inputs);
      } else if (typeof selectedProduct.description.GeneralFeatures === 'object' && selectedProduct.description.GeneralFeatures !== null) {
        const GeneralFeaturesDescription = selectedProduct.description.GeneralFeatures;
        const inputs = Object.keys(GeneralFeaturesDescription).map((key, index) => ({ label: key, value: GeneralFeaturesDescription[key], }));
        setGeneralFeaturesInputs(inputs);
      } else if (typeof selectedProduct.description.Connectivity === 'object' && selectedProduct.description.Connectivity !== null) {
        const ConnectivityDescription = selectedProduct.description.Connectivity;
        const inputs = Object.keys(ConnectivityDescription).map((key, index) => ({ label: key, value: ConnectivityDescription[key], }));
        setConnectivityInputs(inputs);
      } else if (typeof selectedProduct.description.Sound === 'object' && selectedProduct.description.Sound !== null) {
        const SoundDescription = selectedProduct.description.Sound;
        const inputs = Object.keys(SoundDescription).map((key, index) => ({ label: key, value: SoundDescription[key], }));
        setSoundInputs(inputs);
      } else if (typeof selectedProduct.description.Dimensions === 'object' && selectedProduct.description.Dimensions !== null) {
        const DimensionsDescription = selectedProduct.description.Dimensions;
        const inputs = Object.keys(DimensionsDescription).map((key, index) => ({ label: key, value: DimensionsDescription[key], }));
        setDimensionsInputs(inputs);
      }
    } else {
      setScreenInputs({});
    }

    if (selectedProductType === 'SPEAKERS' || selectedProductType === 'HEADPHONES' || selectedProductType === 'CAMERAS' || selectedProductType === 'MICROPHONE' || selectedProductType === 'NOTEBOOK' || selectedProductType === 'DESKTOP' || selectedProductType === 'Laundry' || selectedProductType === 'Kitchen' || selectedProductType === 'Fridge' || selectedProductType === 'Air' || selectedProductType === 'Blender' || selectedProductType === 'Phones' || selectedProductType === 'Tabs') {
      const selectedProduct = products.find(product => product.type === selectedProductType);
      if (typeof selectedProduct.description === 'object' && selectedProduct.description !== null) {
        const description = selectedProduct.description;
        const inputs = Object.keys(description).map((key, index) => ({ label: key, value: description[key], }));
        setDescriptionInputs(inputs);
      } else {
        setDescriptionInputs([]);
      }
    } else {
      setScreenInputs({});
    }

    if (selectedProductType === 'pc') {
      const selectedProduct = products.find(product => product.type === selectedProductType);
      if (typeof selectedProduct.description.features === 'object' && selectedProduct.description.features !== null) {
        const description = selectedProduct.description.features;
        const inputs = Object.keys(description).map((key, index) => ({ label: key, value: description[key], }));
        setDescriptionFeaturesInputs(inputs);
      } else {
        setDescriptionFeaturesInputs([]);
      }
    } else {
      setScreenInputs({});
    }

  };

  const handleInputChange = (index, value, field) => {
    if (field === 'screen') {
      const updatedInputs = [...screenInputs];
      updatedInputs[index].value = value;
      setScreenInputs(updatedInputs);
    } else if (field === 'GeneralFeatures') {
      const updatedInputs = [...GeneralFeaturesInputs];
      updatedInputs[index].value = value;
      setGeneralFeaturesInputs(updatedInputs);
    } else if (field === 'Connectivity') {
      const updatedInputs = [...ConnectivityInputs];
      updatedInputs[index].value = value;
      setConnectivityInputs(updatedInputs);
    } else if (field === 'Sound') {
      const updatedInputs = [...SoundInputs];
      updatedInputs[index].value = value;
      setSoundInputs(updatedInputs);
    } else if (field === 'Dimensions') {
      const updatedInputs = [...DimensionsInputs];
      updatedInputs[index].value = value;
      setDimensionsInputs(updatedInputs);
    } else if (field === 'Description') {
      const updatedInputs = [...DescriptionInputs];
      updatedInputs[index].value = value;
      setDescriptionInputs(updatedInputs);
    } else if (field === 'DescriptionFeatures') {
      const updatedInputs = [...DescriptionFeaturesInputs];
      updatedInputs[index].value = value;
      setDescriptionFeaturesInputs(updatedInputs);
    }
  };

  const filteredProductTypes = [...new Set(
    products
      .filter(product => product.category === selectedCategory)
      .map(product => product.type)
  )];

  const handleAddProduct = async () => {
    const newProductData = {
      title: productName,
      brand: productBrand,
      category: selectedCategory,
      type: selectedType,
      description: {
        screen: screenInputs,
        GeneralFeatures: GeneralFeaturesInputs,
        Connectivity: ConnectivityInputs,
        Sound: SoundInputs,
        Dimensions: DimensionsInputs,
        DescriptionInputs: DescriptionInputs.map(input => input.value),
        DescriptionFeaturesInputs: DescriptionFeaturesInputs.map(input => input.value)
      },
      cover_photo: [photoLink1, photoLink2, photoLink3],
      price: productPrice,
      available: productAvailable,
      Moreview: moreViewOption,
    };

    console.log(newProductData)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProductData),
    };

    try {
      const response = await fetch(apiUrl + endpoints.createdProduct, requestOptions);
      if (response.ok) {
        console.log('Product added successfully');
        Swal.fire({
          icon: "success",
          title: "Product added successfully!",
        });
        navigate('/ControlPanel')
      } else {
        console.log(response)
        Swal.fire({
          icon: "error",
          title: "Error adding product",
        });
        console.log('Error adding product');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className='flex p-6 justify-center'>
      <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
        <h2 className="text-xl font-semibold mb-2">General</h2>
        <input className="w-full p-2 border rounded mb-2" type="text" name="productName" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)}  />
        <input className="w-full p-2 border rounded mb-2" type="text" name="productBrand" placeholder="Brand" onChange={(e) => setProductBrand(e.target.value)} />
        <select className="w-full p-2 border rounded mb-2" name="category" onChange={handleCategoryChange} >
          <option value="">SELECT CATEGORY</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {selectedCategory && (
          <div>
            <select className="w-full p-2 border rounded mb-2" name="productType" onChange={handleTypeChange}>
              <option value="">SELECT PRODUCT TYPE</option>
              {filteredProductTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}
        {additionalFields && additionalFields.trim().length > 0 && (
          <div id="categoryFields">
            {additionalFields}
          </div>
        )}
        <input className="w-full p-2 border rounded mb-2" type="text" name="productPrice" placeholder="Price" onChange={(e) => setProductPrice(e.target.value)} />
        <input className="w-full p-2 border rounded mb-2" type="text" name="productAvailable" placeholder="Available" onChange={(e) => setProductAvailable(e.target.value)} />
        <select name="moreview" className="w-full p-2 border rounded mb-2" onChange={(e) => setMoreViewOption(e.target.value)}>
          <option value="">MOREVIEW</option>
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>
        <div className="mb-2">
          <label>Photo Links</label>
          <input className="w-full p-2 border rounded" type="text" name="photoLink1" placeholder="Photo Link 1" onChange={(e) => setPhotoLink1(e.target.value)} />
          <input className="w-full p-2 border rounded mt-1" type="text" name="photoLink2" placeholder="Photo Link 2" onChange={(e) => setPhotoLink2(e.target.value)} />
          <input className="w-full p-2 border rounded mt-1" type="text" name="photoLink3" placeholder="Photo Link 3" onChange={(e) => setPhotoLink3(e.target.value)} />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded mt-2" onClick={handleAddProduct}> ADD PRODUCT </button>
      </div>
      {selectedType === 'TV' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <h1>Text</h1>
            <input className="w-full p-2 border rounded mb-2" type="text"/>
            <h1>Screen</h1>
            {screenInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
            <h1>General Features</h1>
            {GeneralFeaturesInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
            <h1>Connectivity</h1>
            {ConnectivityInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
            <h1>Sound</h1>
            {SoundInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
            <h1>Dimensions</h1>
            {DimensionsInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
            <h1>Model</h1>
            <input className="w-full p-2 border rounded mb-2" type="text"/>
            <h1>Origin</h1>
            <input className="w-full p-2 border rounded mb-2" type="text"/>
          </form>
        </div>
      )}
      {selectedType === 'SPEAKERS' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'HEADPHONES' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'CAMERAS' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'MICROPHONE' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'NOTEBOOK' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'DESKTOP' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'Phones' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'Tabs' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'Laundry' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'Blender' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'Kitchen' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'Air' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'Fridge' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            {DescriptionInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedType === 'pc' && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <h1>Text</h1>
            <input className="w-full p-2 border rounded mb-2" type="text"/>
            {DescriptionFeaturesInputs.map((input, index) => (
              <div key={index}>
                <input placeholder={input.label} className="w-full p-2 border rounded mb-2" type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
              </div>
            ))}
          </form>
        </div>
      )}
      {(selectedType === 'Chair' || selectedType === 'Mouse') && (
        <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
          <form>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <h1>Text</h1>
            <input className="w-full p-2 border rounded mb-2" type="text"/>
          </form>
        </div>
      )}
    </div>
  );
}
