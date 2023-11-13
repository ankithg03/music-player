import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Layout } from './Layout';
import { Home } from './Home';
import { Album } from './Album';
import { Playlist } from './Playlist';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{
      path: "/",
      element: <Home />,
    },
    {
      path: "/album",
      element: <Album />,
    },
    {
      path: "/playlist",
      element: <Playlist />,
    }]
  }
  
]);

function Pages() {
  return (
      <RouterProvider router={router}/>
  );
}

export default Pages;
