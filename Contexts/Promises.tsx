import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios"

// components and styles.

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE, SET_VIEW_SELECTED_STRAIN_INDEX, SET_VIEW_SELECTED_STRAIN, TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT } from "redux/main/mainSlice"

import { TOGGLE_PASSWORD_TOO_EZ, TOGGLE_PASSWORD_NUMBER_CHAR, TOGGLE_PASSWORD_SPECIAL_CHAR, TOGGLE_PASSWORD_UPPERCASE } from "redux/loginSignup/loginSignupSlice";
// import { SET_CURRENT_USER, SET_NON_GOOGLE_IMG_URL  } from "redux/logInOutGoogle/logInOutGoogleSlice"

// utils
import { strainsINTERFACE } from "utility/InterfaceTypes";
import { keysAndValuesFromStrain, nonGenericKeysAndValuesFromStrain, findStrainFromAllStrains } from "utility/utilityValues"

// queries
import { allStrainsGETquery } from "graphql/queries";


type PromiseTypes = {

    iPROMISEcookies: () => any;
    setallstrainsPROMISE: () => any;
    deleteEndpointsPROMISE: (strain:any) => any;
    strainIndexIncrementPROMISE: () => any;

    strainClickPROMISE: (strain:string) => any;
    
    // SIGNUP INPUT FUNCTIONS!
    passwordWordMatchPROMISE: () => any;
    localPasswordCheckerPROMISE: () => any;
}   

const PromiseDefaults = {
    iPROMISEcookies: () => {},
    setallstrainsPROMISE: () => {},
    deleteEndpointsPROMISE: (strain:any) => {},
    strainIndexIncrementPROMISE: () => {}, // strainIndexIncrementPROMISE: (index, strain) => {},
    strainClickPROMISE: (strain:string) => {},

    // SIGNUP INPUT FUNCTIONS!
    passwordWordMatchPROMISE: () => {},
    localPasswordCheckerPROMISE: () => {},
}

const PromiseContext = createContext<PromiseTypes>(PromiseDefaults)

export function usePromise() {
    return useContext(PromiseContext)
}

type Props = { children: ReactNode }

