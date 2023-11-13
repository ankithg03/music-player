import React from 'react'
import './AlbumComponent.css'
type AlbumData = {
    albumData: any[]|undefined,
    title: string|undefined
}
const AlbumComponent = ({albumData, title}:AlbumData) => {
    if(!albumData) return null
    return (
        <div>
            <h3 className='text-2xl font-bold dark:text-white mb-4'>{title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {albumData?.map((album)=>{
                return <div className='album-item'>
                    <img className="h-auto max-w-full rounded-lg" src={album.image?.[album.image.length-1].link} alt="" />

                    <p className='my-2'>{album.name}</p>
                </div>
            })}
            </div>
        </div>
    )
}

export default AlbumComponent