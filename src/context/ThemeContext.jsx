import {createContext} from "react";

const themeContext = createContext({
    primaryColor: 'red',
    textColor: 'black',
    backgroundColor: 'white',
    secondaryColor: 'blue',
    elevationColor: 'gray',
    secondaryFont: 'Roboto'
})

export default themeContext