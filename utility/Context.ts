import { createContext, useContext, useState} from 'react'



async function globalContext () {
    const [url, setUrl] = useState()
    const [currentStrain, setCurrentStrain] = useState()

    type containerContext = {
        url: '',
        setUrl(value: string): void,            
    }

    // const globeContext = createContext<containerContext>
    const globeContext = createContext(<containerContext>)

    console.log("global context function")
    let hi:string = 'hey'
    return {hey: hi}
}
export default globalContext