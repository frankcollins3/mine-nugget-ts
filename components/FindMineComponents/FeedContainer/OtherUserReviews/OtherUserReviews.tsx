
// components and styles
import Container from "react-bootstrap/Container"
import styles from "./OtherUserReviews.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {SET_CURRENT_PAGE, SET_CURRENT_USER} from "redux/main/mainSlice"
import { TOGGLE_SHOW_INPUT, SET_FEED_SELECTED_USER } from "redux/findMine/findMineSlice"

// utils
import {useImage} from "Contexts/Img"

export default function OtherUserReviews() {
    return <RENDER/>
}

function RENDER() {
    const FEED_SELECTED_USER_REVIEWS = useSelector( (state:RootState) => state.findMine.FEED_SELECTED_USER_REVIEWS)
    const COIN_HOVER_STRAIN = useSelector( (state:RootState) => state.findMine.COIN_HOVER_STRAIN)

    const { mine } = useImage()

    const test = () => {
        console.log('selected user reviews', FEED_SELECTED_USER_REVIEWS)
        console.log('selected user reviews', FEED_SELECTED_USER_REVIEWS.review.length)
        console.log('coin hover strain', COIN_HOVER_STRAIN)
    }

    return (
        <Container onClick={test} id={styles.cont}>
        <img id={styles.img} src={mine}/>
            {
                FEED_SELECTED_USER_REVIEWS.title === '' && COIN_HOVER_STRAIN.strain !== ''
                            ?
                        <pre id={styles.text}> <span id={styles.noReviewSpan}>no review</span> </pre>
                        // <pre id={styles.text}> <span id={styles.noReviewSpan}>no review</span> {COIN_HOVER_STRAIN.strain} </pre>
                            :                            
        <pre id={styles.text}> <span id={styles.span}>{`${FEED_SELECTED_USER_REVIEWS.title}:`}</span> {FEED_SELECTED_USER_REVIEWS.review} </pre>
        // <pre id={styles.text}> <span id={styles.span}>{FEED_SELECTED_USER_REVIEWS.title}</span> {FEED_SELECTED_USER_REVIEWS.review} </pre>

            }
        {/* <pre id={styles.text}> {FEED_SELECTED_USER_REVIEWS.title}: {FEED_SELECTED_USER_REVIEWS.review} </pre> */}
        </Container>
    )
}