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

// queries
import { allStrainsGETquery } from "graphql/queries";


type PromiseTypes = {

    iPROMISEcookies: () => any;
    setallstrainsPROMISE: () => any;
}   

const PromiseDefaults = {
    iPROMISEcookies: () => {},
    setallstrainsPROMISE: () => {},
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


        const value = {
            iPROMISEcookies,
            setallstrainsPROMISE
        }        


    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}


