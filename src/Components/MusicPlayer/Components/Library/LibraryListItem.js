import React, { useEffect, useState } from "react";
import LibrarySongArtist from "../../Elements/Library/LibrarySongArtist";
import LibrarySongCover from "../../Elements/Library/LibrarySongCover";
import LibrarySongTitle from "../../Elements/Library/LibrarySongTitle";
import { useSelector } from 'react-redux'

import {
    currentPlaying
} from "../../../../custom/Redux/Reducers/Album/AlbumSlice";

function LibraryListItem({ song, setSongState, songState, audioRef }) {
    // currentSong: [songData[(currentIndex + 1) % songData.length]],
    const currentPlayingData = useSelector(currentPlaying)
    let queue = localStorage.getItem('queue-playing')
    queue = queue ? JSON.parse(queue) : [currentPlaying]
    const [songData, setSongData] = useState(queue)
    useEffect(() => {
        let queue = localStorage.getItem('queue-playing')
        queue = queue ? JSON.parse(queue) : [currentPlaying]
        setSongData(queue)
    }, [currentPlayingData])
    const playingSong = songState.currentSong[0]
    const changeCurrentSongHandler = () => {
        setTimeout(() => {
            setSongState({
                ...songState,
                currentSong: [songData[songData.findIndex((s) => s.id === song.id)]],
            });
            if (songState.isPlaying) {
                // this 1
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then((audio) => {
                        audioRef.current.play();
                    });
                }
            }
        }, 150);
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
