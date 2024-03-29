import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios"
import $ from 'jquery'

// components and styles.

// @redux/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
// MAIN
import { 
    SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE, SET_VIEW_SELECTED_STRAIN_INDEX, SET_VIEW_SELECTED_STRAIN, TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT,
    SET_ALL_STRAINS, SET_ALL_USERS, SET_ALL_USERNAMES, SET_ALL_EMAILS, SET_CURRENT_USER
} from "redux/main/mainSlice"

// LOGIN SIGNUP
import { 
    TOGGLE_PASSWORD_TOO_EZ, TOGGLE_PASSWORD_LENGTH_PASS, TOGGLE_PASSWORD_NUMBER_CHAR, TOGGLE_PASSWORD_SPECIAL_CHAR, TOGGLE_PASSWORD_UPPERCASE,
    TOGGLE_EMAIL_EXTENSION, TOGGLE_EMAIL_UNIQUE, SET_EMAIL_EXTENSION_UI,
    TOGGLE_USERNAME_UNIQUE, TOGGLE_USERNAME_LENGTH,
} from "redux/loginSignup/loginSignupSlice";

// FAMILY TREE
 import { 
    TOGGLE_PLAYING, SET_PLAYING_STRAIN, SET_PLAYING_PARENT_KING, SET_PLAYING_PARENT_QUEEN,
    SET_PLAYING_GUESS_RIGHT, SET_PLAYING_GUESS_WRONG_1, SET_PLAYING_GUESS_WRONG_2, SET_PLAYING_GUESS_WRONG_3,

    SET_WRONG_RIGHT_OPTION_BUCKET, 
    TOGGLE_TERNARY_RENDER_OPTION_0, TOGGLE_TERNARY_RENDER_OPTION_1, TOGGLE_TERNARY_RENDER_OPTION_2, TOGGLE_TERNARY_RENDER_OPTION_3,
    TOGGLE_DRAGGED_OPTION_0, TOGGLE_DRAGGED_OPTION_1, TOGGLE_DRAGGED_OPTION_2, TOGGLE_DRAGGED_OPTION_3,
    SET_GAME_TITLE, SET_GAME_TEXT, DECREMENT_GAME_LIVES, RESET_GAME_LIVES, SET_GAME_OVER,

 } from "redux/familyTree/familyTreeSlice"

 // FINDMINE

 import { 
    SET_CURRENT_USER_STRAINS, SET_ALL_USER_STRAINS, TOGGLE_READY_TO_EDIT, TOGGLE_USER_LIKES_SELECTED_STRAIN, SET_NO_FEED_NO_STRAIN_MSGS, SET_CURRENT_USER_REVIEWS, SET_COIN_HOVER_STRAIN
 } from "redux/findMine/findMineSlice";

 import { 
    SET_CURTAIN_IMAGE_CLICK, SET_OUTER_PHOTO_INDEX, NESTED_PHOTO_RESET, PHOTO_ARRAY_INDEX_VISITED_RESET, 
    NESTED_PHOTO_INCREMENT, NESTED_PHOTO_DECREMENT, PHOTO_ARRAY_INDEX_PUSH, NESTED_PHOTO_LENGTH_END
} from "redux/trophyRoom/trophyRoomSlice" 

// utils
import { strainsINTERFACE, minersINTERFACE, minersOnStrainsINTERFACE } from "utility/InterfaceTypes";
import { getCookie, nonGenericKeysAndValuesFromStrain, findStrainFromAllStrains, randomValueFromArray, shuffleArray, shuffleArrayOfObjects, clearCookie } from "utility/utilityValues"

// queries
import { 
    allStrainsGETquery, allMinersGETquery, userSignupQueryStringFunc, userLoginQueryStringFunc,
     getUserWithIdStringFunc, getMyStrainsStringFunc, allMinersOnStrainsQuery, 
     addStrainLikeStringFunc, removeStrainLikeStringFunc, getMyLikesStringFunc, getMyMinesStringFunc,
     allLikesGETquery, allReviewsGETquery, getUpdateUserIconStringFunc
} from "graphql/queries";
import GoldRequestQL from "utility/GoldRequestQL";

