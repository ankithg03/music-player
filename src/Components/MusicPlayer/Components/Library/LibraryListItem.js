import React from "react";
import LibrarySongArtist from "../../Elements/Library/LibrarySongArtist";
import LibrarySongCover from "../../Elements/Library/LibrarySongCover";
import LibrarySongTitle from "../../Elements/Library/LibrarySongTitle";
import { useSelector } from 'react-redux'

import {
    currentPlaying
} from "../../../../custom/Redux/Reducers/Album/AlbumSlice";

function LibraryListItem({ song, setSongState, songState, audioRef }) {
    // console.log(song.id === songState.currentSong[0].id);
    // currentSong: [songData[(currentIndex + 1) % songData.length]],
    const currentPlayingData = useSelector(currentPlaying)
    const songData = [currentPlayingData]
    const changeCurrentSongHandler = () => {
        setTimeout(() => {
            setSongState({
                ...songState,
                currentSong: [songData[songData.findIndex((s) => s === song)]],
            });
            console.log(songState.isPlaying);
            if (songState.isPlaying) {
                const playPromise = audioRef.current.play();
                console.log(playPromise);
                if (playPromise !== undefined) {
                    playPromise.then((audio) => {
                        audioRef.current.play();
                    });
                }
            }
        }, 100);
    };
    return (
        <div
            onClick={changeCurrentSongHandler}
            className={`library__list-item ${
                song?.id === songState.currentSong[0]?.id ? "active-song" : ""
            }`}
        >
            <LibrarySongCover song={song} />
            <div className="library__song-column">
                <LibrarySongTitle song={song} />
                <LibrarySongArtist song={song} />
            </div>
        </div>
    );
}

export default LibraryListItem;
