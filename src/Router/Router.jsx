import React from 'react'
import {createBrowserRouter,RouterProvider,} from "react-router-dom"
import Home from '../Pages/Home';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import PersonalPage from '../Pages/PersonalPage';
const router = createBrowserRouter([
  {

    path: "",
    element: <Home/>,
    
  
},{
  path: "/signup",
  element:<Signup/>
}
,{
  path:"/login",
  element: <Login/>
},{
  path:"/personalPage",
  element:<PersonalPage/>
}
]);
function Router() {

    return (
        <RouterProvider router={router} />
)
}
export default Router
