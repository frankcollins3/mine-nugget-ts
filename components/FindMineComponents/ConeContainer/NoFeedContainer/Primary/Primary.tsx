import axios from 'axios'
import {useEffect, useState} from "react"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "../NoFeedContainer.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_NO_FEED_SELECTED_STRAIN, TOGGLE_NO_FEED_SHOW_MINE, SET_NO_FEED_NO_STRAIN_MSGS } from "redux/findMine/findMineSlice"

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import { addStrainLikeStringFunc, removeStrainLikeStringFunc } from 'graphql/queries'


export default function Primary() {
    return <RENDER/>
}

function RENDER() {
        
    const SHOW_FEED = useSelector( (state:RootState) => state.findMine.SHOW_FEED)
    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)
    const CURRENT_USER_STRAINS = useSelector( (state:RootState) => state.findMine.CURRENT_USER_STRAINS)
    const NO_FEED_SELECTED_STRAIN = useSelector( (state:RootState) => state.findMine.NO_FEED_SELECTED_STRAIN)
    const NO_FEED_NO_STRAIN_MSGS = useSelector( (state:RootState) => state.findMine.NO_FEED_NO_STRAIN_MSGS)
    const NO_FEED_SHOW_MINE = useSelector( (state:RootState) => state.findMine.NO_FEED_SHOW_MINE)

    const [showDigText, setShowDigText] = useState(false)
    const [showDeleteText, setShowDeleteText] = useState(false)
    const [showMineText, setShowMineText] = useState(false)

    const dispatch = useDispatch()

    const { coin, mine, gold, shovel, dynamite, edit, eraser, glasses  } = useImage()
    const { addLikePROMISE, removeLikePROMISE } = usePromise() 


    const shovelClick = async () => {
        console.log('currentUser', CURRENT_USER)
        const userId = CURRENT_USER

        if (NO_FEED_SELECTED_STRAIN.strain.length < 1) {
            dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: true, msg: 'no strain selected'}));
            setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)
        } else {
            addLikePROMISE(CURRENT_USER.username, NO_FEED_SELECTED_STRAIN.id, true)
            .then( (addedLike:any) => {
                console.log("addedLike", addedLike)
            })
        }


        // removeLikePROMISE(CURRENT_USER.username, NO_FEED_SELECTED_STRAIN.id, true)
        // .then( (likeStrain:any) => {
        //     console.log('likeStrain', likeStrain)
        // })            


        // const query = addStrainLikeStringFunc(CURRENT_USER.username, NO_FEED_SELECTED_STRAIN.id, true)
        // axios.post('/api/graphql', { query: `${query}`})
        // .then( (newLike:any) => {
        //     console.log('newLike', newLike)
        //     newLike = newLike.data.data.addStrainDig
        // })

    }


        return (

            <Container className={styles.primary}>
                {
                    NO_FEED_SELECTED_STRAIN
                    ? 
                    <>        
                    {
                        NO_FEED_SHOW_MINE
                                ?
                                <Container id={styles.editGlassesEraserCont}>
                                    <img src={edit}/>
                                    <img src={glasses}/>
                                    <img src={eraser}/>
                                </Container>
                                :
                    <pre className={styles.ghost}> this is crazy </pre>
                    }
                    

                    <Container id={styles.selectedStrainColumn}>
                    <img id={styles.selectedStrainGoldBar} src={gold}/>

                    {
                        NO_FEED_NO_STRAIN_MSGS
                        ? <h6 style={{ color: NO_FEED_NO_STRAIN_MSGS.err ? '#E01115' : 'rgb(247, 208, 36)' }} id={styles.selectedStrainText}> {NO_FEED_NO_STRAIN_MSGS.msg} </h6>
                        : <h6 id={styles.selectedStrainText}> {NO_FEED_SELECTED_STRAIN.strain} </h6>
                    }                    
                    </Container>                        

                    <Container id={styles.shovelMineCont}>

                        <Container className={styles.coinColumn}>
                        <img onClick={shovelClick} id={styles.shovel} onMouseEnter={() => setShowDigText(true)} onMouseLeave={() => setShowDigText(false)} className={styles.shovelDynamiteMine} src={shovel}/>
                        { showDigText && <pre className={styles.digDeleteMine}> dig </pre> }
                        
                        </Container>

                        <Container className={styles.coinColumn}>
                        <img id={styles.dynamite} onMouseEnter={() => setShowDeleteText(true)} onMouseLeave={() => setShowDeleteText(false)} className={styles.shovelDynamiteMine} src={dynamite}/>                        
                        { showDeleteText && <pre className={styles.digDeleteMine}> delete </pre> }
                        </Container>

                        <Container className={styles.coinColumn}>                        
                        <img id={styles.mine} onClick={() => dispatch(TOGGLE_NO_FEED_SHOW_MINE()) } onMouseEnter={() => setShowMineText(true)} onMouseLeave={() => setShowMineText(false)} className={styles.shovelDynamiteMine} src={mine}/>                        
                        { showMineText && <pre className={styles.digDeleteMine}> mine </pre> }
                        </Container>

                    </Container>

                    </>
                    : 

                    <>
                    <pre className={styles.ghost}>ghost </pre>
                    <img id={styles.noSelectedStrainMine} src={mine}/>
                    <pre className={styles.ghost}>ghost </pre>
                    </>

                }
            </Container>

        )
}