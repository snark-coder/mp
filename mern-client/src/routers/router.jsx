import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";


import SingleBook from "../shop/SingleBook";
import DashBoardLayout from "../dashboard/DashBoardLayout";
//import DashBoard from "../dashboard/DashBoard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRouter from "../PrivateRoute/PrivateRouter";
import Logout from "../components/Logout";
import MyRentals from "../components/MyRentals";
import Checkout from "../shop/Checkout";
import CartPage from "../shop/CartPage";
import Address from "../shop/Address";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/shop",
                element: <Shop/>,
                
                
            },
            {
                path: "/book/:id",
                element: <SingleBook />,  // SingleBook component
                loader: async ({ params }) => {
                  // Fetch the data for the specific book by id
                  const response = await fetch(`http://localhost:5000/book/${params.id}`);
                  const book = await response.json();
                  return book;  // Return the book object to be used as a prop in SingleBook
                }
              },
            {
                path: "/my-rentals",
                element: <PrivateRouter><MyRentals /></PrivateRouter>
            },
            {
                path: "/cart",
                element: <PrivateRouter><CartPage/></PrivateRouter>  // Only accessible by authenticated users
            },
            // Add Checkout route
            {
                path: "/checkout",
                element: <PrivateRouter><Checkout /></PrivateRouter>  // Only accessible by authenticated users
            },
            {
                path: "/address",
                element:<Address/>
            }
           
            
        ]
    },
    {
        path: "/admin/dashboard",
        element: <DashBoardLayout />,
        children :[
            {
                path: "/admin/dashboard/upload",
                element: <PrivateRouter><UploadBook/></PrivateRouter>           },
           
            {
                path: "/admin/dashboard/manage",
                element: <ManageBooks />
            },
            {
                path: "/admin/dashboard/edit-books/:id",
                element: <EditBooks />,
                loader: ({params}) => fetch(`http://localhost:5000/book/${params.id}`)
            }
        ]
    },
    {
        path:"sign-up",
        element: <Signup/>
    },{
        path:"login",
        element:<Login/>
    },
    {
        path: "logout",
        element:<Logout/>
    },
    
      
    
]);

export default router;