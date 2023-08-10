import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios"

// components and styles.

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { 
    SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE, SET_VIEW_SELECTED_STRAIN_INDEX, SET_VIEW_SELECTED_STRAIN, TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT,
    SET_ALL_STRAINS, SET_ALL_USERS, SET_ALL_USERNAMES, SET_ALL_EMAILS,
} from "redux/main/mainSlice"

import { 
    TOGGLE_PASSWORD_TOO_EZ, TOGGLE_PASSWORD_LENGTH_PASS, TOGGLE_PASSWORD_NUMBER_CHAR, TOGGLE_PASSWORD_SPECIAL_CHAR, TOGGLE_PASSWORD_UPPERCASE,
    TOGGLE_EMAIL_EXTENSION, TOGGLE_EMAIL_UNIQUE, SET_EMAIL_EXTENSION_UI,
    TOGGLE_USERNAME_UNIQUE, TOGGLE_USERNAME_LENGTH,
 } from "redux/loginSignup/loginSignupSlice";
 
 import { 
    TOGGLE_PLAYING, SET_PLAYING_STRAIN, SET_PLAYING_PARENT_KING, SET_PLAYING_PARENT_QUEEN,
    SET_PLAYING_GUESS_RIGHT, SET_PLAYING_GUESS_WRONG_1, SET_PLAYING_GUESS_WRONG_2, SET_PLAYING_GUESS_WRONG_3
 } from "redux/familyTree/familyTreeSlice"
//  TOGGLE_PLAYING, SET_PLAYING_STRAIN, SET_PLAYING_PARENT_KING, SET_PLAYING_PARENT_QUEEN, 
//  SET_PLAYING_GUESS_RIGHT, SET_PLAYING_GUESS_WRONG_1, SET_PLAYING_GUESS_WRONG_2, SET_PLAYING_GUESS_WRONG_3

 

// utils
import { strainsINTERFACE, minersINTERFACE } from "utility/InterfaceTypes";
import { getCookie, nonGenericKeysAndValuesFromStrain, findStrainFromAllStrains, randomValueFromArray } from "utility/utilityValues"

// queries
import { allStrainsGETquery, allMinersGETquery, userSignupQueryStringFunc, userLoginQueryStringFunc, getUserWithIdStringFunc } from "graphql/queries";
import GoldRequestQL from "utility/GoldRequestQL";

type PromiseTypes = {

    iPROMISEcookies: () => any;
    setallstrainsPROMISE: () => any;
    setallminersPROMISE: () => any;
    deleteEndpointsPROMISE: (strain:any) => any;
    strainIndexIncrementPROMISE: () => any;

    strainClickPROMISE: (strain:string) => any;
    
    // SIGNUP INPUT FUNCTIONS!
    passwordWordMatchPROMISE: () => any;
    emailInputPROMISE: () => any;
    usernameInputPROMISE: () => any;
    localPasswordCheckerPROMISE: () => any;
    userSignupPROMISE: () => any;
    userLoginPROMISE: () => any;
    rememberMeCookiePROMISE: () => any;
    familyTreeStrainsPROMISE: () => any;
}   

const PromiseDefaults = {
    iPROMISEcookies: () => {},
    setallstrainsPROMISE: () => {},
    setallminersPROMISE: () => {},
    deleteEndpointsPROMISE: (strain:any) => {},
    strainIndexIncrementPROMISE: () => {}, // strainIndexIncrementPROMISE: (index, strain) => {},
    strainClickPROMISE: (strain:string) => {},

    // SIGNUP INPUT FUNCTIONS!
    passwordWordMatchPROMISE: () => {},
    emailInputPROMISE: () => {},
    usernameInputPROMISE: () => {},
    localPasswordCheckerPROMISE: () => {},
    userSignupPROMISE: () => {},
    userLoginPROMISE: () => {},
    rememberMeCookiePROMISE: () => {},
    familyTreeStrainsPROMISE: () => {},
}

const PromiseContext = createContext<PromiseTypes>(PromiseDefaults)

export function usePromise() {
    return useContext(PromiseContext)
}

type Props = { children: ReactNode }

