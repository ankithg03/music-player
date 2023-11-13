import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader'
import { AlbumComponent } from './AlbumComponent'
import {
  setHomePage,
  homePageData
} from "../../custom/Redux/Reducers/Album/AlbumSlice";
const Home = () => {
  const dispatch = useDispatch();
  const homeData = useSelector(homePageData)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(homeData.status?.toLowerCase() !== "success"){
      setIsLoading(true)
      fetch('https://saavn.me/modules?language=kannada,hindi,english').then(
        res => res.json()
      ).then(jsonResponse => {
        setTimeout(()=>{
          // setHomePage(jsonResponse)
          dispatch(setHomePage(jsonResponse))
          setIsLoading(false)
        }, 1000)
      })
    }
  }, [homeData])
  console.log('aaa', homeData)
  return (
    <div className='flex w-full'>
      {isLoading ? (
      <div className='grid gap-4 w-full'>
        <div className='grid grid-cols-2 gap-4 w-full md:grid-cols-3'>
          <ContentLoader
            speed={2}
            width={'100%'}
            viewBox="0 0 300 30"
            backgroundColor="#dbebff"
            foregroundColor="#ecebeb"
          >
            <rect x="1" y="1" rx="2" ry="2" width="100%" height="29" />
          </ContentLoader>
        </div>
        <div className='grid grid-cols-2 gap-4 w-full md:grid-cols-3'>
            {Array(20).fill(20).map((item,key) => {
              return (<ContentLoader
                key={key}
                speed={2}
                width={'100%'}
                viewBox="0 0 300 330"
                backgroundColor="#dbebff"
                foregroundColor="#ecebeb"
              >
                <rect x="1" y="313" rx="2" ry="2" width="100%" height="22" />
                <rect x="1" y="1" rx="2" ry="2" width="100%" height="300" />
              </ContentLoader>)
            })}
          </div></div>) :
        (<div className='grid gap-4'>
          <AlbumComponent albumData={homeData?.data?.trending?.albums} title={'Trending'} />
          <AlbumComponent albumData={homeData?.data?.charts}/>
          <AlbumComponent albumData={homeData?.data?.playlists} title={'Playlists'}/>
          <AlbumComponent albumData={homeData?.data?.album} title={'Album'}/>
        </div>)}
    </div>
  )
}

export default Home