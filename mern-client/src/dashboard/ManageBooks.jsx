import React, { useState, useEffect, useContext } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const ManageBooks = () => {
  const { user, loading } = useContext(AuthContext);
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    if (!loading && user?.email) {
      fetch(`http://localhost:5000/user-books?email=${user.email}`)
        .then(res => res.json())
        .then(data => setUserBooks(data));
    }
  }, [user, loading]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/book/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()).then(() => {
      alert("Book Deleted Successfully");
      setUserBooks(prev => prev.filter(book => book._id !== id));
    });
  };

  if (loading) return <p className="text-center mt-20">Loading your books...</p>;

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
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className='divide-y'>
            {
              userBooks.map((book, index) => (
                <TableRow key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index + 1}</TableCell>
                  <TableCell>{book.bookTitle}</TableCell>
                  <TableCell>{book.authorName}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>Rs. {(book.price)}</TableCell>
                  <TableCell>
                    <Link to={`/admin/dashboard/edit-books/${book._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-4">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-red-700'
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ManageBooks;
