import $ from 'jquery'

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {SET_CURRENT_PAGE, SET_CURRENT_USER} from "redux/main/mainSlice"
import { TOGGLE_SHOW_INPUT, SET_FEED_SELECTED_USER, SET_COIN_HOVER_STRAIN } from "redux/findMine/findMineSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./PrimaryUserStrainCoins.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function PrimaryUserStrainCoins ({allStrainsForAllUsers, allLikesFromAllUsers}) {
    return <RENDER allStrainsForAllUsers={allStrainsForAllUsers} allLikesFromAllUsers={allLikesFromAllUsers} />
}

function RENDER(props:any) {
    const dispatch = useDispatch()
    const { coin } = useImage()

    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)
    const allStrainsForAllUsers = props.allStrainsForAllUsers
    const allLikesFromAllUsers = props.allLikesFromAllUsers
    const FEED_SELECTED_USER = useSelector( (state:RootState) => state.findMine.FEED_SELECTED_USER)
    const COIN_HOVER_STRAIN = useSelector( (state:RootState) => state.findMine.COIN_HOVER_STRAIN)

    const test = () => {
        // console.log('current user', SHOW_FEED_SELECTED_USER)
        console.log('feed selected user', FEED_SELECTED_USER)
        console.log('props', props)
        console.log('allstrainsforallusers', allStrainsForAllUsers)

        console.log('coin hover strain', COIN_HOVER_STRAIN)
    }

    const clickCoin = (item, event) => {
        $('.coin').css('box-shadow', '')        
        // console.log('coin event', event)
        
        console.log('item', item)

        const id = item.strainsid

        console.log('feed selected user', FEED_SELECTED_USER)
        const checkLikePROMISE = new Promise( (resolve:any, reject:any) => {
            const myLike = allLikesFromAllUsers.find(like => like.userId === FEED_SELECTED_USER.id && like.strainid === id )
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

    return (

            // <>
             <ul onClick={test} id={styles.ul}> 
            {
                FEED_SELECTED_USER && allStrainsForAllUsers &&
            allStrainsForAllUsers.map( (item:any, index:number) => {

                return (                    
                    FEED_SELECTED_USER.id === item.minersId && 
                    <Container key={`cont${index}`} id={styles.coinCont}>
                    <img className="coin" onClick={(event) => clickCoin(item, event)} id={styles.coin} key={`coin${index}`} src={coin}/>
                    {/* <img onClick={clickCoin} id={styles.coin} key={`coin${index}`} src={coin}/> */}                                        
                    </Container>                                    

                    )
                })
            }
            
            </ul>            
    )
}