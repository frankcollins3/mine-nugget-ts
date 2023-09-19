import {useEffect, useState} from 'react'
import $ from 'jquery'

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
// import { 
//     SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE, SET_VIEW_SELECTED_STRAIN_INDEX, SET_VIEW_SELECTED_STRAIN, TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT,
//     SET_ALL_USERS, SET_ALL_USERNAMES, SET_ALL_EMAILS,
// } from "redux/main/mainSlice"
import { SET_CURRENT_USER } from 'redux/main/mainSlice'
import { TOGGLE_SHOW_ICONS, TOGGLE_USER_ICON_SAVE_ERROR } from 'redux/findMine/findMineSlice'
import { SET_CURTAIN_IMAGE_CLICK, SET_OUTER_PHOTO_INDEX, NESTED_PHOTO_RESET, PHOTO_ARRAY_INDEX_VISITED_RESET  } from 'redux/trophyRoom/trophyRoomSlice'


// components and styles
import Container from "react-bootstrap/Container"
import UserIcons from 'components/FindMineComponents/NoFeedContainer/UserIcons/UserIcons'
import styles from "./Navbar.module.scss"


// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import { clearCookie } from 'utility/utilityValues'

export default function Navbar() {
    return <RENDER></RENDER>
}

function RENDER() {

    const [showLogout, setShowLogout] = useState(false)
    const dispatch = useDispatch()

    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)

    const ALL_USERNAMES = useSelector( (state:RootState) => state.main.ALL_USERNAMES)
    const ALL_EMAILS = useSelector( (state:RootState) => state.main.ALL_EMAILS)
    const CURRENT_PAGE = useSelector( (state:RootState) => state.main.CURRENT_PAGE)
    const CURRENT_USER_STRAINS = useSelector( (state:RootState) => state.findMine.CURRENT_USER_STRAINS)
    const SHOW_ICONS = useSelector( (state:RootState) => state.findMine.SHOW_ICONS)
    const USER_ICON_SAVE_ERROR = useSelector( (state:RootState) => state.findMine.USER_ICON_SAVE_ERROR)

    const GAME_OVER = useSelector( (state:RootState) => state.familyTree.GAME_OVER)

    const WALK_INTO_TROPHY_ROOM = useSelector( (state:RootState) => state.trophyRoom.WALK_INTO_TROPHY_ROOM)
    const CURTAIN_IMAGE_CLICK = useSelector( (state:RootState) => state.trophyRoom.CURTAIN_IMAGE_CLICK)

    

    const { magnify, gold, cactus, mine, navbardice, vest, signUpSigns, redCarpetHome, curtain, magnify3, spotlight, trophy, logout } = useImage()

    const { curtainResetPROMISE, cookieFunc, logoutPROMISE } = usePromise()

    useEffect( () => {
        cookieFunc() 
        .then( (currentuser) => {
            console.log('currentuser', currentuser)
        })
    }, [])

    useEffect( () => {
        if (GAME_OVER === 'win') {
            console.log("hey weve got a win in the navbar");
            cookieFunc()
            .then( (currentuser) => {
                dispatch(SET_CURRENT_USER(currentuser))
            })
        }
    }, [GAME_OVER])

    
    useEffect( () => {    
        console.log("useEffect and currentPage", CURRENT_PAGE)
        if (CURRENT_PAGE === '/findmine' && CURRENT_USER.age > 0) {
// there is a CSS function in util/utilValues. I don't want to use it because it seems more performance sparing to not have to import the function?  Jquery would need to be imported either way.
            $('#iconVest').addClass('hover')
        }

    }, [CURRENT_USER])

    const goldClick = () => {
        console.log("weve got the click!")
        if (CURRENT_USER && CURRENT_USER.age > 0) {
            window.location.href = "/strain"
        } else {
            window.location.href = "/"
        }
    }

    const test = () => {
        console.log('ALL_USERNAMES', ALL_USERNAMES)
        console.log('ALL_EMAILS', ALL_EMAILS)
    }

    const findMineClickForIcons = (event:any) => {

        if (CURRENT_PAGE === '/findmine' && CURRENT_USER.age > 0) {
            if (CURRENT_USER.wins && CURRENT_USER.wins > 0) {
                dispatch(TOGGLE_SHOW_ICONS())
                $(event.target).removeClass('hover')                
            }            
        }
    }

    const goHome = () => {
        window.location.href = "/"
    }

    const playCards = () => {
        window.location.href = "/familytree"
    }

    const findMine = () => {
        window.location.href = "/findmine"
    }

    const leftIconClick = (event:any) => {
        const src:string = event.target.src
        console.log('src', src)
        if (src.includes("trophy")) {
            window.location.href = "/trophyroom"
        } else {
            console.log("nothing");
        }
    }

    const logoutFunc = (event:any) => {
        let src:string = event.target.src
        if (src.includes('logout')) {
            console.log("hey the logout");
            logoutPROMISE()
            setTimeout( () => window.location.href = "/")            
        } else {
            console.log("you are mine");
        }
    }

    const toggleBackToCurtain = () => { curtainResetPROMISE() }

    return (
        
        <Container id={styles.Cont}>

            <Container>
            { CURRENT_PAGE === "/trophyroom" && CURTAIN_IMAGE_CLICK === "popcorn" && <img className={styles.img} src={spotlight}/> }
            
            <Container onMouseLeave={() => setShowLogout(false)}>
            {CURRENT_PAGE !== "/familytree" && CURRENT_PAGE !== "/findmine" && CURRENT_PAGE !== "/trophyroom" && <img onClick={logoutFunc} onMouseEnter={() => setShowLogout(true)} style={{ cursor: 'pointer' }} className={styles.img} id={styles.mine} src={showLogout ? logout : mine}/>}
            </Container> 
            
            {/* { CURRENT_PAGE === "/" || CURRENT_PAGE === "/strain" && <img style={{ cursor: 'pointer' }} className={styles.img} id={styles.mine} src={mine}/> } */}
            { CURRENT_PAGE === "/familytree" && <img onClick={leftIconClick} style={{ cursor: 'pointer' }} className={styles.img} id={styles.mine} src={CURRENT_USER && CURRENT_USER.wins && CURRENT_USER.wins > 2 ? trophy : navbardice}/> }
            { CURRENT_PAGE === "/findmine" && <img id="iconVest" onClick={findMineClickForIcons} style={{ cursor: 'pointer', borderRadius: '0%' }} className={styles.img} src={CURRENT_USER_STRAINS.length > 1 ? vest : signUpSigns}/> }

            </Container>

            {
                SHOW_ICONS 
                    ?
                <UserIcons/>                    
                    :
                CURRENT_PAGE === "/trophyroom"
                ?
                WALK_INTO_TROPHY_ROOM && CURTAIN_IMAGE_CLICK !== "wins" &&
                <>
                {CURTAIN_IMAGE_CLICK !== "" && <img onClick={toggleBackToCurtain} className={styles.img} src={curtain}/>}
                <img onClick={goHome} className={styles.img} src={redCarpetHome}/>
                </>
                                
                :                
                <Container id={styles.multiIconCont}>
                <img style={{ order: CURRENT_PAGE === "/strain" ? 3 : "initial" }} onClick={goldClick} className={styles.img} src={gold}/>
                <img onClick={playCards} style={{ order: CURRENT_PAGE === "/familytree" ? 3 : "initial" }} className={styles.img} src={cactus}/>
                <img onClick={findMine} style={{ order: CURRENT_PAGE === "/findmine" ? 3 : "initial" }} className={styles.img} src={CURRENT_PAGE === "/findmine" ? magnify3 : magnify}/>
                </Container>
            }            
        </Container>
    )
}
