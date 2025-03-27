import React, { useState } from 'react'
import { Button, Checkbox, Label, Select, Textarea, TextInput } from "flowbite-react";

const UploadBook = () => {
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

  const handBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.bookCategory.value;
    const bookDescription = form.bookDescription.value;
    const bookPrice = form.bookPrice.value;

    const bookObj = {
      bookTitle, authorName, imageURL, category, bookDescription, bookPrice
    }

    // send data to db
    fetch("http://localhost:5000/upload-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, body : JSON.stringify(bookObj)
    }).then(res => res.json()).then(data => {
      //console.log(data);
      alert("Book Uploaded Successfull!");
      form.reset();
    })

  };
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 font-bold text-3xl'>Upload your book</h2>

      <form onSubmit={handBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
      <div className='flex gap-8'>

      <div className='lg:w-1/2 '> 
        <div className="mb-2 block ">
          <Label htmlFor="bookTitle"
          value="Book Title" >Title</Label>
        </div>
        <TextInput id="bookTitle" 
        name="bookTitle"
        type="text" placeholder="name your book..." required />
      </div>
      <div className='lg:w-1/2'> 
        <div className="mb-2 block">
          <Label htmlFor="authorName"
          value="Book Title">Author Name</Label>
        </div>
        <TextInput id="authorName" 
        name="authorName"
        type="text" placeholder="name the auhor.." required />
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
  type="text" placeholder="image url..." required />
</div>
<div className='lg:w-1/2'> 
<div className="mb-2 block">
    <Label htmlFor="inputState"
    value="Book Category" >Book Category</Label>
  </div>
  <Select id='inputState' name='bookCategory' className='w-full rounded' value={selectedBookCategory}
  onChange={handleChangeSelectedValue}>

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
  />
</div> 
</div>

<Button type='submit'>
  Upload Book
</Button>

      
    </form>
    </div>
  )
}

export default UploadBook
