import { createContext, useContext, ReactNode, useState } from "react";

    type urlTypes = {
        allStrain: string;
        userStrainPost: string;
        userStrainGet: string;
        getSpecifiedStrain: string;
        getID: string;
        allUsernamesForID: string;
        specifyUserGET: string;
        dbFirstLetter: string;
        dbNumber: string;
        // userStrains: string;    
        getAllUsers: string;    
        POSTuser: string;        
    }
    
    const urlDefaults: urlTypes = {
        allStrain: '/api/strains/strain',
        userStrainPost: '/api/strains/userstrainpost',
        userStrainGet: '/api/strains/getuserstrains',
        getSpecifiedStrain: '/api/strains/getSpecifiedStrain',
        getID: '/api/strains/getIDwithNAME',
        allUsernamesForID: '/api/strains/AllUsernamesForStrain',
        dbFirstLetter: '/api/strains/dbFirstLetter',
        specifyUserGET: '/api/user/GETspecifyuser',
        dbNumber: '/api/strains/dbNumber',
        // userStrains: '/api/strains/postuserstrains',        
        // userStrains: '/api/strains/userstrainpost',
        getAllUsers: '/api/user/GetAllUsers',
        POSTuser: '/api/user/POSTuser'
        // pages/api/strains/userstrainpost.ts
    }

const UrlContext = createContext<urlTypes>(urlDefaults);

export function useUrl() {
    return useContext(UrlContext);
}

export default function UrlProvider( { children }, context ) {
        const [allStrain, setAllStrain] = useState<string>('/api/strains/strain')
        const [getSpecifiedStrain, setGetSpecifiedString] = useState<string>('/api/strains/getSpecifiedStrain')
        const [dbFirstLetter, setDbFirstLetter] = useState<string>('/api/strains/dbFirstLetter')
        const [dbNumber, setDbNumber] = useState<string>('/api/strains/dbFirstLetter')
        const [userStrainPost, setUserStrainPost] = useState<string>('/api/strains/userstrainpost')
        const [userStrainGet, setUserStrainGet] = useState<string>('/api/strains/getuserstrains')
        const [specifyUserGET, setSpecifyUserGET] = useState<string>('/api/user/GETspecifyuser')
        const [getID, setGetID] = useState<string>('/api/strains/getIDwithNAME')
        const [allUsernamesForID, setAllUsernamesForID] = useState<string>('/api/strains/allUsernamesForId')
        const [getAllUsers, setGetAllUsers] = useState<string>('/api/user/GetAllUsers')
        const [POSTuser, setPOSTuser] = useState<string>('/api/user/POSTuser')
        // const [userStrains, setUserStrains] = useState<string>('/api/strains/userstrainpost')
            
        const exportvalues = {
            allStrain,
            userStrainPost,
            userStrainGet,
            getSpecifiedStrain,
            getID,
            allUsernamesForID,
            specifyUserGET,
            dbFirstLetter,
            dbNumber,
            getAllUsers,
            POSTuser      
        }

    return (
        <>
            <UrlContext.Provider value={exportvalues}>
                {children}
            </UrlContext.Provider>
        </>
    );
}

