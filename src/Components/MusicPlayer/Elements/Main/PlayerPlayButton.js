import React, {useEffect} from "react";
import { RiPlayFill } from "react-icons/ri";
import { IoIosPause } from "react-icons/io";
import shadow from "../../Utils/Shadows";
import colors from "../../Utils/Colors";
import gradients from "../../Utils/Gradients";
import { useDispatch, useSelector } from 'react-redux'

import {
    songClicked, setSongClick
} from "../../../../custom/Redux/Reducers/Album/AlbumSlice";
function PlayerPlayButton({
    uiState,
    setUiState,
    songState,
    audioRef,
    setSongState,
}) {
    const currentPalette = songState.currentSong[0]?.palette;
    const isSongClicked = useSelector(songClicked)
    const dispatch = useDispatch()
    const playPauseHandler = () => {
        setUiState({ ...uiState, songPlaying: !uiState.songPlaying });
        if (uiState.songPlaying === true) {
            const playPromise = audioRef.current.pause();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.pause();
                });
            }
            setSongState({ ...songState, isPlaying: false });
        } else if(!songState.isPlaying) {
            console.log('aaa 1', audioRef.current.isPlaying)
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                });
            }
            console.log('aaa 2')
            setSongState({ ...songState, isPlaying: true });
        }
    };

    useEffect(() => {
        if(isSongClicked) {
                audioRef.current.play();
                setTimeout(()=>{
                    setUiState({ ...uiState, songPlaying: true });
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then((audio) => {
                            audioRef.current.play();
                        });
                    }              
                }, 300)
                dispatch(setSongClick(false))
        }
    
    }, [isSongClicked])
    const PlayPauseButton = () => {
        if (uiState.songPlaying) {
            return (
                <IoIosPause className="player__control-icon player__control-icon--white" />
            );
        } else {
            return (
                <RiPlayFill className="player__control-icon player__control-icon--white" />
            );
        }
    };

    return (
        <div
            className="player__control--play-button"
            onClick={playPauseHandler}
            style={{
                boxShadow: `${shadow(
                    0,
                    0,
                    15,
                    0,
                    colors[`${currentPalette}`]
                )}`,
                background: `${gradients[`${currentPalette}`]}`,
            }}
        >
            <PlayPauseButton />
        </div>
    );
}

export default PlayerPlayButton;
