import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    setCurrentPlaying
} from "../../custom/Redux/Reducers/Album/AlbumSlice";
import { filterTitle } from '../util/filterTitle';
const SuggestionsList = (props: any) => {
    const dispatch = useDispatch()
    const {
      suggestions,
      inputValue,
      onSelectSuggestion,
      displaySuggestions,
      selectedSuggestion,
      isLoading,
      setInputValue,
      setDisplaySuggestions
    } = props;

    const handleData = (album: any, downloadUrl: any) =>{  
      if (downloadUrl) {
          const data = {
              title: album?.title ?? album.name,
              artist: album?.primaryArtists,
              coverUrl:album?.image?.[album.image.length - 1]?.link,
              thumbUrl:
                  album?.image?.[album.image.length - 1]?.link,
              audio: downloadUrl?.link ? downloadUrl?.link: downloadUrl,
              palette: "blue",
              id: album?.id,
          }
          let queue = localStorage.getItem('queue-playing')
          queue = queue ? JSON.parse(queue) : []

          localStorage.setItem('queue-playing', JSON.stringify([data, ...(Array.isArray(queue)? queue : [])]))
        
          localStorage.setItem('current-playing', JSON.stringify(data))
          dispatch(setCurrentPlaying(data))
          setInputValue('')
          setDisplaySuggestions(false)
      }                         
   }
    if (inputValue && displaySuggestions) {
      return (<span  className='absolute user-input block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 border-t-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-es-lg rounded-ee-lg'>
          <ul className="suggestions-list ">
            {isLoading ? (<div>Loading...</div>) : ''}
            {suggestions?.songs?.results?.length && !isLoading? (
              <div>
                 <span className='font-bold'>
                    Song
                 </span>
                 {
                  suggestions?.songs?.results?.map((song:any)=>{
                      const downloadUrl = song?.downloadUrl?.find((urlData: any)=>urlData?.link)
                      const image = song.image?.find((image?: {link: string, quality: string})=>image?.link)
                      return (
                        <div className='flex mb-2'
                        onClick={()=>handleData(song, downloadUrl)}>
                          <img className="rounded mr-2 w-9" src={image?.link} />
                          {filterTitle(song?.title)}
                          </div>
                      )
                  })
                 }
              </div>
            ): ''}
            {suggestions?.albums?.results?.length && !isLoading? (
              <div>
                 <span className='font-bold'>
                    Album
                 </span>
                 {
                  suggestions?.albums?.results?.map((album:any, key: any)=>{
                      const image = album.image?.find((image?: {link: string, quality: string})=>image?.link)

                      return (
                        <div key={key}>
                          <Link  
                            className='flex mb-2'
                            to={`/album?id=${album?.id}&query=${album?.url}`} 
                            onClick={
                              ()=>{
                                setDisplaySuggestions(false)
                                setInputValue('')
                              }
                            }
                          >
                             <img className="rounded mr-2 w-9" src={image?.link} />
                             {filterTitle(album?.title)}
                          </Link>
                        </div>
                      )
                  })
                 }
              </div>
            ): ''}
            {suggestions?.artists?.results?.length && !isLoading? (
              <div>
                 <span className='font-bold'>
                  Artist
                 </span>
                 {
                  suggestions?.artists?.results?.map((artist:any, key: any)=>{
                      const image = artist.image?.find((image?: {link: string, quality: string})=>image?.link)

                      return (
                        <div key={key}>
                          <Link  
                            className='flex mb-2'
                            to={`/artist?id=${artist?.id}&query=${artist?.url}`} 
                            onClick={
                              ()=>{
                                setDisplaySuggestions(false)
                                setInputValue('')
                              }
                            }
                          >
                             <img className="rounded mr-2 w-9" src={image?.link} />
                             {filterTitle(artist?.title)}
                          </Link>
                        </div>
                      )
                  })
                 }
              </div>
            ): ''}
          </ul>
      </span>)
      if (suggestions.length > 0) {
        return (
            <span  className='absolute user-input block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 border-t-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-es-lg rounded-ee-lg'>
                <ul className="suggestions-list ">
            {suggestions.map((suggestion:any, index:number) => {
              const isSelected = selectedSuggestion === index;
              const classname = `suggestion ${isSelected ? "selected" : ""}`;
              return (
                <li
                  key={index}
                  className={classname}
                  onClick={() => onSelectSuggestion(index)}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
            </span>
          
        );
      } else {
        return <div className='absolute user-input block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 border-t-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-es-lg rounded-ee-lg'>No suggestions available...</div>;
      }
    }
    return <></>;
  };
  const SearchSuggestion = () => {
    const [inputValue, setInputValue] = React.useState("");
    const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = React.useState(0);
    const [displaySuggestions, setDisplaySuggestions] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [debouncedSearchTerm, _setDebouncedSearchTerm] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')

    const filterSong = async (data?: any) => {
      if (data?.songs?.results?.length) {
        const songResults = await Promise.all(
          data?.songs?.results.map(async (song: any) => {
            const response = await fetch('https://saavn.me/songs?link=' + song?.url)
            const jsonResponse = await response.json();
            return { ...song, downloadUrl: jsonResponse.data?.[0]?.downloadUrl }
          })
        );
        
        return { ...data, songs: { results: songResults } }
      }
      return data;
    }
    const setDebouncedSearchTerm = useCallback(
      debounce((value) => {
          _setDebouncedSearchTerm(value)
      }, 500),
      []
  )
  
    useEffect(() => {
      setDebouncedSearchTerm(searchTerm)
  }, [searchTerm, setDebouncedSearchTerm])

  useEffect(()=>{
    if(debouncedSearchTerm.length) {
      fetch('https://saavn.me/search/all?query='+debouncedSearchTerm).then((res)=>res.json()).then(async (result)=>{
        const data = await filterSong(result.data)
        setFilteredSuggestions(data);
        setIsLoading(false)
    })
    }
  },[debouncedSearchTerm])

    

    const onChange = (event:any) => {
      const value = event.target.value;
      setInputValue(value);
      setIsLoading(true)
      if (value.length > 2) {
        setSearchTerm(value)
      }
      
      setDisplaySuggestions(true);
    };
  
    const onSelectSuggestion = (index:number) => {
      setSelectedSuggestion(index);
      setInputValue(filteredSuggestions[index]);
      setFilteredSuggestions([]);
      setDisplaySuggestions(false);
    };
  
    return (
      <div className='relative w-full sm:w-96'>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input 
              type="search"
              id="search"
              onChange={onChange}
              value={inputValue} className={`user-input block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!inputValue?.length || !displaySuggestions ?'rounded-lg':'rounded-ss-lg rounded-se-lg'}`} placeholder="Search" required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
        <SuggestionsList
          inputValue={inputValue}
          setInputValue={setInputValue}
          selectedSuggestion={selectedSuggestion}
          onSelectSuggestion={onSelectSuggestion}
          displaySuggestions={displaySuggestions}
          suggestions={filteredSuggestions}
          isLoading={isLoading}
          setDisplaySuggestions={setDisplaySuggestions}
        />
      </div>
    );
  };

export default SearchSuggestion

