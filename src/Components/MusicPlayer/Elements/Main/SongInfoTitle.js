import React from "react";

function SongInfoTitle({ songState }) {
    function decodeHtmlEntities(input) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = input;
        return textarea.value;
    }
    return (
        <h1 className="song-info__title">{decodeHtmlEntities(songState.currentSong[0]?.title)}</h1>
    );
}

export default SongInfoTitle;