type PromiseTypes = {

    iPROMISEcookies: () => any;
    cookieFunc: () => any;
    logoutPROMISE: () => any;
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

    // FamilyTree guessing game Data:
    familyTreeStrainsPROMISE: () => any;
    familyTreeWrongGuessPROMISE: () => any;
    guessCardPROMISE: (card:any) => any;
    resetCardGamePROMISE: () => any;

    // FindMine Promises:
    setCurrentUserStrainsPROMISE: (username:string) => any;
    setAllUserStrainsPROMISE: () => any;

    allLikePROMISE: () => any;
    addLikePROMISE: (username: string, strainid: number, like:boolean) => any;
    removeLikePROMISE: (username: string, strainid: number, like:boolean) => any;
    getMyLikesPROMISE: (username: string) => any;
    userLikeOrNotPROMISE: (event, id:number, allLikes:any) => any;

    allReviewPROMISE: () => any;
    addMinePROMISE: (query:string) => any;
    removeMinePROMISE: (query:string) => any;
    getMyMinesPROMISE: (username:string) => any;

    updateUserIconPROMISE: (icon:string) => any;
    
    // trophy room promises
    curtainResetPROMISE: () => any;
    clickLeftPhotoArrayDecrement: () => any;
    clickRightPhotoArrayIncrement: () => any;

}   

