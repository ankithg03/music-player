import React, {useState, useEffect} from "react";
import {
    RiPlayListLine,
    RiSunLine,
    RiMoonLine,
    RiSkipBackLine,
    RiSkipForwardLine,
    RiLoopRightFill,
    RiShuffleLine

} from "react-icons/ri";
import { useSelector } from 'react-redux'

import {
    currentPlaying
} from "../../../../custom/Redux/Reducers/Album/AlbumSlice";
import PlayerPlayButton from "../../Elements/Main/PlayerPlayButton";

function PlayerControl({
    uiState,
    setUiState,
    songState,
    setSongState,
    audioRef,
}) {
    const currentPlayingData = useSelector(currentPlaying)
    let queue = localStorage.getItem('queue-playing')
    queue = queue ? JSON.parse(queue) : [currentPlaying]
    const [songData, setSongData] = useState(queue)
    useEffect(() => {
        let queue = localStorage.getItem('queue-playing')
        queue = queue ? JSON.parse(queue) : [currentPlaying]
        setSongData(queue)
    }, [currentPlayingData])
    
    let currentIndex = songData.findIndex(
        (song) => song === songState.currentSong[0]
    );

    const previousSongHandler = () => {
        setTimeout(() => {
            if ((currentIndex - 1) % songData.length === -1) {
                setSongState({
                    ...songState,
                    currentSong: [songData[songData.length - 1]],
                });
            } else {
                setSongState({
                    ...songState,
                    currentSong: [
                        songData[(currentIndex - 1) % songData.length],
                    ],
                });
            }
            if (songState.isPlaying) {
                // this 2
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then((audio) => {
                        audioRef.current.play();
                    });
                }
            }
        }, 300);
    };

    const nextSongHandler = () => {
        setTimeout(() => {
            setSongState({
                ...songState,
                currentSong: [songData[(currentIndex + 1) % songData.length]],
            });
            if (!songState.isPlaying) {
                // this 2
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then((audio) => {
                        audioRef.current.play();
                    });
                }
            }
        }, 150);
    };

    const darkModeToggleHandler = () => {
        setUiState({ ...uiState, darkMode: !uiState.darkMode });
    };

    const libraryToggleHandler = (e) => {
        if (window.visualViewport.width < 900) {
            setUiState({ ...uiState, libraryShown: true });
            console.log("changed");
        }
    };

    const DarkModeButton = () => {
        if (!uiState.darkMode) {
            return (
                <RiMoonLine
                    className="player__control-icon"
                    onClick={darkModeToggleHandler}
                />
            );
        } else {
            return (
                <RiSunLine
                    className="player__control-icon"
                    onClick={darkModeToggleHandler}
                />
            );
        }
    };
    const playMode = () => {
        if (!uiState.loop) {
            return (
                <RiShuffleLine
                    className="player__control-icon"
                    onClick={()=>{setUiState({...uiState, loop: true})}}
                />
            );
        } else {
            return (
                <RiLoopRightFill
                    className="player__control-icon"
                    onClick={()=>{setUiState({...uiState, loop: false})}}
                />
            );
        }
    };

    return (
        <>
        <div className="player__control">
            <RiPlayListLine
                uiState={uiState}
                setUiState={setUiState}
                className="player__control-icon disabled-on-desktop"
                onClick={libraryToggleHandler}
            />
            <RiSkipBackLine
                className="player__control-icon"
                onClick={previousSongHandler}
            />
            <PlayerPlayButton
                uiState={uiState}
                setUiState={setUiState}
                setSongState={setSongState}
                songState={songState}
                audioRef={audioRef}
            />
            <RiSkipForwardLine
                className="player__control-icon"
                onClick={nextSongHandler}
            />
            {playMode()}
        </div>
        <div className="player__darkMode">
            <DarkModeButton />
        </div>
        </>
    );
}

export default PlayerControl;
