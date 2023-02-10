import { createContext, useContext, ReactNode, useState } from "react";

    type urlTypes = {
        allStrain: string;
        userStrainPost: string;
        userStrainGet: string;
        getSpecifiedStrain: string;
        getID: string;
        allUsernamesForID: string;
        specifyUserGET: string;
        myStrainsForUsersId: string;
        dbFirstLetter: string;
        dbNumber: string;   
        getAllUsers: string;    
        getALLmines: string;    
        deleteMinesUrl: string;
        POSTuser: string;              
        minePOSTurl: string;
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
        myStrainsForUsersId: '/api/strains/userStrainsForUsersId',
        dbNumber: '/api/strains/dbNumber',
        getAllUsers: '/api/user/GetAllUsers',
        POSTuser: '/api/user/POSTuser',
        minePOSTurl: '/api/strains/minePOST',
        getALLmines: '/api/strains/GETallmines',
        deleteMinesUrl: '/api/strains/DELETEmines'
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
        const [myStrainsForUsersId, setMyStrainsForUsersId] = useState<string>('/api/strains/userStrainsForUsersId')
        const [getID, setGetID] = useState<string>('/api/strains/getIDwithNAME')
        const [allUsernamesForID, setAllUsernamesForID] = useState<string>('/api/strains/allUsernamesForId')
        const [getAllUsers, setGetAllUsers] = useState<string>('/api/user/GetAllUsers')
        const [getALLmines, setGetALLMines] = useState<string>('/api/strains/GETallmines')
        const [deleteMinesUrl, setDeleteMinesUrl] = useState<string>('/api/strains/DELETEmines')
        const [POSTuser, setPOSTuser] = useState<string>('/api/user/POSTuser')

        const [minePOSTurl, setMinePOSTUrl] = useState<string>('/api/strains/minePOST')
            
        const exportvalues = {
            allStrain,
            getSpecifiedStrain,
            dbFirstLetter,
            dbNumber,
            userStrainPost,
            userStrainGet,
            myStrainsForUsersId,
            getID,
            allUsernamesForID,
            specifyUserGET,
            getAllUsers,
            getALLmines,
            POSTuser,
            minePOSTurl,
            deleteMinesUrl,
        }

    return (
        <>
            <UrlContext.Provider value={exportvalues}>
                {children}
            </UrlContext.Provider>
        </>
    );
}