const PromiseDefaults = {
    iPROMISEcookies: () => {},
    cookieFunc: () => {},
    logoutPROMISE: () => {},
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

    // FamilyTree guessing game Data:
    familyTreeStrainsPROMISE: () => {},
    familyTreeWrongGuessPROMISE: () => {},
    guessCardPROMISE: (card:any) => {},
    resetCardGamePROMISE: () => {},

    setCurrentUserStrainsPROMISE: (username:string) => {},
    setAllUserStrainsPROMISE: () => {},

    allLikePROMISE: () => {},
    addLikePROMISE: (username: string, strainid: number, like:boolean) => {},
    removeLikePROMISE: (username: string, strainid: number, like:boolean) => {},
    getMyLikesPROMISE: (username:string) => {},
    userLikeOrNotPROMISE: (event, id:number, allLikes:any) => {},

    allReviewPROMISE: () => {},
    addMinePROMISE: (query:string) => {},
    removeMinePROMISE: (query:string) => {},
    getMyMinesPROMISE: (query:string) => {},
    updateUserIconPROMISE: (icon:string) => {},
    curtainResetPROMISE: () => {},
    clickLeftPhotoArrayDecrement: () => {},
    clickRightPhotoArrayIncrement: () => {}
    
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
    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)        

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

    // Family Tree 
    const PLAYING = useSelector( (state:RootState) => state.familyTree.PLAYING)
    const PLAYING_STRAIN = useSelector( (state:RootState) => state.familyTree.PLAYING_STRAIN)
    const PLAYING_PARENT_KING = useSelector( (state:RootState) => state.familyTree.PLAYING_PARENT_KING)
    const PLAYING_PARENT_QUEEN = useSelector( (state:RootState) => state.familyTree.PLAYING_PARENT_QUEEN)
    const PLAYING_GUESS_RIGHT = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_RIGHT)
    const PLAYING_GUESS_WRONG_1 = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_WRONG_1)
    const PLAYING_GUESS_WRONG_2 = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_WRONG_2)
    const PLAYING_GUESS_WRONG_3 = useSelector( (state:RootState) => state.familyTree.PLAYING_GUESS_WRONG_3)
    const WRONG_RIGHT_OPTION_BUCKET = useSelector( (state:RootState) => state.familyTree.WRONG_RIGHT_OPTION_BUCKET)

    const TERNARY_RENDER_KING = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_KING)
    const TERNARY_RENDER_OPTION_0 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_0)
    const TERNARY_RENDER_OPTION_1 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_1)
    const TERNARY_RENDER_OPTION_2 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_2)
    const TERNARY_RENDER_OPTION_3 = useSelector( (state:RootState) => state.familyTree.TERNARY_RENDER_OPTION_3)
    
    const DRAGGED_OPTION_0 = useSelector( (state:RootState) => state.familyTree.DRAGGED_OPTION_0)
    const DRAGGED_OPTION_1 = useSelector( (state:RootState) => state.familyTree.DRAGGED_OPTION_1)
    const DRAGGED_OPTION_2 = useSelector( (state:RootState) => state.familyTree.DRAGGED_OPTION_2)
    const DRAGGED_OPTION_3 = useSelector( (state:RootState) => state.familyTree.DRAGGED_OPTION_3)

    const GAME_TITLE = useSelector( (state:RootState) => state.familyTree.GAME_TITLE)
    const GAME_TEXT = useSelector( (state:RootState) => state.familyTree.GAME_TEXT)
    const GAME_LIVES = useSelector( (state:RootState) => state.familyTree.GAME_LIVES)
    const GAME_OVER = useSelector( (state:RootState) => state.familyTree.GAME_OVER)

    // FindMine State!
    const NO_FEED_SELECTED_STRAIN = useSelector( (state:RootState) => state.findMine.NO_FEED_SELECTED_STRAIN)
    const READY_TO_EDIT = useSelector( (state:RootState) => state.findMine.READY_TO_EDIT)
    const USER_LIKES_SELECTED_STRAIN = useSelector( (state:RootState) => state.findMine.USER_LIKES_SELECTED_STRAIN)
    const FEED_SELECTED_USER = useSelector( (state:RootState) => state.findMine.FEED_SELECTED_USER)

    // TrophyRoomState
    const PHOTOS_ARRAY = useSelector( (state:RootState) => state.trophyRoom.PHOTOS_ARRAY)
    const OUTER_PHOTO_INDEX = useSelector( (state:RootState) => state.trophyRoom.OUTER_PHOTO_INDEX)
    const NESTED_PHOTO_INDEX = useSelector( (state:RootState) => state.trophyRoom.NESTED_PHOTO_INDEX)
    const PHOTO_ARRAY_INDEX_VISITED = useSelector( (state:RootState) => state.trophyRoom.PHOTO_ARRAY_INDEX_VISITED)
        

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

    const cookieFunc = async () => {
        const cookie = await getCookie()
        // console.log('cookie', cookie)
        if (cookie[0] && cookie[1]) {                
            let id
            id = cookie[0].length > cookie[1].length ? cookie[1].replace(/\D+/g, '') : cookie[0].replace(/\D+/g, '')
            // console.log('id', id)
            if (id) {                
                // console.log('id in the Promise', id)
                const query = getUserWithIdStringFunc(id)
                return axios.post('/api/graphql', {query:`${query}`})
                .then( (userWithId:any) => {
                // const statePROMISE = new Promise( (resolve:any, reject:any) => {
                    return new Promise( (resolve:any, reject:any) => {
                        // console.log('userWithId', userWithId)
                        userWithId = userWithId.data.data.getUserWithId
                        dispatch(SET_CURRENT_USER(userWithId))
                        resolve(userWithId)
                        // resolve(CURRENT_USER)
                        // reject('no user')
                    })
                    // resolve(CURRENT_USER)
                // })                
                })
            } 
        } else { return }
      }

    const logoutPROMISE = () => {
        return new Promise( (resolve:any, reject:any) => {
            clearCookie('id')
            clearCookie('token')
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

    const familyTreeStrainsPROMISE = async () => {
        setallstrainsPROMISE()
        .then( (strains) => {
          console.log('strains', strains)
          let shuffled = shuffleArrayOfObjects(strains)
          console.log('shuffled', shuffled)
          const correctAnswerPROMISE = new Promise( (resolve:any, reject:any) => {
            let correctAnswer = shuffled[shuffled.length-1]
            console.log('correctAnswer', correctAnswer)
            shuffled.pop()
            resolve({ correctAnswer: correctAnswer, shuffled: shuffled})
          })
          correctAnswerPROMISE
          .then( (obj:any) => {
            console.log('obj', obj)
    
            const wrongAnswer1PROMISE = new Promise( (resolve:any, reject:any) => {
              let wrongAnswer1 = obj.shuffled[shuffled.length-1]
              console.log('wrongAnswer1', wrongAnswer1)
              obj.shuffled.pop()
              resolve({ correctAnswer: obj.correctAnswer, wrongAnswer1: wrongAnswer1, shuffled: obj.shuffled})
            })
            wrongAnswer1PROMISE
            .then( (obj2:any) => {
              console.log('obj2', obj2)
              const wrongAnswer2PROMISE = new Promise( (resolve:any, reject:any) => {
                const wrongAnswer2 = obj.shuffled[shuffled.length-1]
                obj2.shuffled.pop()
                resolve({correctAnswer: obj2.correctAnswer, wrongAnswer1: obj2.wrongAnswer1, wrongAnswer2: wrongAnswer2, shuffled: obj2.shuffled})
              })
              wrongAnswer2PROMISE
              .then( (obj3:any) => {
                console.log('obj3', obj3)
                const wrongAnswer3PROMISE = new Promise( (resolve:any, reject:any) => {
                  const wrongAnswer3 = obj3.shuffled[shuffled.length-1]
                  resolve({correctAnswer: obj3.correctAnswer, wrongAnswer1: obj3.wrongAnswer1, wrongAnswer2: obj3.wrongAnswer2, wrongAnswer3: wrongAnswer3})
                })
                wrongAnswer3PROMISE
                .then( (obj4:any) => {
                  console.log('obj4', obj4)
    
                  const parents = obj4.correctAnswer.parents.split(',')
                    const king = parents[0].trim()
                    const queen = parents[1].trim()
                    // dispatch(SET_PLAYING_STRAIN(obj4.correctAnswer))   
                    dispatch(SET_PLAYING_PARENT_KING(king))
                    dispatch(SET_PLAYING_PARENT_QUEEN(queen))
                    dispatch(SET_PLAYING_GUESS_RIGHT(obj4.correctAnswer.strain))
    
                    dispatch(SET_PLAYING_GUESS_WRONG_1(obj4.wrongAnswer1.strain))
                    dispatch(SET_PLAYING_GUESS_WRONG_2(obj4.wrongAnswer2.strain))
                    dispatch(SET_PLAYING_GUESS_WRONG_3(obj4.wrongAnswer3.strain))
                    dispatch(SET_PLAYING_GUESS_WRONG_3(obj4.wrongAnswer3.strain))
                })
              })
            })
          })
        })
    }

    
    const familyTreeWrongGuessPROMISE = () => {
        return setallstrainsPROMISE().then((strains: any) => {
          const incorrectGuessesPool = strains.filter(
            (strain) =>
              strain.strain !== PLAYING_GUESS_RIGHT &&
              strain.strain !== PLAYING_GUESS_WRONG_1
            //   strain.strain !== PLAYING_GUESS_WRONG_1 &&
            //   strain.strain !== PLAYING_GUESS_WRONG_2
          );
      
          if (incorrectGuessesPool.length < 2) {
            // Handle the case where there are not enough incorrect guesses available
            return Promise.reject("Not enough incorrect guesses available");
          }
      
          const wrongGuess2Index = Math.floor(
            Math.random() * incorrectGuessesPool.length
          );
          const wrongGuess2 = incorrectGuessesPool[wrongGuess2Index];
      
          let wrongGuess3Index;
          do {
            wrongGuess3Index = Math.floor(
              Math.random() * incorrectGuessesPool.length
            );
          } while (wrongGuess3Index === wrongGuess2Index);
          const wrongGuess3 = incorrectGuessesPool[wrongGuess3Index];
      
          dispatch(SET_PLAYING_GUESS_WRONG_2(wrongGuess2.strain));
        //   dispatch(SET_PLAYING_GUESS_WRONG_3(wrongGuess3.strain));
      
          return [wrongGuess2];
        //   return [wrongGuess2, wrongGuess3];
        });
      };

    
    const guessCardPROMISE = (card:any) => {
        const resetText = (state:string) => {
            dispatch(SET_GAME_TEXT(`already played ${state}`))
            setTimeout( () => dispatch(SET_GAME_TEXT("")), 1000)
          }

        console.log("card before endpoints")
        card = card.card
        
        console.log('card after endpoints', card)
  
  
        if (card === WRONG_RIGHT_OPTION_BUCKET[0]) {
          console.log(`card === ${WRONG_RIGHT_OPTION_BUCKET[0]}`)
  
          if (DRAGGED_OPTION_0 === true) {    
            resetText(WRONG_RIGHT_OPTION_BUCKET[0])
            dispatch(SET_GAME_TEXT(`Already used ${WRONG_RIGHT_OPTION_BUCKET[0]}`))
          } else {
            if (card === PLAYING_GUESS_RIGHT) {
                
                if (CURRENT_USER.username.length > 1) {
                    const query = `mutation { incrementUserWins(username: "${CURRENT_USER.username}") { username, password, email, age, icon, wins } }`
                    axios.post('/api/graphql', {query: `${query}` } )
                    .then( (userupdate:any) => {
                    console.log('userupdate', userupdate)
                    userupdate = userupdate.data.data.incrementUserWins
                    if (userupdate.wins === 1) {
                        dispatch(SET_GAME_TEXT(`You can now select icon ${CURRENT_USER.username}`))
                    } else if(userupdate.wins ===3) {
                        dispatch(SET_GAME_TEXT(`You unlocked the Trophy Room ${CURRENT_USER.username}!`))                        
                    } else {
                        dispatch(SET_GAME_TEXT(`${CURRENT_USER.username} has ${userupdate.wins} Wins!`))
                    }
                })
            } else {
                dispatch(SET_GAME_TEXT(`Royal Flush! ${CURRENT_USER.username || card} Wins!`))
            }
            dispatch(SET_GAME_OVER("win"))            
            } else {
              dispatch(DECREMENT_GAME_LIVES())
            }
            dispatch(TOGGLE_DRAGGED_OPTION_0())
          }
        }
  
          if (card === WRONG_RIGHT_OPTION_BUCKET[1]) { 
            if (DRAGGED_OPTION_1 === true) {    
              resetText(WRONG_RIGHT_OPTION_BUCKET[1])
              dispatch(SET_GAME_TEXT(`Already used ${WRONG_RIGHT_OPTION_BUCKET[1]}`))
            } else {
              if (card === PLAYING_GUESS_RIGHT) {
                // CURRENT_USER.username || card wins!
                if (CURRENT_USER.username.length > 1) {
                    const query = `mutation { incrementUserWins(username: "${CURRENT_USER.username}") { username, password, email, age, icon, wins } }`
                    axios.post('/api/graphql', {query: `${query}` } )
                    .then( (userupdate:any) => {
                    console.log('userupdate', userupdate)
                    userupdate = userupdate.data.data.incrementUserWins
                    if (userupdate.wins === 1) {
                        dispatch(SET_GAME_TEXT(`You can now select icon ${CURRENT_USER.username}`))
                    } else if(userupdate.wins ===3) {
                        dispatch(SET_GAME_TEXT(`You unlocked the Trophy Room ${CURRENT_USER.username}!`))                        
                    } else {
                        dispatch(SET_GAME_TEXT(`${CURRENT_USER.username} has ${userupdate.wins} Wins!`))
                    }
                })    
                } else {
                    dispatch(SET_GAME_TEXT(`Royal Flush! ${CURRENT_USER.username || card} Wins!`))
                }
                dispatch(SET_GAME_OVER("win"))
              } else {
                console.log("else block should lose lives")
                dispatch(DECREMENT_GAME_LIVES())
              }
              dispatch(TOGGLE_DRAGGED_OPTION_1())
            }
          }
  
          if (card === WRONG_RIGHT_OPTION_BUCKET[2]) { 
          if (DRAGGED_OPTION_2 === true) {    
            resetText(WRONG_RIGHT_OPTION_BUCKET[2])
            dispatch(SET_GAME_TEXT(`Already used ${WRONG_RIGHT_OPTION_BUCKET[2]}`))
          } else {
            if (card === PLAYING_GUESS_RIGHT) {
              // CURRENT_USER.username || card wins!
              dispatch(SET_GAME_OVER("win"))

                    if (CURRENT_USER.username.length > 1) {
                const query = `mutation { incrementUserWins(username: "${CURRENT_USER.username}") { username, password, email, age, icon, wins } }`
                axios.post('/api/graphql', {query: `${query}` } )
                .then( (userupdate:any) => {
                console.log('userupdate', userupdate)
                userupdate = userupdate.data.data.incrementUserWins
                if (userupdate.wins === 1) {
                    dispatch(SET_GAME_TEXT(`You can now select icon ${CURRENT_USER.username}`))
                } else if(userupdate.wins ===3) {
                    dispatch(SET_GAME_TEXT(`You unlocked the Trophy Room ${CURRENT_USER.username}!`))                        
                } else {
                    dispatch(SET_GAME_TEXT(`${CURRENT_USER.username} has ${userupdate.wins} Wins!`))
                }
                })
            } else {
                dispatch(SET_GAME_TEXT(`Royal Flush! ${CURRENT_USER.username || card} Wins!`))
            }
            dispatch(SET_GAME_OVER("win"))
            } else {
              console.log("else block should lose lives")
              dispatch(DECREMENT_GAME_LIVES())
            }
            dispatch(TOGGLE_DRAGGED_OPTION_2())
          }
        }
  
        if (card === WRONG_RIGHT_OPTION_BUCKET[3]) { 
          if (DRAGGED_OPTION_3 === true) {    
            resetText(WRONG_RIGHT_OPTION_BUCKET[3])
            dispatch(SET_GAME_TEXT(`Already used ${WRONG_RIGHT_OPTION_BUCKET[3]}`))
          } else {
            if (card === PLAYING_GUESS_RIGHT) {
              // CURRENT_USER.username || card wins!
              
              if (CURRENT_USER.username.length > 1) {
                const query = `mutation { incrementUserWins(username: "${CURRENT_USER.username}") { username, password, email, age, icon, wins } }`
                axios.post('/api/graphql', {query: `${query}` } )
                .then( (userupdate:any) => {
                console.log('userupdate', userupdate)
                userupdate = userupdate.data.data.incrementUserWins
                if (userupdate.wins === 1) {
                    dispatch(SET_GAME_TEXT(`You can now select icon ${CURRENT_USER.username}`))
                } else if(userupdate.wins ===3) {
                    dispatch(SET_GAME_TEXT(`You unlocked the Trophy Room ${CURRENT_USER.username}!`))                        
                } else {
                    dispatch(SET_GAME_TEXT(`${CURRENT_USER.username} has ${userupdate.wins} Wins!`))
                }
                })
            } else {
                dispatch(SET_GAME_TEXT(`Royal Flush! ${CURRENT_USER.username || card} Wins!`))
            }
            dispatch(SET_GAME_OVER("win"))
            } else {
              console.log("else block should lose lives")
              dispatch(DECREMENT_GAME_LIVES())
            }
            dispatch(TOGGLE_DRAGGED_OPTION_3())
          }   
        }           
    }


    const resetCardGamePROMISE = async () => {
        dispatch(RESET_GAME_LIVES())
      dispatch(SET_GAME_OVER(""))

      if (DRAGGED_OPTION_0 === true) dispatch(TOGGLE_DRAGGED_OPTION_0())
      if (DRAGGED_OPTION_1 === true) dispatch(TOGGLE_DRAGGED_OPTION_1())
      if (DRAGGED_OPTION_2 === true) dispatch(TOGGLE_DRAGGED_OPTION_2())
      if (DRAGGED_OPTION_3 === true) dispatch(TOGGLE_DRAGGED_OPTION_3())

      dispatch(SET_GAME_TEXT(''))
      await familyTreeStrainsPROMISE()
    }


    const setCurrentUserStrainsPROMISE = (username:string) => {
        const query = getMyStrainsStringFunc(username)
    // axios.post('/api/graphql', { query: `query { getMyMinersOnStrains(username: "${CURRENT_USER.username}") { minersId, strainsid } }`})
    axios.post('/api/graphql', { query: `${query}` })
        .then( (myStrains:any) => {
            console.log('myStrains before endpoints!', myStrains)
            const myUserStrains:minersOnStrainsINTERFACE = myStrains.data.data.getMyMinersOnStrains
            console.log('myUserStrains', myUserStrains)
            dispatch(SET_CURRENT_USER_STRAINS(myUserStrains))
        }).catch( (err:any) => {
            return
        })                                                                                                             
    }


    const setAllUserStrainsPROMISE = () => {
        axios.post('/api/graphql', { query: `${allMinersOnStrainsQuery}`})
        .then( (allUserStrains:any) => {
            allUserStrains = allUserStrains.data.data.allMinersOnStrains
            dispatch(SET_ALL_USER_STRAINS(allUserStrains))     
        })        
    }     
    
    // username: string, strainid: number, like:boolean

    const allLikePROMISE = () => { return GoldRequestQL(allLikesGETquery) }
        // axios.post('/api/graphql', { query: `${allLikesGETquery}`})

    const addLikePROMISE = (username: string, strainid: number, like:boolean) => {
        const query = addStrainLikeStringFunc(username, strainid, like)
            return GoldRequestQL(query)            
    }

    const removeLikePROMISE = (username: string, strainid: number, like:boolean) => {
        const query = removeStrainLikeStringFunc(username, strainid, like)
            return GoldRequestQL(query)            
    }

    const getMyLikesPROMISE = (username:string) => {
        const query = getMyLikesStringFunc(username)
        // axios.post('/api/graphql', { query: `query {getMyLikes(username: "${CURRENT_USER.username}"), { userId, strainid, into_it } } `})
        GoldRequestQL(query)
        .then( (likes:any) => {
            console.log('likes', likes)
            if (likes.data) {
                likes = likes.data.data.getMyLikes                
                console.log('typeof', typeof NO_FEED_SELECTED_STRAIN.id)    
                likes.forEach( (like, index) => {
                    if (like.strainid === NO_FEED_SELECTED_STRAIN.id) {
                        console.log('like loop', like)
                        if (USER_LIKES_SELECTED_STRAIN === false) {
                            dispatch(TOGGLE_USER_LIKES_SELECTED_STRAIN())
                        }
                    }
                })
            }
        })       
    }

    const userLikeOrNotPROMISE = (event, id:number, allLikes:any) => {

        const checkLikePROMISE = new Promise( (resolve:any, reject:any) => {
            const myLike = allLikes.find(like => like.userId === FEED_SELECTED_USER.id && like.strainid === id )
            resolve(myLike);
        })
        checkLikePROMISE
        .then( (like:any) => {
            console.log('like', like)
            if (like) {
                let likeStrain:boolean = like.into_it
                console.log('likeStrain', likeStrain)
                dispatch(SET_COIN_HOVER_STRAIN(
                    id === 1 ? {id: 1, strain: "wedding cake", like: true} : id === 2 ? { id: 2, strain: "GorillaGlue#4", like: true} : id === 3 ? {id: 3, strain: "Do-Si-Dos", like: true} : 
                    id === 4 ? {id: 4, strain: "mimosa", like: true} : id === 5 ? {id: 5, strain: "cherry pie", like: true} : id === 6 ? {id: 6, strain: "white widow", like: true} : 
                    id === 7 ? {id: 7, strain: "pineapple express", like: true} : ""
                ))
    
            $(event.target).css('box-shadow', '5px 5px 5px rgb(247, 208, 36)')
            } else {
                dispatch(SET_COIN_HOVER_STRAIN(
                    id === 1 ? {id: 1, strain: "wedding cake", like: false} : id === 2 ? { id: 2, strain: "GorillaGlue#4", like: false} : id === 3 ? {id: 3, strain: "Do-Si-Dos", like: false} : 
                    id === 4 ? {id: 4, strain: "mimosa", like: false} : id === 5 ? {id: 5, strain: "cherry pie", like: false} : id === 6 ? {id: 6, strain: "white widow", like: false} : 
                    id === 7 ? {id: 7, strain: "pineapple express", like: false} : ""
                ))
            }
        })

    }


    const allReviewPROMISE = () => { return GoldRequestQL(allReviewsGETquery) }
    // const allMinePROMISE = () => { return GoldRequestQL(allReviewsGETquery) }

    const addMinePROMISE = (query:string) => {
        // axios.post('/api/graphql', { query: `${query}` })
        // const query =  addMineReviewStringFunc(CURRENT_USER.username, MINE_REVIEW_INPUT_VAL, MINE_TITLE_INPUT_VAL, NO_FEED_SELECTED_STRAIN.id)
        console.log('no feed strain before changes', NO_FEED_SELECTED_STRAIN)
    GoldRequestQL(query)
    .then( (addedMine:any) => {
      console.log('addedMine', addedMine)
      if (READY_TO_EDIT === true) { dispatch(TOGGLE_READY_TO_EDIT()) }
        dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: `click the specs to see the sights!`}))
        setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)
    }).catch( () => {
        if (READY_TO_EDIT === true) { dispatch(TOGGLE_READY_TO_EDIT()) }
    })
    }

    const removeMinePROMISE = (query:string) => {
        GoldRequestQL(query)
        .then( (removeMine:any) => {
            console.log('removeMine', removeMine)
            if (removeMine.data.errors) {
            // if (removeMine.data.errors[0]) {
                dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: true, msg: `${NO_FEED_SELECTED_STRAIN.strain} wasn't mine.`}))
                setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)
            } else {
                dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: true, msg: `don't pay ${NO_FEED_SELECTED_STRAIN.strain} no mind.`}))
                setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)
            }
        })
    }

    const getMyMinesPROMISE = (username:string) => {
        const query = getMyMinesStringFunc(username)
        GoldRequestQL(query)
        .then( (mymines:any) => {
            if (mymines.data) {
                mymines = mymines.data.data.getMyMines
                dispatch(SET_CURRENT_USER_REVIEWS(mymines))
            }
            console.log('mymines', mymines)
        })
    }

    const updateUserIconPROMISE = (icon:string) => {
        const query = getUpdateUserIconStringFunc(CURRENT_USER.username, icon)
        return GoldRequestQL(query)
    }

    // Trophy Room Promises / modular functions
    const curtainResetPROMISE = () => {
        dispatch(SET_CURTAIN_IMAGE_CLICK(''))
        dispatch(SET_OUTER_PHOTO_INDEX(0))
        dispatch(NESTED_PHOTO_RESET())   
        dispatch(PHOTO_ARRAY_INDEX_VISITED_RESET())     
        // yeah this isn't a promise but still...
    }

    const clickLeftPhotoArrayDecrement = () => {
        const length: number = PHOTOS_ARRAY[OUTER_PHOTO_INDEX].length - 1
        if (NESTED_PHOTO_INDEX > 0) {
            dispatch(NESTED_PHOTO_DECREMENT())
            console.log('outerphoto index', NESTED_PHOTO_INDEX)
            const index = NESTED_PHOTO_INDEX - 1 
            if (!PHOTO_ARRAY_INDEX_VISITED[OUTER_PHOTO_INDEX].includes(index)) {                    
                dispatch(PHOTO_ARRAY_INDEX_PUSH({outerindex: OUTER_PHOTO_INDEX, innerindex: index}))
            }
        } else {                
            let currentPhotoIndexLength = PHOTOS_ARRAY[OUTER_PHOTO_INDEX].length
            if (!PHOTO_ARRAY_INDEX_VISITED[OUTER_PHOTO_INDEX].includes(currentPhotoIndexLength)) {                    
                dispatch(PHOTO_ARRAY_INDEX_PUSH({outerindex: OUTER_PHOTO_INDEX, innerindex: currentPhotoIndexLength }))
            }
            dispatch(NESTED_PHOTO_LENGTH_END(length))
        }
    }

    const clickRightPhotoArrayIncrement = () => {
        
        let length:number = PHOTOS_ARRAY[OUTER_PHOTO_INDEX].length - 1
        console.log('length of nested array', length)        
        
        if (NESTED_PHOTO_INDEX < length) {
                dispatch(NESTED_PHOTO_INCREMENT())
                const index = NESTED_PHOTO_INDEX + 1 
                if (!PHOTO_ARRAY_INDEX_VISITED[OUTER_PHOTO_INDEX].includes(index)) {                    
                    dispatch(PHOTO_ARRAY_INDEX_PUSH({outerindex: OUTER_PHOTO_INDEX, innerindex: index}))
                }
        } else {
            dispatch(NESTED_PHOTO_RESET())
        }
    }

        const value = {
            iPROMISEcookies,
            cookieFunc,
            logoutPROMISE,
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

            // FamilyTree Strains Guessing PROMISE
            familyTreeStrainsPROMISE,
            familyTreeWrongGuessPROMISE,
            guessCardPROMISE,
            resetCardGamePROMISE,

            // FindMine
            setCurrentUserStrainsPROMISE,
            setAllUserStrainsPROMISE,

            allLikePROMISE,
            addLikePROMISE,
            removeLikePROMISE,
            getMyLikesPROMISE,
            userLikeOrNotPROMISE,

            allReviewPROMISE,
            addMinePROMISE,
            removeMinePROMISE,
            getMyMinesPROMISE,
            updateUserIconPROMISE,

            // TrophyRoom promises
            curtainResetPROMISE,
            clickLeftPhotoArrayDecrement,
            clickRightPhotoArrayIncrement
        }        


    return (
        <PromiseContext.Provider value={value}>
            {children}
        </PromiseContext.Provider>
    )

}


