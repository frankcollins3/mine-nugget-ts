import axios from 'axios'
import {useEffect, useState} from "react"
import $ from 'jquery'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "../NoFeedContainer.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_NO_FEED_SELECTED_STRAIN, TOGGLE_NO_FEED_SHOW_MINE, TOGGLE_USER_LIKES_SELECTED_STRAIN, TOGGLE_READY_TO_EDIT, TOGGLE_TRIGGER_USER_STRAINS_EFFECT,
    SET_NO_FEED_NO_STRAIN_MSGS, SET_MINE_TITLE_INPUT_VAL, SET_MINE_REVIEW_INPUT_VAL, TOGGLE_TRIGGER_MINE_EFFECT, TOGGLE_DONT_RUN_USER_STRAINS_EFFECT_PROMISE } from "redux/findMine/findMineSlice"

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import { addStrainLikeStringFunc, removeStrainLikeStringFunc, addMineReviewStringFunc, getMyLikesStringFunc, removeMineReviewStringFunc } from 'graphql/queries'
import { nothing } from 'utility/utilityValues'


export default function Primary() {
    return <RENDER/>
}

function RENDER() {
        
    const SHOW_FEED = useSelector( (state:RootState) => state.findMine.SHOW_FEED)
    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)
    const CURRENT_USER_STRAINS = useSelector( (state:RootState) => state.findMine.CURRENT_USER_STRAINS)
    const CURRENT_USER_LIKES = useSelector( (state:RootState) => state.findMine.CURRENT_USER_LIKES)
    const USER_LIKES_SELECTED_STRAIN = useSelector( (state:RootState) => state.findMine.USER_LIKES_SELECTED_STRAIN)
    const TRIGGER_LIKE_EFFECT = useSelector( (state:RootState) => state.findMine.TRIGGER_LIKE_EFFECT)
    const NO_FEED_SELECTED_STRAIN = useSelector( (state:RootState) => state.findMine.NO_FEED_SELECTED_STRAIN)
    const NO_FEED_NO_STRAIN_MSGS = useSelector( (state:RootState) => state.findMine.NO_FEED_NO_STRAIN_MSGS)

    const NO_FEED_SHOW_MINE = useSelector( (state:RootState) => state.findMine.NO_FEED_SHOW_MINE)
    const MINE_TITLE_INPUT_VAL = useSelector( (state:RootState) => state.findMine.MINE_TITLE_INPUT_VAL)
    const MINE_REVIEW_INPUT_VAL = useSelector( (state:RootState) => state.findMine.MINE_REVIEW_INPUT_VAL)
    const CURRENT_USER_REVIEWS = useSelector( (state:RootState) => state.findMine.CURRENT_USER_REVIEWS)
    const DONT_RUN_USER_STRAINS_EFFECT_PROMISE = useSelector( (state:RootState) => state.findMine.DONT_RUN_USER_STRAINS_EFFECT_PROMISE)

    const TRIGGER_MINE_EFFECT = useSelector( (state:RootState) => state.findMine.TRIGGER_MINE_EFFECT)


    const READY_TO_EDIT = useSelector( (state:RootState) => state.findMine.READY_TO_EDIT)

    const [showDigText, setShowDigText] = useState(false)
    const [showDeleteText, setShowDeleteText] = useState(false)
    const [showMineText, setShowMineText] = useState(false)

    const dispatch = useDispatch()

    const { coin, mine, gold, shovel, dynamite, edit, eraser, glasses, goldBars  } = useImage()
    const { addLikePROMISE, removeLikePROMISE, addMinePROMISE, removeMinePROMISE, getMyLikesPROMISE, getMyMinesPROMISE } = usePromise() 

    useEffect( () => {
        // getMyLikes
        if (CURRENT_USER.username) { getMyLikesPROMISE(CURRENT_USER.username) } 
        // else { return } || else { redirect ? }

    }, [TRIGGER_LIKE_EFFECT])

    useEffect( () => {

        if (CURRENT_USER.username) { getMyMinesPROMISE(CURRENT_USER.username) }



    }, [TRIGGER_MINE_EFFECT])


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

    const titleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SET_MINE_TITLE_INPUT_VAL(event.target.value))
    };

    const reviewInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SET_MINE_REVIEW_INPUT_VAL(event.target.value))
    };

    const submit = async () => {
    const query =  addMineReviewStringFunc(CURRENT_USER.username, MINE_REVIEW_INPUT_VAL, MINE_TITLE_INPUT_VAL, NO_FEED_SELECTED_STRAIN.id)
    addMinePROMISE(query)
    }

    const deleteSelectedStrainUserReview = async () => {
        console.log("theres a good way to find it");
            if (CURRENT_USER.username && NO_FEED_SELECTED_STRAIN.id) {
                const query = removeMineReviewStringFunc(CURRENT_USER.username, NO_FEED_SELECTED_STRAIN.id)
                await removeMinePROMISE(query)   
                dispatch(TOGGLE_TRIGGER_MINE_EFFECT())             
            }
            // return query
         }       
         
    const checkSelectedStrainUserReview = async () => {
        if (CURRENT_USER.username) { await getMyMinesPROMISE(CURRENT_USER.username) }
        if (CURRENT_USER.username && NO_FEED_SELECTED_STRAIN.id) {
            console.log(CURRENT_USER_REVIEWS)
            
            let review:any|null = CURRENT_USER_REVIEWS.find(reviews => reviews.strainid === NO_FEED_SELECTED_STRAIN.id)
            console.log('review', review)
            if (review === null || review === undefined) {
                dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: true, msg: 'not mine'}));
                setTimeout( () => dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''})), 1250)
            } else {
                if (NO_FEED_NO_STRAIN_MSGS.msg === `${review!.title}: ${review!.review}`) {
                    console.log("lets see whats up!")
                    dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''}))
                    // dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: `this works but not the empty string somehow`}))
                } else if (review!.title) {
                    console.log('review', review)
                    // if (review?.title.length >= 1) {
                        dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: `${review!.title}: ${review!.review}`}))
                }
            }

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
                                    <img style={{ cursor: 'pointer' }} onClick={() => dispatch(TOGGLE_READY_TO_EDIT())} src={edit}/>
                                    <img onClick={checkSelectedStrainUserReview} style={{ cursor: 'pointer' }} src={glasses}/>
                                    <img onClick={deleteSelectedStrainUserReview} style={{ cursor: 'pointer' }} src={eraser}/>
                                </Container>
                                :
                    <pre className={styles.ghost}> this is crazy </pre>
                    }
                    

                    <Container id={styles.selectedStrainColumn}>
                        {
                            READY_TO_EDIT
                            ? 
                            <form id={styles.reviewForm}>
                            <input value={MINE_TITLE_INPUT_VAL} onChange={titleInputHandler} maxLength={10} id="title" className={styles.mineInputs} type="text"/>
                            <label className={styles.inputLabel} htmlFor="title"> Title </label>

                            <input value={MINE_REVIEW_INPUT_VAL} onChange={reviewInputHandler} maxLength={20} id="review" className={styles.mineInputs} type="text"/>
                            <label className={styles.inputLabel} htmlFor="review"> Review </label>
                            <img onClick={submit} id={styles.submitGold} style={{ height: '20px', width: '20px', cursor: 'pointer' }} src={gold}/>
                            </form>
                            : <img id={styles.selectedStrainGoldBar} src={USER_LIKES_SELECTED_STRAIN ? goldBars : gold}/>

                        }
                    {/* <img id={styles.selectedStrainGoldBar} src={USER_LIKES_SELECTED_STRAIN ? goldBars : gold}/> */}
                    {/* <img id={styles.selectedStrainGoldBar} src={USER_LIKES_SELECTED_STRAIN ? goldBars : gold}/> */}


                    {
                        NO_FEED_NO_STRAIN_MSGS && NO_FEED_NO_STRAIN_MSGS.msg.length > 3
                        ? <h6 style={{ color: NO_FEED_NO_STRAIN_MSGS.err ? '#E01115' : 'rgb(247, 208, 36)' }} id={styles.selectedStrainText}> {NO_FEED_NO_STRAIN_MSGS.msg} </h6>
                        : <h6 id={styles.selectedStrainText}> {NO_FEED_SELECTED_STRAIN.strain} </h6>
                    }                    
                    {/* { NO_FEED_NO_STRAIN_MSGS.msg && NO_FEED_NO_STRAIN_MSGS.msg.length > 3 && <h6 style={{ color: NO_FEED_NO_STRAIN_MSGS.err ? '#E01115' : 'rgb(247, 208, 36)' }} id={styles.selectedStrainText}> {NO_FEED_NO_STRAIN_MSGS.msg} </h6> }
        { NO_FEED_SELECTED_STRAIN.strain && NO_FEED_SELECTED_STRAIN.strain.length > 3 && <h6 id={styles.selectedStrainText}> {NO_FEED_SELECTED_STRAIN.strain} </h6> } */}

                    </Container>                        

                    <Container id={styles.shovelMineCont}>

                        <Container style={{ padding: '0', margin: '0'}} className={styles.coinColumn}>
                        <img onClick={shovelClick} id={styles.shovel} className={styles.shovelDynamiteMine} src={shovel}/>
                        {/* { showDigText && <pre className={styles.digDeleteMine}> dig </pre> } */}
                        
                        </Container>

                        <Container style={{ padding: '0', margin: '0'}} className={styles.coinColumn}>
                        <img onClick={deleteUserStrain} id={styles.dynamite} className={styles.shovelDynamiteMine} src={dynamite}/>                        
                        {/* { showDeleteText && <pre className={styles.digDeleteMine}> delete </pre> } */}
                        </Container>

                        <Container style={{ padding: '0', margin: '0'}} className={styles.coinColumn}>                        
                        <img id={styles.mine} onClick={mineClick} className={styles.shovelDynamiteMine} src={mine}/>                        
                        {/* { showMineText && <pre className={styles.digDeleteMine}> mine </pre> } */}
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

