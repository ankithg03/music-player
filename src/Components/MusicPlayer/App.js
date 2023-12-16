import React, { useRef, useState, useEffect } from "react";
import "./Styles/app.scss";
import MenuHeader from "./Components/Common/MenuHeader";
import Artwork from "./Elements/Main/Artwork";
import SongInfo from "./Components/Main/SongInfo";
import Player from "./Components/PlayerInterface/Player";
import Library from "./Layouts/Library";
import { useSelector } from 'react-redux'

import {
    currentPlaying
} from "../../custom/Redux/Reducers/Album/AlbumSlice";

function App(props) {
    // Detect if the user has dark mode turned on
    let userDarkModeApplied = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    const currentPlayingData = useSelector(currentPlaying)
    let queue = localStorage.getItem('queue-playing')
    queue = queue ? JSON.parse(queue) : [currentPlaying]
    const [songData, setSongData] = useState(queue)
    useEffect(() => {
        let queue = localStorage.getItem('queue-playing')
        queue = queue ? JSON.parse(queue) : [currentPlaying]
        setSongData(queue)
    }, [currentPlayingData])
    // UI Components State
    const [uiState, setUiState] = useState({
        aboutShown: false,
        libraryShown: false,
        libraryPinned: false,
        darkMode: userDarkModeApplied ? true : false,
        coverSpinning: false,
        songPlaying: false,
        seekWidth: 0,
        loop: false
    });
    // Song States
    const [songState, setSongState] = useState({
        currentSong: [songData[0]],
        isPlaying: false,
        elapsed: 0,
        duration: 0,
    });
    useEffect(() => {
        if(songState?.currentSong?.[0]?.id && currentPlayingData?.id && songState?.currentSong?.[0]?.id !== currentPlayingData?.id) {
            setSongState({...songState, currentSong: [songData[0]], isPlaying: true})
        }
    
    }, [songData?.[0]?.id], setSongState)
    useEffect(()=>{
        console.log('aaa', songState, songState.currentSong?.[0]?.id, [currentPlayingData])
        if(!songState.currentSong?.[0]?.id){
            setSongState({...songState, currentSong: [currentPlayingData]})
        }
    }, [currentPlayingData])
    const audioSectionRef = props.audioRef
    console.log('aaaa 0', songState, currentPlaying, currentPlayingData, audioSectionRef)

    // Reference for the audio
    const audioRef = useRef(null);
    // console.log('aaa music', audioRef, {...songState, currentSong: [songData[0]], isPlaying: true}, 'old--', songState)

    // Setting the background as the cover artwork
    let currentIndex = songData.findIndex(
        (song) => song.id === songState.currentSong?.[0]?.id
    );

    const nextSongHandler = () => {
        console.log('aaa 1',songData.length, [songData[(currentIndex + 1) % songData.length]], currentIndex, (currentIndex + 1) % songData.length)
        setTimeout(() => {
            setSongState({
                ...songState,
                currentSong: [songData[(currentIndex + 1) % songData.length]],
            });
            if (!songState.isPlaying) {
                try{
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then((audio) => {
                            audioRef.current.play();
                        });
                    }
                } catch {

                }
            }
        }, 150);
    };

    const songEndHandler = async () => {
        let currentIndex = songData.findIndex(
            (song) => song === songState.currentSong[0]
        );
        await setSongState({
            ...songState,
            currentSong: [songData[(currentIndex + 1) % songData.length]],
        });
        if(uiState.loop && songState.isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                });
            }
        } else {
            nextSongHandler()
        }
    };

    const songInfoHandler = (e) => {
        const elapsed = e.target.currentTime;
        const duration = e.target.duration;
        setSongState({
            ...songState,
            duration: duration,
            elapsed: elapsed,
        });
    };

    if(!currentPlayingData) {
        return null
    }
    return (
        <div
            className={`app__wrapper rounded-tl-xl rounded-tr-xl cursor-auto sm:cursor-pointer ${
                uiState.darkMode ? "dark-mode" : "light-mode"
            }`}
            style={{
                backdropFilter: `${
                    uiState.libraryShown || uiState.aboutShown
                        ? "none"
                        : "blur(1rem)"
                }`,
                WebkitBackdropFilter: `${
                    uiState.libraryShown || uiState.aboutShown
                        ? "none"
                        : "blur(1.5rem)"
                }`,
            }}
        >
            {/* The menu header only displays the menu options */}
            {/* It only needs access to isNavMenuShown, setNavMenuShown, */}
            <MenuHeader 
                uiState={uiState} 
                setUiState={setUiState} 
                playerModel={props?.playerModel}
                setIsToggle={props?.setIsToggle}
                isToggle={props?.isToggle}
            />
            <Player
                uiState={uiState}
                setUiState={setUiState}
                audioRef={audioRef}
                songState={songState}
                setSongState={setSongState}
                audioSectionRef={audioSectionRef}
            />
            <Artwork uiState={uiState} songState={songState} />
            <SongInfo songState={songState} />
            
            <Library
                uiState={uiState}
                setUiState={setUiState}
                songState={songState}
                setSongState={setSongState}
                songData={songData}
                audioRef={audioRef}
            />
            <audio
                ref={audioRef}
                src={songState.currentSong[0]?.audio}
                onTimeUpdate={songInfoHandler}
                onLoadedMetadata={songInfoHandler}
                onEnded={songEndHandler}
            ></audio>
        </div>
    );
}

export default App;
