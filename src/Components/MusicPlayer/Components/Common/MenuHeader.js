import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";

function MenuHeader({ setIsToggle, isToggle }) {
    return (
        <nav className="nav__header">
            <button 
                className="text-black end-2.5 bottom-2.5  focus:outline-none  font-medium rounded-lg text-sm px-2 py-2" 
                onClick={()=>{
                    setIsToggle(false)
                }}
            >{isToggle ? (<RiCloseCircleFill className="player__control-icon text-5xl"/>): ''}</button>
        </nav>
    );
}

export default MenuHeader;
