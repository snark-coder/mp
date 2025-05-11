import React, { useState, useContext } from 'react';
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { AuthContext } from '../context/AuthProvider';

import { useEffect } from 'react';

const UploadBook = () => {
  const bookCategories = [
    "Fiction", "Non-Fiction", "Mystery", "Computer Science", "Science",
    "Crime Thrillers", "Fantasy", "Horror", "Bibliography", "Autobiography",
    "History", "Self-help", "Memoir", "Business", "Children", "Travel",
    "Religion", "Art"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  const { user } = useContext(AuthContext);

  const [addressData, setAddressData] = useState({
    address: '',
    zipcode: '',
    state: '',
    country: ''
  });

  

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleBookSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.bookCategory.value;
    const bookDescription = form.bookDescription.value;
    const bookPrice = Number(form.bookPrice.value);

    // Save address to backend if not already saved
    if (!user.addressSaved) {
      try {
        const addressRes = await fetch(`http://localhost:5000/api/user/user-address/${user.uid}`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: addressData })
        });
    
        const addressDataRes = await addressRes.json();
        if (!addressDataRes.success) {
          alert("Failed to save address.");
          return;
        }
    
        // ✅ Set addressSaved locally so next upload skips address
        user.addressSaved = true; // This mutates context; not ideal but works short-term
      } catch (err) {
        console.error("Address save error:", err);
        alert("Error saving address.");
        return;
      }
    }
    

    const bookObj = {
      uploadedBy: {
        uid: user?.uid,
        email: user?.email,
      },
      ownerId: user?.uid, // in case other routes rely on this field too
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      price: bookPrice,
      address: addressData
    };
    

    try {
      const res = await fetch("http://localhost:5000/upload-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookObj)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Book Uploaded Successfully!");
        form.reset();
        setAddressData({ address: '', zipcode: '', state: '', country: '' });
      } else {
        alert("Failed to upload book.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading book.");
    }
  };


  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/user/${user.uid}`);
        const data = await res.json();
        setAddressSaved(data.addressSaved);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };
  
    if (user?.uid) {
      fetchUserInfo();
    }
  }, [user?.uid]);
  


  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 font-bold text-3xl'>Upload your book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {!user.addressSaved && (
          <>
            <h3 className="text-xl font-semibold">Enter Your Address</h3>
            <input
              type="text"
              name="address"
              value={addressData.address}
              onChange={handleAddressChange}
              placeholder="Street Address"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="zipcode"
              value={addressData.zipcode}
              onChange={handleAddressChange}
              placeholder="Zip Code"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="state"
              value={addressData.state}
              onChange={handleAddressChange}
              placeholder="State"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="country"
              value={addressData.country}
              onChange={handleAddressChange}
              placeholder="Country"
              className="w-full p-2 border rounded mb-4"
              required
            />
          </>
        )}

        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <Label htmlFor="bookTitle" value="Book Title" />
            <TextInput id="bookTitle" name="bookTitle" type="text" placeholder="Book title..." required />
          </div>
          <div className='lg:w-1/2'>
            <Label htmlFor="authorName" value="Author Name" />
            <TextInput id="authorName" name="authorName" type="text" placeholder="Author name..." required />
          </div>
        </div>

        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <Label htmlFor="imageURL" value="Image URL" />
            <TextInput id="imageURL" name="imageURL" type="text" placeholder="Image URL..." required />
          </div>
          <div className='lg:w-1/2'>
            <Label htmlFor="bookCategory" value="Book Category" />
            <Select
              id="bookCategory"
              name="bookCategory"
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
              className="w-full"
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <Label htmlFor="bookDescription" value="Book Description" />
            <Textarea
              id="bookDescription"
              name="bookDescription"
              placeholder="Short description of your book..."
              rows={4}
              required
              className="w-full"
            />
          </div>
          <div className='lg:w-1/2'>
            <Label htmlFor="bookPrice" value="Book Price (Rs/week)" />
            <TextInput id="bookPrice" name="bookPrice" type="number" placeholder="Price per week..." required />
          </div>
        </div>

        <Button type="submit">Upload Book</Button>
      </form>
    </div>
  );
};

export default UploadBook;
