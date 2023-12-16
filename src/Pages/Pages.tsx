import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Layout } from './Layout';
import { Home } from './Home';
import { Album } from './Album';
import { Playlist } from './Playlist';
import { Artist } from './Artist';

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
    },
    {
      path: "/artist",
      element: <Artist />,
    }]
  }
  
]);

function Pages() {
  return (
      <RouterProvider router={router}/>
  );
}

export default Pages;
