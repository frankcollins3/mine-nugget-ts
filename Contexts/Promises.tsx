import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios"

// components and styles.

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_ALL_STRAINS } from "redux/main/mainSlice"
// import { SET_CURRENT_USER, SET_NON_GOOGLE_IMG_URL  } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utils
import { strainsINTERFACE } from "utility/InterfaceTypes";
import { keysAndValuesFromStrain, nonGenericKeysAndValuesFromStrain } from "utility/utilityValues"

// queries
import { allStrainsGETquery } from "graphql/queries";


type PromiseTypes = {

    iPROMISEcookies: () => any;
    setallstrainsPROMISE: () => any;
    deleteEndpointsPROMISE: (strain:any) => any;
}   

const PromiseDefaults = {
    iPROMISEcookies: () => {},
    setallstrainsPROMISE: () => {},
    deleteEndpointsPROMISE: (strain:any) => {},
}

const PromiseContext = createContext<PromiseTypes>(PromiseDefaults)

export function usePromise() {
    return useContext(PromiseContext)
}

type Props = { children: ReactNode }

export function PromiseProvider({children}:Props) {

    const dispatch = useDispatch()

    // main app and user PROMISES
    function iPROMISEcookies() {
        const getCookiePROMISE = new Promise((cookies:any, milk:any) => {
            if (document.cookie) {
                const webcookies = document.cookie.split('; ');
                cookies(webcookies)
                milk('spill')
            }
        })
        return getCookiePROMISE
        .then( (c:any) => {
            let cookieIdString = c[1]
            if (cookieIdString.slice(3)) {
                const sliceID = cookieIdString.slice(3)
                return sliceID || "no ID to return! sorry!"
                // setTokenID(sliceID)
            }
        })
    }

    function setallstrainsPROMISE() {
        return new Promise( (resolve:any, reject:any) => {
            return axios.post('/api/graphql', { query: `${allStrainsGETquery}`})
            .then((response:any) => {
              let strains:strainsINTERFACE = response.data
              strains = response.data.data.allStrainsGET
              resolve(strains)
            })
            .catch((error) => {
              reject(error)
            });
        })
    }

    function deleteEndpointsPROMISE(strain:any) {   // cant do generic because the endpoints cant be deleted and won't change returned data from generics because different components need it.
        return new Promise( (resolve:any, reject:any) => {
            const keysAndValues = nonGenericKeysAndValuesFromStrain(strain)
            const keys = keysAndValues.strainKeys
            const values = keysAndValues.strainValues
            const strainKeys = { strain: keys[0], dominant: keys[2], funfact: keys[3], taste: keys[5], smell: keys[6], gold: keys[7], nugget: keys[8], thc: keys[9], cbd: keys[10] }
            const strainValues = { strain: values[0], dominant: values[2], funfact: values[3], taste: values[5], smell: values[6], gold: values[7], nugget: values[8], thc: values[9], cbd: values[10] }            
            resolve( { strainKeys: strainKeys, strainValues: strainValues} )
            reject("nothing")
        })        
    }


        const value = {
            iPROMISEcookies,
            setallstrainsPROMISE,
            deleteEndpointsPROMISE
        }        


    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}


