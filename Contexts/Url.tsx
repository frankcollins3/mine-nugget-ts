import { createContext, useContext, ReactNode, useState } from "react";


export default function UrlProvider( { children }, context ) {
    console.log('context in the URLProvider')
    console.log(context)

    type urlTypes = {
        allStrain: string;
    }
    
    const urlDefaults: urlTypes = {
        allStrain: 'pages/api/strains/strain' 
    }

    const [urlStrain, setUrlStrain] = useState<string>('pages/api/strains/strain')

    const exportvalues = {

    }

    return (
        <h1> hey </h1> 
    )
}