export function PromiseProvider({children}:Props) {

    const dispatch = useDispatch()

    // regex expressions since this is in Contexts which won't have access to Contexts/Regex
    const RhasNums = /[0-9]/g
    // regex 

    // state from mainSlice
    const VIEW_SELECTED_STRAIN = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN)
    const VIEW_SELECTED_STRAIN_INDEX = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN_INDEX)
    const ALL_STRAINS = useSelector( (state:RootState) => state.main.ALL_STRAINS)
    const SELECTED_STRAIN_SAVE_OR_NOT = useSelector( (state:RootState) => state.main.SELECTED_STRAIN_SAVE_OR_NOT)        

    // state from loginSignupSlice
    const PASSWORD_UPPERCASE = useSelector( (state:RootState) => state.loginSignup.PASSWORD_UPPERCASE)
    const PASSWORD_NUMBER_CHAR = useSelector( (state:RootState) => state.loginSignup.PASSWORD_NUMBER_CHAR)
    const PASSWORD_SPECIAL_CHAR = useSelector( (state:RootState) => state.loginSignup.PASSWORD_SPECIAL_CHAR)

    const SIGNUP_PASSWORD_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_PASSWORD_INPUT)
    const PASSWORD_TOO_EZ = useSelector( (state:RootState) => state.loginSignup.PASSWORD_TOO_EZ)
    const PASSWORD_TOO_EZ_BANK = useSelector( (state:RootState) => state.loginSignup.PASSWORD_TOO_EZ_BANK)

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

    function strainIndexIncrementPROMISE() {
        const keys = VIEW_SELECTED_STRAIN.strainKeys
        const values = VIEW_SELECTED_STRAIN.strainValues

        if (VIEW_SELECTED_STRAIN_INDEX === 1) {
            dispatch(SET_VIEW_SELECTED_STRAIN_KEY(keys.strain))
            dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(values.strain))            
   }
   if (VIEW_SELECTED_STRAIN_INDEX === 2) {
            dispatch(SET_VIEW_SELECTED_STRAIN_KEY(keys.dominant))
            dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(values.dominant))            
   }
   if (VIEW_SELECTED_STRAIN_INDEX === 3) {
            dispatch(SET_VIEW_SELECTED_STRAIN_KEY(keys.gold))
            dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(values.gold))            
   }
   if (VIEW_SELECTED_STRAIN_INDEX === 3) {
            dispatch(SET_VIEW_SELECTED_STRAIN_KEY(keys.nugget))
            dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(values.nugget))            
   }
   if (VIEW_SELECTED_STRAIN_INDEX === 4) {
       dispatch(SET_VIEW_SELECTED_STRAIN_KEY(keys.smell))
       dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(values.smell))            
   }
   if (VIEW_SELECTED_STRAIN_INDEX === 5) {
            dispatch(SET_VIEW_SELECTED_STRAIN_KEY(keys.taste))
            dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(values.taste))            
   }
   if (VIEW_SELECTED_STRAIN_INDEX === 6) {
            dispatch(SET_VIEW_SELECTED_STRAIN_KEY(keys.thc))
            dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(values.thc))            
   }
   if (VIEW_SELECTED_STRAIN_INDEX === 7) {
            dispatch(SET_VIEW_SELECTED_STRAIN_KEY(keys.cbd))
            dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(values.cbd))            
   }
   if (VIEW_SELECTED_STRAIN_INDEX === 8) {
            dispatch(SET_VIEW_SELECTED_STRAIN_KEY(keys.funfact))
            dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(values.funfact))            
   }
   if (VIEW_SELECTED_STRAIN_INDEX === 9) {
       console.log("9 golden lives!")
       // this is where we save the strain!
            dispatch(SET_VIEW_SELECTED_STRAIN_INDEX(0))
            dispatch(TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT())
   }
    }

    const strainClickPROMISE = async (strain:string) => {
            if (SELECTED_STRAIN_SAVE_OR_NOT) dispatch(TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT())

            let clickedStrain = findStrainFromAllStrains(strain, ALL_STRAINS)
            clickedStrain = await deleteEndpointsPROMISE(clickedStrain)
            .then( (clickedStrain:any) => {
                if (clickedStrain.strainValues) {    
                    if (strain.length > 1 && VIEW_SELECTED_STRAIN.strainValues && strain === VIEW_SELECTED_STRAIN.strainValues.strain ) {
                        dispatch(SET_VIEW_SELECTED_STRAIN(clickedStrain))    
                        dispatch(SET_VIEW_SELECTED_STRAIN_INDEX(VIEW_SELECTED_STRAIN_INDEX + 1))            
                    } else {
                        dispatch(SET_VIEW_SELECTED_STRAIN(clickedStrain))
                        dispatch(SET_VIEW_SELECTED_STRAIN_KEY("strain"))
                        dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(strain))
                        dispatch(SET_VIEW_SELECTED_STRAIN_INDEX(1))
                    }
                }
            })
    }

    const passwordWordMatchPROMISE = () => {
        let wordmatchPROMISE = new Promise( (resolve:any, reject:any) => {
            let nonNumChar = SIGNUP_PASSWORD_INPUT.match(/[^0-9]/g)?.join(" ").replace(/\s/g, '')
            resolve(nonNumChar)
            reject("you reject!")
        })
        wordmatchPROMISE
        .then( (wordGex) => {   
        let matchCount = 0;
        console.log('wordGex in the promise', wordGex)
    const matchCountPromise = new Promise(async(resolve:any, reject:any) => {
        await PASSWORD_TOO_EZ_BANK.forEach( (word) => {
            if (word === wordGex && PASSWORD_TOO_EZ === false) {
                matchCount++;
            } else if (word !== wordGex && PASSWORD_TOO_EZ === true) {
                return
            }
        })
        resolve(matchCount)
        reject("none")
    })
    matchCountPromise
    .then( (matchCount:any) => {
        if (matchCount > 0 && PASSWORD_TOO_EZ === false) {
            dispatch(TOGGLE_PASSWORD_TOO_EZ())
        } else if (matchCount === 0 && PASSWORD_TOO_EZ === true) {
            dispatch(TOGGLE_PASSWORD_TOO_EZ())
        }            
    })      
}) 
}

const localPasswordCheckerPROMISE = () => {            
    if (/\d+/g.test(SIGNUP_PASSWORD_INPUT) && PASSWORD_NUMBER_CHAR === false) {
        // if (PASSWORD_NUMBER_CHAR === false) {
            dispatch(TOGGLE_PASSWORD_NUMBER_CHAR())
            // }
        }
        else if (PASSWORD_NUMBER_CHAR === true && !/\d+/g.test(SIGNUP_PASSWORD_INPUT)) {
        dispatch(TOGGLE_PASSWORD_NUMBER_CHAR())
    }
    
    if (/[A-Z\s]/g.test(SIGNUP_PASSWORD_INPUT) && PASSWORD_UPPERCASE === false) {
        dispatch(TOGGLE_PASSWORD_UPPERCASE())
    } else if (!/[A-Z\s]/g.test(SIGNUP_PASSWORD_INPUT) && PASSWORD_UPPERCASE === true) {
        dispatch(TOGGLE_PASSWORD_UPPERCASE())
    }
    
    if (/[!@#$%^&()*?<>,.=+-]/g.test(SIGNUP_PASSWORD_INPUT) && PASSWORD_SPECIAL_CHAR === false) {
        dispatch(TOGGLE_PASSWORD_SPECIAL_CHAR())
    } else if (!/[!@#$%^&()*?<>,.=+-]/g.test(SIGNUP_PASSWORD_INPUT) && PASSWORD_SPECIAL_CHAR === true ){
        dispatch(TOGGLE_PASSWORD_SPECIAL_CHAR())
    }            
}

        const value = {
            iPROMISEcookies,
            setallstrainsPROMISE,
            deleteEndpointsPROMISE,
            strainIndexIncrementPROMISE,
            strainClickPROMISE,

            // SIGNUP INPUT FUNCTIONS!
            passwordWordMatchPROMISE,
            localPasswordCheckerPROMISE
        }        


    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}


