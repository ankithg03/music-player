import React, { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'
import { AlbumComponent } from '../Home/AlbumComponent';

const Album = () => {
//   const homeData = useSelector(homePageData)
    const [album, setAlbum] = useState<any>({})

  const [isLoading, setIsLoading] = useState(true)
  const [isInvalid, setIsInvalid] = useState(false)

  const handleGetAlbum = (albumURL:string, id:string|false = '') => {
        fetch('https://saavn.me/albums?link='+albumURL).then(
            res => res.json()
          ).then(jsonResponse => {
            // console.log('aaa', jsonResponse)
                setTimeout(()=>{
                    setAlbum(jsonResponse)
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
          handleGetAlbum(query, id)
      }
    }
      
  }, [])
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
        (<div className='grid gap-4 max-h-[65vh] overflow-y-scroll pb-8'>
          <AlbumComponent 
            albumData={album?.data?.songs} 
            title={album?.data?.name}  
            type={"song"}/>
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
export default Album