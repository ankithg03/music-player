import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Layout } from './Layout';
import { Home } from './Home';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{
      path: "/",
      element: <Home />,
    },
    {
      path: "about",
      element: <div>About</div>,
    }]
  }
  
]);

function Pages() {
  return (
      <RouterProvider router={router}/>
  );
}

export default Pages;
