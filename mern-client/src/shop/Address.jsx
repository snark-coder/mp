import React, { useState } from 'react';

const Address = () => {
  const [formData, setFormData] = useState({
    address: '',
    zipcode: '',
    state: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAddress = async () => {
    try {
      const response = await axios.post(`/user-address/${user.userId}`, {
        address: formData
      });
      alert('Address saved successfully');
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address');
    }
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-3xl font-bold mb-6">Enter Delivery Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="p-3 border rounded"
          placeholder="Street Address"
        />
        <input
          type="text"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          className="p-3 border rounded"
          placeholder="Zip Code"
        />
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="p-3 border rounded"
          placeholder="State"
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="p-3 border rounded"
          placeholder="Country"
        />
      </div>
      <button
        onClick={handleSaveAddress}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Save Address & Complete Order
      </button>
    </div>
  );
};

export default Address;
