import {useEffect} from 'react'
import $ from 'jquery'

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
// import { 
//     SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE, SET_VIEW_SELECTED_STRAIN_INDEX, SET_VIEW_SELECTED_STRAIN, TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT,
//     SET_ALL_USERS, SET_ALL_USERNAMES, SET_ALL_EMAILS,
// } from "redux/main/mainSlice"
import { TOGGLE_SHOW_ICONS } from 'redux/findMine/findMineSlice'


// components and styles
import Container from "react-bootstrap/Container"
import UserIcons from 'components/FindMineComponents/NoFeedContainer/UserIcons/UserIcons'
import styles from "./Navbar.module.scss"


// utils
import {useImage} from "Contexts/Img"

export default function Navbar() {
    return <RENDER></RENDER>
}

function RENDER() {
    const dispatch = useDispatch()

    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)

    const ALL_USERNAMES = useSelector( (state:RootState) => state.main.ALL_USERNAMES)
    const ALL_EMAILS = useSelector( (state:RootState) => state.main.ALL_EMAILS)
    const CURRENT_PAGE = useSelector( (state:RootState) => state.main.CURRENT_PAGE)
    const CURRENT_USER_STRAINS = useSelector( (state:RootState) => state.findMine.CURRENT_USER_STRAINS)
    const SHOW_ICONS = useSelector( (state:RootState) => state.findMine.SHOW_ICONS)

    const { magnify, gold, cactus, mine, navbardice, vest, signUpSigns} = useImage()

    
    useEffect( () => {
        console.log("useEffect and currentPage", CURRENT_PAGE)
        if (CURRENT_PAGE === '/findmine' && CURRENT_USER.age > 0) {
// there is a CSS function in util/utilValues. I don't want to use it because it seems more performance sparing to not have to import the function?  Jquery would need to be imported either way.
            $('#iconVest').addClass('hover')
        }

    }, [CURRENT_USER])

    const goldClick = () => {
        window.location.href = "/strain"
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

    return (
        
        <Container id={styles.Cont}>

            <Container>
                
                { CURRENT_PAGE === "/" || CURRENT_PAGE === "/strain" && <img style={{ cursor: 'pointer' }} className={styles.img} id={styles.mine} src={mine}/> }
                { CURRENT_PAGE === "/familytree" && <img style={{ cursor: 'pointer' }} className={styles.img} id={styles.mine} src={navbardice}/> }
                { CURRENT_PAGE === "/findmine" && <img id="iconVest" onClick={findMineClickForIcons} style={{ cursor: 'pointer', borderRadius: '0%' }} className={styles.img} src={CURRENT_USER_STRAINS.length > 1 ? vest : signUpSigns}/> }

            </Container>

            {
                SHOW_ICONS 
                    ?
                <UserIcons/>                    
                    :
                <Container id={styles.multiIconCont}>
                <img onClick={goldClick} className={styles.img} src={gold}/>
                <img className={styles.img} src={cactus}/>
                <img className={styles.img} src={magnify}/>
            </Container>
            }
            
        </Container>

    )
}

// interface IconVestElement extends HTMLElement {
//     onClick: (event: MouseEvent) => void;
// }      
//   const iconVest: IconVestElement | null | any = document.getElementById('iconVest');      
//   if (iconVest) {
//     iconVest.onClick = (event) => {
//       console.log('Element clicked:', event);
//     };
  
//     // Attach the event listener
//     iconVest.addEventListener('click', iconVest.onClick);
//   }
