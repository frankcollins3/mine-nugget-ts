import {useEffect} from 'react'
import $ from 'jquery'

import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { 
    TOGGLE_BONUS_GAME, TOGGLE_LUCKY_PULL_PLAYING
} from "redux/familyTree/familyTreeSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./FamilyTreeFooter.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function FamilyTreeFooter() {

    return <RENDER/>
}

function RENDER() {
    const dispatch = useDispatch()

    const {winoneheart, cards, luckypull} = useImage()
    const GAME_LIVES = useSelector( (state:RootState) => state.familyTree.GAME_LIVES)
    const BONUS_GAME = useSelector( (state:RootState) => state.familyTree.BONUS_GAME)
    const GAME_OVER = useSelector( (state:RootState) => state.familyTree.GAME_OVER)
    const LUCKY_PULL_PLAYING = useSelector( (state:RootState) => state.familyTree.LUCKY_PULL_PLAYING)

    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)

    useEffect( () => {
        if (GAME_OVER === 'win') {
            $('#otherimage').addClass('hover')
        }
    }, [GAME_OVER])



    const luckyPullClick = () => {
        console.log('currentuser', CURRENT_USER)
        if (CURRENT_USER.age > 0) {
            // GAME_OVER has to be true! 
            if (CURRENT_USER.wins && CURRENT_USER.wins > 2 && GAME_OVER === 'win') {
                dispatch(TOGGLE_BONUS_GAME())
            }
        }
    }

    const bonusClick = (event:any) => {
        const src:string = event.target.src
        console.log('src', src)
        if (src.includes('luckypull')) {
            if (LUCKY_PULL_PLAYING === false) dispatch(TOGGLE_LUCKY_PULL_PLAYING()) 
        }
        if (src.includes('cards')) {
            if (LUCKY_PULL_PLAYING === true) dispatch(TOGGLE_LUCKY_PULL_PLAYING()) 
        }

    }

    return (
        <Container onClick={luckyPullClick} id={styles.Cont}>
        <Container id={styles.heartRow}>

            { GAME_LIVES &&
                
                GAME_LIVES.map( (live, index) => {
                    return (
                         live % 2 === 0 && <img key={index} className={styles.img} src={winoneheart}/>                         
                        // { index % 2 === 0 && <img key={index} className={styles.img} src={winoneheart}/> }                        
                        )
                    })
                }
            </Container>


            <img onClick={bonusClick} id="otherimage" className={styles.img} src={BONUS_GAME ? luckypull : cards}/>
        </Container>
    )
}
