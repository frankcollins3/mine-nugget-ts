// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {SET_CURRENT_PAGE, SET_CURRENT_USER} from "redux/main/mainSlice"
import { TOGGLE_SHOW_INPUT, SET_FEED_SELECTED_USER } from "redux/findMine/findMineSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./FeedContainer.module.scss"
import PrimarySelectedUser  from "./PrimarySelectedUser"
import PrimaryUserStrainCoins from "./PrimaryUserStrainCoins/PrimaryUserStrainCoins"
import UserSearchInput from "components/FindMineComponents/FeedContainer/UserSearchInput"
import PanelUserDataCont from "./PanelUserDataCont"
import OtherUserReviews from "./OtherUserReviews/OtherUserReviews"

// utils
import {useImage} from "Contexts/Img"
import { showFeedINTERFACE } from "utility/InterfaceTypes"

// Primary: Miner.png -> search user or go forward or back. right hand side shows that users strains in coins. Coin hover see the border. Click coin in <Panel> and <Primary> shows the text 

// allUsers, allMinersOnStrains, allReviewsFromAllUsers, allLikesFromAllUsers

export default function FeedContainer(props: showFeedINTERFACE) {
    console.log('props in the feed container!', props)

    return <RENDER DBdata={props}/>
}

function RENDER(props:any) {
    
    const dispatch = useDispatch()
    const SHOW_INPUT = useSelector( (state:RootState) => state.findMine.SHOW_INPUT)
    const FEED_SELECTED_USER = useSelector( (state:RootState) => state.findMine.FEED_SELECTED_USER)
    const FEED_SELECTED_USER_REVIEWS = useSelector( (state:RootState) => state.findMine.FEED_SELECTED_USER_REVIEWS)

    const { helmet, magnify } = useImage()

    console.log('props', props)

    const data = props.DBdata

    const test = () => {
        console.log('props from double clicking!', props)
    }    

    const containerReset = () => {
        dispatch(SET_FEED_SELECTED_USER({username: '', password: '', email: '', age: 0, wins: 0, icon: '' }))
    }

    const yes = () => {
        console.log('feed user', FEED_SELECTED_USER)
    }

    return (
        <Container onMouseLeave={containerReset} id={styles.Page_1}>
            <Container className={styles.primary}>

{ FEED_SELECTED_USER.username !== '' && <PrimaryUserStrainCoins allStrainsForAllUsers={data.allStrainsForAllUsers} allLikesFromAllUsers={data.allLikesFromAllUsers} allReviewsFromAllUsers={data.allReviewsFromAllUsers}/> }
                 {/* <pre className={styles.ghost}> ghost </pre> */}
                { FEED_SELECTED_USER.username === '' && <pre className={styles.ghost}> ghost </pre> }
                {/* { !SHOW_INPUT || FEED_SELECTED_USER.username === '' && <pre className={styles.ghost}> ghost </pre> } */}

                <PrimarySelectedUser  />                
                
                { FEED_SELECTED_USER.username === '' && <pre className={styles.ghost}> ghost </pre> }

                { FEED_SELECTED_USER.username !== '' && <OtherUserReviews/> }
                
            </Container>
            
            <Container onDoubleClick={test} className={styles.panel}>
            {/* { !SHOW_INPUT && <pre className={styles.ghost}> ghost </pre> } */}

                <Container id={styles.panelInputCont}>
                <img onClick={() => dispatch(TOGGLE_SHOW_INPUT())} style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={magnify}/>
                {SHOW_INPUT && <UserSearchInput/>}
                </Container>

                <PanelUserDataCont userData={data.allUsers} />

                <pre className={styles.ghost}> ghost </pre>
            </Container>

        </Container>
    )
}
