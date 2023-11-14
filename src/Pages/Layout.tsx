import React, {useRef} from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Components/Header'
import DraggableMusicPlayer from './DraggableMusicPlayer'

export const Layout = () => {
  const playerModelRef = useRef(null);

  return (
    <div className="App relative">
        <Header />
        <div className="container mx-auto flex w-full items-center justify-between py-4 px-6">
            <Outlet />
        </div>
          <DraggableMusicPlayer playerModelRef={playerModelRef}/>
    </div>
  )
}

export default Layout