export function PromiseProvider({children}:Props) {

    const dispatch = useDispatch()

    // regex expressions since this is in Contexts which won't have access to Contexts/Regex

    // state from mainSlice
    const VIEW_SELECTED_STRAIN = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN)
    const VIEW_SELECTED_STRAIN_INDEX = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN_INDEX)
    const ALL_STRAINS = useSelector( (state:RootState) => state.main.ALL_STRAINS)
    const SELECTED_STRAIN_SAVE_OR_NOT = useSelector( (state:RootState) => state.main.SELECTED_STRAIN_SAVE_OR_NOT)        
    const ALL_EMAILS = useSelector( (state:RootState) => state.main.ALL_EMAILS)        
    const ALL_USERNAMES = useSelector( (state:RootState) => state.main.ALL_USERNAMES)        

    // state from loginSignupSlice
    const PASSWORD_UPPERCASE = useSelector( (state:RootState) => state.loginSignup.PASSWORD_UPPERCASE)
    const PASSWORD_LENGTH_PASS = useSelector( (state:RootState) => state.loginSignup.PASSWORD_LENGTH_PASS)
    const PASSWORD_NUMBER_CHAR = useSelector( (state:RootState) => state.loginSignup.PASSWORD_NUMBER_CHAR)
    const PASSWORD_SPECIAL_CHAR = useSelector( (state:RootState) => state.loginSignup.PASSWORD_SPECIAL_CHAR)

    const SIGNUP_PASSWORD_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_PASSWORD_INPUT)
    const PASSWORD_TOO_EZ = useSelector( (state:RootState) => state.loginSignup.PASSWORD_TOO_EZ)
    const PASSWORD_TOO_EZ_BANK = useSelector( (state:RootState) => state.loginSignup.PASSWORD_TOO_EZ_BANK)

    const SIGNUP_EMAIL_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_EMAIL_INPUT)
    const EMAIL_EXTENSION = useSelector( (state:RootState) => state.loginSignup.EMAIL_EXTENSION)
    const EMAIL_UNIQUE = useSelector( (state:RootState) => state.loginSignup.EMAIL_UNIQUE)
    
    const SIGNUP_USERNAME_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_USERNAME_INPUT)
    const USERNAME_LENGTH = useSelector( (state:RootState) => state.loginSignup.USERNAME_LENGTH)
    const USERNAME_UNIQUE = useSelector( (state:RootState) => state.loginSignup.USERNAME_UNIQUE)
    
    const SIGNUP_AGE_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_AGE_INPUT)

    const LOGIN_EMAIL_INPUT = useSelector( (state:RootState) => state.loginSignup.LOGIN_EMAIL_INPUT)
    const LOGIN_PASSWORD_INPUT = useSelector( (state:RootState) => state.loginSignup.LOGIN_PASSWORD_INPUT)

    const REMEMBER_ME_USER = useSelector( (state:RootState) => state.loginSignup.REMEMBER_ME_USER)


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
            return GoldRequestQL(`${allStrainsGETquery}`)
            .then((response:any) => {
              let strains:strainsINTERFACE = response.data
              strains = response.data.data.allStrainsGET
              dispatch(SET_ALL_STRAINS(strains))
              resolve(strains)
            })
            .catch((error) => {
              reject(error)
            });
        })
    }


    function setallminersPROMISE() {
        return GoldRequestQL(`${allMinersGETquery}`)
        .then( (response:any) => {
            console.log('response in promise', response)
            const miners = response.data.data.allMinersGET

            let allusernames = miners.map(users => users.username)
            let allemails = miners.map(users => users.email)
            dispatch(SET_ALL_USERNAMES(allusernames))
            dispatch(SET_ALL_EMAILS(allemails))
            return miners

        }).catch( (err) => {
            console.log('err', err)
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
    } else if (SIGNUP_PASSWORD_INPUT.length) {
            if (SIGNUP_PASSWORD_INPUT.length >= 8 && PASSWORD_LENGTH_PASS === false) {
                dispatch(TOGGLE_PASSWORD_LENGTH_PASS())
            } else if (SIGNUP_PASSWORD_INPUT.length < 8 && PASSWORD_LENGTH_PASS === true) {
                dispatch(TOGGLE_PASSWORD_LENGTH_PASS())
            }
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

const emailInputPROMISE = () => {
    if (ALL_EMAILS.includes(SIGNUP_EMAIL_INPUT) && EMAIL_UNIQUE === false) {
        dispatch(TOGGLE_EMAIL_UNIQUE())
    } else if (!ALL_EMAILS.includes(SIGNUP_EMAIL_INPUT) && EMAIL_UNIQUE === true) {
        dispatch(TOGGLE_EMAIL_UNIQUE())            
    }

    let emailExtension:any = SIGNUP_EMAIL_INPUT.match(/(\.\w+)$/)
    if (emailExtension) {
        emailExtension = emailExtension[1]
        console.log('emailExtension', emailExtension)
        console.log('length', emailExtension.length)
        if (emailExtension.length === 4) {
            if (emailExtension === ".com" || emailExtension === ".org" || emailExtension === ".net") {
                if (EMAIL_EXTENSION === false) {
                    dispatch(TOGGLE_EMAIL_EXTENSION())
                    dispatch(SET_EMAIL_EXTENSION_UI(emailExtension))
                }
            }
        } else if (emailExtension.length < 4) {
            if (EMAIL_EXTENSION === true) {
                dispatch(TOGGLE_EMAIL_EXTENSION())
                dispatch(SET_EMAIL_EXTENSION_UI(''))
            }
        }
    } else {
        if (EMAIL_EXTENSION === true) {
            dispatch(TOGGLE_EMAIL_EXTENSION)
        }
    }
}

const usernameInputPROMISE = () => {

    if (SIGNUP_USERNAME_INPUT.length >= 5 && SIGNUP_USERNAME_INPUT.length < 18) {
        if (USERNAME_LENGTH === false) { dispatch(TOGGLE_USERNAME_LENGTH()) }
    } else {
        if (USERNAME_LENGTH === true) { dispatch(TOGGLE_USERNAME_LENGTH())}
    }

    if (ALL_USERNAMES.includes(SIGNUP_USERNAME_INPUT) && USERNAME_UNIQUE === false) {
        console.log("username includes it!")
        dispatch(TOGGLE_USERNAME_UNIQUE())
    } else if (!ALL_USERNAMES.includes(SIGNUP_USERNAME_INPUT) && USERNAME_UNIQUE === true) {            
        dispatch(TOGGLE_USERNAME_UNIQUE())
    }
}


const userSignupPROMISE = () => {
    const queryStr = userSignupQueryStringFunc(`${SIGNUP_USERNAME_INPUT}`, `${SIGNUP_EMAIL_INPUT}`, `${SIGNUP_AGE_INPUT}`, `${SIGNUP_PASSWORD_INPUT}`)
    // const queryStr = userSignupQueryStringFunc("chasethrillz", "cgoode@jodo.com", 30, "chase123")
    return axios.post('/api/graphql', {query:`${queryStr}`})
        .then( (userSignup) => {
            console.log('signed up', userSignup)
            let user:minersINTERFACE = userSignup.data.data.userSignup
            return user
        })
}

const userLoginPROMISE = () => {
    // const query = userLoginQueryStringFunc(LOGIN_EMAIL_INPUT, LOGIN_PASSWORD_INPUT)
    // GoldRequestQL(query)
    const query = userLoginQueryStringFunc(LOGIN_EMAIL_INPUT, LOGIN_PASSWORD_INPUT)
    return axios.post('/api/graphql', {query:`${query}`})
    .then( (userLogin:any) => {
        console.log('userLogin', userLogin)
        userLogin = userLogin.data.data.userLogin
        if (userLogin) {
            document.cookie = `token=${userLogin.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;  
            document.cookie = `id=${userLogin.id}; max-age=${7 * 24 * 60 * 60}; path=/;`;  
            return new Promise( (resolve:any, reject:any) => {
                resolve(userLogin)
            })
        } 
        // document.cookie = `token=${userLogin.token}; max-age=${7 * 24 * 60 * 60}; path=/;`;                                
    })
}


const rememberMeCookiePROMISE = () => {
    return new Promise(async(resolve:any, reject:any) => {
        // from devTools -> application -> cookies ------------> id   	4   	localhost
            const cookie = await getCookie()
            if (cookie) {                
                let id = cookie[0].replace(/\D+/g, '');
                if (id) {                
                    const query = getUserWithIdStringFunc(id)
                    return axios.post('/api/graphql', {query:`${query}`})
                    .then( (userWithId:any) => {
                    userWithId = userWithId.data.data.getUserWithId
                    resolve(userWithId)
                    reject('milk')
                    // console.log('userWithId', userWithId)
                    // dispatch(SET_CURRENT_USER(userWithId))
                    // dispatch(TOGGLE_REMEMBER_ME_USER())
                    })
                }
            }
        })
    }

    // FamilyTree guessing game PROMISES:
    const familyTreeStrainsPROMISE = () => {
        return setallstrainsPROMISE()
        .then( (strains:any) => {
            // const randomStrain = strains[Math.floor(Math.random() * strains.length )]
            const randomStrain = randomValueFromArray(strains)

            const alreadyPicked:string[] = []

            const parents = randomStrain.parents.split(',')
            const king = parents[0].trim()
            const queen = parents[1].trim()
            const correctAnswer = randomStrain.strain
            alreadyPicked.push(correctAnswer)

            const wrongAnswer = strains.find(strainIndex => strainIndex.strain !== correctAnswer)
            // const wrongAnswer = strains.find(strainIndex => strainIndex.strain !== correctAnswer)
            
            console.log('king', king)
            console.log('queen', queen)
            console.log('correctAnswer', correctAnswer)
            console.log('parents from promise', parents)

            console.log('wrongAnswer', wrongAnswer)
            alreadyPicked.push(wrongAnswer.strain)



            dispatch(SET_PLAYING_STRAIN(randomStrain))


            return randomStrain || strains

        })
    }

    

        const value = {
            iPROMISEcookies,
            setallstrainsPROMISE,
            setallminersPROMISE,
            deleteEndpointsPROMISE,
            strainIndexIncrementPROMISE,
            strainClickPROMISE,

            // SIGNUP INPUT FUNCTIONS!
            passwordWordMatchPROMISE,
            localPasswordCheckerPROMISE,
            emailInputPROMISE,
            usernameInputPROMISE,
            userSignupPROMISE,
            userLoginPROMISE,
            rememberMeCookiePROMISE,
            familyTreeStrainsPROMISE
        }        


    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}


