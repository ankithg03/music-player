import React from "react";
import MenuIcon from "../../Elements/Common/MenuIcon";
function MenuHeader({ uiState, setUiState }) {
    return (
        <nav className="nav__header">
            <MenuIcon uiState={uiState} setUiState={setUiState} />
        </nav>
    );
}

export default MenuHeader;
