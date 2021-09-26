import React  from "react";


export const themes = {
    hide: true,
    toggleTheme: () => {},
}




export const hideContext = React.createContext(
    themes.hide
);