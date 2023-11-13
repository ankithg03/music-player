import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './AlbumComponent.css'
import {
    setCurrentPlaying,
    currentPlaying,
    setSongClick
} from "../../../custom/Redux/Reducers/Album/AlbumSlice";
type AlbumData = {
    albumData: any[] | undefined,
    title?: string | undefined,
    type?: string
}

const AlbumComponent = ({ albumData, title, type }: AlbumData) => {
    const dispatch = useDispatch()

    if (!albumData) return null
    return (
        <div>
            {title ? <h3 className='text-2xl font-bold dark:text-white mb-4'>{title}</h3> : ''}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {albumData?.map((album, key) => {
                    const albumData = (<div className='album-item' key={key}>
                        <img className="h-auto max-w-full rounded-lg" src={album.image?.[album.image.length - 1].link} alt="" />

                        <p className='my-2'>{album.name}</p>
                    </div>)
                    if (type == "song" || album.type == "song") {
                        const downloadUrl = album?.downloadUrl?.[album.downloadUrl.length - 1]?.link
                        return downloadUrl?(
                            <a  
                                className='cursor-pointer'
                                onClick={() => {
                                    
                                    const data = {
                                        title: album.name,
                                        artist: album?.primaryArtists,
                                        coverUrl:album.image?.[album.image.length - 1].link,
                                        thumbUrl:
                                            album.image?.[album.image.length - 1].link,
                                        audio: downloadUrl,
                                        palette: "coral",
                                        id: album.id,
                                    }
                                    console.log('aaaa data', album, data)
                                    localStorage.setItem('current-playing', JSON.stringify(data))
                                    dispatch(setCurrentPlaying(data))
                                    // dispatch(setSongClick(true))
                                    }}>
                                {albumData}
                            </a>
                        ):(<a href={album.url} target="_blank" rel="noopener noreferrer">
                        {albumData}
                    </a>)
                    }
                    if (type == 'album' ||  album.type == "album") {
                        return (
                            <Link to={`/album?id=${album.id}&query=${album.url}`}>
                                {albumData}
                            </Link>
                        )
                    }

                })}
            </div>
        </div>
    )
}

export default AlbumComponent