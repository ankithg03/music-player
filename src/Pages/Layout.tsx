import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Header } from '../Components/Header'
import { MusicPlayer } from '../Components/MusicPlayer'
import { currentPlaying } from '../custom/Redux/Reducers/Album/AlbumSlice'

export const Layout = () => {
  return (
    <div className="App">
        <Header />
        <div className="container mx-auto flex w-full items-center justify-between py-4 px-6">
            <Outlet />
        </div>
        <div>
          <MusicPlayer />
        </div>
  </div>
  )
}

export default Layout