import { createContext, useContext, ReactNode, useState } from "react";

    type urlTypes = {
        allStrain: string;
        userStrainPost: string;
        getSpecifiedStrain: string;
        dbFirstLetter: string;
        dbNumber: string;
        userStrains: string;  
        getAllUsers: string;

    }
    
    const urlDefaults: urlTypes = {
        allStrain: '/api/strains/strain',
        userStrainPost: '/api/strains/userstrainpost',
        getSpecifiedStrain: '/api/strains/getSpecifiedStrain',
        dbFirstLetter: '/api/strains/dbFirstLetter',
        dbNumber: '/api/strains/dbNumber',
        userStrains: '/api/strains/postuserstrains',        
        getAllUsers: '/api/user/GetAllUsers'
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
        const [userStrains, setUserStrains] = useState<string>('/api/strains/postuserstrains')

        const [getAllUsers, setGetAllUsers] = useState<string>('/api/user/GetAllUsers')
        // const [userStrains, setUserStrains] = useState<string>('/api/strains/userstrainpost')

    console.log(context)

        const exportvalues = {
            allStrain,
            userStrainPost,
            getSpecifiedStrain,
            dbFirstLetter,
            dbNumber,
            userStrains,
            getAllUsers,                     
        }

    return (
        <>
            <UrlContext.Provider value={exportvalues}>
                {children}
            </UrlContext.Provider>
        </>
    );
}

