import React, { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'
import { AlbumComponent } from '../Home/AlbumComponent';
import { useLocation } from 'react-router-dom';

const Artist = () => {
//   const homeData = useSelector(homePageData)
    const [artist, setArtist] = useState<any>({})
    const [artistData, setArtistData] = useState<any>({})

    const location = useLocation();

  const [isLoading, setIsLoading] = useState(true)
  const [isInvalid, setIsInvalid] = useState(false)

  const handleGetArtist = (artistURL:string, id:string|false = '') => {
        fetch(`https://saavn-ank.vercel.app/artists/${id}/songs`).then(
                res => res.json()
              ).then(jsonResponse => {
                    setTimeout(()=>{
                        setArtist(jsonResponse)
                        setIsLoading(false)
                    }, 1000)
                })
        fetch('https://saavn-ank.vercel.app/artists?link='+artistURL).then(
            res => res.json()
          ).then(jsonResponse => {
                setTimeout(()=>{
                    setArtistData(jsonResponse)
                    setIsLoading(false)
                }, 1000)
            })
    }
    const queryFix = (query: string) =>{
        const urlContent = `https://www.jiosaavn.com/s/`
        let tempQuery = query
        if(query.includes(urlContent)) {
            tempQuery = tempQuery.replace('https://www.jiosaavn.com/s/', 'https://www.jiosaavn.com/')
            tempQuery = tempQuery.replace('/kannada/', '/')
            tempQuery = tempQuery.replace('/hindi/', '/')
            tempQuery = tempQuery.replace('/english/', '/')
        }
        return tempQuery
    }

  useEffect(() => {
    if(typeof window !== undefined) {

        let query = getQueryVariable('query')
        query = queryFix(query? query: '')
        const id = getQueryVariable('id')
        if(!query) {
            setIsInvalid(true)
        } else {
          setIsLoading(true)
          handleGetArtist(query, id)
      }
    }
      
  }, [location.search])
  let image: string = ""
  artistData?.data?.image.every((individualImage?: {link:string})=>{
    image = String(individualImage?.link)
    return individualImage?.link
  })
  return (
    <div className='flex w-full'>
      {isInvalid ? 'Invalid URL please try later':''}
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
        (<div className='m-auto'>
          <div className='grid gap-4 max-h-[65vh] overflow-y-scroll pb-16'>
          <div>
              <img className="rounded-full w-48 m-auto" src={image} alt={artistData?.data?.name} />
              <h2 className='font-bold text-center'>{artistData?.data?.name}</h2>
            </div>
            <AlbumComponent 
              albumData={artist?.data?.results} 
              type={"song"}
              />
          </div>
        </div>)}
    </div>
  )
}

const getQueryVariable = (variable:string) =>
{
        var query = window.location.search.substring(1);
        console.log(query)//"app=article&act=news_content&aid=160990"
        var vars = query.split("&");
        console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
        for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
        if(pair[0] == variable){return pair[1];}
         }
         return(false);
}
export default Artist