import React, {useEffect} from "react";
import { RiPlayFill } from "react-icons/ri";
import { IoIosPause } from "react-icons/io";
import shadow from "../../Utils/Shadows";
import colors from "../../Utils/Colors";
import gradients from "../../Utils/Gradients";
import { useDispatch, useSelector } from 'react-redux'

import {
    currentPlaying, songClicked, setSongClick
} from "../../../../custom/Redux/Reducers/Album/AlbumSlice";
function PlayerPlayButton({
    uiState,
    setUiState,
    songState,
    audioRef,
    setSongState,
}) {
    const currentPalette = songState.currentSong[0].palette;
    const isSongClicked = useSelector(songClicked)
    const dispatch = useDispatch()
    const playPauseHandler = () => {
        setUiState({ ...uiState, songPlaying: !uiState.songPlaying });
        if (uiState.songPlaying === true) {
            audioRef.current.pause();
            setSongState({ ...songState, isPlaying: false });
        } else {
            audioRef.current.play();
            setSongState({ ...songState, isPlaying: true });
        }
    };

    useEffect(() => {
        if(isSongClicked) {
                console.log('aaa music 2', uiState.songPlaying === true)
                audioRef.current.play();
                setTimeout(()=>{
                    setUiState({ ...uiState, songPlaying: !uiState.songPlaying });
                    audioRef.current.play();                   
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
