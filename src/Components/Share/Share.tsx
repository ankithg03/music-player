import React, { useCallback, useEffect, useState } from 'react'
import { Route, Link, Routes, useLocation } from 'react-router-dom';
import { getTitle } from '../util/getTitle';

const Share = (props: any) => {
    const location = useLocation();
    const { pathname } = location;

    return <div className='flex ml-auto items-end'>
        <button className='text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' 
            onClick={(e)=>{
                if(navigator?.share){
                    navigator.share({
                        url:window?.location.href, 
                        title: "Music player",
                        text: getTitle(pathname)
                    })
                }
            }}>
            Share
        </button>
    </div>
}

export default Share
