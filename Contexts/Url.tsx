import { createContext, useContext, ReactNode, useState } from "react";

    type urlTypes = {
        allStrain: string;
        userStrainPost: string;
        getSpecifiedStrain: string;
        dbFirstLetter: string;
        dbNumber: string;
    }
    
    const urlDefaults: urlTypes = {
        allStrain: '/api/strains/strain',
        userStrainPost: '/api/strains/userstrainpost',
        getSpecifiedStrain: '/api/strains/getSpecifiedStrain',
        dbFirstLetter: 'pages/api/strains/dbFirstLetter',
        dbNumber: 'pages/api/strains/dbNumber'
    }

const UrlContext = createContext<urlTypes>(urlDefaults);

export function useUrl() {
    return useContext(UrlContext);
}


export default function UrlProvider( { children }, context ) {
        const [allStrain, setAllStrain] = useState<string>('pages/api/strains/strain')
        const [userStrainPost, setUserStrainPost] = useState<string>('/api/strains/userstrainpost')
        const [getSpecifiedStrain, setGetSpecifiedString] = useState<string>('/api/strains/getSpecifiedStrain')
        const [dbFirstLetter, setDbFirstLetter] = useState<string>('/api/strains/dbFirstLetter')
        const [dbNumber, setDbNumber] = useState<string>('/api/strains/dbFirstLetter')

    console.log(context)

        const exportvalues = {
            allStrain,
            userStrainPost,
            getSpecifiedStrain,
            dbFirstLetter,
            dbNumber
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
