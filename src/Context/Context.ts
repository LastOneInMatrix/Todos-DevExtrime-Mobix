import { createContext } from "react";

const hideContext = createContext({
    show: false,
    setAuthenticated: (auth: boolean) => {}
});

export default hideContext;