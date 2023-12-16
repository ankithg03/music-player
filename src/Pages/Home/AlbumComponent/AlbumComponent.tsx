import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './AlbumComponent.css'
import {
    setCurrentPlaying
} from "../../../custom/Redux/Reducers/Album/AlbumSlice";
import Download from './icons/Download';
type AlbumData = {
    albumData: any[] | undefined,
    title?: string | undefined,
    type?: string
}

const AlbumComponent = ({ albumData, title, type }: AlbumData) => {
    const dispatch = useDispatch()

    if (!albumData) return null

    function decodeHtmlEntities(input:string) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = input;
        return textarea.value;
    }
    function downloadAudio(url: string, fileName: string) {
        fetch(url)
          .then(response => response.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName || 'audio.mp3'; // You can specify a custom file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          })
          .catch(error => console.error('Error downloading audio:', error));
      }

     const handleData = (album: any, downloadUrl: string) =>{  
        if (downloadUrl) {
            const data = {
                title: album?.name,
                artist: album?.primaryArtists,
                coverUrl:album?.image?.[album.image.length - 1]?.link,
                thumbUrl:
                    album?.image?.[album.image.length - 1]?.link,
                audio: downloadUrl,
                palette: "blue",
                id: album?.id,
            }
            let queue:any = localStorage.getItem('queue-playing')
            queue = queue ? JSON.parse(queue) : []

            if(Array.isArray(queue) && queue?.length > 9) {
                if (data.id && queue.find(song=>song.id===data.id)) {
                    // Remove the element based on the target id
                    queue = queue.filter(item => item.id !== data.id);
                  } else {
                    // Remove the last element
                    queue.pop();
                  }
                    // Remove the last element
                    
            }
            localStorage.setItem('queue-playing', JSON.stringify([data, ...(Array.isArray(queue)? queue : [])]))
        
            localStorage.setItem('current-playing', JSON.stringify(data))
            dispatch(setCurrentPlaying(data))
        }                         
     }
      
    return (
        <div>
            {title ? <h3 className='text-2xl font-bold dark:text-white mb-4'>{decodeHtmlEntities(title)}</h3> : ''}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {albumData?.map((album, key) => {
                    const downloadUrl: any= type === "song" || album?.type === "song" ? album?.downloadUrl?.[album.downloadUrl.length - 1]?.link : false
                    const albumData = (<div className='album-item' key={key}>
                        <img 
                            className="h-auto max-w-full rounded-lg" 
                            src={album.image?.[album.image.length - 1].link} 
                            alt=""
                            onClick={()=>handleData(album, downloadUrl)}
                            />

                        <div className='my-2 grid lg:flex justify-between'>
                            <p onClick={()=>handleData(album, downloadUrl)}>{album.name?decodeHtmlEntities(album.name):''}</p>
                            {
                                type === "song" || album?.type === "song" ?(
                                    <button 
                                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-between download-btn`}
                                        onClick={(e)=>{
                                            downloadAudio(downloadUrl, decodeHtmlEntities(album.name+".mp3"))
                                        }}
                                        >
                                        <Download />Download
                                    </button>
                                ):''
                            }
                        </div>
                    </div>)
                    if (type === "song" || album?.type === "song") {
                        const downloadUrl = album?.downloadUrl?.[album.downloadUrl.length - 1]?.link
                        return downloadUrl?(
                            <div  
                                className='cursor-pointer'
                                key={key}
                            >
                                {albumData}
                            </div>
                        ):(<a key={key} href={album?.url} target="_blank" rel="noopener noreferrer">
                        {albumData}
                    </a>)
                    }
                    if (type === 'album' ||  album?.type === "album") {
                        return (
                            <Link key={key} to={`/album?id=${album?.id}&query=${album?.url}`}>
                                {albumData}
                            </Link>
                        )
                    }
                    if (album?.type === "playlist") {
                        return (
                            <Link key={key} to={`/playlist?id=${album?.id}`}>
                                {albumData}
                            </Link>
                        )
                    }
                    return albumData

                })}
            </div>
        </div>
    )
}

export default AlbumComponent