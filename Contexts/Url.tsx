import { createContext, useContext, ReactNode, useState } from "react";

    type urlTypes = {
        allStrain: string;
        userStrainPost: string;
        getSpecifiedString: string;
    }
    
    const urlDefaults: urlTypes = {
        allStrain: '/api/strains/strain',
        userStrainPost: '/api/strains/userstrainpost',
        getSpecifiedString: '/api/strains/getSpecifiedStrain'
    }

const UrlContext = createContext<urlTypes>(urlDefaults);

export function useUrl() {
    return useContext(UrlContext);
}


export default function UrlProvider( { children }, context ) {
        const [allStrain, setAllStrain] = useState<string>('pages/api/strains/strain')
        const [userStrainPost, setUserStrainPost] = useState<string>('/api/strains/userstrainpost')
        const [getSpecifiedString, setGetSpecifiedString] = useState<string>('/api/strains/getSpecifiedStrain')

    console.log(context)

        const exportvalues = {
            allStrain,
            userStrainPost,
            getSpecifiedString
            // {no_set_state_exported: 'no reason to change strings'}
        }

    return (
        <>
            <UrlContext.Provider value={exportvalues}>
                {children}
            </UrlContext.Provider>
        </>
    );
}
