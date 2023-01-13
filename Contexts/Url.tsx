import { createContext, useContext, ReactNode, useState } from "react";

    type urlTypes = {
        allStrain: string;
    }
    
    const urlDefaults: urlTypes = {
        allStrain: 'pages/api/strains/strain' 
    }

const UrlContext = createContext<urlTypes>(urlDefaults);

export function useUrl() {
    return useContext(UrlContext);
}


export default function UrlProvider( { children } ) {
        const [allStrain, setAllStrain] = useState<string>('pages/api/strains/strain')
        
        const exportvalues = {
            allStrain
        }

    return (
        <>
            <UrlContext.Provider value={exportvalues}>
                {children}
            </UrlContext.Provider>
        </>
    );
}
