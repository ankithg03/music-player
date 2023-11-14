import React from "react";
import PlayerControl from "../Main/PlayerControl";
import SeekControl from "../Main/SeekControl";
function Player({
    uiState,
    setUiState,
    songState,
    setSongState,
    audioRef,
    seekWidth,
    audioSectionRef
}) {
    return (
        <div className="player player w-full sm:w-fit cursor-auto" onClick={(e)=>{
            console.log(e.target)
            e.preventDefault()
        }}
        ref={audioSectionRef}>
            <SeekControl
                uiState={uiState}
                setUiState={setUiState}
                songState={songState}
                setSongState={setSongState}
                audioRef={audioRef}
                seekWidth={seekWidth}
            />
            <PlayerControl
                uiState={uiState}
                songState={songState}
                setUiState={setUiState}
                setSongState={setSongState}
                audioRef={audioRef}
            />
        </div>
    );
}

export default Player;
