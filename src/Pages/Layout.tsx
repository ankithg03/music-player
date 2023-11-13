import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Components/Header'

export const Layout = () => {
  return (
    <div className="App">
        <Header />
        <div className="container mx-auto flex w-full items-center justify-between py-4 px-6">
            <Outlet />
        </div>
  </div>
  )
}

export default Layout