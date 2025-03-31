import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Checkbox, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useState } from 'react';

const EditBooks = () => {
  const {id} = useParams();
  const {bookTitle, authorName, imageURL, category, bookDescription, bookPrice} = useLoaderData();
  const bookCategories = [
      "Fiction",
      "Non-Fiction",
      "Mystery",
      "Computer Science",
      "Science",
      "Crime Thrillers",
      "Fantasy",
      "Horror",
      "Bibliography",
      "Autobiography",
      "History",
      "Self-help",
      "Memoir",
      "Business",
      "Children",
      "Travel",
      "Religion",
      "Art"
    ]
  
    const [selectedBookCategory, setselectedBookCategory] = useState(bookCategories[0]);
  
    const handleChangeSelectedValue = (event)=> {
      console.log(event.target.value);
      setselectedBookCategory(event.target.value);
    }
  
    const handBookUpdate = (event) => {
      event.preventDefault();
      const form = event.target;
      const bookTitle = form.bookTitle.value;
      const authorName = form.authorName.value;
      const imageURL = form.imageURL.value;
      const category = form.bookCategory.value;
      const bookDescription = form.bookDescription.value;
      const bookPrice = form.bookPrice.value;
  
      const updateBookObj = {
        bookTitle, authorName, imageURL, category, bookDescription, bookPrice
      }
  
      // update the data
      fetch(`http://localhost:5000/book/${id}`, {
        method:"PATCH",
        headers : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateBookObj)
      }).then(res => res.json()).then(data => {
        alert("Book updated successfully!")
        
      })

      
    };
    return (
      <div className='px-4 my-12'>
        <h2 className='mb-8 font-bold text-3xl'>Update your book</h2>
  
        <form onSubmit={handBookUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        <div className='flex gap-8'>
  
        <div className='lg:w-1/2 '> 
          <div className="mb-2 block ">
            <Label htmlFor="bookTitle"
            value="Book Title" >Title</Label>
          </div>
          <TextInput id="bookTitle" 
          name="bookTitle"
          type="text" placeholder="name your book..." required 
          defaultValue={bookTitle}/>
        </div>
        <div className='lg:w-1/2'> 
          <div className="mb-2 block">
            <Label htmlFor="authorName"
            value="Book Title">Author Name</Label>
          </div>
          <TextInput id="authorName" 
          name="authorName"
          type="text" placeholder="name the auhor.." required 
          defaultValue={authorName}/>
        </div>
        </div>
  
        <div className='flex gap-8'>
  
  <div className='lg:w-1/2'> 
    <div className="mb-2 block">
      <Label htmlFor="imageURL"
      value="Image URL">Book Image URL</Label>
    </div>
    <TextInput id="imageURL" 
    name="imageURL"
    type="text" placeholder="image url..." required 
    defaultValue={imageURL}/>
  </div>
  <div className='lg:w-1/2'> 
  <div className="mb-2 block">
      <Label htmlFor="inputState"
      value="Book Category" >Book Category</Label>
    </div>
    <Select id='inputState' name='bookCategory' className='w-full rounded' value={selectedBookCategory}
    onChange={handleChangeSelectedValue} defaultValue={category}>
  
      {
        bookCategories.map(
          (option)=> <option key={option} value={option}>{option}</option>
        )
      }
  
    </Select>
  </div>
  </div>
  
  <div className='flex gap-8'>
  
  <div className='lg:w-1/2'> 
    <div className="mb-2 block">
      <Label htmlFor="bookDescription"
      value="Book Description">Book Description</Label>
    </div>
    <Textarea
    id='bookDescription'
    name='bookDescription'
    placeholder='enter a short description for your book...'
    required
    rows={4}
    className='w-full' 
    defaultValue={bookDescription}
    />
    
  </div>
  <div className='lg:w-1/2'> 
    <div className="mb-2 block">
      <Label htmlFor="bookPrice"
      value="Book Price">Book price in Rupees (per week)</Label>
    </div>
    <TextInput id="bookPrice" 
    name="bookPrice"
    type="number" placeholder="enter price per week .." required
    defaultValue={bookPrice}
    />
  </div> 
  </div>
  
  <Button type='submit'>
    Update
  </Button>
  
        
      </form>
      </div>
    )
}

export default EditBooks
