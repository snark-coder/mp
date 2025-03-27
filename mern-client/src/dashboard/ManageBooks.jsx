import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Link } from 'react-router-dom';

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(()=> {
    fetch("http://localhost:5000/all-books").then(res => res.json()).then(data => setAllBooks(data))
  }, [])


  const handleDelete = (id)=>{
    fetch(`http://localhost:5000/book/${id}`, {
      method: 'DELETE',
  }).then(res => res.json()).then(data => {alert("Book Deleted Successfully")
    //setAllBooks(data)
  })
}
  return (
    <div className='px-4 my-12'> 
      <h2 className='mb-8 font-bold text-3xl'>Manage Your Books</h2>
      <div className="overflow-x-auto">
      <Table className='lg:w-[1188px]'>
        <TableHead>
          <TableRow>
            <TableHeadCell>Book No.</TableHeadCell>
            <TableHeadCell>Book Name</TableHeadCell>
            <TableHeadCell>Author Name</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            
            <TableHeadCell>
              <span>Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        {
          allBooks.map((book, index) => <TableBody className='divide-y' key={book._id}
        
        >

<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index+1}
            </TableCell>

            <TableCell>{book.bookTitle}</TableCell>
            <TableCell>{book.authorName}</TableCell>
            <TableCell>{book.category}</TableCell>
            <TableCell>{book.bookPrice}</TableCell>
            <TableCell>
              <Link to={`/admin/dashboard/edit-books/${book._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </Link>
              <button onClick={()=> handleDelete(book._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>delete</button>
            </TableCell>
          </TableRow>


          </TableBody>)
        }
    
      </Table>
    </div>
    </div>
  )
}

export default ManageBooks;
