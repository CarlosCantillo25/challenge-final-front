import React, { useState } from 'react';

export default function AddProduct() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [additionalFields, setAdditionalFields] = useState(null);
  const [additionalFieldsType, setAdditionalFieldsType] = useState(null);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === '1') {
      setAdditionalFields(
        <select className="w-full p-2 border rounded mb-2" name="type" onChange={handleTypeChange}>
            <option value="" disabled selected>Select type</option>
            <option value="1">Phones</option>
            <option value="2">Tabs</option>
            <option value="3">Desktops</option>
            <option value="4">Notebooks</option>
        </select>
      );
    } else if (category === '2') {
      setAdditionalFields(
        <select className="w-full p-2 border rounded mb-2" name="type" onChange={handleTypeChange}>
          <option value="" disabled selected>Select type</option>
          <option value="tv">TV</option>
          <option value="2">Headphones</option>
          <option value="3">Microphones</option>
          <option value="4">Cameras</option>
        </select>
      );
    } else if (category === '3') {
      setAdditionalFields(
        <select className="w-full p-2 border rounded mb-2" name="type" onChange={handleTypeChange}>
          <option value="" disabled selected>Select type</option>
          <option value="1">Gamer's chairs</option>
          <option value="2">Mouses</option>
          <option value="3">PC's Gamer</option>
        </select>
      );
    } else if (category === '4') {
    setAdditionalFields(
      <select className="w-full p-2 border rounded mb-2" name="type" onChange={handleTypeChange}>
        <option value="" disabled selected>Select type</option>
        <option value="1">Fridges</option>
        <option value="2">Kitchen</option>
        <option value="3">Air conditionets</option>
        <option value="4">Laundrys</option>
        <option value="5">Blenders</option>
      </select>
    );
    } else {
      setAdditionalFields(null);
    }
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);

    if (type === 'tv') {
      setAdditionalFieldsType(
        <div>
          <input className="w-full p-2 border rounded mb-2" type="text" name="description" placeholder="Short description" />
          <h2 className="text-xl font-semibold mb-2">Technical characteristics</h2>
          <h1 className="text-lg font-semibold mb-2">Screen</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="Inches" placeholder="Inches" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Resolution" placeholder="Resolution" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="ScreenFormat" placeholder="Screen Format" />
          <h1 className="text-lg font-semibold mb-2">General Features</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="SmartTV" placeholder="SmartTV" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Processor" placeholder="Processor" />
          <h1 className="text-lg font-semibold mb-2">Connectivity</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="InputsHDMI" placeholder="Inputs HDMI" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="InputsUSB" placeholder="Inputs USB" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="InternetConnection" placeholder="Internet Connection" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="NFC" placeholder="NFC" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="HeadphoneJack" placeholder="Headphone Jack" />
          <h1 className="text-lg font-semibold mb-2">Sound</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="AudioFormats" placeholder="Audio Formats" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="NumberOfSpeakers" placeholder="Number Of Speakers" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Power" placeholder="Power" />
          <h1 className="text-lg font-semibold mb-2">Dimensions</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="High" placeholder="High" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Width" placeholder="Width" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Depth" placeholder="Depth" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="HighBased" placeholder="High Based" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="WidthWithBase" placeholder="Width With Base" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="DepthWithBase" placeholder="Depth With Base" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="VESAmeasure" placeholder="VESA Measure" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Weight" placeholder="Weight" />
          <h1 className="text-lg font-semibold mb-2">Model</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="Model" placeholder="Model" />
          <h1 className="text-lg font-semibold mb-2">Origin</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="Origin" placeholder="High" />
        </div>
      );
    } else if (type === '2') {
      setAdditionalFieldsType(
        <div>
          <input className="w-full p-2 border rounded mb-2" type="text" name="description" placeholder="Short description" />
          <h2 className="text-xl font-semibold mb-2">Technical characteristics</h2>
          <h1 className="text-lg font-semibold mb-2">Screen</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="Inches" placeholder="Inches" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Resolution" placeholder="Resolution" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="ScreenFormat" placeholder="Screen Format" />
          <h1 className="text-lg font-semibold mb-2">General Features</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="SmartTV" placeholder="SmartTV" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Processor" placeholder="Processor" />
          <h1 className="text-lg font-semibold mb-2">Connectivity</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="InputsHDMI" placeholder="Inputs HDMI" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="InputsUSB" placeholder="Inputs USB" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="InternetConnection" placeholder="Internet Connection" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="NFC" placeholder="NFC" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="HeadphoneJack" placeholder="Headphone Jack" />
          <h1 className="text-lg font-semibold mb-2">Sound</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="AudioFormats" placeholder="Audio Formats" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="NumberOfSpeakers" placeholder="Number Of Speakers" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Power" placeholder="Power" />
          <h1 className="text-lg font-semibold mb-2">Dimensions</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="High" placeholder="High" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Width" placeholder="Width" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Depth" placeholder="Depth" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="HighBased" placeholder="High Based" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="WidthWithBase" placeholder="Width With Base" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="DepthWithBase" placeholder="Depth With Base" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="VESAmeasure" placeholder="VESA Measure" />
          <input className="w-full p-2 border rounded mb-2" type="text" name="Weight" placeholder="Weight" />
          <h1 className="text-lg font-semibold mb-2">Model</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="Model" placeholder="Model" />
          <h1 className="text-lg font-semibold mb-2">Origin</h1>
          <input className="w-full p-2 border rounded mb-2" type="text" name="Origin" placeholder="High" />
        </div>
      );
    } else if (type === '3') {
      setAdditionalFieldsType(
        <div>
          <input className="w-full p-2 border rounded mb-2" type="text" name="description" placeholder="Short description" />
          <h2>Technical characteristics</h2>
          <input className="w-full p-2 border rounded mb-2" type="text" name="brand" placeholder="Brand" />
        </div>
      );
    } else if (type === '4') {
    setAdditionalFieldsType(
        <div>
          <input className="w-full p-2 border rounded mb-2" type="text" name="description" placeholder="Short description" />
          <h2>Technical characteristics</h2>
          <input className="w-full p-2 border rounded mb-2" type="text" name="brand" placeholder="Brand" />
        </div>
    );
    } else {
      setAdditionalFieldsType(null);
    }
  };

  return (
    <div className='flex p-6'>
      <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
        <h2 className="text-xl font-semibold mb-2">General</h2>
        <input className="w-full p-2 border rounded mb-2" type="text" name="name" placeholder="Product Name" />
        <input className="w-full p-2 border rounded mb-2" type="text" name="brand" placeholder="Brand" />
        <select className="w-full p-2 border rounded mb-2" name="category" onChange={handleCategoryChange}>
            <option value="" disabled selected>Select category</option>
            <option value="1">Techs</option>
            <option value="2">TV, AUDIO & VIDEO</option>
            <option value="3">Gamers</option>
            <option value="4">Home & Appliances</option>
        </select>
        {additionalFields && (
          <div id="categoryFields">
            {additionalFields}
          </div>
        )}
      </div>
      <div className="bg-white p-4 rounded shadow-md flex flex-col m-4 w-[50%]">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        {additionalFieldsType && (
          <div id="categoryFields">
            {additionalFieldsType}
          </div>
        )}
      </div>
    </div>
  );
}
