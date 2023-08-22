import {useEffect, useState} from "react"
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "../NoFeedContainer.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { 
    SET_NO_FEED_NO_STRAIN_MSGS, TOGGLE_USER_LIKES_SELECTED_STRAIN, TOGGLE_TRIGGER_USER_STRAINS_EFFECT, TOGGLE_DONT_RUN_USER_STRAINS_EFFECT_PROMISE,
    TOGGLE_NO_FEED_SHOW_MINE, TOGGLE_READY_TO_EDIT,
 } from "redux/findMine/findMineSlice"
// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"

export default function DigDynamiteMine () {
    return <RENDER/>
}

function RENDER () {
    const { dynamite, shovel, mine } = useImage()
    const { addLikePROMISE, removeLikePROMISE } = usePromise()

    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)    
    const USER_LIKES_SELECTED_STRAIN = useSelector( (state:RootState) => state.findMine.USER_LIKES_SELECTED_STRAIN)
    const NO_FEED_SELECTED_STRAIN = useSelector( (state:RootState) => state.findMine.NO_FEED_SELECTED_STRAIN)    
    const DONT_RUN_USER_STRAINS_EFFECT_PROMISE = useSelector( (state:RootState) => state.findMine.DONT_RUN_USER_STRAINS_EFFECT_PROMISE)
    const READY_TO_EDIT = useSelector( (state:RootState) => state.findMine.READY_TO_EDIT)
    const NO_FEED_NO_STRAIN_MSGS = useSelector( (state:RootState) => state.findMine.NO_FEED_NO_STRAIN_MSGS)

    const dispatch = useDispatch()

    const shovelClick = async () => {
        console.log('currentUser', CURRENT_USER)
        const userId = CURRENT_USER

        if (NO_FEED_SELECTED_STRAIN.strain) {
            if (NO_FEED_SELECTED_STRAIN.strain.length > 1) {
            
            if (USER_LIKES_SELECTED_STRAIN) {
                console.log("user likes selected strain before clicking so this handles the dislike")
                removeLikePROMISE(CURRENT_USER.username, NO_FEED_SELECTED_STRAIN.id, true)
                .then( (addedLike:any) => {
                    if (addedLike.data) {
                        addedLike = addedLike.data.data.addStrainDig
                        console.log("addedLike", addedLike)
                        dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: `doesn't like ${NO_FEED_SELECTED_STRAIN.strain} anymore`}))
                        setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)
                        if (USER_LIKES_SELECTED_STRAIN === true) {                            
                            dispatch(TOGGLE_USER_LIKES_SELECTED_STRAIN())
                        }
                    }
                })
            } else {
                console.log("user doesn't like the strain before clicking. so we like it!")
                addLikePROMISE(CURRENT_USER.username, NO_FEED_SELECTED_STRAIN.id, true)
                .then( (addedLike:any) => {
                    if (addedLike.data) {
                        addedLike = addedLike.data.data.addStrainDig
                        console.log("addedLike", addedLike)
                        dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: `${CURRENT_USER.username} digs ${NO_FEED_SELECTED_STRAIN.strain}`}))
                        setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)
                        if (USER_LIKES_SELECTED_STRAIN === false) {
                            dispatch(TOGGLE_USER_LIKES_SELECTED_STRAIN())
                        }
                    }
                })
            }

            }            
        } else {
            dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: true, msg: 'no strain selected'}));
            setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)
        }
    }

    const deleteUserStrain = () => {
        console.log(CURRENT_USER.username)
        console.log('no feed strain', NO_FEED_SELECTED_STRAIN)
        if (NO_FEED_SELECTED_STRAIN.strain === '') {
            dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: true, msg: `no selected strain to delete`}))
            setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)
        } else {
        // axios.post("/api/graphql", { query: `mutation { removeMinersOnStrains(username: "${CURRENT_USER.username}", strainid: ${NO_FEED_SELECTED_STRAIN.id} ), { minersId, strainid }`})
        axios.post('/api/graphql', { query: `mutation { removeMinersOnStrains(username: "${CURRENT_USER.username}", strainid: ${NO_FEED_SELECTED_STRAIN.id}) { minersId, strainsid } }`})
            .then( (deletedStrain) => {
                console.log('deletedStrain', deletedStrain)
                if (DONT_RUN_USER_STRAINS_EFFECT_PROMISE === true) {
                    dispatch(TOGGLE_DONT_RUN_USER_STRAINS_EFFECT_PROMISE())
                }
                dispatch(TOGGLE_TRIGGER_USER_STRAINS_EFFECT())
            })
        }
    }

    const mineClick = () => {

        if (NO_FEED_SELECTED_STRAIN && NO_FEED_SELECTED_STRAIN.strain.length > 3) {
            dispatch(TOGGLE_NO_FEED_SHOW_MINE())
            if (READY_TO_EDIT === true) dispatch(TOGGLE_READY_TO_EDIT())
            if (NO_FEED_NO_STRAIN_MSGS.msg && NO_FEED_NO_STRAIN_MSGS.msg.length) {
                // setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)    
            }

        } else {
            dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: true, msg: 'no strain selected'}))
            setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)
        }
         
    }


    return (
        <Container id={styles.shovelMineCont}>

        <Container style={{ padding: '0', margin: '0'}} className={styles.coinColumn}>
        <img onClick={shovelClick} id={styles.shovel} className={styles.shovelDynamiteMine} src={shovel}/>
        
        </Container>

        <Container style={{ padding: '0', margin: '0'}} className={styles.coinColumn}>
        <img onClick={deleteUserStrain} id={styles.dynamite} className={styles.shovelDynamiteMine} src={dynamite}/>                        
        </Container>

        <Container style={{ padding: '0', margin: '0'}} className={styles.coinColumn}>                        
        <img id={styles.mine} onClick={mineClick} className={styles.shovelDynamiteMine} src={mine}/>                        
        </Container>

    </Container>
    )
}